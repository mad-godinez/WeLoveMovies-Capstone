const mapProperties = require("../utils/map-properties");
const knex = require("../db/connection");

/*
REQUEST:  GET /movies/:movieId/reviews
RESPONSE: This route returns all all the reviews for the movie,
          including all the critic details added to a critic key of the review.
METHOD:   function findReviewsForMovie(movieId),addCriticToReviews(movieId), & addCritic
*/
const addCritic = mapProperties({
  organization_name: "critic.organization_name",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
});
async function findReviewsForMovie(movieId){
   return await knex("movies as m")
    .join("reviews as r", "m.movie_id","r.movie_id")
    .where({"r.movie_id": movieId});
}
async function addCriticToReviews(movieId){
  const reviews = Object.values(await findReviewsForMovie(movieId));
  let critic_reviews = [];
  
  for(let i=0; i<reviews.length; i++){       //allows iteration & use of first() for proper
   let id = reviews[i].critic_id;            // query with addCritic
   let critic = await knex("critics as c")
    .where({"c.critic_id": id})
    .first()
    .then(addCritic);
    
    critic_reviews[i] = {...reviews[i],...critic}; // combining the results from this route's queries
  }
  return critic_reviews;
}


/*
REQUEST:  GET /movies/:movieId/theaters
RESPONSE: This route returns all the theaters where the movie is playing.
METHOD:   function findTheatersForMovie(movieId)
*/
async function findTheatersForMovie(movieId){
  return await knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id","mt.movie_id")
    .where({"mt.movie_id": movieId})
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .where({"mt.is_showing": true})
    .select("t.*","mt.is_showing","m.movie_id");
}

/*
REQUEST:  GET /movies/:movieId
RESPONSE: This route will return a single movie by ID(movieId).
METHOD:   function searchMovies(movieId)
*/
async function searchMovies(movieId){
  return await knex("movies")
    .where("movies.movie_id", movieId)
    .select("*")
    .first();
}
/*
REQUEST:  GET /movies?is_showing=true
RESPONSE: the route should return only those movies where
          the movie is currently showing in theaters.
METHOD:   function listShowings()
*/
async function listShowings(){
  return await knex("movies as m")
    .join("movies_theaters as mt","m.movie_id","mt.movie_id")
    .where({"mt.theater_id": 4})
    .where({"mt.is_showing": true})
    .select("m.*");
}
/*
REQUEST:  GET /movies
RESPONSE: This route will return a list of all movies
METHOD:   function list()
*/
async function list() {
  return await knex("movies").select("*");
}

module.exports={ listShowings, list, searchMovies, addCriticToReviews,
                  findTheatersForMovie, findReviewsForMovie }; 