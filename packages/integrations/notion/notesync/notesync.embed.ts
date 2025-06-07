// packages/integrations/notion/notesync/notesync.embed.ts

/**
 * This could be a render function for embedding notes in a dashboard.
 * For now, it's just a placeholder for embed support.
 */
export function renderNotes(notes: Array<{ id: string; title: string }>) {
  return notes.map((note) => `<div><strong>${note.title}</strong></div>`).join("");
}
