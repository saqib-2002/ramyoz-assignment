// models/Note.ts
import mongoose, { Schema, model, models } from "mongoose";

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Note = models.Note || model("Note", NoteSchema);
export default Note;
