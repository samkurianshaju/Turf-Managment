const { default: mongoose } = require("mongoose");
const Booking = require("../model/Booking");
const User = require("../model/User");

const getAllBookings = async (req, res, next) => {
  let bookings;
  try {
    bookings = await Booking.find().populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!bookings) {
    return res.status(404).json({ message: "No Bookings" });
  }
  return res.status(200).json({ bookings });
};

const addBooking = async (req, res, next) => {
  const email = req.user.email;
  const { bookingDate, start_time, end_time, slot } = req.body;
  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(400).json({ message: "unable to find user" });
  }
  let booking = new Booking({
    user,
    bookingDate,
    start_time,
    end_time,
    slot,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await booking.save({ session });
    user.bookings.push(booking);
    await user.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to book the slot" });
  }
  return res.status(200).json({ booking });
};

const updateBooking = async (req, res, next) => {
  const { bookingDate, slot } = req.body;
  const bookingid = req.params.id;
  let booking;
  try {
    booking = await Booking.findByIdAndUpdate(bookingid, {
      bookingDate,
      slot,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to update" });
  }
  return res.status(200).json({ booking });
};
const getById = async (req, res, next) => {
  const bid = req.params.id;
  let booking;
  try {
    booking = await Booking.findById(bid);
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(404).json({ message: "No Bookings" });
  }
  return res.status(200).json({ booking });
};
const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Booking.findByIdAndRemove(id).populate("user");
    await booking.user.bookings.pull(booking);
    await booking.user.save();
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Booking deleted successfully" });
};

const getUserBookings = async (req, res, next) => {
  const email = req.user.email;
  let userBookings;
  try {
    userBookings = await User.findOne({ email }).populate("bookings");
  } catch (err) {
    return console.log(err);
  }
  if (!userBookings) {
    return res.status(404).json({ message: "No bookings found" });
  }
  return res.status(200).json({ bookings: userBookings });
};

const getUserBookingsByDate = async (req, res, next) => {
  let dateTime = req.params.date;
  let date = dateTime.split("T")[0];
  const morning = date + "T00:00:00.000Z";
  const evening = date + "T23:59:59.000Z";
  const email = req.user.email;
  let userBookings;
  try {
    userBookings = await Booking.find({
      bookingDate: {
        $gte: new Date(morning),
        $lt: new Date(evening),
      },
    });
  } catch (err) {
    return console.log(err);
  }
  if (!userBookings) {
    return res.status(404).json({ message: "No bookings found" });
  }
  return res.status(200).json({ bookings: userBookings });
};
module.exports = {
  getUserBookings,
  addBooking,
  getAllBookings,
  updateBooking,
  getById,
  deleteBooking,
  getUserBookingsByDate,
};
