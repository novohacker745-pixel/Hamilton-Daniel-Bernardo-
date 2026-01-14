
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Home from './components/Home';
import { ViewType, Track, Playlist } from './types';
import { MOCK_TRACKS, MOCK_PLAYLISTS } from './constants';
import { searchTracks, generateLyrics } from './services/geminiService';
// Added missing Play component to lucide-react imports
import { Search, X, Mic2, Tv, Video, Music, Play } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewType>('HOME');
  const [currentTrack, setCurrentTrack] = useState<Track | null>(MOCK_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [currentLyrics, setCurrentLyrics] = useState<string>('');
  const [isLoadingLyrics, setIsLoadingLyrics] = useState(false);

  const handlePlayTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    // Reset view specific overlays if switching tracks
    setShowLyrics(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setView('SEARCH');
    const results = await searchTracks(searchQuery);
    setSearchResults(results);
    setIsSearching(false);
  };

  const fetchLyrics = async () => {
    if (currentTrack) {
      setIsLoadingLyrics(true);
      const lyrics = await generateLyrics(currentTrack.title, currentTrack.artist);
      setCurrentLyrics(lyrics);
      setIsLoadingLyrics(false);
    }
  };

  useEffect(() => {
    if (showLyrics) {
      fetchLyrics();
    }
  }, [showLyrics, currentTrack]);

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden relative">
      <Sidebar 
        currentView={currentView} 
        setView={setView} 
        playlists={MOCK_PLAYLISTS} 
      />

      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Top Header/Search */}
        <header className="h-16 flex items-center px-8 bg-black/40 backdrop-blur-md absolute top-0 left-0 right-0 z-40">
          <form onSubmit={handleSearch} className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="O que queres ouvir?" 
              className="w-full bg-white/10 hover:bg-white/20 transition-colors rounded-full py-2 pl-10 pr-4 outline-none border border-transparent focus:border-angola-red text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>
        </header>

        {/* Content Area */}
        <div className="flex-1 pt-16 overflow-hidden flex flex-col">
          {currentView === 'HOME' && (
            <Home tracks={MOCK_TRACKS} onPlayTrack={handlePlayTrack} />
          )}

          {currentView === 'SEARCH' && (
            <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-white/5 to-black pb-32">
              <h2 className="text-3xl font-extrabold mb-6">Resultados para "{searchQuery}"</h2>
              {isSearching ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="w-12 h-12 border-4 border-angola-red border-t-angola-yellow rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-400 animate-pulse">Consultando a inteligência musical...</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {searchResults.map(track => (
                    <div 
                      key={track.id} 
                      className="group bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-all cursor-pointer border border-transparent hover:border-white/10"
                      onClick={() => handlePlayTrack(track)}
                    >
                      <img src={track.coverUrl} className="w-full aspect-square object-cover rounded-lg mb-4" />
                      <h3 className="font-bold text-base truncate mb-1">{track.title}</h3>
                      <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                    </div>
                  ))}
                  {searchResults.length === 0 && !isSearching && searchQuery && (
                    <p className="text-gray-500 italic">Nenhum resultado encontrado para esta pesquisa.</p>
                  )}
                </div>
              )}
            </div>
          )}

          {currentView === 'LIBRARY' && (
            <div className="flex-1 flex items-center justify-center p-8 bg-black">
              <div className="text-center">
                <Music className="w-16 h-16 text-angola-yellow mx-auto mb-4 opacity-20" />
                <h2 className="text-2xl font-bold mb-2">Sua Biblioteca</h2>
                <p className="text-gray-400 max-w-xs mx-auto">Músicas, álbuns e podcasts salvos aparecerão aqui.</p>
                <button 
                  onClick={() => setView('SEARCH')}
                  className="mt-6 px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
                >
                  Explorar Agora
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Video Overlay */}
        {showVideo && currentTrack && (
          <div className="fixed inset-0 bg-black z-[60] flex flex-col">
            <div className="h-16 flex items-center justify-between px-8 bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-white/80">Hamilton Play - Modo Vídeo</span>
              </div>
              <button onClick={() => setShowVideo(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center bg-black relative">
              {/* Simulated Video Player */}
              <div className="w-full max-w-5xl aspect-video bg-white/5 flex flex-col items-center justify-center border border-white/10 rounded-2xl relative overflow-hidden group">
                <img src={currentTrack.coverUrl} className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20" />
                <div className="z-10 text-center p-8">
                  <div className="w-24 h-24 bg-angola-red rounded-full flex items-center justify-center shadow-premium mx-auto mb-6 group-hover:scale-110 transition-transform">
                     {isPlaying ? <Video className="w-10 h-10" /> : <Play className="w-10 h-10 ml-2 fill-current" />}
                  </div>
                  <h2 className="text-3xl font-extrabold mb-2">{currentTrack.title}</h2>
                  <p className="text-xl text-angola-yellow mb-8">{currentTrack.artist}</p>
                </div>
                {/* Visualizer Mock */}
                <div className="absolute bottom-10 left-0 right-0 h-24 flex items-end justify-center space-x-1 px-20 overflow-hidden opacity-30">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1 bg-angola-red rounded-t-full transition-all duration-300"
                      style={{ 
                        height: isPlaying ? `${Math.random() * 100}%` : '4px',
                        transitionDelay: `${i * 20}ms`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="h-32 bg-gradient-to-t from-black to-transparent p-8">
               <div className="max-w-xl mx-auto flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Próximo</span>
                    <span className="font-bold">{MOCK_TRACKS[1].title} - {MOCK_TRACKS[1].artist}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                     <button onClick={() => setShowLyrics(true)} className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors">
                        <Mic2 className="w-4 h-4 text-angola-yellow" />
                        <span className="text-sm font-bold">Letras</span>
                     </button>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* Lyrics Overlay */}
        {showLyrics && currentTrack && (
          <div className="fixed inset-0 bg-angola-red/90 backdrop-blur-3xl z-[70] flex flex-col">
             <div className="h-20 flex items-center justify-between px-10">
                <div className="flex items-center space-x-4">
                  <img src={currentTrack.coverUrl} className="w-12 h-12 rounded shadow-2xl" />
                  <div>
                    <h3 className="font-bold leading-none">{currentTrack.title}</h3>
                    <p className="text-sm text-black/60 font-medium">{currentTrack.artist}</p>
                  </div>
                </div>
                <button onClick={() => setShowLyrics(false)} className="p-3 bg-black/10 hover:bg-black/20 rounded-full">
                  <X className="w-6 h-6" />
                </button>
             </div>
             <div className="flex-1 overflow-y-auto px-10 py-10 flex flex-col items-center">
                <div className="max-w-2xl w-full">
                  {isLoadingLyrics ? (
                    <div className="space-y-4 animate-pulse">
                      <div className="h-8 bg-black/10 rounded w-3/4"></div>
                      <div className="h-8 bg-black/10 rounded w-1/2"></div>
                      <div className="h-8 bg-black/10 rounded w-5/6"></div>
                      <div className="h-8 bg-black/10 rounded w-2/3"></div>
                    </div>
                  ) : (
                    <div className="text-4xl md:text-5xl lg:text-6xl font-black text-black leading-tight whitespace-pre-wrap select-none opacity-80 hover:opacity-100 transition-opacity">
                       {currentLyrics}
                    </div>
                  )}
                </div>
             </div>
             <div className="h-24 border-t border-black/10 flex items-center justify-center px-10">
                <p className="text-xs font-bold text-black/40 uppercase tracking-widest">Powered by Hamilton Play AI</p>
             </div>
          </div>
        )}

        <Player 
          currentTrack={currentTrack} 
          isPlaying={isPlaying}
          togglePlay={() => setIsPlaying(!isPlaying)}
          toggleVideo={() => setShowVideo(!showVideo)}
          toggleLyrics={() => setShowLyrics(!showLyrics)}
          onNext={() => handlePlayTrack(MOCK_TRACKS[1])}
          onPrev={() => handlePlayTrack(MOCK_TRACKS[0])}
        />
      </main>
    </div>
  );
};

export default App;
