const express = require('express');
const mongoose = require('mongoose');
const bookrouter = require('./routes/booking-routes');
const router = require('./routes/user-routes');
const cors = require('cors')
const app = express();


//middleware
app.use(cors())
app.use(express.json());
/*app.use("/users",router);   //localhost:5000/users
app.use("/booking",bookingRouter); */
/*app.use("/api",(req,res,next)=>{
  res.send("Hello World");
})*/

app.use("/api/user", router);
app.use("/api/book", bookrouter); 
mongoose
.connect(
   "mongodb+srv://admin:87654321@cluster0.joqyn5s.mongodb.net/turfManagment?retryWrites=true&w=majority"
)
.then(() => app.listen(5000))
 .then(() => 
  console.log("Connected to database")
  )
 .catch((err) => console.log(err));

//fFsoWqMWkh3xxs3P