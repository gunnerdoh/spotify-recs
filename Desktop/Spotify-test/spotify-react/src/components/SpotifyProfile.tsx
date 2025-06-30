interface SpotifyProfileProps {
    profile: any;
    playlists: any;
  }
  
  export default function SpotifyProfile({ profile, playlists }: SpotifyProfileProps) {
    return (
      <div>
        <h2 className="text-xl font-semibold">{profile.display_name}</h2>
        {profile.images?.[0] && (
          <img src={profile.images[0].url} alt="Profile" className="w-32 h-32 rounded-full" />
        )}
        <p>ID: {profile.id}</p>
        <p>Email: {profile.email}</p>
        <p>
          URI: <a href={profile.external_urls.spotify}>{profile.uri}</a>
        </p>
  
        <h3 className="mt-4 font-semibold">Playlists:</h3>
        <ul className="list-disc ml-6">
          {playlists.items.map((pl: any) => (
            <li key={pl.id}>{pl.name} ({pl.tracks.total} tracks)</li>
          ))}
        </ul>
      </div>
    );
  }
  