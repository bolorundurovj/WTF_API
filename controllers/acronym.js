const ErrorResponse = require('../utilities/errorResponse');
const asyncHandler = require('../middleware/async');
const Acronym = require('../models/Acronym');

/**
 * Get Acronyms
 * @route     GET /api/v1/acronym
 * @access    Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getAcronyms = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

/**
 * Get Random Acronyms
 * @route     GET /api/v1/random/:count
 * @access    Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getRandomAcronyms = asyncHandler(async (req, res, next) => {
  if (req.params.count) {
    const count = Number(req.params.count);
    const acronyms = await Acronym.aggregate([{ $sample: { size: count } }]);

    if (!acronyms) {
      return next(new ErrorResponse(`Acronyms not found`, 404));
    }

    res.status(200).json({
      status: true,
      data: acronyms,
    });
  } else {
    return next(new ErrorResponse(`Count value is required`, 400));
  }
});

/**
 * Get Single Acronym
 * @route     GET /api/v1/acronym/:acronym
 * @access    Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getAcronym = asyncHandler(async (req, res, next) => {
  const acronym = await Acronym.findOne({ acronym: req.params.acronym });

  if (!acronym) {
    return next(
      new ErrorResponse(`Acronym '${req.params.acronym}' not found`, 404)
    );
  }

  res.status(200).json({
    status: true,
    data: acronym,
  });
});

/**
 * Add Acronym
 * @route     POST /api/v1/bootcamps/:bootcampId/acronym
 * @access    Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.addAcronym = asyncHandler(async (req, res, next) => {
  const acronym = await Acronym.create(req.body);

  res.status(201).json({
    status: true,
    data: acronym,
  });
});

/**
 * Update Acronym
 * @route     PUT /api/v1/acronym/:acronym
 * @access    Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.updateAcronym = asyncHandler(async (req, res, next) => {
  let acronym = await Acronym.findOne({ acronym: req.params.acronym });

  if (!acronym) {
    return next(
      new ErrorResponse(`Acronym '${req.params.acronym}' not found`, 404)
    );
  }

  acronym = await Acronym.findOneAndUpdate(
    { acronym: req.params.acronym },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: true,
    data: acronym,
  });
});

/**
 * Delete Acronym
 * @route     DELETE /api/v1/acronym/:acronym
 * @access    Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.deleteAcronym = asyncHandler(async (req, res, next) => {
  let acronym = await Acronym.findOne({ acronym: req.params.acronym });

  if (!acronym) {
    return next(
      new ErrorResponse(`Acronym '${req.params.acronym}' not found`, 404)
    );
  }

  await acronym.remove();

  res.status(200).json({
    status: true,
    data: {},
  });
});
