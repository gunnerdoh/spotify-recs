export async function fetchProfile(token: string): Promise<any> {
  const result = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` }
  });

  const data = await result.json();
  if (!result.ok) throw new Error(data.error?.message || "Failed to fetch profile");
  return data;
}

