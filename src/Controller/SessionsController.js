const knex = require("../database/knex/")
const AppError = require("../utils/AppError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth")

class SessionsController {
   async create(req, res) {
      const { email, password } = req.body;

      const user = await knex("users").where({ email }).first();

      if (!user) {
         throw new AppError("Usuário ou senha não correspondem.");
      }

      const verifyPassword = await bcrypt.compare(password, user.password);

      if (!verifyPassword) {
         throw new AppError("Usuário ou senha não correspondem.");
      }

      const { secretKey, expiresIn } = authConfig.jwt;

      const token = jwt.sign({user_id: user.id}, secretKey, {
         expiresIn
      })


      return res.json({user, token});
   }
}

module.exports = SessionsController;