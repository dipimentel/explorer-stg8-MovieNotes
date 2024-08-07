const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth");

function ensureAuthenticated(req, res, next) {
   const tokenHeader = req.headers.authorization;

   if (!tokenHeader) {
      throw new AppError("O token não foi informado");
   }

   const [, token] = tokenHeader.split(" ");

   try {
      const { user_id } = jwt.verify(token, authConfig.jwt.secretKey);

      req.user = {
         id: Number(user_id)
      }

      return next();
   
   } catch {
      throw new AppError("O token informado não é válido", 401)
   }
   
}

module.exports = ensureAuthenticated;