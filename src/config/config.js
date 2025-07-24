require('dotenv').config(); // Load .env vars here too for safety

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  MONGODB_URI: process.env.MONGODB_URI,
};
