const express = require('express');
const {
  getAcronym,
  getAcronyms,
  addAcronym,
  updateAcronym,
  deleteAcronym,
} = require('../controllers/acronym');

const Acronym = require('../models/Acronym');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

router
  .route('/')
  .get(advancedResults(Acronym), getAcronyms)
  .post(addAcronym);

router
  .route('/:acronym')
  .get(getAcronym)
  .put(updateAcronym)
  .delete(deleteAcronym);

module.exports = router;
