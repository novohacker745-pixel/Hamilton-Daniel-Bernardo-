
import React from 'react';
import { Home, Search, Library, PlusCircle, Heart, Download, Music2, MonitorPlay } from 'lucide-react';
import { ViewType, Playlist } from '../types';

interface SidebarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  playlists: Playlist[];
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, playlists }) => {
  const NavItem = ({ id, icon: Icon, label }: { id: ViewType; icon: any; label: string }) => (
    <button
      onClick={() => setView(id)}
      className={`flex items-center space-x-4 w-full px-4 py-3 rounded-lg transition-all duration-200 group ${
        currentView === id ? 'bg-angola-red text-white shadow-premium' : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon className={`w-6 h-6 ${currentView === id ? 'text-white' : 'group-hover:text-angola-yellow transition-colors'}`} />
      <span className="font-semibold text-sm">{label}</span>
    </button>
  );

  return (
    <div className="w-64 bg-black h-full flex flex-col border-r border-white/10 p-4">
      <div className="flex items-center space-x-2 px-2 mb-8">
        <div className="w-10 h-10 bg-angola-red rounded-lg flex items-center justify-center transform rotate-12">
          <Music2 className="text-angola-yellow w-6 h-6 -rotate-12" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-tighter">Hamilton<span className="text-angola-red">Play</span></h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Angola & Mundo</p>
        </div>
      </div>

      <div className="space-y-2 mb-8">
        <NavItem id="HOME" icon={Home} label="Início" />
        <NavItem id="SEARCH" icon={Search} label="Pesquisar" />
        <NavItem id="LIBRARY" icon={Library} label="Biblioteca" />
      </div>

      <div className="space-y-4">
        <h2 className="text-xs font-bold text-gray-500 uppercase px-4 tracking-widest">Suas Playlists</h2>
        <button className="flex items-center space-x-4 px-4 py-2 text-gray-400 hover:text-white transition-colors group">
          <div className="bg-gray-800 p-1 rounded group-hover:bg-white/20">
            <PlusCircle className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium">Criar Playlist</span>
        </button>
        <button className="flex items-center space-x-4 px-4 py-2 text-gray-400 hover:text-white transition-colors group">
          <div className="bg-gradient-to-br from-purple-700 to-blue-300 p-1 rounded group-hover:opacity-80">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-medium">Músicas Curtidas</span>
        </button>
        <button className="flex items-center space-x-4 px-4 py-2 text-gray-400 hover:text-white transition-colors group">
          <div className="bg-green-800 p-1 rounded group-hover:bg-green-700">
            <Download className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-medium">Downloads</span>
        </button>
      </div>

      <div className="mt-8 flex-1 overflow-y-auto border-t border-white/5 pt-4">
        {playlists.map(p => (
          <button
            key={p.id}
            className="w-full text-left px-4 py-2 text-gray-400 hover:text-white text-sm truncate"
          >
            {p.name}
          </button>
        ))}
      </div>
      
      <div className="mt-auto pt-4 border-t border-white/5">
        <div className="bg-angola-yellow/10 p-3 rounded-xl border border-angola-yellow/20">
          <p className="text-xs font-bold text-angola-yellow mb-1 uppercase tracking-tighter">Premium Angola</p>
          <p className="text-[10px] text-gray-400 leading-tight">Obtenha áudio de alta qualidade e sem anúncios.</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
