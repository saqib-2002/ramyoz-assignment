"use client";

import { useState, useEffect } from "react";

type NoteFormProps = {
  onSubmit: (data: { title: string; content: string }) => void;
  initialTitle?: string;
  initialContent?: string;
  loading?: boolean;
  submitText?: string;
};

export default function NoteForm({
  onSubmit,
  initialTitle = "",
  initialContent = "",
  loading = false,
  submitText = "Add Note",
}: NoteFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleSubmit = () => {
    if (!title || !content) return;
    onSubmit({ title, content });
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <input
        className="w-full border p-2 mb-2 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border p-2 mb-2 rounded"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Saving..." : submitText}
      </button>
    </div>
  );
}
