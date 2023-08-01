const router = require("express").Router();
// above we are requiring the express router so we can use it to create routes
const fs = require("fs");
// above we are requiring the fs module so we can read and write to the db.json file
const path = require("path");
const { v4: uuidv4 } = require("uuid");
// we need to make a get request to read the db.json file and return all saved notes as JSON
router.get("/", (req, res) => {
  // Read the file
  fs.readFile("./db/db.json", (err, data) => {
    // if there is an error, console log the error and return a 500 status code
    if (err) {
      console.log(err);
      return res.status(500).send("Error reading notes");
    }
    // if there is no error, parse the data and return it to the client
    res.json(JSON.parse(data));
  });
});

// we need to make a post request to receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
router.post("/", (req, res) => {
  // Read the file
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error reading notes");
    }
    // parse file into an array
    const notes = JSON.parse(data);
    // push new note into array
    req.body.id = uuidv4();
    notes.push(req.body);

    // write file with id number to reference later
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      // assing id to note

      // if there is an error, console log the error and return a 500 status code
      if (err) {
        console.log(err);
        return res.status(500).send("Error writing notes");
      }
      //   if there is no error, return the new note to the client
      res.json(req.body);
    });
  });
});

// make a route to delete a note based on the id of the note
router.delete("/", (req, res) => {
  // Read the file
  fs.readFile("./db/db.json", (err, data) => {
    // parse file into an array
    const notes = JSON.parse(data);
    // filter out the note with the id that was passed in
    const filteredNotes = notes.filter((note) => note.id !== req.body.id);
    // write file
    fs.writeFile("./db/db.json", JSON.stringify(filteredNotes), (err) => {
      // if there is an error, console log the error and return a 500 status code
      if (err) {
        console.log(err);
        return res.status(500).send("Error writing notes");
      }
    });
  });
});
module.exports = router;
