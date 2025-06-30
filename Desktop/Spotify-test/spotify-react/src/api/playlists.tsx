export async function fetchPlaylists(token: string): Promise<any> {
  const result = await fetch("https://api.spotify.com/v1/me/playlists?limit=5", {
      headers: { Authorization: `Bearer ${token}` }
  });

  const data = await result.json();
  if (!result.ok) throw new Error(data.error?.message || "Failed to fetch playlists");
  return data;
}
