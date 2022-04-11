const express = require("express");
const router = express.Router();
const controller = require('./movies.controller');
const notAllowedMethod = require('../errors/methodNotAllowed');

const cors = require("cors"); 
router.use(cors());

router.route('/:movieId/theaters')
  .get(controller.listTheaters) 
  .all(notAllowedMethod);

router.route('/:movieId/reviews')
  .get(controller.listReviews) 
  .all(notAllowedMethod);

router.route('/:movieId')
  .get(controller.read)  
  .all(notAllowedMethod);

router.route('/')
  .get(controller.listShowings)
  .get(controller.list)
  .all(notAllowedMethod);

module.exports = router;