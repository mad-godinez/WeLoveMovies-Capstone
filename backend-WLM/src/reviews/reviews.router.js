const express = require("express");
const router = express.Router();
const controller = require('./reviews.controller');
const notAllowedMethod = require('../errors/methodNotAllowed');

router.route('/:reviewId')
  .delete(controller.delete)
  .put(controller.update)
  .all(notAllowedMethod);

module.exports = router;