const express= require("express");
const { login } = require("../controllers/users-controllers");
const { signup } = require("../controllers/users-controllers");
const { getAllUser } = require("../controllers/users-controllers");
//const User = require("../model/User");
const router = express.Router();


router.get("/",getAllUser);
router.post("/signup",signup);
router.post("/login",login);

/*router.get("/:id",usersController.getById);
router.put("/:id",usersController.updateUser);
router.delete("/:id",usersController.deleteUser);*/

module.exports = router;