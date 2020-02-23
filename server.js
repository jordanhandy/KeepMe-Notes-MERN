//jshint esversion:6
// Declare modules
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
mongoose.set("useFindAndModify", false);
// Declare static port for dev testing
let port = process.env.PORT || 3001;

const app = express();

// Parsers
app.use(express.json());

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// Declare public folder for assets
app.use(express.static(path.join(__dirname, 'client/build')));

// Connect Mongoose
// Remove deprecation warnings.  Uncomment line 32, and comment line 33 for dev testing
// mongoose.connect("mongodb://localhost:27017/noteDB", {
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
});
// Create db item Schema
const noteSchema = new mongoose.Schema({
  title: String,
  content: String
});
// Mongoose  post Model
const Note = mongoose.model("Note", noteSchema);

// Routes
// Find all items
app.get("/get", (req, res) =>
  Note.find({}, function(err, notes) {
    if (!err) {
      res.json(notes);
    } else {
      console.log(err);
    }
  })
);

// Create new note
app.post("/create", (req, res) => {
  const note = new Note({ title: req.body.title, content: req.body.content });
  note.save();
  res.json({ succes: "true" });
});

// Delete a given note, based on it's ObjectID
app.delete("/delete", (req, res) => {
  console.log("request got " + req.body.noteID);
  Note.findByIdAndRemove(req.body.noteID, function(err) {
    if (!err) {
      console.log("succesfully deleted");
    }
  });

  res.json({ succes: "true" });
});

if (process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
//Serve static files for initial run
// app.get("*", (req, res) => {
//   res.sendfile(path.join(__dirname = 'client/build/index.html'));
// });
}

// Listen on static port, or ENV port if in production
app.listen(process.env.PORT || port, function() {
  console.log("Server started on port " + port);
});