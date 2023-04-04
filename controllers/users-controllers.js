const bcrypt = require("bcryptjs");
const User = require("../model/User");
const { signJwt } = require("../middlewares/jwt");

const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find(); //await is used for waiting
  } catch (err) {
    console.log(err);
    throw err;
  }
  if (!users) {
    return res.status(400).json({ message: "No records found" });
  }
  return res.status(200).json({ users });
};

const getUser = async (req, res, next) => {
  let email = req.user.email;
  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    throw err;
  }
  if (!user) {
    return res.status(400).json({ message: "No records found" });
  }
  return res.status(200).json({ user });
};
/*
const getById = async(req,res,next) =>{
   const id = req.params.id; //colllect id from url
   let user;
   try{
      user = await User.findById(id);
   }catch (err){
      console.log.apply(err);
      throw err;
   }
   if(!user){
      return res.status(400).json({message:"User not found"})
   } 
   return res.status(200).json({ user });
}
*/
const signup = async (req, res, next) => {
  const { name, age, email, phone, password } = req.body;
  let exisitingUser;
  try {
    exisitingUser = await User.findOne({ email });
  } catch (err) {
    return err;
  }
  if (exisitingUser) {
    return res.status(400).json({ message: "User Already Exist" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    age,
    email,
    phone,
    password: hashedPassword,
    bookings: [],
  });
  try {
    await user.save();
  } catch (err) {
    return err;
  }
  return res.status(201).json({ user });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let exisitingUser;
  try {
    exisitingUser = await User.findOne({ email });
  } catch (err) {
    return err;
  }
  if (!exisitingUser) {
    return res.status(404).json({ message: "User not found !" });
  }
  const isPasswordCorrect = bcrypt.compareSync(
    password,
    exisitingUser.password
  );
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  let accessToken = signJwt(
    { userId: exisitingUser._id, email: exisitingUser.email },
    "24h"
  );
  return res.status(200).json({ token: accessToken });
};
/*
const updateUser = async(req,res,next) =>
{
   const id = req.params.id; 
   const {name,age,gender,phone,password} = req.body
   let user;
   try{
      user = await User.findByIdAndUpdate(id,
         {
            name,
            age,
            gender,
            phone,
            password
         });

         user = await user.save();
      }catch (err){
      console.log.apply(err);
      throw err;
   }
   if(!user){
      return res.status(404).json({message:"Unable to update by this Id"}); 
   } 
   return res.status(201).json({user});
}
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.getAllUser = getAllUser;
exports.getById = getById;*/

const deleteUser = async (req, res, next) => {
  let email = req.user.email;
  let user;
  try {
    user = await User.findOneAndDelete({ email });
  } catch (err) {
    return err;
  }
  if (!user) {
    return res.status(404).json({ message: "Unable to delete user" });
  }
  return res.status(201).json({ message: "User Deleted Successfully" });
};

const updateUser = async (req, res, next) => {
  const { name,age,phone,email } = req.body;
  const userid = req.params.id;
  let user;
  try {
    user = await user.findByIdAndUpdate(userid, {
      name,
      age,
      phone,
      email,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unable to update" });
  }
  return res.status(200).json({ user });
};
module.exports = {
  signup,
  login,
  getUser,
  deleteUser,
  updateUser,
};