const { default: mongoose } = require("mongoose");
const Booking= require("../model/Booking");
const User = require("../model/User");

const getAllBookings = async(req,res,next) =>{
   let bookings;
   try{
   bookings = await Booking.find();
   }catch(err){
      return console.log(err);
   }
   if(!bookings){
      return res.status(404)
      .json({message:"No Bookings"});
   }
   return res.status(200)
   .json({bookings});
}

const addBooking = async(req,res,next) =>{
   const {user,bookingDate,start_time,end_time} = req.body;
   let exisitingUser;
   try{
      exisitingUser=await User.findById(user);      
   }catch(err){
      return console.log(err)
   }
   if(!exisitingUser){
      return res.status(400)
      .json({message:"unable to find user"});
   }
   let booking = new Booking({
      user,
      bookingDate,
      start_time,
      end_time,
   });
   try   
   {
      const session = await mongoose.startSession();
      session.startTransaction();
      await booking.save({session});
      exisitingUser.bookings.push(booking);
      await exisitingUser.save({session});
      await session.commitTransaction();
   } catch (err) {
      console.log(err);
      return res.status(500).json({message: err});
   }
   if(!booking){
      return res.status(500).json({message:"Unable to book the slot"})
   } 
   return res.status(200).json({booking});
}

const updateBooking = async(req,res,next)=>{
   const {bookingDate,start_time,end_time}=req.body;
   const bookingid=req.params.id;
   let booking;
   try{
      booking=await Booking.findByIdAndUpdate(bookingid,{
         bookingDate,
         start_time,
         end_time,
      });
   }catch(err){
      return console.log(err);
   }
   if(!booking){
      return res.status(500).json({message:"Unable to update"});
   }
   return res.status(200).json({booking});
}
const getById = async(req,res,next) =>{
   const bid = req.params.id;
   let booking;
   try{
   booking = await Booking.findById(bid)
   }catch(err){
      return console.log(err);
   }
   if(!booking){
      return res.status(404)
      .json({message:"No Bookings"});
   }
   return res.status(200)
   .json({booking});
};

 const deleteBooking = async(req,res,next) => {
   const id=req.params.id;
   let booking;
   try{
      booking=await Booking.findByIdAndRemove(id)
   }catch(err){
      return console.log(err);
   }
   if(!booking){
      return res.ststus(500)
      .json({message:"Unable to delete"});
   }
   return res.status(200)
   .json({message:"Booking deleted successfully"});
 };
exports.addBooking=addBooking;
exports.getAllBookings=getAllBookings;
exports.updateBooking=updateBooking;
exports.getById=getById;
exports.deleteBooking=deleteBooking;