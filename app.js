const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/user-routes');
const bookingRouter = require('./routes/booking-routes');
const cors = require('cors');
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use("/users",router)   //localhost:5000/users
app.use("/booking",bookingRouter) 

mongoose
.connect(
   "mongodb+srv://admin:87654321@cluster0.joqyn5s.mongodb.net/turfManagment?retryWrites=true&w=majority"
)
.then(() => console.log("Connected to database"))
 .then(() => {
   app.listen(5000)
 }).catch((err) => console.log(err));

//fFsoWqMWkh3xxs3P