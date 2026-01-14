
export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
  videoUrl?: string;
  lyrics?: string;
  isVideo: boolean;
  genre: string;
  isFavorite?: boolean;
}

export type ViewType = 'HOME' | 'SEARCH' | 'LIBRARY' | 'PLAYLIST' | 'ARTIST';

export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
  coverUrl: string;
}
