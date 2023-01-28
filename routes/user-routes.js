const express= require("express");
const User = require("../model/User");
const router = express.Router();
const usersController = require("../controllers/users-controllers");

router.get("/",usersController.getAllUser);
router.post("/",usersController.addUser);
router.get("/:id",usersController.getById);
router.put("/:id",usersController.updateUser);
router.delete("/:id",usersController.deleteUser);

module.exports = router;