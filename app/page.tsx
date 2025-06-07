'use client'
import { useRouter } from 'next/navigation'; // ✅ Import this
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const handleToDo = () => {
    router.push('/users');
  };
  const handleNoteSync = () => {
    router.push('/notion/notesync');
  };
  const handleChatBot = () => {
    router.push('/chat');
  };

  return (
    <main>
      <div className="main">
        <div className="sub-div">
          <h1 className="h1-tag">Welcome!</h1>
          <p className="paragaraph">
            Stay organized and boost productivity with this simple and powerful to-do list app. Add tasks, mark them complete, and manage your day efficiently!
          </p>
        </div>
        <div className='center-div'>
          <div className='contents'>
            <p className='para-text'>
              A simple and efficient task management tool that lets users add, view, and manage daily to-dos. Built with a clean interface and fast interactions to boost productivity.
            </p>
            <button className="get-started-btn" onClick={handleToDo}>
           ToDo App
        </button>
          </div>
          <div className='contents'>
            <p className='para-text'>
              A mock notes integration system inspired by Notion. It allows users to search, add, and view notes in a beautifully organized layout — perfect for showcasing API handling and UI structuring.
            </p>
            <button className="get-started-btn" onClick={handleNoteSync}>
              Note Sync
            </button>
          </div>
          <div className='contents'>
            <p className='para-text'>
              An interactive chatbot powered by Google Gemini AI, capable of having natural, emoji-rich conversations. Features live typing, avatars, auto-focus input, and modern UI animations.
            </p>
            <button className="get-started-btn" onClick={handleChatBot}>
          Chat Bot
        </button>
          </div>
        </div>

        
      </div>
    </main>
  );
}

