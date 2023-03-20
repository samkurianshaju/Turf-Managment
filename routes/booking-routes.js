const express = require("express");
const {
  getAllBookings,
  addBooking,
  updateBooking,
  getById,
  deleteBooking,
  getUserBookings,
} = require("../controllers/booking-controllers");
const { verify } = require("../middlewares/jwt");
const Booking = require("../model/Booking");
const bookrouter = express.Router();
//const bookingController = require("../controllers/booking-controllers");

bookrouter.get("/bookings", getAllBookings);
bookrouter.post("/add", verify, addBooking);
bookrouter.put("/update/:id", updateBooking);
bookrouter.get("/:id", getById);
bookrouter.delete("/:id", deleteBooking);
bookrouter.get("/user/bookings", verify, getUserBookings);
// router.post("/", addBooking);

module.exports = bookrouter;
