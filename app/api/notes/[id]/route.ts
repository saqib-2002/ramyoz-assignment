import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Note from "@/app/models/Note";

type RouteParams = {
  id: string;
};

type RouteContext = {
  params: Promise<RouteParams>;
};

interface UpdateNoteBody {
  title?: string;
  content?: string;
}

// update notes
const updateNote = async (
  req: Request,
  { params }: RouteContext
): Promise<NextResponse> => {
  try {
    const { id } = await params;
    const body: UpdateNoteBody = await req.json();

    await connectDB();

    const updatedNote = await Note.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedNote) {
      return NextResponse.json({ error: "Note not found", status: 404 });
    }

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ error, status: 500 });
  }
};

// delete notes
const deleteNotes = async (
  _: Request,
  { params }: RouteContext
): Promise<NextResponse> => {
  try {
    const { id } = await params;

    await connectDB();
    await Note.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json({ error, status: 500 });
  }
};

export const PUT = updateNote;
export const DELETE = deleteNotes;
