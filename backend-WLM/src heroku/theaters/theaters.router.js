const express = require("express");
const router = express.Router();
const notAllowedMethod = require('../errors/methodNotAllowed');
const controller = require('./theaters.controller');
const cors = require("cors"); 
router.use(cors());

router.route('/')
  .get(controller.list) 
  .all(notAllowedMethod);

module.exports = router;