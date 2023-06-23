import React, { useState } from "react";
import NoteContext from "./noteContext";
const host = "http://localhost:5000/api";
// import { useState } from "react";

// const NoteState=(props)=>{
//     const s1={
//         "name":"Aditya",
//         "class":"5b"
//     }
//     const [state, setstate] = useState(s1);
//     const update=()=>{
//         setTimeout(()=>{
//             setstate({
//                 "name":"Aditi",
//         "class":"29"
//             })
//         },3000)
//     }

// return(
//     <NoteContext.Provider value={{state,update}}>
//         {
//         props.children
//         }
//     </NoteContext.Provider>
// )
// }
// export default NoteState;

const NoteState = (props) => {
  // const initialNotes = [
  //   {
  //     _id: "63dbd0aa222502739bf00fd7",
  //     user: "63da8f2c27920690ebd49e6b",
  //     title: "mynote1",
  //     description: "this is a description about the note1",
  //     tag: "Nothing",
  //     date: "2023-02-02T15:03:06.362Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "63dbd0aa222502739bf00fdb",
  //     user: "63da8f2c27920690ebd49e6b",
  //     title: "mynote1",
  //     description: "this is a description about the note1",
  //     tag: "Nothing",
  //     date: "2023-02-02T15:03:06.741Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "63dbd0aa222502739bf00fdd",
  //     user: "63da8f2c27920690ebd49e6b",
  //     title: "mynote1",
  //     description: "this is a description about the note1",
  //     tag: "Nothing",
  //     date: "2023-02-02T15:03:06.914Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "63dc803bfe7e83d907b11fa2",
  //     user: "63da8f2c27920690ebd49e6b",
  //     title: "Funtion",
  //     description: "Function is this all about",
  //     tag: "Nothing",
  //     date: "2023-02-03T03:32:11.396Z",
  //     __v: 0,
  //   },
  // ];

  // const [notes, setNotes] = useState(initialNotes);
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    try {
      const url = host + "/notes/fetchallnotes";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token"),
        },
      });
      let json = await response.json();
      // console.log(json);
      setNotes(json);
    } catch (error) {
      console.log("Some error occoured while fetching the notes", error);
    }
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    try {
      const url = host + "/notes/addnote";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      let json = await response.json();
      // console.log(json);

      // let newNote = {
      //   _id: "63dbd0aa222502739bf00fd7",
      //   user: "63da8f2c27920690ebd49e6b",
      //   title: title,
      //   description: description,
      //   tag: tag,
      //   date: "2023-02-02T15:03:06.362Z",
      //   __v: 0,
      // };
      // setNotes(notes.concat(newNote));
      setNotes(notes.concat(json));
    } catch (error) {
      console.log("Some error occoured while Adding the note", error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      const url = host + "/notes/deletenote/" + id;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token"),
        },
      });
      let json = await response.json();
      console.log("your note has been deleted ", json);

      let newNote = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNote);
    } catch (error) {
      console.log("Some error occoured while deleting the note", error);
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      const url = host + "/notes/updatenote/" + id;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      let json = await response.json();
      console.log(json);
      let newNotes= JSON.parse(JSON.stringify(notes))

      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    } catch (error) {
      console.log("Some error occoured while Updating the note", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
