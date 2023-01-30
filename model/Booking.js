const mongoose=require('mongoose');

const Schema =  mongoose.Schema;

const bookingSchema = new Schema({
   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
   },
   bookingDate:{

   },
   bookingTimeFrom:{

   },
   bookingTimeTo:{

   },

});
module.exports = mongoose.model("Booking", bookingSchema);