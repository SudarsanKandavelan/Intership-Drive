// packages/integrations/notion/notesync/notesync.functions.ts

/**
 * This function mocks the retrieval of notes from a service.
 * It returns a fixed list of 3 sample notes with custom content.
 * No filtering or query parameters are used here — it's static.
 */

export async function listNotes() {
  return [
    {
      id: "note-1",
      title: "Name",
      content: "Sudarsan K\n9035871101\nsudarsanktm03@gmail.com",
    },
    {
      id: "note-2",
      title: "Graduation",
      content: "B.E Computer Science and Engineering\nCGPA:8.39",
    },
    {
      id: "note-3",
      title: "Technical Skills",
      content: "Python, C, Basics of JavaScript\nHTML, CSS, JavaScript",
    },
    {
      id: "note-4",
      title: "Projects",
      content: "Credit Management System\nKivyMD APP for Online Purchase\ntkinter Desktop SuperMarket Interface",
    },
  ];
}
