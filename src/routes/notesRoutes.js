const { Router } = require("express");
const NotesController = require("../Controller/NotesController");

const notesRoutes = Router();
const notesController = new NotesController();

notesRoutes.post("/:user_id", notesController.create);
notesRoutes.get("/:note_id", notesController.show);
notesRoutes.delete("/:note_id", notesController.delete);
notesRoutes.get("/", notesController.index);


module.exports = notesRoutes;