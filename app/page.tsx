"use client";

import { useEffect, useState } from "react";
import NoteForm from "./component/NoteForm";
import NoteCard from "./component/NoteCard";

type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // CREATE
  const createNote = async (data: { title: string; content: string }) => {
    setLoading(true);
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setLoading(false);
    fetchNotes();
  };

  // UPDATE
  const updateNote = async (
    id: string,
    data: { title: string; content: string }
  ) => {
    await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    fetchNotes();
  };

  // DELETE
  const deleteNote = async (id: string) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Notes App</h1>

        {/* Create */}
        <NoteForm onSubmit={createNote} loading={loading} />

        {/* List */}
        <div className="space-y-4">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onDelete={deleteNote}
              onUpdate={updateNote}
            />
          ))}

          {notes.length === 0 && (
            <p className="text-gray-500 text-center">No notes yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}
