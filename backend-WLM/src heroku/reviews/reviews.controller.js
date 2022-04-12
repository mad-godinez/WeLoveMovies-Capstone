const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const reviewService = require('./reviews.service');

/***** VALIDATION *****/
async function reviewExists(req, res, next){
  const reviewId = Number(req.params.reviewId);
  const foundReview = await reviewService.searchReviews(reviewId);
  if (foundReview){
    res.locals.review = foundReview;
    next();
  } else next({status:404, message:"Review cannot be found."});
}

/***** CRUDL *****/
async function update(req, res){
  let {score, content} = req.body.data;
  let existingReview = res.locals.review;
  let updatedReview = {
    ...existingReview, 
    "content": content,
    "score": score,
  };
  res.json({data: await reviewService.updateReview(updatedReview)});
}
async function destroy(req, res){
  await reviewService.destroyReview(res.locals.review.review_id);
  res.sendStatus(204);
}

module.exports={
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};