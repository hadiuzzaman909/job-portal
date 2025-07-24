// Load environment variables before anything else
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const { errorHandler } = require('./middlewares/errorMiddleware');
const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const logger = require('./utils/logger');
const config = require('./config/config'); // config contains MONGODB_URI and others

const app = express();

// Enable CORS for all requests (including Swagger UI)
app.use(cors());

// Connect to MongoDB
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => logger.info('✅ MongoDB connected successfully'))
  .catch((error) => {
    logger.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit if DB connection fails
  });

// Middleware
app.use(express.json());

// Swagger UI Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const bcrypt = require('bcryptjs');

const password = 'Admin@123';
bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) {
    console.error(err);
  } else {
    console.log(hashedPassword); // Copy this hashed value to your .env file
  }
});

// API Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/application', applicationRoutes);

// Error Handler (must be last middleware)
app.use(errorHandler);

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`🚀 Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
