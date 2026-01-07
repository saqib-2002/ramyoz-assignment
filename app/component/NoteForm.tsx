"use client";

import { useState, useCallback, useRef } from "react";
import { NotePayload } from "../types/note";

type NoteFormProps = {
  onSubmit: (data: NotePayload) => void;
  initialTitle?: string;
  initialContent?: string;
  loading?: boolean;
  submitText?: string;
};

const NoteForm = ({
  onSubmit,
  initialTitle = "",
  initialContent = "",
  loading = false,
  submitText = "Add Note",
}: NoteFormProps) => {
  const [title, setTitle] = useState<string>(initialTitle);
  const [content, setContent] = useState<string>(initialContent);

  const errorRef = useRef<HTMLParagraphElement | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!title.trim() || !content.trim()) {
        if (errorRef.current) {
          errorRef.current.style.display = "block";
        }
        return;
      }

      if (errorRef.current) {
        errorRef.current.style.display = "none";
      }

      await onSubmit({
        title: title.trim(),
        content: content.trim(),
      });

      setTitle("");
      setContent("");
    },
    [title, content, onSubmit]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 mb-4 rounded shadow space-y-2"
    >
      <input
        type="text"
        className="w-full bg-zinc-200 p-2 mb-2 rounded outline-none"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full  p-2 mb-2 bg-zinc-200 rounded resize-none outline-none"
        placeholder="Content"
        rows={5}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <p ref={errorRef} className="hidden text-sm text-red-500">
        Please add a title and content before saving the note.
      </p>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-500"
      >
        {loading ? "Saving..." : submitText}
      </button>
    </form>
  );
};

export default NoteForm;
