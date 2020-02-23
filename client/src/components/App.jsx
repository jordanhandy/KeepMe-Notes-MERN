import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  // Fetch routes are for calls back to Express server
  // Get all notes
  fetch("/get")
  .then(res=>res.json())
  .then(data=>setNotes(data));


  function addNote(newNote){

    // For creating a new note.
    // Delcare a JSON type in header, and Stringify the new note object
    fetch('/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newNote),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
  })
  // OLD,for Single Page React app with no persistence
  //setNotes((prevNotes)=>[...prevNotes,newNote]);
  }

  // function addNote(newNote) {
  //   setNotes(prevNotes => {
  //     return [...prevNotes, newNote];
  //   });
  // }

  function deleteNote(id) {
    // Call to Express to delete note
    // Stringify JSON
    fetch('/delete', {
      method: 'DELETE',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      // Item being passed in is only a string,
      // so stringify manually created object with Own key
      // (noteID)
      body: JSON.stringify({
        noteID: id
      })
    })
    .then((response) =>  response.json())
    .then(response =>{
      console.log("Deleted",response.message)
      return response
    })
    .then((data) => {
      console.log('Success:', data);
    });
  }


  // OLD,for Single Page React app with no persistence
  // function deleteNote(id) {
  //   setNotes(prevNotes => {
  //     return prevNotes.filter((noteItem, index) => {
  //       return index !== id;
  //     });
  //   });
  // }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            // set id to the _id of the object stored in mongo
            // For original app with no persistence, comment line 88 out, and replace with line 90
            id={noteItem._id}
            // For app with no persistence
            //id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
