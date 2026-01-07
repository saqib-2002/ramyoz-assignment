import mongoose from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema: mongoose.Schema<INote> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Note: mongoose.Model<INote> =
  mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);
export default Note;
