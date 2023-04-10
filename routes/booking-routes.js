const express = require("express");
const {
  getAllBookings,
  addBooking,
  updateBooking,
  getById,
  deleteBooking,
  getUserBookings,
  getUserBookingsByDate,
} = require("../controllers/booking-controllers");
const { verify } = require("../middlewares/jwt");
const Booking = require("../model/Booking");
const bookrouter = express.Router();
//const bookingController = require("../controllers/booking-controllers");

bookrouter.get("/bookings", getAllBookings);
bookrouter.post("/add", verify, addBooking);
bookrouter.put("/update/:id", verify, updateBooking);
bookrouter.get("/:id", verify, getById);
bookrouter.delete("/:id", verify, deleteBooking);
bookrouter.get("/user/bookings", verify, getUserBookings);
bookrouter.get("/user/bookings/:date", verify, getUserBookingsByDate);
bookrouter.get("/user/bookings/all", verify, getUserBookings);

module.exports = bookrouter;
