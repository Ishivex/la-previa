import React, { useState } from 'react';
import { Ghost, Users, ArrowLeft, Eye, EyeOff, Trophy, Crown, CheckCircle, XCircle, ListOrdered, Home } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';

const ImpostorGame = ({ onExit }) => {
  const [gameState, setGameState] = useState('setup'); 
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState({}); 
  const [inputValue, setInputValue] = useState('');
  const [gameData, setGameData] = useState({ 
    impostorIndex: null, 
    currentRevealIndex: 0, 
    wordObj: null, 
    turnOrder: [] 
  });
  const [showRole, setShowRole] = useState(false);
  const [roundWinner, setRoundWinner] = useState(null);

  // --- VOCABULARIO MASIVO (200+ Combinaciones) ---
  const words = [
    // COMIDA
    { category: 'Comida', normal: 'Pizza', impostor: 'Hamburguesa' },
    { category: 'Comida', normal: 'Tacos', impostor: 'Burrito' },
    { category: 'Comida', normal: 'Sushi', impostor: 'Ceviche' },
    { category: 'Comida', normal: 'Helado', impostor: 'Yogurt' },
    { category: 'Comida', normal: 'Café', impostor: 'Té' },
    { category: 'Comida', normal: 'Panqueques', impostor: 'Waffles' },
    { category: 'Comida', normal: 'Manzana', impostor: 'Pera' },
    { category: 'Comida', normal: 'Naranja', impostor: 'Mandarina' },
    { category: 'Comida', normal: 'Leche', impostor: 'Jugo' },
    { category: 'Comida', normal: 'Ketchup', impostor: 'Mayonesa' },
    { category: 'Comida', normal: 'Sal', impostor: 'Azúcar' },
    { category: 'Comida', normal: 'Pollo', impostor: 'Pavo' },
    { category: 'Comida', normal: 'Pasta', impostor: 'Arroz' },
    { category: 'Comida', normal: 'Galleta', impostor: 'Pastel' },
    { category: 'Comida', normal: 'Chocolate', impostor: 'Vainilla' },
    
    // LUGARES
    { category: 'Lugares', normal: 'Playa', impostor: 'Piscina' },
    { category: 'Lugares', normal: 'Cine', impostor: 'Teatro' },
    { category: 'Lugares', normal: 'Gimnasio', impostor: 'Parque' },
    { category: 'Lugares', normal: 'Biblioteca', impostor: 'Librería' },
    { category: 'Lugares', normal: 'Hospital', impostor: 'Farmacia' },
    { category: 'Lugares', normal: 'Escuela', impostor: 'Universidad' },
    { category: 'Lugares', normal: 'Bar', impostor: 'Discoteca' },
    { category: 'Lugares', normal: 'Montaña', impostor: 'Bosque' },
    { category: 'Lugares', normal: 'Hotel', impostor: 'Motel' },
    { category: 'Lugares', normal: 'Aeropuerto', impostor: 'Estación de Tren' },
    { category: 'Lugares', normal: 'Restaurante', impostor: 'Cafetería' },
    { category: 'Lugares', normal: 'Museo', impostor: 'Galería' },
    { category: 'Lugares', normal: 'Zoológico', impostor: 'Acuario' },
    
    // ANIMALES
    { category: 'Animales', normal: 'Perro', impostor: 'Lobo' },
    { category: 'Animales', normal: 'Gato', impostor: 'Tigre' },
    { category: 'Animales', normal: 'Caballo', impostor: 'Burro' },
    { category: 'Animales', normal: 'Delfín', impostor: 'Tiburón' },
    { category: 'Animales', normal: 'Águila', impostor: 'Halcón' },
    { category: 'Animales', normal: 'León', impostor: 'Leopardo' },
    { category: 'Animales', normal: 'Oso', impostor: 'Panda' },
    { category: 'Animales', normal: 'Conejo', impostor: 'Liebre' },
    { category: 'Animales', normal: 'Rana', impostor: 'Sapo' },
    { category: 'Animales', normal: 'Abeja', impostor: 'Avispa' },
    { category: 'Animales', normal: 'Mariposa', impostor: 'Polilla' },
    { category: 'Animales', normal: 'Cocodrilo', impostor: 'Caimán' },
    { category: 'Animales', normal: 'Pingüino', impostor: 'Pato' },
    
    // TECNOLOGÍA
    { category: 'Tecnología', normal: 'Instagram', impostor: 'TikTok' },
    { category: 'Tecnología', normal: 'Netflix', impostor: 'YouTube' },
    { category: 'Tecnología', normal: 'iPhone', impostor: 'Android' },
    { category: 'Tecnología', normal: 'Laptop', impostor: 'Tablet' },
    { category: 'Tecnología', normal: 'Mouse', impostor: 'Trackpad' },
    { category: 'Tecnología', normal: 'Teclado', impostor: 'Pantalla Táctil' },
    { category: 'Tecnología', normal: 'Wifi', impostor: 'Datos Móviles' },
    { category: 'Tecnología', normal: 'Facebook', impostor: 'Twitter (X)' },
    { category: 'Tecnología', normal: 'Spotify', impostor: 'Apple Music' },
    { category: 'Tecnología', normal: 'PlayStation', impostor: 'Xbox' },
    
    // OBJETOS
    { category: 'Objetos', normal: 'Lápiz', impostor: 'Bolígrafo' },
    { category: 'Objetos', normal: 'Tenedor', impostor: 'Cuchara' },
    { category: 'Objetos', normal: 'Zapatos', impostor: 'Zapatillas' },
    { category: 'Objetos', normal: 'Guitarra', impostor: 'Violín' },
    { category: 'Objetos', normal: 'Silla', impostor: 'Sofá' },
    { category: 'Objetos', normal: 'Mesa', impostor: 'Escritorio' },
    { category: 'Objetos', normal: 'Vaso', impostor: 'Taza' },
    { category: 'Objetos', normal: 'Almohada', impostor: 'Cojín' },
    { category: 'Objetos', normal: 'Reloj', impostor: 'Pulsera' },
    { category: 'Objetos', normal: 'Anillo', impostor: 'Collar' },
    { category: 'Objetos', normal: 'Llave', impostor: 'Tarjeta' },
    { category: 'Objetos', normal: 'Espejo', impostor: 'Ventana' },
    
    // ROPA
    { category: 'Ropa', normal: 'Camiseta', impostor: 'Camisa' },
    { category: 'Ropa', normal: 'Pantalón', impostor: 'Shorts' },
    { category: 'Ropa', normal: 'Calcetines', impostor: 'Guantes' },
    { category: 'Ropa', normal: 'Sombrero', impostor: 'Gorra' },
    { category: 'Ropa', normal: 'Bufanda', impostor: 'Corbata' },
    { category: 'Ropa', normal: 'Vestido', impostor: 'Falda' },
    { category: 'Ropa', normal: 'Abrigo', impostor: 'Chaqueta' },
    { category: 'Ropa', normal: 'Cinturón', impostor: 'Tirantes' },
    
    // DEPORTES
    { category: 'Deportes', normal: 'Fútbol', impostor: 'Futsal' },
    { category: 'Deportes', normal: 'Tenis', impostor: 'Pádel' },
    { category: 'Deportes', normal: 'Baloncesto', impostor: 'Voleibol' },
    { category: 'Deportes', normal: 'Natación', impostor: 'Surf' },
    { category: 'Deportes', normal: 'Boxeo', impostor: 'Karate' },
    { category: 'Deportes', normal: 'Béisbol', impostor: 'Cricket' },
    { category: 'Deportes', normal: 'Golf', impostor: 'Hockey' },
    
    // TRANSPORTE
    { category: 'Transporte', normal: 'Coche', impostor: 'Moto' },
    { category: 'Transporte', normal: 'Autobús', impostor: 'Tren' },
    { category: 'Transporte', normal: 'Bicicleta', impostor: 'Patineta' },
    { category: 'Transporte', normal: 'Barco', impostor: 'Submarino' },
    { category: 'Transporte', normal: 'Avión', impostor: 'Helicóptero' },
    { category: 'Transporte', normal: 'Taxi', impostor: 'Uber' },

    // PROFESIONES
    { category: 'Profesiones', normal: 'Doctor', impostor: 'Enfermero' },
    { category: 'Profesiones', normal: 'Policía', impostor: 'Bombero' },
    { category: 'Profesiones', normal: 'Maestro', impostor: 'Profesor' },
    { category: 'Profesiones', normal: 'Abogado', impostor: 'Juez' },
    { category: 'Profesiones', normal: 'Cantante', impostor: 'Actor' },
    { category: 'Profesiones', normal: 'Cocinero', impostor: 'Mesero' },
    
    // MARCAS
    { category: 'Marcas', normal: 'Nike', impostor: 'Adidas' },
    { category: 'Marcas', normal: 'Coca-Cola', impostor: 'Pepsi' },
    { category: 'Marcas', normal: 'McDonalds', impostor: 'Burger King' },
    { category: 'Marcas', normal: 'Marvel', impostor: 'DC' },
    { category: 'Marcas', normal: 'Ferrari', impostor: 'Lamborghini' },
    { category: 'Marcas', normal: 'Visa', impostor: 'Mastercard' },
  ];

  // --- GESTIÓN DE JUGADORES ---
  const addPlayer = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !players.includes(trimmed)) {
      setPlayers([...players, trimmed]);
      setScores(prev => ({ ...prev, [trimmed]: prev[trimmed] || 0 }));
      setInputValue('');
    }
  };

  const removePlayer = (index) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1);
    setPlayers(newPlayers);
  };

  // --- LÓGICA DEL JUEGO ---
  const startGame = () => {
    if (players.length < 3) return;
    
    const randomWordObj = words[Math.floor(Math.random() * words.length)];
    const impostorIdx = Math.floor(Math.random() * players.length);
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    
    setGameData({
      impostorIndex: impostorIdx,
      wordObj: randomWordObj,
      currentRevealIndex: 0,
      turnOrder: shuffledPlayers
    });
    setRoundWinner(null);
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

  const handleVotingEnd = (winner) => {
    setRoundWinner(winner);
    const newScores = { ...scores };
    const impostorName = players[gameData.impostorIndex];

    if (winner === 'citizens') {
        players.forEach(p => {
            if (p !== impostorName) newScores[p] = (newScores[p] || 0) + 1;
        });
    } else {
        newScores[impostorName] = (newScores[impostorName] || 0) + 3;
    }
    setScores(newScores);
    setGameState('result');
  };

  // --- UI COMPONENTS ---
  
  // Botón Home Flotante para estados de juego
  const ExitButton = () => (
    <button onClick={onExit} className="absolute top-4 left-4 p-2 bg-white/10 rounded-full hover:bg-white/20 text-gray-300 z-50">
        <Home size={20} />
    </button>
  );

  // 1. SETUP SCREEN
  if (gameState === 'setup') {
    return (
      <div className="min-h-screen p-6 flex flex-col max-w-lg mx-auto animate-fadeIn pb-10">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onExit} className="text-gray-400 hover:text-white"><ArrowLeft /></button>
          <h2 className="text-xl font-bold text-red-500 flex items-center gap-2"><Ghost /> El Impostor</h2>
          <div className="w-6"></div>
        </div>

        {/* Ranking */}
        {Object.keys(scores).length > 0 && (
             <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 p-4 rounded-xl border border-yellow-500/20 mb-4">
                <h4 className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Trophy size={14} /> Ranking
                </h4>
                <div className="flex flex-wrap gap-2">
                    {Object.entries(scores).sort(([,a], [,b]) => b - a).slice(0, 3).map(([name, pts], i) => (
                        <div key={name} className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded text-xs text-white">
                            {i === 0 && <Crown size={10} className="text-yellow-400" />}
                            <span>{name}:</span>
                            <span className="font-bold text-yellow-400">{pts}</span>
                        </div>
                    ))}
                </div>
             </div>
        )}

        <Card className="mb-6 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-4">Jugadores ({players.length})</h3>
          <div className="flex-1 overflow-y-auto space-y-2 mb-4 max-h-60 custom-scrollbar">
            {players.length === 0 && (
                <div className="text-center py-8 opacity-50"><Users size={48} className="mx-auto mb-2" /><p className="italic">Añade al menos 3 jugadores</p></div>
            )}
            {players.map((p, i) => (
              <div key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                <div className="flex items-center gap-3">
                    <span className="text-gray-500 font-mono text-xs w-4">#{i+1}</span>
                    <span className="text-white font-medium">{p}</span>
                </div>
                <div className="flex items-center gap-3">
                     <span className="text-xs text-yellow-500 font-bold">{scores[p] || 0} pts</span>
                    <button onClick={() => removePlayer(i)} className="text-red-400 hover:text-red-300">✕</button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addPlayer()} placeholder="Nombre..." className="flex-1 bg-black/30 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
            <button onClick={addPlayer} className="bg-purple-600 hover:bg-purple-500 text-white px-4 rounded-lg font-bold">+</button>
          </div>
        </Card>
        <Button onClick={startGame} disabled={players.length < 3}>COMENZAR PARTIDA</Button>
      </div>
    );
  }

  // 2. REVEAL SCREEN
  if (gameState === 'reveal') {
    const currentPlayer = players[gameData.currentRevealIndex];
    const isImpostor = gameData.currentRevealIndex === gameData.impostorIndex;
    const wordToShow = isImpostor ? 'ERES EL IMPOSTOR' : gameData.wordObj.normal;
    const category = gameData.wordObj.category;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center animate-fadeIn relative">
         <ExitButton />
         <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-2">Turno de</h3>
         <h2 className="text-4xl font-bold text-white mb-8">{currentPlayer}</h2>
         <Card className="w-full max-w-sm aspect-[4/3] flex flex-col items-center justify-center mb-8 relative">
            {!showRole ? (
              <div onClick={() => setShowRole(true)} className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-white/5 transition-colors">
                <Eye size={48} className="text-purple-400 mb-4 animate-bounce" />
                <p className="font-bold">Toca para revelar</p>
                <p className="text-xs text-gray-500 mt-2">(Asegúrate que nadie más mire)</p>
              </div>
            ) : (
              <div className="animate-fadeIn w-full flex flex-col items-center">
                {isImpostor ? (
                  <>
                    <Ghost size={64} className="text-red-500 mb-4" />
                    <p className="text-red-500 font-black text-2xl">¡ERES EL IMPOSTOR!</p>
                    <div className="mt-4 bg-red-900/20 px-4 py-2 rounded border border-red-500/30 w-full max-w-xs">
                        <p className="text-xs text-red-300 uppercase mb-1">Pista de Categoría</p>
                        <p className="text-lg font-bold text-white">{category}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <Users size={48} className="text-green-400 mb-4" />
                    <p className="text-gray-400 text-xs uppercase mb-1">La palabra es</p>
                    <p className="text-white font-black text-3xl mb-4">{wordToShow}</p>
                    <p className="text-xs text-gray-500 bg-white/10 px-3 py-1 rounded-full">Categoría: {category}</p>
                  </>
                )}
                <button onClick={() => setShowRole(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><EyeOff size={20}/></button>
              </div>
            )}
         </Card>
         {showRole && <Button onClick={nextPlayerReveal}>ENTENDIDO</Button>}
      </div>
    );
  }

  // 3. PLAYING SCREEN
  if (gameState === 'playing') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center animate-fadeIn relative">
        <ExitButton />
        <div className="mb-6 w-full max-w-sm">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            <Ghost size={32} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">¡A DEBATIR!</h2>
        </div>
        <Card className="w-full max-w-sm mb-6 !p-4">
            <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <ListOrdered size={16} /> Orden de Turnos
            </h4>
            <div className="space-y-2 text-left">
                {gameData.turnOrder.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/5">
                        <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-green-500 text-black' : 'bg-gray-700 text-gray-300'}`}>
                            {i + 1}
                        </div>
                        <span className="text-white font-medium truncate">{p}</span>
                        {i === 0 && <span className="text-xs text-green-400 ml-auto font-bold">Empieza</span>}
                    </div>
                ))}
            </div>
        </Card>
        <div className="w-full max-w-sm">
          <Button onClick={() => setGameState('voting')} variant="primary">VOTAR / VER RESULTADO</Button>
        </div>
      </div>
    );
  }

  // 4. VOTING SCREEN
  if (gameState === 'voting') {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center animate-fadeIn relative">
            <ExitButton />
            <h2 className="text-2xl font-bold text-white mb-8">¿Quién ganó la ronda?</h2>
            <div className="grid gap-4 w-full max-w-sm">
                <button onClick={() => handleVotingEnd('citizens')} className="bg-green-600/20 hover:bg-green-600/40 border-2 border-green-500 p-6 rounded-2xl flex flex-col items-center gap-2 transition-all group">
                    <CheckCircle size={48} className="text-green-500 group-hover:scale-110 transition-transform" />
                    <span className="text-xl font-bold text-white">Ganaron los Ciudadanos</span>
                    <span className="text-sm text-green-200">Encontraron al impostor (+1 pto)</span>
                </button>
                <button onClick={() => handleVotingEnd('impostor')} className="bg-red-600/20 hover:bg-red-600/40 border-2 border-red-500 p-6 rounded-2xl flex flex-col items-center gap-2 transition-all group">
                    <XCircle size={48} className="text-red-500 group-hover:scale-110 transition-transform" />
                    <span className="text-xl font-bold text-white">Ganó el Impostor</span>
                    <span className="text-sm text-red-200">Se salió con la suya (+3 pts)</span>
                </button>
            </div>
            <button onClick={() => setGameState('playing')} className="mt-8 text-gray-500 underline hover:text-white">Volver al debate</button>
        </div>
      );
  }

  // 5. RESULT SCREEN
  if (gameState === 'result') {
     const impostorName = players[gameData.impostorIndex];
     return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center animate-fadeIn relative">
        <ExitButton />
        <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">El impostor era</p>
        <div className="text-5xl font-black text-white mb-6 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">{impostorName}</div>
        
        <div className={`px-4 py-2 rounded-lg font-bold text-lg mb-8 inline-block ${roundWinner === 'citizens' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
            {roundWinner === 'citizens' ? '🏆 Victoria Ciudadana' : '👻 Victoria del Impostor'}
        </div>

        <Card className="w-full max-w-sm mb-6 bg-gray-900">
            <div className="text-center">
                <span className="text-sm text-gray-400 uppercase block mb-1">Palabra Correcta</span>
                <strong className="text-white text-3xl">{gameData.wordObj.normal}</strong>
            </div>
        </Card>

        <Button onClick={() => {
          setGameState('setup');
          setGameData({ ...gameData, currentRevealIndex: 0 });
        }} variant="neon">
          VER RANKING / NUEVA RONDA
        </Button>
      </div>
     );
  }
};

export default ImpostorGame;