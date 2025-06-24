'use client';

import React, { useState } from 'react';
import { Send, Music, User, Info } from 'lucide-react';
import SpotifyLoginPopup from './login-popup'; // Fixed import - use proper component name
import { initiateSpotifyLogin } from './utils/spotify-auth' // adjust path as needed

export default function PlaylistApp() {
  const [inputText, setInputText] = useState('');
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [previousChats] = useState([
    {
      id: 1,
      prompt: "Create a playlist for a dinner party with my family, age ranges from 12 to 80, 90s-2000s soft rock and indie",
      response: "Here's your family dinner playlist with cross-generational appeal featuring soft rock and indie hits from the 90s-2000s"
    },
    {
      id: 2,
      prompt: "I need workout music, high energy electronic and hip-hop",
      response: "Created an energizing workout playlist with electronic beats and motivating hip-hop tracks"
    }
  ]);

  const handleSubmit = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Submitted:', inputText);
    setInputText('');
  };

  const handleSpotifyLogin = () => {
    setShowLoginPopup(false);
    initiateSpotifyLogin();
  };
  

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-slate-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Music className="w-8 h-8 text-green-300" />
          <span className="text-xl font-bold text-green-300">Gemify</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <button className="text-green-300 hover:text-green-200 transition-colors flex items-center space-x-1">
            <Info className="w-4 h-4" />
            <span>About</span>
          </button>
          
          <button 
            className="bg-green-300 text-slate-950 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors flex items-center space-x-2 font-medium"
            onClick={() => setShowLoginPopup(true)}
          >
            <User className="w-4 h-4" />
            <span>Log In</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-6 pb-6">
        {/* Previous Chats */}
        <div className="flex-1 max-w-4xl mx-auto w-full py-8">
          <div className="space-y-6">
            {previousChats.map((chat) => (
              <div key={chat.id} className="space-y-3">
                <div className="bg-slate-800 rounded-lg p-4 ml-auto max-w-3xl">
                  <p className="text-slate-50">{chat.prompt}</p>
                </div>
                <div className="bg-slate-700 rounded-lg p-4 mr-auto max-w-3xl">
                  <p className="text-slate-50">{chat.response}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Section */}
        <div className="max-w-4xl mx-auto w-full">
          <div className="relative">
            <div className="flex items-center bg-slate-700 rounded-lg shadow-lg">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Describe your ideal playlist... (e.g., 'Create a playlist for a dinner party with my family, age ranges from 12 to 80, 90s-2000s soft rock and indie')"
                className="flex-1 bg-transparent text-slate-50 placeholder-slate-400 px-6 py-4 focus:outline-none text-lg"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(e);
                  }
                }}
              />
              <button
                onClick={handleSubmit}
                className="bg-green-300 text-slate-950 p-3 m-2 rounded-lg hover:bg-green-200 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <p className="text-slate-400 text-sm text-center mt-3">
            Describe your mood, occasion, genres, or any specific requirements for your perfect playlist
          </p>
        </div>
      </main>

      {/* Login Popup */}
      <SpotifyLoginPopup 
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        onLogin={handleSpotifyLogin}
      />
    </div>
  );
}