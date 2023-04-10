const express = require("express");
const {
  signup,
  login,
  getUser,
  deleteUser,
  updateUser,
  updatePassword,
  getAllUser,
} = require("../controllers/users-controllers.js");
const { verify } = require("../middlewares/jwt");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verify, getUser);
router.delete("/user", verify, deleteUser);
router.put("/update", verify, updateUser);
router.put("/updatepassword", verify, updatePassword);
router.get("/user/all", verify, getAllUser);

module.exports = router;
