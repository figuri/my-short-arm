const router = require('express').Router();
// we need to make a get request to read the db.json file and return all saved notes as JSON

router.get("", (req, res) => {
    res.sendFile();
    // check current notes
});

// we need to make a post request to receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
router.post("", (req, res) => {
    res.sendFile();
    // Read the file
    // parse file into an array
    // push new note into array
    // write file
});
// make a route to delete a note based on the id of the note
router.delete("", (req, res) => {
    res.sendFile();
    // Read the file
    // parse file into an array
    // filter out the note with the id that was passed in
    // write file
});
module.exports = router;