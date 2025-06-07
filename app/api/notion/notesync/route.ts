import { NextResponse } from "next/server";
import { listNotes } from "@/packages/integrations/notion/notesync/notesync.functions";

export async function GET() {
  try {
    const notes = await listNotes();
    return NextResponse.json({ notes });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 400 });
    }
  }
}
