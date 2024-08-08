const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class UserAvatarController {
   async update(req, res) {
      const { id } = req.user;
      const file = req.file.filename;

      const diskStorage = new DiskStorage();

      const user = await knex("users").where({ id }).first();

      if (!user) {
         throw new AppError("Somente usuários logados podem alterar o avatar.", 401)
      }

      if (user.avatar) {
         diskStorage.deleteFile(user.avatar);
      }

      diskStorage.saveFile(file);
      user.avatar = file;

      await knex("users").where({ id }).update(user);

      return res.json(user);
   }
}

module.exports = UserAvatarController;