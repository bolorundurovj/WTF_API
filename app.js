const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');

const connectDB = require('./config/db');

//Load Env Vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

//Route files
const acronym = require('./routes/acronyms');
const random = require('./routes/random');

//Middleware Imports
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error');

const app = express();

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

//Logging middleware
app.use(logger);

//Set security headers
app.use(helmet());

//Body Parser
app.use(express.json());

//Prevent XSS attacks
app.use(xss());

//Prevent HPP attacks
app.use(hpp());

//Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

//Apply Rate Limit to all requests
app.use(limiter);

//Use CORS
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount routers
app.use('/api/v1/acronym', acronym);
app.use('/api/v1/random', random);

//Use Error Handler
app.use(errorHandler);

//Set PORT if not in environment variable
const PORT = process.env.PORT || 2020;

//Start server
const server = app.listen(
  PORT,
  console.log(
    `WTF API running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
  )
);

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Close server && exit process
  server.close(() => {
    process.exit(1);
  });
});
