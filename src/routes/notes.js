require("dotenv").config();
const express = require("express");
const router = new express.Router();
const auth = require("../middlewares/auth");
const Note = require("../models/Note");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

// fetch all notes
router.get("/getnotes", auth, async (req, res) => {
  try {
    const user_data = jwt.verify(
      req.cookies.auth_token,
      process.env.JWT_SECRET
    );

    const user_id = user_data._id;
    const notes = await Note.find({ user: user_id });

    if (notes.length !== 0) {
      res.status(200).send(notes);
    } else {
      res.status(404).send({ message: "No note found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

// fetch a single note
router.get("/getnotes/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    try {
      const user_data = jwt.verify(
        req.cookies.auth_token,
        process.env.JWT_SECRET
      );

      const user_id = user_data._id;

      const note = await Note.findOne({ _id: id, user: user_id });

      if (note.length !== 0) {
        res.status(200).send(note);
      } else if (note === null) {
        res.status(404).send({ error: "No note found" });
      }
    } catch (error) {
      res.status(404).send({ error: "no note found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

// add a note
router.post(
  "/addnote",
  auth,
  body("title").isLength({ min: 3 }),
  body("description").isLength({ min: 5 }),
  async (req, res) => {
    const { title, description } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user_data = jwt.verify(
        req.cookies.auth_token,
        process.env.JWT_SECRET
      );

      const user_id = user_data._id;
      const note = new Note({
        title,
        description,
        date: new Date().toISOString(),
        user: user_id,
      });

      note.save();
      res.status(201).send({ message: "Note created successfully" });
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  }
);

// update a note
router.patch("/updateNote/:id", auth, async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  try {
    const user_data = jwt.verify(
      req.cookies.auth_token,
      process.env.JWT_SECRET
    );

    const user_id = user_data._id;

    const note = await Note.updateOne(
      { _id: id, user: user_id },
      { title, description }
    );
    res.status(201).send({ message: "Note updated successfully" });
  } catch (error) {
    res.status(500).send({ erorr: "Internal server error" });
  }
});

// delete a note
router.delete("/deletenote/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    try {
      const user_data = jwt.verify(
        req.cookies.auth_token,
        process.env.JWT_SECRET
      );

      const user_id = user_data._id;

      const note = await Note.deleteOne({ _id: id, user: user_id });
      res.status(201).send({ message: "Note deleted successfully" });
    } catch (error) {
      res.status(404).send({ error: "Note not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;
