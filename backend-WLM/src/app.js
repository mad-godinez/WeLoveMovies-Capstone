require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

/***** enables CORS from any website *****/ 
const cors = require("cors"); 
app.use(cors());
/**********/

/***** ROUTES *****/
const reviewsRouter = require('./reviews/reviews.router.js');
app.use('/reviews', reviewsRouter);

const moviesRouter = require('./movies/movies.router');
app.use('/movies', moviesRouter);

const theatersRouter = require('./theaters/theaters.router');
app.use('/theaters', theatersRouter);

/***** ERROR HANDLERS *****/
const notFound = require('./errors/notFound')
app.use(notFound);

const errorHandler = require('./errors/errorHandler')
app.use(errorHandler);


module.exports = app;
