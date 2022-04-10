const express = require("express");
const router = express.Router();
const notAllowedMethod = require('../errors/methodNotAllowed');
const controller = require('./theaters.controller');

router.route('/')
  .get(controller.list) 
  .all(notAllowedMethod);

module.exports = router;