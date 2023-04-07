const express = require("express");
const {
  signup,
  login,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/users-controllers.js");

const { verify } = require("../middlewares/jwt");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verify, getUser);
router.delete("/user", verify, deleteUser);
router.put("/update/:id", updateUser);

module.exports = router;
