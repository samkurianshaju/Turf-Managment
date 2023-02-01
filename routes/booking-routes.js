const express= require("express");
const { getAllBookings, addBooking, updateBooking, getById, deleteBooking, getByUserId } = require("../controllers/booking-controllers");
const Booking = require("../model/Booking");
const bookrouter = express.Router();
//const bookingController = require("../controllers/booking-controllers");

bookrouter.get("/",getAllBookings);
bookrouter.post("/add",addBooking);
bookrouter.put("/update/:id",updateBooking);
bookrouter.get("/:id",getById);
bookrouter.delete("/:id",deleteBooking);
bookrouter.get("/user/:id",getByUserId);
//router.post("/",addBooking);

module.exports = bookrouter;