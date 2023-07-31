const express = require("express");
const fs = require("fs");
const path = require("path");
// get /notes
// get api/notes route
// Post api/notes route
// wildcard 
// delete route

// import node modules
// set up express app
// middleware for data processing
// routes to notes.html and homepage.html for serving the front end API calls

// import node modules
// set up express app
const app = express();
const PORT = 3000;
// above we are setting up the express app and setting the port to 3000

// middleware for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// above we are using express.static to serve the static files in the public folder
// above we are using extended: true to allow for nested objects in the urlencoded data
// and we are using express.json() to parse incoming requests with JSON payloads

app.listen(PORT, function () {
  console.log("App listening on http://localhost:" + PORT);
});
// above we are using the listen method to start the server and console log the port number