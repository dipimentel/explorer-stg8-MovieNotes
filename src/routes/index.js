const { Router } = require("express");
const userRoutes = require("./userRoutes");
const notesRoutes = require("./notesRoutes");
const tagsRoutes = require("./tagsRoutes")

const router = Router();

router.use("/user", userRoutes);
router.use("/notes", notesRoutes);
router.use("/tags", tagsRoutes)

module.exports = router;