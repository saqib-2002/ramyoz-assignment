import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Note from "@/app/models/Note";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(req: Request, { params }: Context) {
  try {
    const { id } = await params; // ✅ FIX HERE
    const data = await req.json();

    await connectDB();

    const updatedNote = await Note.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(_: Request, { params }: Context) {
  try {
    const { id } = await params; // ✅ FIX HERE

    await connectDB();
    await Note.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
}
