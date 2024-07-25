const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middelware.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listing.js");

router.route("/")
//INDEX ROUTE TO SHOW ALL LISTINGS
.get(wrapAsync(listingController.index))
//ADD ROUTE
.post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.addNewListing))


//ADD NEW LISTING
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));


router.route("/:id")
//SHOW ROUTE
.get(wrapAsync(listingController.showListing))
//UPDATE ROUTE
.put(isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
//DELETE ROUTE
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing))


//EDIT ROUTE
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));



module.exports = router;