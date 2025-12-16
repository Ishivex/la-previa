import React, { useState } from 'react';
import { 
  Play, Ghost, Beer, HelpCircle, ArrowLeft, 
  Brain, Crown, Bomb, Video, Fingerprint 
} from 'lucide-react';
import Button from './components/Button';

// --- IMPORTAMOS TODOS LOS JUEGOS ---
import ImpostorGame from './games/impostor/ImpostorGame';
import NeverHaveIEver from './games/never-have-i-ever/NeverHaveIEver';
import MostLikelyTo from './games/most-likely/MostLikelyTo';
import CulturaChupistica from './games/cultura-chupistica/CulturaChupistica';
import MimicGame from './games/mimic/MimicGame';
import TruthOrDare from './games/truth-or-dare/TruthOrDare';
import KingGame from './games/king/KingGame'; // <--- Nuevo Import

// --- PANTALLAS SIMPLES ---

const LandingScreen = ({ onStart }) => (
  <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 space-y-8 animate-fadeIn">
    <div className="relative">
      <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
      <h1 className="relative text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-pink-500 to-indigo-500 drop-shadow-sm tracking-tighter">
        LA<br/>PREVIA
      </h1>
    </div>
    <p className="text-xl text-gray-400 max-w-md">
      La mejor app para romper el hielo antes de la fiesta.
    </p>
    <div className="w-full max-w-xs">
      <Button onClick={onStart} variant="neon">
        <Play size={24} /> ENTRAR
      </Button>
    </div>
    <span className="text-xs text-gray-600 fixed bottom-4">v1.9.0 • React • Tailwind</span>
  </div>
);

const GameMenu = ({ onSelectGame, onBack }) => {
  const games = [
    // --- JUEGOS ACTIVOS ---
    { 
        id: 'king', 
        name: 'El Reino', 
        icon: <Crown size={32} />, 
        color: 'from-amber-400 to-yellow-600', 
        active: true, // <--- ACTIVADO (Nuevo juego)
        desc: 'Juzga qué tanto te conocen tus amigos.' 
    },
    { 
        id: 'impostor', 
        name: 'El Impostor', 
        icon: <Ghost size={32} />, 
        color: 'from-red-500 to-orange-600', 
        active: true, 
        desc: 'Descubre quién miente entre tus amigos.' 
    },
    { 
        id: 'never', 
        name: 'Yo Nunca', 
        icon: <Beer size={32} />, 
        color: 'from-yellow-400 to-orange-500', 
        active: true, 
        desc: 'Frases picantes. Si lo hiciste, bebes.' 
    },
    { 
        id: 'likely', 
        name: 'Quién es más probable', 
        icon: <Fingerprint size={32} />, 
        color: 'from-blue-500 to-indigo-600', 
        active: true, 
        desc: 'Señala al amigo que encaje con la tarjeta.' 
    },
    { 
        id: 'culture', 
        name: 'Cultura Chupística', 
        icon: <Brain size={32} />, 
        color: 'from-pink-500 to-rose-500', 
        active: true,
        desc: 'Nombra cosas de una categoría sin repetir.' 
    },
    { 
        id: 'mimic', 
        name: 'Mímica', 
        icon: <Video size={32} />, 
        color: 'from-teal-400 to-emerald-600', 
        active: true,
        desc: 'Actúa para que tu equipo adivine en 60s.' 
    },
    { 
        id: 'truth', 
        name: 'Verdad o Reto', 
        icon: <HelpCircle size={32} />, 
        color: 'from-violet-500 to-purple-700', 
        active: true,
        desc: 'Confiesa tus secretos o cumple el reto.' 
    },
    
    // --- PRÓXIMAMENTE ---
    { 
        id: 'bomb', 
        name: 'La Bomba', 
        icon: <Bomb size={32} />, 
        color: 'from-orange-500 to-red-700', 
        active: false, 
        desc: 'Responde rápido antes de que explote.' 
    },
  ];

  return (
    <div className="min-h-screen p-6 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-white">
          <ArrowLeft />
        </button>
        <h2 className="text-2xl font-bold text-white">Elige un Juego</h2>
        <div className="w-10"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto w-full pb-10">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => {
                if (game.active) {
                    onSelectGame(game.id);
                }
            }}
            disabled={!game.active}
            className={`relative group overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 border border-white/5 
              ${!game.active ? 'opacity-60 grayscale cursor-not-allowed bg-white/5' : 'hover:scale-[1.02] hover:shadow-2xl bg-gray-900'}`}
          >
            {/* Fondo con gradiente */}
            <div className={`absolute inset-0 bg-gradient-to-br ${game.color} ${game.active ? 'opacity-20 group-hover:opacity-30' : 'opacity-5'} transition-opacity`}></div>
            
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-black text-white mb-1 flex items-center gap-2">
                    {game.name}
                    {!game.active && <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-400 font-normal uppercase tracking-wide">Pronto</span>}
                </h3>
                <p className="text-sm text-gray-300">{game.desc}</p>
              </div>
              <div className={`p-3 rounded-xl ${game.active ? 'bg-white/10 text-white' : 'bg-white/5 text-gray-500'}`}>
                {game.icon}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// --- APP PRINCIPAL ---

const App = () => {
  const [screen, setScreen] = useState('landing');

  // Función para volver al menú desde cualquier juego
  const backToMenu = () => setScreen('menu');

  const renderScreen = () => {
    switch(screen) {
      case 'landing':
        return <LandingScreen onStart={() => setScreen('menu')} />;
      case 'menu':
        return <GameMenu onSelectGame={(id) => setScreen(`game-${id}`)} onBack={() => setScreen('landing')} />;
      
      // JUEGOS ACTIVOS
      case 'game-impostor':
        return <ImpostorGame onExit={backToMenu} />;
      case 'game-never':
        return <NeverHaveIEver onExit={backToMenu} />;
      case 'game-likely':
        return <MostLikelyTo onExit={backToMenu} />;
      case 'game-culture':
        return <CulturaChupistica onExit={backToMenu} />;
      case 'game-mimic':
        return <MimicGame onExit={backToMenu} />;
      case 'game-truth':
        return <TruthOrDare onExit={backToMenu} />;
      case 'game-king':
        return <KingGame onExit={backToMenu} />; // <--- Nueva Ruta Activada
      
      default:
        return <GameMenu onSelectGame={(id) => setScreen(`game-${id}`)} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-purple-500/30">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-purple-900/20 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full"></div>
      </div>
      <div className="relative z-10">
        {renderScreen()}
      </div>
      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default App;