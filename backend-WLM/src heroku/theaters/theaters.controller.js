const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const theaterService = require('./theaters.service');


/***** CRUDL *****/
async function list(req, res){
  res.json({data: await theaterService.list() })
}

module.exports={
  list: asyncErrorBoundary(list),
}