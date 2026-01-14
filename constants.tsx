
import { Track, Playlist } from './types';

export const COLORS = {
  RED: '#c8102e',
  YELLOW: '#ffd100',
  BLACK: '#000000',
  DARK_GRAY: '#121212',
  LIGHT_GRAY: '#282828'
};

export const MOCK_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Milagres',
    artist: 'Anselmo Ralph',
    album: 'Momentos',
    duration: '3:45',
    coverUrl: 'https://picsum.photos/seed/anselmo/400/400',
    isVideo: true,
    genre: 'Kizomba'
  },
  {
    id: '2',
    title: 'Te Amar de Novo',
    artist: 'Anna Joyce',
    album: 'Reflexos',
    duration: '4:12',
    coverUrl: 'https://picsum.photos/seed/anna/400/400',
    isVideo: false,
    genre: 'Semba'
  },
  {
    id: '3',
    title: 'Angola',
    artist: 'Bonga',
    album: 'Greatest Hits',
    duration: '5:20',
    coverUrl: 'https://picsum.photos/seed/bonga/400/400',
    isVideo: false,
    genre: 'Semba'
  },
  {
    id: '4',
    title: 'Ta no Ponto',
    artist: 'Preto Show',
    album: 'Single',
    duration: '3:30',
    coverUrl: 'https://picsum.photos/seed/preto/400/400',
    isVideo: true,
    genre: 'Kuduro'
  }
];

export const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: 'pl1',
    name: 'Top Angola 50',
    tracks: MOCK_TRACKS,
    coverUrl: 'https://picsum.photos/seed/p1/400/400'
  },
  {
    id: 'pl2',
    name: 'Noite Luandense',
    tracks: MOCK_TRACKS.slice(0, 2),
    coverUrl: 'https://picsum.photos/seed/p2/400/400'
  }
];
