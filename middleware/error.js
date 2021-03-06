const ErrorResponse = require('../utilities/errorResponse');

/**
 * Receives error, and determines message to show
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //Log to console for dev
  // console.log(err);

  //Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  //Mongoose Duplicate Key
  if (err.code === 11000) {
    const message = `Duplicate field already exists`;
    error = new ErrorResponse(message, 400);
  }

  //Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ status: false, error: error.message || 'Server Error' });
};

module.exports = errorHandler;
