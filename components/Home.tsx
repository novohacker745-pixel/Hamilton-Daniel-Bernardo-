
import React from 'react';
import { Play, Heart, MoreHorizontal, Flame, Award, Globe } from 'lucide-react';
import { Track } from '../types';

interface HomeProps {
  tracks: Track[];
  onPlayTrack: (track: Track) => void;
}

const Home: React.FC<HomeProps> = ({ tracks, onPlayTrack }) => {
  const Greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const Section = ({ title, icon: Icon, items }: { title: string; icon?: any; items: Track[] }) => (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {Icon && <Icon className="text-angola-red w-6 h-6" />}
          <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
        </div>
        <button className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest">Ver tudo</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {items.map(track => (
          <div 
            key={track.id} 
            className="group bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-white/10 shadow-lg"
            onClick={() => onPlayTrack(track)}
          >
            <div className="relative aspect-square overflow-hidden rounded-lg mb-4 shadow-2xl">
              <img 
                src={track.coverUrl} 
                alt={track.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 bg-angola-red rounded-full flex items-center justify-center shadow-premium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <Play className="text-white fill-current w-6 h-6 ml-1" />
                </div>
              </div>
              {track.isVideo && (
                <div className="absolute top-2 right-2 bg-angola-red text-[8px] font-bold px-1.5 py-0.5 rounded shadow-lg uppercase">Video</div>
              )}
            </div>
            <h3 className="font-bold text-base truncate mb-1 group-hover:text-angola-yellow transition-colors">{track.title}</h3>
            <p className="text-sm text-gray-400 truncate">{track.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-angola-red/10 to-black p-8 pb-32">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">{Greeting()}, Hamilton!</h1>
        <div className="flex space-x-4">
          <div className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors cursor-pointer">
            <Globe className="w-5 h-5 text-angola-yellow" />
          </div>
          <img src="https://picsum.photos/seed/user/100/100" className="w-12 h-12 rounded-full border-2 border-angola-red" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {tracks.slice(0, 6).map(track => (
          <div 
            key={track.id} 
            onClick={() => onPlayTrack(track)}
            className="flex items-center bg-white/5 hover:bg-white/10 transition-colors rounded-lg overflow-hidden group cursor-pointer border border-white/5"
          >
            <img src={track.coverUrl} className="w-20 h-20 object-cover" />
            <div className="flex-1 px-4 font-bold truncate text-sm">{track.title}</div>
            <div className="opacity-0 group-hover:opacity-100 pr-4 transition-opacity">
              <div className="w-10 h-10 bg-angola-red rounded-full flex items-center justify-center shadow-premium">
                <Play className="text-white fill-current w-5 h-5 ml-1" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Section title="Bombando em Luanda" icon={Flame} items={tracks} />
      <Section title="Destaques Angolanos" icon={Award} items={[...tracks].reverse()} />
      <Section title="Clássicos do Semba" items={tracks.filter(t => t.genre === 'Semba')} />
    </div>
  );
};

export default Home;
