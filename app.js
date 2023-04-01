const express = require("express");
const mongoose = require("mongoose");
const adminRouter = require("./routes/admin-routes");
const userRouter = require("./routes/user-routes");
const bookingRouter = require("./routes/booking-routes");
const cors = require("cors");
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use("/", userRouter);
app.use("/", bookingRouter);
// app.use("/admin", adminRouter);
mongoose
  .connect( 
    "mongodb+srv://admin:bwRxey00wmoPccNb@cluster0.joqyn5s.mongodb.net/turfManagment?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

//fFsoWqMWkh3xxs3P!!