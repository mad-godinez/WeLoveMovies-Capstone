const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const movieService = require('./movies.service');

/***** VALIDATION *****/
async function movieExists(req, res, next){
  const movieId = Number(req.params.movieId);
  const foundMovie = await movieService.searchMovies(movieId);
  if (foundMovie){
    res.locals.movie = foundMovie;
    next();
  } else next({status:404, message:"Movie cannot be found."});
}
function isQuery(req, res, next){ // ensures the route request goes to the correct function
  if(!!req.query.is_showing)
    next();
  else list(req, res);
}

/***** MISC MIDDLEWARE *****/
async function listShowings(req, res, next){
  if(!!req.query.is_showing)
   res.json({data: await movieService.listShowings() })
   
  else next({status:404, message:"No showings were found."});
}

async function listTheaters(req, res, next){
  const movieId = res.locals.movie.movie_id;
  res.json({data: await movieService.findTheatersForMovie(movieId)})
}

async function listReviews(req, res, next){
  const movieId = res.locals.movie.movie_id;
  res.json({data: await movieService.addCriticToReviews(movieId)})
}

/***** CRUDL *****/
async function list(req, res){
   res.json({data: await movieService.list() })
}
async function read(req, res){
  res.json({data: res.locals.movie});
}

module.exports={
  listShowings:[isQuery, asyncErrorBoundary(listShowings)],
  listTheaters: [movieExists, asyncErrorBoundary(listTheaters)],
  listReviews: [movieExists, asyncErrorBoundary(listReviews)],
  read: [movieExists, asyncErrorBoundary(read)],
  list: asyncErrorBoundary(list)
}