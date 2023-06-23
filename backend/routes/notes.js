const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");

// ROUTE 1 :Fetch a notes using :GET "/api/notes/fetchallnotes". No logign required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message); // displaying the error message in the console
    res.status(500).send("Internal Server error"); // sending the error code and the error message to the user
  }
});

// ROUTE 2 :Add a notes using :POST "/api/notes/addnote". No logign required
router.post(
  "/addnote",
  fetchUser,
  [
    // we have created a array to validate the field in the user schema
    body("title", "Enter a valid title").isLength({ min: 3 }), // applying the validation for the name
    body("description", "Description must be of atleast 5 characters").isLength(
      { min: 5 }
    ), // applying the validation for the email
  ],
  async (req, res) => {
    // if there are no errors , return bad request and the errors

    const errors = validationResult(req); // checking the validation results and then sending the error log as the status
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNotes = await notes.save();
      res.json(saveNotes);
    } catch (error) {
      console.error(error.message); // displaying the error message in the console
      res.status(500).send("Internal Server error"); // sending the error code and the error message to the user
    }
  }
);

// ROUTE 3 :Update a notes using :PUT "/api/notes/updatenote/:id". No logign required
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  // if there are no errors , return bad request and the errors
  try {
    const { title, description, tag } = req.body;
    const newnote = {};
    if (title) {
      newnote.title = title;
    }
    if (description) {
      newnote.description = description;
    }
    if (tag) {
      newnote.tag = tag;
    }

    let notes = await Notes.findById(req.params.id); // checking if the note with the given id , sent with the parameters does exists in the database

    if (!notes) {
      return res.status(404).send("Not found");
    }

    if (req.user.id !== notes.user.toString()) {
      // here we are using the id sent fetchUser funciton  of  the logedin user to compare it with the user id saved in the notes and then allow it ot update the notes
      return res.status(401).send("Not Allowed");
    }

    notes = await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
    res.json(notes);
  } catch (error) {
    console.error(error.message); // displaying the error message in the console
    res.status(500).send("Internal Server error"); // sending the error code and the error message to the user
  }
});


// ROUTE 3 :Delete a notes using :DELETE "/api/notes/deletenote/:id". No logign required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  // if there are no errors , return bad request and the errors
  try {

    let notes = await Notes.findById(req.params.id); // checking if the note with the given id , sent with the parameters does exists in the database
    if (!notes) {
      return res.status(404).send("Not found");
    }

    if (req.user.id !== notes.user.toString()) {
      // here we are using the id sent fetchUser funciton  of  the logedin user to compare it with the user id saved in the notes and then allow it ot update the notes
      return res.status(401).send("Not Allowed");
    }

    notes = await Notes.findByIdAndDelete(req.params.id);
    res.send({"Success":"Your note has been deleted successfully",notes:notes});
  } catch (error) {
    console.error(error.message); // displaying the error message in the console
    res.status(500).send("Internal Server error"); // sending the error code and the error message to the user
  }
});

module.exports = router;
