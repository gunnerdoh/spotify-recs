// src/App.tsx
import { useEffect, useState } from "react";
import { redirectToAuthCodeFlow, getAccessToken } from "./auth/token";
import { fetchProfile } from "./api/profile";
import { fetchPlaylists, constructPlaylistObject } from "./api/playlists";
import { spotifyClientID } from "./config";
import type { PlaylistObject } from "./types";

const redirectUri = "http://127.0.0.1:5173/callback";

function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [playlistObjects, setPlaylistObjects] = useState<PlaylistObject[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const storedToken = localStorage.getItem("accessToken");
    const expiresAt = parseInt(localStorage.getItem("expiresAt") || "0");

    async function init() {
      if (storedToken && Date.now() < expiresAt) {
        setAccessToken(storedToken);
      } else if (code) {
        const { access_token, expires_in } = await getAccessToken(
          spotifyClientID,
          code,
          redirectUri
        );
        const expiresAt = Date.now() + expires_in * 1000;
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("expiresAt", expiresAt.toString());
        setAccessToken(access_token);
        window.history.replaceState({}, document.title, "/");
      } else {
        redirectToAuthCodeFlow(spotifyClientID, redirectUri);
      }
    }

    init();
  }, []);

  useEffect(() => {
    async function loadData() {
      if (!accessToken) return;

      const userProfile = await fetchProfile(accessToken);
      const playlists = await fetchPlaylists(accessToken);
      setProfile(userProfile);

      const constructed = await Promise.all(
        playlists.items.map((playlist: any) =>
          constructPlaylistObject(accessToken, playlist)
        )
      );

      setPlaylistObjects(constructed);
    }

    loadData();
  }, [accessToken]);

  return (
    <div className="p-4 text-black">
      {!profile ? (
        <div className="w-full h-screen flex items-center justify-center text-lg">
          Loading...
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold">User: {profile.display_name}</h2>
          <p><strong>ID:</strong> {profile.id}</p>
          <p>
            <strong>URI:</strong>{" "}
            <a
              href={profile.external_urls.spotify}
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.uri}
            </a>
          </p>

          <h3 className="text-xl mt-6 mb-4 font-semibold">Playlists & Tracks</h3>

          {playlistObjects.map((pl, index) => (
            <div key={index} className="mb-6 p-4 border rounded shadow">
              <h4 className="text-lg font-bold mb-2">{pl.name}</h4>
              <p><strong>Total Duration:</strong> {(pl.length / 60000).toFixed(2)} min</p>
              <p><strong>Average Popularity:</strong> {pl.popularity.toFixed(1)}</p>
              <ul className="mt-3 space-y-1">
                {pl.songs.map((song, i) => (
                  <li key={i} className="ml-4 list-disc">
                    <span className="font-semibold">{song.name}</span> by {song.artist} —
                    {(song.duration / 60000).toFixed(2)} min, Popularity: {song.popularity}, Released: {song.releaseDate}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;