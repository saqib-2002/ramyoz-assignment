"use client";

import { useCallback, useState } from "react";
import NoteForm from "./NoteForm";
import { NotePayload, Note } from "../types/note";

type NoteCardProps = {
  note: Note;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: NotePayload) => void;
};

const NoteCard = ({ note, onDelete, onUpdate }: NoteCardProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleUpdate = useCallback(
    (data: NotePayload): void => {
      onUpdate(note._id, data);
      setIsEditing(false);
    },
    [note._id, onUpdate]
  );

  const handleDelete = useCallback((): void => {
    onDelete(note._id);
  }, [note._id, onDelete]);

  if (isEditing) {
    return (
      <NoteForm
        initialTitle={note.title}
        initialContent={note.content}
        submitText="Update Note"
        onSubmit={handleUpdate}
      />
    );
  }

  return (
    <div className="bg-white p-4 shadow">
      <h2 className="font-bold capitalize text-xl text-zinc-800">
        {note.title}
      </h2>
      <p className="text-zinc-600">{note.content}</p>

      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-zinc-500">
          {new Date(note.createdAt).toLocaleString()}
        </span>

        <div className="flex gap-3">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 text-md cursor-pointer hover:underline"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="text-red-600 text-md cursor-pointer hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
