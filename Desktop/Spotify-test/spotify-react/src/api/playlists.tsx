import type { Song, PlaylistObject } from "../types";

export async function fetchPlaylists(token: string): Promise<any> {
  const res = await fetch("https://api.spotify.com/v1/me/playlists?limit=50", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || "Failed to fetch playlists");
  return data;
}

export async function constructPlaylistObject(
  token: string,
  playlist: any
): Promise<PlaylistObject> {
  const res = await fetch(
    `https://api.spotify.com/v1/playlists/${playlist.id}/tracks?limit=20`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || "Failed to fetch tracks");

  let totalLength = 0;
  let totalPopularity = 0;
  const songs: Song[] = [];

  for (const item of data.items) {
    const track = item.track;
    if (track) {
      const song: Song = {
        name: track.name,
        artist: track.artists[0].name,
        popularity: track.popularity,
        releaseDate: track.album.release_date,
        duration: track.duration_ms,
      };
      songs.push(song);
      totalLength += track.duration_ms;
      totalPopularity += track.popularity;
    }
  }

  return {
    name: playlist.name,
    songs,
    length: totalLength,
    popularity: songs.length ? totalPopularity / songs.length : 0,
  };
}
