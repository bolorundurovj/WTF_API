const Acronym = require('../models/Acronym');

const advancedResults = (model, populate) => async (req, res, next) => {
  //Copy req query
  const reqQuery = { ...req.query };
  console.log(reqQuery);

  //Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit', 'from'];

  //Loop over removeFields and remove them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  //Create query string
  let query;
  let queryStr;

  //Search
  if (req.query.search) {
    //Finding resource
    query = model.find(
      {
        $text: {
          $search: req.query.search,
        },
      }
    );
  } else {
    //Finding resource
    query = model.find(queryStr);
  }

  //Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    // console.log(fields);
    query = query.select(fields);
    console.log(query);
  }

  //Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    console.log(sortBy);
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  //Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const startIndex = skip;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(skip).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  //Executing query
  const results = await query;

  //Pagination result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResults;
