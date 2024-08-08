const path = require("path");
const multer = require("multer");

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

const STORAGE = {
   storage: multer.diskStorage({
      destination: function(req, file, cb) {
         cb(null, TMP_FOLDER)
      },
      filename: function(req, file, cb) {
         cb(null, `${Date.now()}-${file.originalname}`)
      }
   })
}

module.exports = {
   TMP_FOLDER,
   UPLOADS_FOLDER,
   STORAGE
}