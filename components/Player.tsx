
import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, SkipForward, SkipBack, Repeat, Shuffle, 
  Volume2, Maximize2, ListMusic, Mic2, Tv, Heart, 
  Share2, MoreHorizontal 
} from 'lucide-react';
import { Track } from '../types';

interface PlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  togglePlay: () => void;
  toggleVideo: () => void;
  toggleLyrics: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Player: React.FC<PlayerProps> = ({ 
  currentTrack, 
  isPlaying, 
  togglePlay, 
  toggleVideo,
  toggleLyrics,
  onNext,
  onPrev 
}) => {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);

  useEffect(() => {
    let interval: any;
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setProgress(p => (p >= 100 ? 0 : p + 0.5));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-black/95 backdrop-blur-xl border-t border-white/10 px-4 flex items-center justify-between z-50">
      {/* Current Info */}
      <div className="flex items-center w-1/4 min-w-[200px]">
        <div className="relative group">
          <img 
            src={currentTrack.coverUrl} 
            alt={currentTrack.title} 
            className="w-14 h-14 rounded-md object-cover shadow-lg border border-white/5" 
          />
          {currentTrack.isVideo && (
            <div className="absolute top-1 right-1 bg-angola-red text-[8px] font-bold px-1 rounded uppercase">Video</div>
          )}
        </div>
        <div className="ml-4 overflow-hidden">
          <div className="text-sm font-bold text-white truncate hover:underline cursor-pointer">{currentTrack.title}</div>
          <div className="text-xs text-gray-400 hover:text-white cursor-pointer transition-colors truncate">{currentTrack.artist}</div>
        </div>
        <div className="ml-4 flex space-x-2">
          <button className="text-gray-400 hover:text-angola-red transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center max-w-[40%] w-full">
        <div className="flex items-center space-x-6 mb-2">
          <button className="text-gray-400 hover:text-white transition-colors"><Shuffle className="w-4 h-4" /></button>
          <button onClick={onPrev} className="text-gray-400 hover:text-white transition-colors"><SkipBack className="w-6 h-6 fill-current" /></button>
          <button 
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform active:scale-95 shadow-premium"
          >
            {isPlaying ? <Pause className="text-black fill-current w-5 h-5" /> : <Play className="text-black fill-current w-5 h-5 ml-1" />}
          </button>
          <button onClick={onNext} className="text-gray-400 hover:text-white transition-colors"><SkipForward className="w-6 h-6 fill-current" /></button>
          <button className="text-gray-400 hover:text-white transition-colors"><Repeat className="w-4 h-4" /></button>
        </div>
        <div className="flex items-center space-x-3 w-full max-w-md">
          <span className="text-[10px] text-gray-500 font-medium">1:24</span>
          <div className="flex-1 h-1 bg-gray-800 rounded-full relative group cursor-pointer overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-angola-red rounded-full group-hover:bg-angola-yellow transition-colors" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] text-gray-500 font-medium">{currentTrack.duration}</span>
        </div>
      </div>

      {/* Extras */}
      <div className="flex items-center justify-end w-1/4 space-x-4">
        {currentTrack.isVideo && (
          <button onClick={toggleVideo} className="text-gray-400 hover:text-angola-red transition-colors" title="Modo Vídeo">
            <Tv className="w-5 h-5" />
          </button>
        )}
        <button onClick={toggleLyrics} className="text-gray-400 hover:text-angola-yellow transition-colors" title="Letras">
          <Mic2 className="w-5 h-5" />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <ListMusic className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2 w-24">
          <Volume2 className="w-5 h-5 text-gray-400" />
          <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gray-400" style={{ width: `${volume}%` }} />
          </div>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Player;
