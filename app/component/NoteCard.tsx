"use client";

import { useState } from "react";
import NoteForm from "./NoteForm";

type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};

type NoteCardProps = {
  note: Note;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: { title: string; content: string }) => void;
};

export default function NoteCard({
  note,
  onDelete,
  onUpdate,
}: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <NoteForm
        initialTitle={note.title}
        initialContent={note.content}
        submitText="Update Note"
        onSubmit={(data) => {
          onUpdate(note._id, data);
          setIsEditing(false);
        }}
      />
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold">{note.title}</h2>
      <p className="text-gray-700">{note.content}</p>

      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-400">
          {new Date(note.createdAt).toLocaleString()}
        </span>

        <div className="flex gap-3">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 text-sm"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(note._id)}
            className="text-red-500 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
