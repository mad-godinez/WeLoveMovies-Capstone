const mapProperties = require("../utils/map-properties");
const knex = require('../db/connection.js');

/*
REQUEST:  GET /reviews/:reviewId
RESPONSE: This route will return a single review by ID.
METHOD:   function searchReviews(reviewId)
*/
function searchReviews(reviewId){
  return knex("reviews")
    .where("reviews.review_id", reviewId)
    .select("*")
    .first();
}
/*
REQUEST:  PUT /reviews/:reviewId
RESPONSE: This route will allow you to partially or fully update a review.
METHOD:   function updateReview(review) & addCritic
*/
const addCritic = mapProperties({
  organization_name: "critic.organization_name",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
});
async function updateReview(review){
  await knex("reviews as r")
    .select("r.*")
    .update(review)
    .where({"r.review_id": review.review_id});
  return await knex("reviews as r")   
    .leftJoin("critics as c", "r.critic_id", "c.critic_id")
    .where({"r.critic_id": review.critic_id})
    .first()
    .then(addCritic);
}
/*
REQUEST:  DELETE /reviews/:reviewId
RESPONSE: This route will delete a review by ID.
METHOD:   function destroyReview(movieId)
*/
function destroyReview(reviewId){
  return knex("reviews")
    .where({"reviews.review_id": reviewId})
    .del();
}

module.exports={ searchReviews, updateReview, destroyReview };