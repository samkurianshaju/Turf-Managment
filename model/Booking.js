const mongoose=require('mongoose');

const Schema =  mongoose.Schema;

const bookingSchema = new Schema({
   user:{
      type:mongoose.Types.ObjectId,
      ref:'User',
      required: true,
   },
   bookingDate:{
      type:Date,
      required: true,
   },
   start_time:{
      type:Date,
      required: true,
   },
   end_time:{
      type:Date,
      required: true,
   },
});
module.exports = mongoose.model("Booking", bookingSchema);