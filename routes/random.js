const express = require('express');
const { getRandomAcronyms } = require('../controllers/acronym');

const router = express.Router();

router.route('/:count').get(getRandomAcronyms);

module.exports = router;
