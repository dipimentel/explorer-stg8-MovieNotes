const { Router } = require("express");
const userRoutes = require("./userRoutes");
const notesRoutes = require("./notesRoutes");
const tagsRoutes = require("./tagsRoutes");
const sessionsRoutes = require("./sessionsRoutes");

const router = Router();

router.use("/user", userRoutes);
router.use("/notes", notesRoutes);
router.use("/tags", tagsRoutes);
router.use("/session", sessionsRoutes);

module.exports = router;