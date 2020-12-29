/**
 * Logs request to the console
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const logger = (req, res, next) => {
  console.info(
    `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} `,
    `${res.statusCode}`
  );
  next();
};

module.exports = logger;
