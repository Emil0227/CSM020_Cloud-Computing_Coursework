// load environment variables from .env file (e.g., PORT, MONGO_URI)
require('dotenv').config();

// import the Express application 
const app = require('./app');

// import database connection function
const connectDB = require('./config/db');

// define the port for the server, defaulting to 3000 if not specified
const PORT = process.env.PORT || 3000;

// an immediately invoked async function to control startup sequence
(async () => {
  try {
    await connectDB(); // establish connection to MongoDB before starting the server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
})();