import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/Notes/noteContext";
import Notesitem from "./Notesitem";

const Notes = (props) => {
  let navigate = useNavigate();
  const ref = useRef(null);
  const refClose = useRef(null);
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if (localStorage.token) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({
    _id: "",
    title: "",
    description: "",
    tag: "",
  });
  const updateNote = (note) => {
    ref.current.click();
    setNote(note);
  };

  const handleClick = (e) => {
    e.preventDefault();
    props.showAlert(`Your note has been successfully Updated `,"success")
    setNote({
      _id: note._id,
      title: note.title,
      description: note.description,
      tag: note.tag,
    });
    editNote(note._id, note.title, note.description, note.tag);
    refClose.current.click();
    console.log(note);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="row my-3">
      <div>
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Launch static backdrop modal
        </button>

        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Update Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={note.title}
                      id="title"
                      minLength={5}
                      required
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
                      name="description"
                      minLength={5}
                      required
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
                </form>
              </div>
              <div className="modal-footer">
                <button
                  ref={refClose}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  disabled={
                    note.title.length < 5 || note.description.length < 5
                  }
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1>Your Notes</h1>
      <div className="container text-center">
        {notes.length === 0 && "No notes to display. Add notes"}
      </div>
      {notes.length !== 0 &&
        notes.map((note) => {
          return (
            <Notesitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>
          );
        })}
    </div>
  );
};

export default Notes;
