const mongoose=require('mongoose');

const Schema =  mongoose.Schema;

const bookingSchema = new Schema({
   name:{
      type: String,
      required: true
   },
   age: {
      type: Number,
      required: true
   },
   gender: {
      type: String,
      required: true
   }
})

module.exports = mongoose.model("Booking", bookingSchema);