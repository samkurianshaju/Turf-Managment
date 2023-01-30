const express= require("express");
const Booking = require("../model/Booking");
const router = express.Router();
const bookingController = require("../controllers/booking-controllers");

router.post("/",bookingController.addBooking);

module.exports = router;