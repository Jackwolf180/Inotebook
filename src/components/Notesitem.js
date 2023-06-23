import React,{useContext} from "react";
import noteContext from "../context/Notes/noteContext";

const Notesitem = (props) => {
  const context = useContext(noteContext);
  let { deleteNote} = context;

  const { _id, title, description, tag } = props.note;
  return (
    <div className="card col-md-3 mx-5 my-3">
      <div className="card-body">
        <div className="d-flex align-items-center ">
          <h5 className="card-title">{title}</h5>
          <i
            className="fa-solid fa-trash d-flex justify-content-around mx-4"
            onClick={() => {
              deleteNote(_id);
              props.showAlert(`Your note has been successfully Deleted `,"danger")
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square d-flex justify-content-around mx-2"
            onClick={() => {
              props.updateNote(props.note);
            }}
          ></i>
        </div>
        <p className="card-text">{description}</p>
        <small className="text-muted">{tag}</small>
      </div>
    </div>
  );
};

export default Notesitem;
