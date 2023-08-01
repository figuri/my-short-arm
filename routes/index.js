const router = require("express").Router();
// above we are requiring the express router so we can use it to create routes
const notesRouter = require("./notes.js");
// above we are requiring the notes.js file so we can use the routes in that file
router.use("/notes", notesRouter);
// above we are using the use method to use the notesRouter for any routes that start with /notes
module.exports = router;