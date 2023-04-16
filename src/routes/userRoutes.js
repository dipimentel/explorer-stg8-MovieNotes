const { Router } = require("express");
const UserController = require("../Controller/UserController")

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", userController.create);
userRoutes.put("/:id", userController.update);

module.exports = userRoutes;