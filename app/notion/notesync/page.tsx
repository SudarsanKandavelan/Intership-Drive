"use client";

import { useEffect, useState } from "react";

interface Note {
  id: string;
  title: string;
  content: string;
}

export default function NotesyncPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("/api/notion/notesync");
        const data = await res.json();
        setNotes(data.notes ?? []);
        setFilteredNotes(data.notes ?? []);
      } catch (err) {
        console.error("Failed to load notes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleAddNote = () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: newTitle.trim(),
      content: newContent.trim(),
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    handleSearch(searchQuery, updatedNotes); // update filtered view
    setNewTitle("");
    setNewContent("");
  };

  const handleSearch = (query: string, sourceNotes: Note[] = notes) => {
    setSearchQuery(query);
    const lower = query.toLowerCase();
    const filtered = sourceNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(lower) ||
        note.content.toLowerCase().includes(lower)
    );
    setFilteredNotes(filtered);
  };

  return (
    <>
      <style>{`
        .notesync-container {
          max-width: 960px;
          margin: auto;
          padding: 32px;
          background-color:#DCA1A1;
          font-family: 'Times New Roman', Times, serif;
        }
        .notesync-title {
          font-size: 2.25rem;
          font-weight: bold;
          margin-bottom: 24px;
          font-family: 'Times New Roman', Times, serif;
        }
        .notesync-form {
          background: #EBBFBF;
          padding: 24px;
          border-radius: 8px;
          margin-bottom: 32px;
          border: 2px solid black;
        }
        .notesync-input,
        .notesync-textarea,
        .notesync-search {
          width: 100%;
          padding: 12px;
          background-color:#D58886;
          font-size: 20px;
          color:black;
          border: 1.8px solid black;
          margin-bottom: 12px;
          border-radius: 6px;
          box-sizing: border-box;
        }
        .notesync-button {
          padding: 10px 20px;
          background: #2e7d32;
          color: white;
          border: none;
          border-radius: 6px;
          font-size:20px;
          cursor: pointer;
        }
        .notesync-button:hover {
          background: #1b5e20;
        }
        .notesync-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        .notesync-card {
          background: #FBCDD3;
          border: 1px solid #ddd;
          padding: 16px;
          border-radius: 8px;
          transition: box-shadow 0.3s ease;
          border: 2px solid black;
        }
        .notesync-card:hover {
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .notesync-card-title {
          font-weight: bold;
          margin-bottom: 8px;
          font-size: 1.1rem;
        }
        .notesync-card-content {
          color: black;
          font-size: 1rem;
          white-space: pre-wrap;
        }
        .back-div-note{
            
            background-color: white;
            margin-left:2%;
        }
        .back-btn-note{
          margin-top: 25px;
  border: 2px solid black;
  width:150px;
  height:50px;
  border-radius: 25px;
  background-color: darkslateblue;
  color:white;
  font-family: 'Times New Roman', Times, serif;
  
  font-size: 20px;
        }
        }
      `}</style>
      <div className='back-div-note'>
        <button className="back-btn-note">
          <a href="http://localhost:3000">
            &laquo; Go Back
          </a>
        </button>
      </div>
      <div className="notesync-container">
        <h1 className="notesync-title">🗒️ Notesync</h1>

        {/* 🔍 Search Field */}
        <input
          className="notesync-search"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />

        {/* ➕ Add Note Form */}
        <div className="notesync-form">
          <h2>Add a New Note</h2>
          <input
            className="notesync-input"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            className="notesync-textarea"
            placeholder="Content"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            rows={4}
          />
          <button className="notesync-button" onClick={handleAddNote}>
            Add Note
          </button>
        </div>

        {/* 📄 Notes List */}
        {loading ? (
          <p>Loading notes...</p>
        ) : filteredNotes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          <div className="notesync-grid">
            {filteredNotes.map((note) => (
              <div key={note.id} className="notesync-card">
                <h3 className="notesync-card-title">{note.title}</h3>
                <p className="notesync-card-content">{note.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
