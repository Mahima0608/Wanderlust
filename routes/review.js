const express = require("express");
const router = express.Router({ mergeParams:true }); //merges parent params with child
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn, isReviewOwner} = require("../middelware.js");

const reviewController = require("../controllers/review.js");

//post review route
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//delete review route
router.delete("/:reviewId",isLoggedIn, isReviewOwner, wrapAsync(reviewController.destroyReview));

module.exports = router;