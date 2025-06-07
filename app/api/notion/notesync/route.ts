// ✅ API route returning 3 mock notes

import { NextResponse } from "next/server";
import { listNotes } from "@/packages/integrations/notion/notesync/notesync.functions";

export async function GET() {
  try {
    const notes = await listNotes();
    return NextResponse.json({ notes });
  } catch (error:unknown) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
