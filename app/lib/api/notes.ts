import { NotePayload, Note } from "@/app/types/note";

const BASE_URL = "/api/notes";

export const fetchNotes = async (): Promise<Note[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
};

export const createNote = async (payload: NotePayload): Promise<Note> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
};

export const updateNote = async (
  id: string,
  payload: NotePayload
): Promise<Note> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
};

export const deleteNote = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete note");
};
