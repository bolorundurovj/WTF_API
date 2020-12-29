const ErrorResponse = require('../utilities/errorResponse');
const asyncHandler = require('../middleware/async');
const Acronym = require('../models/Acronym');

// @desc      Get acronym
// @route     GET /api/v1/acronym
// @access    Public
exports.getAcronyms = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single acronym
// @route     GET /api/v1/acronym/:acronym
// @access    Public
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

// @desc      Add acronym
// @route     POST /api/v1/bootcamps/:bootcampId/acronym
// @access    Public
exports.addAcronym = asyncHandler(async (req, res, next) => {
  const acronym = await Acronym.create(req.body);

  res.status(201).json({
    status: true,
    data: acronym,
  });
});

// @desc      Update acronym
// @route     PUT /api/v1/acronym/:acronym
// @access    Public
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

// @desc      Delete acronym
// @route     DELETE /api/v1/acronym/:acronym
// @access    Public
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
