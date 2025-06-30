import { useEffect, useState } from "react";
import { redirectToAuthCodeFlow, getAccessToken } from "./auth/token";
import { fetchProfile } from "./api/profile";
import { fetchPlaylists } from "./api/playlists";
import SpotifyProfile from "./components/SpotifyProfile";
import GeminiForm from "./components/GeminiForm";
import { spotifyClientID } from './config'

const redirectUri = "http://127.0.0.1:5173/callback";

function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [playlists, setPlaylists] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const storedToken = localStorage.getItem("accessToken");
    const expiresAt = parseInt(localStorage.getItem("expiresAt") || "0");

    async function init() {
      if (storedToken && Date.now() < expiresAt) {
        setAccessToken(storedToken);
      } else if (code) {
        const { access_token, expires_in } = await getAccessToken(spotifyClientID, code, redirectUri);
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
      if (accessToken) {
        const userProfile = await fetchProfile(accessToken);
        const userPlaylists = await fetchPlaylists(accessToken);
        setProfile(userProfile);
        setPlaylists(userPlaylists);
      }
    }

    loadData();
  }, [accessToken]);

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Spotify + Gemini App</h1>
      {profile && playlists ? (
        <>
          <SpotifyProfile profile={profile} playlists={playlists} />
          <GeminiForm />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
