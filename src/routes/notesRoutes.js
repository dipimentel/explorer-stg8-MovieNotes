const { Router } = require("express");
const NotesController = require("../Controller/NotesController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const notesRoutes = Router();
const notesController = new NotesController();

notesRoutes.post("/", ensureAuthenticated, notesController.create);
notesRoutes.get("/:note_id", ensureAuthenticated, notesController.show);
notesRoutes.delete("/:note_id", ensureAuthenticated, notesController.delete);
notesRoutes.get("/", ensureAuthenticated, notesController.index);


module.exports = notesRoutes;