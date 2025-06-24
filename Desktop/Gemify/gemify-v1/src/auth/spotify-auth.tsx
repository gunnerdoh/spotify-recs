// accessToken = "d8b4c9c5f149476582ef0adecf630791"

const initiateSpotifyLogin = async (accessToken: string) => {

    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET', // -X GET
        headers: {
          'Authorization': `Bearer ${accessToken}`, // -H "Authorization: Bearer ..."
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  };