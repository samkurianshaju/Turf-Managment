const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    slot: {
      type: Number,
      required: false,
    },
  },
  {
    unique: {
      fields: ["bookingDate", "slot"],
    },
  }
);
bookingSchema.index({ bookingDate: 1, slot: 1 }, { unique: true });
module.exports = mongoose.model("Booking", bookingSchema);
