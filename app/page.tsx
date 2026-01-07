"use client";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import NoteForm from "./component/NoteForm";
import NoteCard from "./component/NoteCard";
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} from "@/app/lib/api/notes";
import { Note, NotePayload } from "@/app/types/note";

const Home = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotes()
      .then(setNotes)
      .catch(() => toast.error("Failed to load notes"));
  }, []);

  const handleCreate = async (payload: NotePayload) => {
    try {
      setLoading(true);
      const newNote = await createNote(payload);
      setNotes((prev) => [newNote, ...prev]);
      toast.success("Note created");
    } catch {
      toast.error("Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, payload: NotePayload) => {
    try {
      const updated = await updateNote(id, payload);
      setNotes((prev) =>
        prev.map((note) => (note._id === id ? updated : note))
      );
      toast.success("Note updated");
    } catch {
      toast.error("Failed to update note");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted");
    } catch {
      toast.error("Failed to delete note");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl text-zinc-900 text-center font-bold mb-6">
          Notes App
        </h1>

        <NoteForm onSubmit={handleCreate} loading={loading} />

        <div className="space-y-4 mt-6">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
          {notes.length === 0 && (
            <p className="text-gray-500 text-center">
              No notes yet, create your first note.
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
