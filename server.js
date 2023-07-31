// import node modules
// set up express app
// middleware for data processing
// routes to notes.html and homepage.html for serving the front end API calls

// import node modules
const express = require("express");
const fs = require("fs");
const path = require("path");

// set up express app
const app = express();
const PORT = 3000;
// above we are setting up the express app and setting the port to 3000

// middleware for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// above we are using extended: true to allow for nested objects in the urlencoded data
// and we are using express.json() to parse incoming requests with JSON payloads

app.use(express.static("public"));
// above we are using express.static to serve the static files in the public folder

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
// above we are using the get method to send the notes.html file to the client

app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});
// above we are using the get method to send the db.json file to the client

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/homepage.html"));
});
// above we are using the get method to send the index.html file to the client; we use the * wildcard to catch all other routes

app.listen(PORT, function () {
  console.log("App listening on http://localhost:" + PORT);
});
// above we are using the listen method to start the server and console log the port number

// now we will use the post method to add a new note to the db.json file with asyncronous actions and the fs module

app.post("/api/notes", async function (req, res) {
  let note = req.body;
  let notes = await fs.promises.readFile("./db/db.json", "utf8");
  // we use the await keyword to wait for the promise to resolve
  // once the promise resolves, we use the .readFile method to read the db.json file then we parse the data with JSON.parse
  // we then push the new note to the notes array and write the new array to the db.json file
  // we make a note.id property and set it equal to the length of the notes array to be used as the id for the note
  note.id = notes.length;
  notes = JSON.parse(notes);
  notes.push(note);
  await fs.promises.writeFile("./db/db.json", JSON.stringify(notes));
//   we then send the notes array to the client with the .json method after the file has been written to the db.json file
  res.json(notes);
});

// now we will use the delete method to delete a note from the db.json file with asyncronous actions and the fs module

app.delete("/api/notes/:id", async function (req, res) {
  let notes = await fs.promises.readFile("./db/db.json", "utf8");
  notes = JSON.parse(notes);
  notes = notes.filter((note) => note.id != req.params.id);
  await fs.promises.writeFile("./db/db.json", JSON.stringify(notes));
  res.json(notes);
});
