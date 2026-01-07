import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Note from "@/app/models/Note";

interface CreateNoteBody {
  title: string;
  content: string;
}

// get notes
const getNotes = async (): Promise<NextResponse> => {
  try {
    await connectDB();

    const notes = await Note.find().sort({ createdAt: -1 });

    return NextResponse.json(notes, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ error, status: 500 });
  }
};

// create notes
const createNotes = async (req: Request): Promise<NextResponse> => {
  try {
    const body: CreateNoteBody = await req.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const note = await Note.create({ title, content });

    return NextResponse.json(note, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error, status: 500 });
  }
};

export const GET = getNotes;
export const POST = createNotes;
