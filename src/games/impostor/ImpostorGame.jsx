import React, { useState } from 'react';
import { Ghost, Users, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';

const ImpostorGame = ({ onExit }) => {
  const [gameState, setGameState] = useState('setup'); // setup, reveal, playing, result
  const [players, setPlayers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [gameData, setGameData] = useState({ impostorIndex: null, currentRevealIndex: 0, word: '' });
  const [showRole, setShowRole] = useState(false);

  const words = [
    { category: 'Lugares', normal: 'Playa', impostor: 'Piscina' },
    { category: 'Comida', normal: 'Pizza', impostor: 'Hamburguesa' },
    { category: 'Animales', normal: 'Perro', impostor: 'Lobo' },
    { category: 'Hogar', normal: 'Silla', impostor: 'Sofá' },
    { category: 'Tecnología', normal: 'Instagram', impostor: 'TikTok' },
  ];

  const addPlayer = () => {
    if (inputValue.trim() && !players.includes(inputValue.trim())) {
      setPlayers([...players, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removePlayer = (index) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1);
    setPlayers(newPlayers);
  };

  const startGame = () => {
    if (players.length < 3) return;
    
    const randomWordObj = words[Math.floor(Math.random() * words.length)];
    const impostorIdx = Math.floor(Math.random() * players.length);
    
    setGameData({
      impostorIndex: impostorIdx,
      wordObj: randomWordObj,
      currentRevealIndex: 0
    });
    setGameState('reveal');
  };

  const nextPlayerReveal = () => {
    setShowRole(false);
    if (gameData.currentRevealIndex + 1 >= players.length) {
      setGameState('playing');
    } else {
      setGameData(prev => ({ ...prev, currentRevealIndex: prev.currentRevealIndex + 1 }));
    }
  };

  // 1. Setup Screen
  if (gameState === 'setup') {
    return (
      <div className="min-h-screen p-6 flex flex-col max-w-lg mx-auto animate-fadeIn">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onExit} className="text-gray-400 hover:text-white"><ArrowLeft /></button>
          <h2 className="text-xl font-bold text-red-500 flex items-center gap-2"><Ghost /> El Impostor</h2>
          <div className="w-6"></div>
        </div>

        <Card className="mb-6 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-4">Jugadores ({players.length})</h3>
          <div className="flex-1 overflow-y-auto space-y-2 mb-4 max-h-60 custom-scrollbar">
            {players.length === 0 && <p className="text-gray-500 text-center italic mt-10">Añade al menos 3 jugadores</p>}
            {players.map((p, i) => (
              <div key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                <span className="text-white font-medium">{p}</span>
                <button onClick={() => removePlayer(i)} className="text-red-400 hover:text-red-300">✕</button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
              placeholder="Nombre..."
              className="flex-1 bg-black/30 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button 
              onClick={addPlayer}
              className="bg-purple-600 hover:bg-purple-500 text-white px-4 rounded-lg font-bold"
            >
              +
            </button>
          </div>
        </Card>

        <Button 
          onClick={startGame} 
          disabled={players.length < 3}
          variant={players.length >= 3 ? 'primary' : 'secondary'}
        >
          COMENZAR PARTIDA
        </Button>
      </div>
    );
  }

  // 2. Reveal Screen
  if (gameState === 'reveal') {
    const currentPlayer = players[gameData.currentRevealIndex];
    const isImpostor = gameData.currentRevealIndex === gameData.impostorIndex;
    const wordToShow = isImpostor ? 'ERES EL IMPOSTOR' : gameData.wordObj.normal;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
         <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-2">Turno de</h3>
         <h2 className="text-4xl font-bold text-white mb-8">{currentPlayer}</h2>

         <Card className="w-full max-w-sm aspect-[4/3] flex flex-col items-center justify-center mb-8 relative overflow-hidden">
            {!showRole ? (
              <div className="flex flex-col items-center cursor-pointer" onClick={() => setShowRole(true)}>
                <Eye size={48} className="text-purple-400 mb-4 animate-bounce" />
                <p className="text-white font-bold">Toca para ver tu palabra</p>
                <p className="text-xs text-gray-500 mt-2">(Asegúrate que nadie más vea)</p>
              </div>
            ) : (
              <div className="flex flex-col items-center animate-fadeIn">
                {isImpostor ? (
                  <>
                    <Ghost size={64} className="text-red-500 mb-4" />
                    <p className="text-red-500 font-black text-2xl">¡ERES EL IMPOSTOR!</p>
                    <p className="text-gray-400 text-sm mt-2">Engaña a los demás</p>
                  </>
                ) : (
                  <>
                    <div className="bg-green-500/20 p-4 rounded-full mb-4 text-green-400">
                      <Users size={48} />
                    </div>
                    <p className="text-gray-300 text-sm uppercase">La palabra es:</p>
                    <p className="text-white font-black text-3xl mt-1">{wordToShow}</p>
                  </>
                )}
                <button 
                  onClick={() => setShowRole(false)} 
                  className="absolute top-4 right-4 text-gray-500 hover:text-white"
                >
                  <EyeOff size={20} />
                </button>
              </div>
            )}
         </Card>

         {showRole && (
           <Button onClick={nextPlayerReveal} variant="primary">
             ENTENDIDO, SIGUIENTE
           </Button>
         )}
      </div>
    );
  }

  // 3. Playing Screen
  if (gameState === 'playing') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
        <div className="mb-10">
          <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            <Ghost size={40} className="text-red-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">¡A DEBATIR!</h2>
          <p className="text-gray-400">Hay un impostor entre nosotros.</p>
        </div>

        <div className="space-y-4 w-full max-w-xs">
          <Button onClick={() => setGameState('result')} variant="primary">
            VER RESULTADO
          </Button>
          <Button onClick={() => {
            setGameState('setup');
            setGameData({ ...gameData, currentRevealIndex: 0 });
          }} variant="secondary">
            JUGAR OTRA VEZ
          </Button>
        </div>
      </div>
    );
  }

  // 4. Result Screen
  if (gameState === 'result') {
     return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
        <h2 className="text-gray-400 mb-4 uppercase tracking-widest text-sm">El impostor era</h2>
        <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-2">
          {players[gameData.impostorIndex]}
        </div>
        
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 my-8 w-full max-w-xs">
           <p className="text-gray-400 text-sm mb-1">La palabra secreta era:</p>
           <p className="text-2xl font-bold text-white">{gameData.wordObj.normal}</p>
        </div>

        <Button onClick={() => {
          setGameState('setup');
          setGameData({ ...gameData, currentRevealIndex: 0 });
        }} variant="neon">
          NUEVA PARTIDA
        </Button>
      </div>
     );
  }
};

export default ImpostorGame;