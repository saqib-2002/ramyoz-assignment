import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Note from "@/app/models/Note";

// GET - fetch all notes
export async function GET() {
  try {
    await connectDB();
    const notes = await Note.find().sort({ createdAt: -1 });
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

// POST - create note
export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const note = await Note.create({ title, content });

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}
