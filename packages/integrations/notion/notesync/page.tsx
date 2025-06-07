"use client";

import { useEffect, useState } from "react";

interface Note {
  id: string;
  title: string;
  content: string;
}

export default function NotesyncPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // New note form (future mock)
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/notion/notesync?maxResults=6&query=${query}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setNotes(data.data.notes); // assuming your API returns { notes: [...] }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [query]);

  const handleAddNote = () => {
    if (newTitle.trim() && newContent.trim()) {
      // Append to notes locally (mock only)
      setNotes((prev) => [
        ...prev,
        {
          id: `new-${Date.now()}`,
          title: newTitle,
          content: newContent,
        },
      ]);
      setNewTitle("");
      setNewContent("");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🗒️ Notion Notesync</h1>

      {/* 🔍 Search Bar */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search notes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-3 py-2 border rounded w-full"
        />
        <button
          onClick={fetchNotes}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Search
        </button>
      </div>

      {/* ➕ New Note Form */}
      <div className="p-4 border rounded bg-gray-50 space-y-3">
        <h2 className="font-semibold">Add a New Note (Mock)</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="search-input"
        />
        <textarea
          placeholder="Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className="px-3 py-2 border rounded w-full h-24"
        />
        <button
          onClick={handleAddNote}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Add Note
        </button>
      </div>

      {/* 🧠 Notes List */}
      {loading && <p>Loading notes...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-4 bg-white border rounded shadow hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg">{note.title}</h3>
            <p className="text-sm text-gray-700">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
