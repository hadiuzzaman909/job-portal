// Load environment variables before anything else
require('dotenv').config();

const express = require('express');
const cors = require('cors'); // Only import once
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

// CORS configuration
const corsOptions = {
    origin: '*', // Replace with your deployed domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // Enable credentials (e.g., cookies, authorization headers)
};

app.use(cors(corsOptions));  // Apply CORS configuration

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

// API Routes
// Routes
app.use('/api/jobs', jobRoutes);          // Correct, as per the Swagger configuration
app.use('/api/auth', authRoutes);         // Correct
app.use('/api/applications', applicationRoutes);  // Correct

// Error Handler (must be last middleware)
app.use(errorHandler);

app.get('/', () => {
    res.json({
        message: 'Welcome to the Job Board API!',
        documentation: `Visit https://job-portal-63en.onrender.com/api-docs for API documentation`,
        endpoints: {
            auth: '/auth',
            jobs: '/jobs',
            applications: '/applications',
        },
    });
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`🚀 Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
