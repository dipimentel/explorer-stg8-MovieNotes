const multer = require("multer");
const { Router } = require("express");
const uploadsConfig = require("../configs/uploads");

const UserController = require("../Controller/UserController")
const UserAvatarController = require("../Controller/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const userRoutes = Router();
const userController = new UserController();
const userAvatarController = new UserAvatarController();

const upload = multer( uploadsConfig.STORAGE );

userRoutes.post("/", userController.create);
userRoutes.put("/", ensureAuthenticated, userController.update);
userRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);

module.exports = userRoutes;