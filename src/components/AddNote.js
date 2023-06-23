import React, { useContext, useState } from "react";
import noteContext from "../context/Notes/noteContext";

const AddNote = (props) => {
  let context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    // console.log(note)
    setNote({ title: "", description: "", tag: "" });
    props.setAlert(`Your note has been successfully Added `,"success")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container my-3">
        <h1>Add Your Note</h1>
        <form onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              minLength={5}
              required
              value={note.title}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="desctiption"
              className="form-control"
              id="description"
              minLength={5}
              required
              name="description"
              value={note.description}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              value={note.tag}
              name="tag"
              onChange={onChange}
            />
          </div>
          <button
            // disabled={note.title.length < 5 || note.description.length < 5}// this should'nt be done instead we can use onSubmit
            type="submit"
            className="btn btn-primary my-3"
            // onClick={handleClick}// this should'nt be done instead we can use onSubmit
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
