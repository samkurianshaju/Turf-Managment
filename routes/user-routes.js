const express = require("express");
const {
  signup,
  login,
  getUser,
  deleteUser,
} = require("../controllers/users-controllers.js");

const { verify } = require("../middlewares/jwt");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verify, getUser);
router.delete("/user", verify, deleteUser);

module.exports = router;
