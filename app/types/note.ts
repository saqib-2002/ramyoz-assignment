export interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface NotePayload {
  title: string;
  content: string;
}
