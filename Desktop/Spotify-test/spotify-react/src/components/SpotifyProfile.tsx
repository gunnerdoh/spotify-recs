interface SpotifyProfileProps {
  profile: any;
  playlists: any;
}

export default function SpotifyProfile({ profile, playlists }: SpotifyProfileProps) {

  const playlistHrefs = playlists.items.map((item: any) => item.href);
  // console.log(playlistHrefs);

  // for (let i = 0; i < playlistHrefs.length; i++) {
  //   playlist = await fetch(playlistHrefs[i], {

  //   })
  // }

  // console.log(playlistHrefs)
  return (
    <div className="">
      <div className="">
        <div>
          <h2 className="">User: {profile.display_name}</h2>
          {/* <p className="">{profile.email}</p> */}
        </div>
      </div>

      <div className="">
        <p><span className="">ID:</span> {profile.id}</p>
        <p>
          <span className="">URI:</span>{" "}
          <a href={profile.external_urls.spotify} className="">
            {profile.uri}
          </a>
        </p>
      </div>

      <div>
        <h3 className="">Playlists:</h3>
        <ul className="">
          {playlists.items.map((pl: any) => (
            <li key={pl.id} className="">
              <span className="">{pl.name}</span>{" "}
              <span className="">({
                pl.tracks.total
              } tracks)</span>
              <span>{pl.href}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
