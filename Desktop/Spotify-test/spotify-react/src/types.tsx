export type Song = {
    name: string;
    artist: string;
    popularity: number;
    releaseDate: string;
    duration: number;
  };
  
  export type PlaylistObject = {
    name: string;
    songs: Song[];
    length: number;
    popularity: number;
  };
  