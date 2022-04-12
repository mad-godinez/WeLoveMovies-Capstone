const express = require("express");
const router = express.Router();
const controller = require('./reviews.controller');
const notAllowedMethod = require('../errors/methodNotAllowed');
const cors = require("cors"); 
router.use(cors());

router.route('/:reviewId')
  .delete(controller.delete)
  .put(controller.update)
  .all(notAllowedMethod);

module.exports = router;