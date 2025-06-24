'use client';

import React from 'react';
import { X, Music } from 'lucide-react';

interface SpotifyLoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export default function LoginPopup({ isOpen, onClose, onLogin }: SpotifyLoginPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full mx-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <Music className="w-12 h-12 text-green-300" />
          </div>
          <h2 className="text-2xl font-bold text-slate-50 mb-2">Connect with Spotify</h2>
          <p className="text-slate-300">
            Log in with your Spotify account to create personalized playlists
          </p>
        </div>

        {/* Benefits */}
        <div className="mb-6">
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start">
              <span className="text-green-300 mr-2">•</span>
              Access your music preferences and listening history
            </li>
            <li className="flex items-start">
              <span className="text-green-300 mr-2">•</span>
              Create playlists directly in your Spotify account
            </li>
            <li className="flex items-start">
              <span className="text-green-300 mr-2">•</span>
              Get recommendations based on your taste
            </li>
          </ul>
        </div>

        {/* Login button */}
        <button
          onClick={onLogin}
          className="w-full bg-green-400 hover:bg-green-300 text-black font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <span>Continue with Spotify</span>
        </button>

        {/* Privacy note */}
        <p className="text-xs text-slate-400 text-center mt-4">
          We only access your public profile and music preferences. Your data is never shared.
        </p>
      </div>
    </div>
  );
}