const Booking= require("../model/Booking");

const addBooking = async(req,res,next) =>{
   const {name,age,gender} = req.body
   let booking;
   try   
   {
      booking = new Booking({
         name,
         age,
         gender
      });
      await booking.save();
   } catch (err) {
      console.log(err);
   }
   if(!booking){
      return res.status(500).json({message:"Unable to add"})
   } 
   return res.status(201).json({booking});
}

exports.addBooking=addBooking;