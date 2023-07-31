const router = require("express").Router();
// above we are requiring the express router so we can use it to create routes
const fs = require("fs");
// above we are requiring the fs module so we can read and write to the db.json file

// we need to make a get request to read the db.json file and return all saved notes as JSON
// read the db.json file
// parse the data
// return the data to the client
router.get("/", (req, res) => {
  res.sendFile("./db/db.json", (err, data) => {
    // Read the file
    if (err) {
      console.log(err);
      return res.status(500).send("Error reading notes");
    //   if there is an error reading the file, console log the error and return a 500 status code with a message
    }
    try {
        // parse file into an array
      const notes = JSON.parse(data);
      res.json(notes);
    } catch (err) {
        // if there is an error parsing the data, console log the error and return a 500 status code with a message
      console.log(err);
      return res.status(500).send("Error parsing notes");
    }
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
    notes.push(req.body);
    // write file
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error writing notes");
      }
      res.json(req.body);
    });
  });
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
