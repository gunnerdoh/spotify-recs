export async function getAccessToken(
  clientId: string,
  code: string,
  redirectUri: string
): Promise<{ access_token: string; expires_in: number }> {
  const verifier = localStorage.getItem("verifier");
  if (!verifier) {
    throw new Error("Code verifier not found in localStorage.");
  }

  const params = new URLSearchParams({
    client_id: clientId,
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    code_verifier: verifier
  });

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params
  });

  const data = await result.json();
  if (!result.ok) throw new Error(data.error_description || "Token request failed");

  return {
    access_token: data.access_token,
    expires_in: data.expires_in
  };
}


export function redirectToAuthCodeFlow(clientId: string, redirectUri: string) {
  const verifier = generateCodeVerifier(128);
  generateCodeChallenge(verifier).then(challenge => {
      localStorage.setItem("verifier", verifier);

      const params = new URLSearchParams({
          client_id: clientId,
          response_type: "code",
          redirect_uri: redirectUri,
          scope: "user-read-private user-read-email playlist-read-private",
          code_challenge_method: "S256",
          code_challenge: challenge
      });

      window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  });
}

// Utility functions
function generateCodeVerifier(length: number): string {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
}