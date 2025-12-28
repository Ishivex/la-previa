import React, { useState, useEffect } from 'react';
import { Ghost, Users, ArrowLeft, Eye, EyeOff, ListOrdered, Home, Fingerprint, CheckCircle, XCircle, Grid, Shuffle, RefreshCw, Clock } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';

const ImpostorGame = ({ onExit }) => {
  const [gameState, setGameState] = useState('setup'); // setup, reveal, playing, voting, round_end
  const [players, setPlayers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [impostorCount, setImpostorCount] = useState(1);
  
  // Nuevo: Array para múltiples categorías
  const [selectedCategories, setSelectedCategories] = useState(['Aleatorio']); 
  
  // Nuevo: Historial de palabras usadas para no repetir
  const [usedWordsIndices, setUsedWordsIndices] = useState([]);

  // Nuevo: Temporizador
  const [timeLeft, setTimeLeft] = useState(420); // 7 minutos en segundos
  const [gameWinner, setGameWinner] = useState(null); // 'citizens' o 'impostors'

  const [gameData, setGameData] = useState({ 
    impostorIndices: [], 
    currentRevealIndex: 0, 
    wordObj: null, 
    turnOrder: [],
    eliminatedPlayers: [] 
  });
  
  const [showRole, setShowRole] = useState(false);
  const [voteResult, setVoteResult] = useState(null);

  // --- TEMPORIZADOR ---
  useEffect(() => {
    let interval;
    if (gameState === 'playing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      // Si se acaba el tiempo, forzamos votación
      setGameState('voting');
    }
    return () => clearInterval(interval);
  }, [gameState, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // --- VOCABULARIO MASIVO (EXPANDIDO) ---
  const words = [
    // LUGARES
    { category: 'Lugares', normal: 'Playa', impostor: 'Piscina' },
    { category: 'Lugares', normal: 'Cine', impostor: 'Teatro' },
    { category: 'Lugares', normal: 'Gimnasio', impostor: 'Parque' },
    { category: 'Lugares', normal: 'Biblioteca', impostor: 'Librería' },
    { category: 'Lugares', normal: 'Discoteca', impostor: 'Bar' },
    { category: 'Lugares', normal: 'Hospital', impostor: 'Farmacia' },
    { category: 'Lugares', normal: 'Escuela', impostor: 'Universidad' },
    { category: 'Lugares', normal: 'Museo', impostor: 'Galería de Arte' },
    { category: 'Lugares', normal: 'Zoológico', impostor: 'Acuario' },
    { category: 'Lugares', normal: 'Montaña', impostor: 'Bosque' },
    { category: 'Lugares', normal: 'Aeropuerto', impostor: 'Estación de Tren' },
    { category: 'Lugares', normal: 'Restaurante', impostor: 'Cafetería' },
    { category: 'Lugares', normal: 'Hotel', impostor: 'Motel' },
    { category: 'Lugares', normal: 'Circo', impostor: 'Feria' },
    { category: 'Lugares', normal: 'Iglesia', impostor: 'Catedral' },
    { category: 'Lugares', normal: 'Supermercado', impostor: 'Mercado' },
    { category: 'Lugares', normal: 'Banco', impostor: 'Cajero Automático' },
    { category: 'Lugares', normal: 'Estadio', impostor: 'Cancha' },
    { category: 'Lugares', normal: 'Spa', impostor: 'Sauna' },
    { category: 'Lugares', normal: 'Castillo', impostor: 'Palacio' },

    // COMIDA
    { category: 'Comida', normal: 'Pizza', impostor: 'Hamburguesa' },
    { category: 'Comida', normal: 'Tacos', impostor: 'Burrito' },
    { category: 'Comida', normal: 'Sushi', impostor: 'Ceviche' },
    { category: 'Comida', normal: 'Helado', impostor: 'Yogurt' },
    { category: 'Comida', normal: 'Pastel', impostor: 'Galleta' },
    { category: 'Comida', normal: 'Manzana', impostor: 'Pera' },
    { category: 'Comida', normal: 'Naranja', impostor: 'Mandarina' },
    { category: 'Comida', normal: 'Café', impostor: 'Té' },
    { category: 'Comida', normal: 'Pan', impostor: 'Tostada' },
    { category: 'Comida', normal: 'Arroz', impostor: 'Pasta' },
    { category: 'Comida', normal: 'Pollo', impostor: 'Pavo' },
    { category: 'Comida', normal: 'Carne', impostor: 'Cerdo' },
    { category: 'Comida', normal: 'Leche', impostor: 'Jugo' },
    { category: 'Comida', normal: 'Mantequilla', impostor: 'Margarina' },
    { category: 'Comida', normal: 'Sal', impostor: 'Azúcar' },
    { category: 'Comida', normal: 'Ketchup', impostor: 'Mayonesa' },
    { category: 'Comida', normal: 'Papas Fritas', impostor: 'Aros de Cebolla' },
    { category: 'Comida', normal: 'Sopa', impostor: 'Crema' },
    { category: 'Comida', normal: 'Ensalada', impostor: 'Verduras' },
    { category: 'Comida', normal: 'Chocolate', impostor: 'Caramelo' },

    // ANIMALES
    { category: 'Animales', normal: 'Perro', impostor: 'Lobo' },
    { category: 'Animales', normal: 'Gato', impostor: 'Tigre' },
    { category: 'Animales', normal: 'Caballo', impostor: 'Burro' },
    { category: 'Animales', normal: 'Delfín', impostor: 'Tiburón' },
    { category: 'Animales', normal: 'Águila', impostor: 'Halcón' },
    { category: 'Animales', normal: 'León', impostor: 'Leopardo' },
    { category: 'Animales', normal: 'Oso', impostor: 'Panda' },
    { category: 'Animales', normal: 'Elefante', impostor: 'Rinoceronte' },
    { category: 'Animales', normal: 'Cocodrilo', impostor: 'Caimán' },
    { category: 'Animales', normal: 'Abeja', impostor: 'Avispa' },
    { category: 'Animales', normal: 'Mariposa', impostor: 'Polilla' },
    { category: 'Animales', normal: 'Rana', impostor: 'Sapo' },
    { category: 'Animales', normal: 'Conejo', impostor: 'Liebre' },
    { category: 'Animales', normal: 'Ratón', impostor: 'Rata' },
    { category: 'Animales', normal: 'Vaca', impostor: 'Toro' },
    { category: 'Animales', normal: 'Oveja', impostor: 'Cabra' },
    { category: 'Animales', normal: 'Pingüino', impostor: 'Pato' },
    { category: 'Animales', normal: 'Tortuga', impostor: 'Caracol' },
    { category: 'Animales', normal: 'Serpiente', impostor: 'Gusano' },
    { category: 'Animales', normal: 'Araña', impostor: 'Escorpión' },

    // TECNOLOGÍA
    { category: 'Tecnología', normal: 'Instagram', impostor: 'TikTok' },
    { category: 'Tecnología', normal: 'Netflix', impostor: 'YouTube' },
    { category: 'Tecnología', normal: 'iPhone', impostor: 'Android' },
    { category: 'Tecnología', normal: 'Laptop', impostor: 'Tablet' },
    { category: 'Tecnología', normal: 'Teclado', impostor: 'Mouse' },
    { category: 'Tecnología', normal: 'Wifi', impostor: 'Bluetooth' },
    { category: 'Tecnología', normal: 'Facebook', impostor: 'Twitter' },
    { category: 'Tecnología', normal: 'Spotify', impostor: 'Apple Music' },
    { category: 'Tecnología', normal: 'PlayStation', impostor: 'Xbox' },
    { category: 'Tecnología', normal: 'Google', impostor: 'Bing' },
    { category: 'Tecnología', normal: 'Whatsapp', impostor: 'Telegram' },
    { category: 'Tecnología', normal: 'Cámara', impostor: 'Celular' },
    { category: 'Tecnología', normal: 'Audífonos', impostor: 'Parlante' },
    { category: 'Tecnología', normal: 'USB', impostor: 'Disco Duro' },
    { category: 'Tecnología', normal: 'Monitor', impostor: 'Televisor' },

    // OBJETOS
    { category: 'Objetos', normal: 'Lápiz', impostor: 'Bolígrafo' },
    { category: 'Objetos', normal: 'Guitarra', impostor: 'Violín' },
    { category: 'Objetos', normal: 'Silla', impostor: 'Sofá' },
    { category: 'Objetos', normal: 'Cuchara', impostor: 'Tenedor' },
    { category: 'Objetos', normal: 'Vaso', impostor: 'Taza' },
    { category: 'Objetos', normal: 'Mesa', impostor: 'Escritorio' },
    { category: 'Objetos', normal: 'Cama', impostor: 'Hamaca' },
    { category: 'Objetos', normal: 'Reloj', impostor: 'Pulsera' },
    { category: 'Objetos', normal: 'Anillo', impostor: 'Collar' },
    { category: 'Objetos', normal: 'Llave', impostor: 'Candado' },
    { category: 'Objetos', normal: 'Espejo', impostor: 'Ventana' },
    { category: 'Objetos', normal: 'Libro', impostor: 'Revista' },
    { category: 'Objetos', normal: 'Mochila', impostor: 'Bolso' },
    { category: 'Objetos', normal: 'Sombrilla', impostor: 'Impermeable' },
    { category: 'Objetos', normal: 'Tijeras', impostor: 'Cuchillo' },
    { category: 'Objetos', normal: 'Cepillo de dientes', impostor: 'Peine' },
    { category: 'Objetos', normal: 'Jabón', impostor: 'Champú' },
    { category: 'Objetos', normal: 'Toalla', impostor: 'Sábana' },
    { category: 'Objetos', normal: 'Almohada', impostor: 'Cojín' },
    { category: 'Objetos', normal: 'Lámpara', impostor: 'Linterna' },

    // TRANSPORTE
    { category: 'Transporte', normal: 'Avión', impostor: 'Helicóptero' },
    { category: 'Transporte', normal: 'Barco', impostor: 'Submarino' },
    { category: 'Transporte', normal: 'Taxi', impostor: 'Uber' },
    { category: 'Transporte', normal: 'Bus', impostor: 'Tren' },
    { category: 'Transporte', normal: 'Bicicleta', impostor: 'Moto' },
    { category: 'Transporte', normal: 'Coche', impostor: 'Camión' },
    { category: 'Transporte', normal: 'Patineta', impostor: 'Patines' },
    { category: 'Transporte', normal: 'Globo', impostor: 'Dirigible' },
    { category: 'Transporte', normal: 'Metro', impostor: 'Tranvía' },
    { category: 'Transporte', normal: 'Yate', impostor: 'Velero' },

    // PROFESIONES
    { category: 'Profesiones', normal: 'Doctor', impostor: 'Enfermero' },
    { category: 'Profesiones', normal: 'Policía', impostor: 'Guardia' },
    { category: 'Profesiones', normal: 'Profesor', impostor: 'Maestro' },
    { category: 'Profesiones', normal: 'Actor', impostor: 'Cantante' },
    { category: 'Profesiones', normal: 'Pintor', impostor: 'Escultor' },
    { category: 'Profesiones', normal: 'Escritor', impostor: 'Periodista' },
    { category: 'Profesiones', normal: 'Ingeniero', impostor: 'Arquitecto' },
    { category: 'Profesiones', normal: 'Cocinero', impostor: 'Mesero' },
    { category: 'Profesiones', normal: 'Abogado', impostor: 'Juez' },
    { category: 'Profesiones', normal: 'Bombero', impostor: 'Paramédico' },
    { category: 'Profesiones', normal: 'Astronauta', impostor: 'Piloto' },
    { category: 'Profesiones', normal: 'Fotógrafo', impostor: 'Diseñador' },
    { category: 'Profesiones', normal: 'Carpintero', impostor: 'Albañil' },
    { category: 'Profesiones', normal: 'Mecánico', impostor: 'Electricista' },
    { category: 'Profesiones', normal: 'Dentista', impostor: 'Ortodoncista' },

    // ROPA
    { category: 'Ropa', normal: 'Camisa', impostor: 'Camiseta' },
    { category: 'Ropa', normal: 'Pantalón', impostor: 'Shorts' },
    { category: 'Ropa', normal: 'Zapato', impostor: 'Zapatilla' },
    { category: 'Ropa', normal: 'Calcetines', impostor: 'Medias' },
    { category: 'Ropa', normal: 'Abrigo', impostor: 'Chaqueta' },
    { category: 'Ropa', normal: 'Sombrero', impostor: 'Gorra' },
    { category: 'Ropa', normal: 'Bufanda', impostor: 'Corbata' },
    { category: 'Ropa', normal: 'Vestido', impostor: 'Falda' },
    { category: 'Ropa', normal: 'Cinturón', impostor: 'Tirantes' },
    { category: 'Ropa', normal: 'Guantes', impostor: 'Mitones' },
    { category: 'Ropa', normal: 'Pijama', impostor: 'Bata' },
    { category: 'Ropa', normal: 'Bikini', impostor: 'Bañador' },
    { category: 'Ropa', normal: 'Lentes', impostor: 'Gafas de sol' },
    { category: 'Ropa', normal: 'Aretes', impostor: 'Collar' },
    { category: 'Ropa', normal: 'Botas', impostor: 'Tacones' },

    // DEPORTES
    { category: 'Deportes', normal: 'Fútbol', impostor: 'Futsal' },
    { category: 'Deportes', normal: 'Tenis', impostor: 'Pádel' },
    { category: 'Deportes', normal: 'Baloncesto', impostor: 'Voleibol' },
    { category: 'Deportes', normal: 'Béisbol', impostor: 'Sóftbol' },
    { category: 'Deportes', normal: 'Natación', impostor: 'Waterpolo' },
    { category: 'Deportes', normal: 'Boxeo', impostor: 'Karate' },
    { category: 'Deportes', normal: 'Golf', impostor: 'Hockey' },
    { category: 'Deportes', normal: 'Rugby', impostor: 'Fútbol Americano' },
    { category: 'Deportes', normal: 'Ciclismo', impostor: 'Motociclismo' },
    { category: 'Deportes', normal: 'Esquí', impostor: 'Snowboard' },
    
    // CINE Y TV
    { category: 'Cine y TV', normal: 'Película', impostor: 'Serie' },
    { category: 'Cine y TV', normal: 'Comedia', impostor: 'Drama' },
    { category: 'Cine y TV', normal: 'Terror', impostor: 'Suspenso' },
    { category: 'Cine y TV', normal: 'Dibujos Animados', impostor: 'Anime' },
    { category: 'Cine y TV', normal: 'Superman', impostor: 'Batman' },
    { category: 'Cine y TV', normal: 'Star Wars', impostor: 'Star Trek' },
    { category: 'Cine y TV', normal: 'Harry Potter', impostor: 'El Señor de los Anillos' },
    { category: 'Cine y TV', normal: 'Disney', impostor: 'Pixar' },
    { category: 'Cine y TV', normal: 'Marvel', impostor: 'DC' },
    { category: 'Cine y TV', normal: 'Actor', impostor: 'Director' },

    // NATURALEZA
    { category: 'Naturaleza', normal: 'Sol', impostor: 'Luna' },
    { category: 'Naturaleza', normal: 'Lluvia', impostor: 'Nieve' },
    { category: 'Naturaleza', normal: 'Río', impostor: 'Lago' },
    { category: 'Naturaleza', normal: 'Mar', impostor: 'Océano' },
    { category: 'Naturaleza', normal: 'Árbol', impostor: 'Arbusto' },
    { category: 'Naturaleza', normal: 'Flor', impostor: 'Hoja' },
    { category: 'Naturaleza', normal: 'Piedra', impostor: 'Roca' },
    { category: 'Naturaleza', normal: 'Volcán', impostor: 'Montaña' },
    { category: 'Naturaleza', normal: 'Desierto', impostor: 'Playa' },
    { category: 'Naturaleza', normal: 'Nube', impostor: 'Niebla' },
  ];

  // Extraer categorías únicas para el menú
  const availableCategories = ['Aleatorio', ...new Set(words.map(w => w.category))];

  // --- GESTIÓN DE JUGADORES ---
  const addPlayer = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !players.includes(trimmed)) {
      setPlayers([...players, trimmed]);
      setInputValue('');
    }
  };

  const removePlayer = (index) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1);
    setPlayers(newPlayers);
    if (impostorCount >= newPlayers.length && impostorCount > 1) {
        setImpostorCount(newPlayers.length - 1);
    }
  };

  // --- GESTIÓN DE CATEGORÍAS ---
  const toggleCategory = (category) => {
    if (category === 'Aleatorio') {
      setSelectedCategories(['Aleatorio']);
    } else {
      let newCategories = selectedCategories.filter(c => c !== 'Aleatorio'); 
      if (selectedCategories.includes(category)) {
        newCategories = newCategories.filter(c => c !== category);
      } else {
        newCategories.push(category);
      }
      if (newCategories.length === 0) newCategories = ['Aleatorio'];
      setSelectedCategories(newCategories);
    }
  };

  // --- LÓGICA DEL JUEGO ---
  const startGame = () => {
    if (players.length < 3) return;
    
    // Iniciar timer
    setTimeLeft(420);
    setGameWinner(null);

    // 1. Filtrar palabras
    let pool = words;
    if (!selectedCategories.includes('Aleatorio')) {
        pool = words.filter(w => selectedCategories.includes(w.category));
    }

    // 2. Filtrar ya usadas
    let availableWordIndices = pool.map(w => words.indexOf(w));
    let freshIndices = availableWordIndices.filter(idx => !usedWordsIndices.includes(idx));

    if (freshIndices.length === 0) {
        freshIndices = availableWordIndices;
        const newUsedHistory = usedWordsIndices.filter(idx => !availableWordIndices.includes(idx));
        setUsedWordsIndices(newUsedHistory);
    }

    const randomGlobalIndex = freshIndices[Math.floor(Math.random() * freshIndices.length)];
    const randomWordObj = words[randomGlobalIndex];
    setUsedWordsIndices(prev => [...prev, randomGlobalIndex]);
    
    // 3. Selección de impostores
    let availableIndices = players.map((_, i) => i);
    let selectedImpostors = [];
    
    for (let i = 0; i < impostorCount; i++) {
        const randomIndex = Math.floor(Math.random() * availableIndices.length);
        selectedImpostors.push(availableIndices[randomIndex]);
        availableIndices.splice(randomIndex, 1);
    }

    // 4. Orden aleatorio
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    
    setGameData({
      impostorIndices: selectedImpostors,
      wordObj: randomWordObj,
      currentRevealIndex: 0,
      turnOrder: shuffledPlayers,
      eliminatedPlayers: []
    });
    
    setVoteResult(null);
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

  const handleVote = (player) => {
    const playerIndex = players.indexOf(player);
    const isImpostor = gameData.impostorIndices.includes(playerIndex);
    
    setVoteResult({
        player: player,
        isImpostor: isImpostor,
        role: isImpostor ? 'IMPOSTOR' : 'CIUDADANO'
    });
    
    setGameData(prev => ({
        ...prev,
        eliminatedPlayers: [...prev.eliminatedPlayers, player]
    }));
  };

  const continueGame = () => {
    const impostorsAlive = gameData.impostorIndices.filter(idx => !gameData.eliminatedPlayers.includes(players[idx])).length;
    // Total votos disponibles = número de impostores. 
    // Votos usados = jugadores eliminados.
    const votesUsed = gameData.eliminatedPlayers.length;
    const maxVotes = impostorCount;

    if (impostorsAlive === 0) {
        // Todos los impostores atrapados
        setGameWinner('citizens');
        setGameState('round_end');
    } else if (votesUsed >= maxVotes) {
        // Se acabaron los votos y quedan impostores
        setGameWinner('impostors');
        setGameState('round_end');
    } else {
        // Quedan votos y quedan impostores
        setVoteResult(null);
        setGameState('playing');
    }
  };

  // --- COMPONENTES VISUALES ---

  const ExitButton = () => (
    <button onClick={onExit} className="absolute top-4 left-4 p-2 bg-white/10 rounded-full hover:bg-white/20 text-gray-300 z-50">
        <Home size={20} />
    </button>
  );

  // 1. SETUP SCREEN
  if (gameState === 'setup') {
    const maxImpostors = Math.max(1, Math.floor((players.length - 1) / 2));

    return (
      <div className="min-h-screen p-6 flex flex-col max-w-lg mx-auto animate-fadeIn pb-10">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onExit} className="text-gray-400 hover:text-white"><ArrowLeft /></button>
          <h2 className="text-xl font-bold text-red-500 flex items-center gap-2"><Ghost /> El Impostor</h2>
          <div className="w-6"></div>
        </div>

        <Card className="mb-6 flex-1 flex flex-col bg-gray-900 border-red-900/30">
          
          <div className="flex-1 overflow-y-auto space-y-2 mb-4 max-h-48 custom-scrollbar">
            {players.length === 0 && (
                <div className="text-center py-8 opacity-50"><Users size={48} className="mx-auto mb-2" /><p className="italic">Añade al menos 3 jugadores</p></div>
            )}
            {players.map((p, i) => (
              <div key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                <span className="text-white font-medium">{p}</span>
                <button onClick={() => removePlayer(i)} className="text-red-400 hover:text-red-300">✕</button>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mb-6">
            <input 
              type="text" 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && addPlayer()} 
              placeholder="Nombre..." 
              className="flex-1 bg-black/30 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
            />
            <button onClick={addPlayer} className="bg-red-600 hover:bg-red-500 text-white px-4 rounded-lg font-bold">+</button>
          </div>

          <div className="space-y-4">
              
              {players.length >= 3 && (
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400 text-xs uppercase font-bold flex items-center gap-2"><Ghost size={14}/> Impostores</span>
                          <span className="text-red-500 font-black text-lg">{impostorCount}</span>
                      </div>
                      <div className="flex gap-2">
                          {[...Array(maxImpostors)].map((_, i) => (
                              <button 
                                key={i}
                                onClick={() => setImpostorCount(i + 1)}
                                className={`flex-1 py-1 rounded-lg font-bold text-sm transition-all ${impostorCount === i + 1 ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-500 hover:bg-gray-700'}`}
                              >
                                  {i + 1}
                              </button>
                          ))}
                      </div>
                  </div>
              )}

              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-xs uppercase font-bold flex items-center gap-2"><Grid size={14}/> Categorías</span>
                      <span className="text-red-300 text-xs font-bold bg-red-500/10 px-2 py-0.5 rounded">
                        {selectedCategories.includes('Aleatorio') ? 'Todas' : `${selectedCategories.length} Seleccionadas`}
                      </span>
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto custom-scrollbar content-start">
                      {availableCategories.map((cat) => {
                          const isActive = selectedCategories.includes(cat);
                          return (
                              <button
                                key={cat}
                                onClick={() => toggleCategory(cat)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 border
                                    ${isActive
                                        ? 'bg-red-600 border-red-500 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)]' 
                                        : 'bg-black/40 border-white/10 text-gray-400 hover:bg-white/10'}`}
                              >
                                  {cat === 'Aleatorio' && <Shuffle size={10} />}
                                  {cat}
                              </button>
                          );
                      })}
                  </div>
              </div>

          </div>
        </Card>

        <Button onClick={startGame} disabled={players.length < 3} variant="primary" className="!bg-gradient-to-r !from-red-600 !to-orange-700">
            COMENZAR PARTIDA
        </Button>
      </div>
    );
  }

  // 2. REVEAL SCREEN
  if (gameState === 'reveal') {
    const currentPlayer = players[gameData.currentRevealIndex];
    const isImpostor = gameData.impostorIndices.includes(gameData.currentRevealIndex);
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
        
        {/* Timer */}
        <div className="absolute top-6 right-6 flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
            <Clock size={16} className={timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-gray-400'} />
            <span className={`font-mono font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-white'}`}>{formatTime(timeLeft)}</span>
        </div>

        <div className="mb-6 w-full max-w-sm mt-8">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            <Ghost size={32} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">¡A DEBATIR!</h2>
          <div className="flex justify-center gap-2 text-xs">
             <span className="bg-white/10 px-2 py-1 rounded text-gray-300">Impostores: <b>{impostorCount}</b></span>
             <span className="bg-red-500/20 px-2 py-1 rounded text-red-300">Categoría: <b>{gameData.wordObj.category}</b></span>
          </div>
        </div>

        <Card className="w-full max-w-sm mb-6 !p-4 bg-gray-900/80">
            <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <ListOrdered size={16} /> Orden de Turnos
            </h4>
            <div className="space-y-2 text-left max-h-48 overflow-y-auto custom-scrollbar">
                {gameData.turnOrder.map((p, i) => {
                    const isEliminated = gameData.eliminatedPlayers.includes(p);
                    return (
                        <div key={i} className={`flex items-center gap-3 p-2 rounded-lg border ${isEliminated ? 'border-red-500/30 bg-red-900/10 opacity-50' : 'border-white/5 bg-white/5'}`}>
                            <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-green-500 text-black' : 'bg-gray-700 text-gray-300'}`}>
                                {i + 1}
                            </div>
                            <span className={`font-medium truncate ${isEliminated ? 'text-red-400 line-through' : 'text-white'}`}>{p}</span>
                            {i === 0 && <span className="text-xs text-green-400 ml-auto font-bold">Empieza</span>}
                            {isEliminated && <span className="text-xs text-red-500 ml-auto font-bold">Votado</span>}
                        </div>
                    );
                })}
            </div>
        </Card>

        <div className="w-full max-w-sm">
          <Button onClick={() => setGameState('voting')} variant="danger">
            <Fingerprint size={20} className="mr-2" /> VOTAR AHORA
          </Button>
        </div>
      </div>
    );
  }

  // 4. VOTING SCREEN
  if (gameState === 'voting') {
      const activePlayers = players.filter(p => !gameData.eliminatedPlayers.includes(p));
      const votesRemaining = impostorCount - gameData.eliminatedPlayers.length;

      if (voteResult) {
          return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 border-4 ${voteResult.isImpostor ? 'bg-green-500/20 border-green-500' : 'bg-red-500/20 border-red-500'}`}>
                    {voteResult.isImpostor ? <CheckCircle size={64} className="text-green-500" /> : <XCircle size={64} className="text-red-500" />}
                </div>
                
                <h2 className="text-gray-400 uppercase tracking-widest text-sm mb-2">Votaron por {voteResult.player}</h2>
                <h1 className="text-4xl font-black text-white mb-4">
                    {voteResult.isImpostor ? '¡ERA IMPOSTOR!' : '¡ERA INOCENTE!'}
                </h1>
                
                <p className="text-gray-400 max-w-xs mx-auto mb-10">
                    {voteResult.isImpostor 
                        ? '¡Excelente! Han atrapado a uno.' 
                        : 'Han expulsado a un inocente.'}
                </p>

                <Button onClick={continueGame} variant={voteResult.isImpostor ? 'primary' : 'secondary'}>
                    CONTINUAR
                </Button>
            </div>
          );
      }

      return (
        <div className="min-h-screen flex flex-col items-center p-6 text-center animate-fadeIn relative pt-10">
            <button onClick={() => setGameState('playing')} className="absolute top-4 left-4 text-gray-400 hover:text-white flex items-center gap-1"><ArrowLeft size={16}/> Volver</button>
            
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-white mb-1">¿Quién es el sospechoso?</h2>
                <p className="text-red-400 text-sm font-bold">Votos restantes: {votesRemaining}</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3 w-full max-w-md pb-10">
                {activePlayers.map((p) => (
                    <button 
                        key={p}
                        onClick={() => handleVote(p)}
                        className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-red-500/20 hover:border-red-500 active:scale-95 transition-all text-left flex justify-between items-center group"
                    >
                        <span className="text-lg font-bold text-white group-hover:text-red-200">{p}</span>
                        <Fingerprint className="text-gray-600 group-hover:text-red-500" />
                    </button>
                ))}
            </div>
        </div>
      );
  }

  // 5. ROUND END
  if (gameState === 'round_end') {
     const isVictory = gameWinner === 'citizens';

     return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center animate-fadeIn relative">
        <ExitButton />
        <div className="mb-6 relative">
            <div className={`absolute inset-0 blur-3xl opacity-20 rounded-full ${isVictory ? 'bg-green-500' : 'bg-red-500'}`}></div>
            {isVictory ? <Users size={80} className="text-green-400 relative z-10" /> : <Ghost size={80} className="text-red-500 relative z-10" />}
        </div>
        
        <h1 className="text-4xl font-black text-white mb-2">{isVictory ? '¡VICTORIA CIUDADANA!' : '¡GANAN LOS IMPOSTORES!'}</h1>
        <p className="text-gray-400 mb-8 max-w-xs mx-auto">
            {isVictory 
                ? 'Todos los impostores han sido descubiertos.' 
                : 'Se acabaron los votos y los impostores siguen libres.'}
        </p>

        <Card className={`w-full max-w-sm mb-6 bg-gray-900 ${isVictory ? 'border-green-500/30' : 'border-red-500/30'}`}>
            <div className="text-center">
                <span className="text-sm text-gray-400 uppercase block mb-1">Palabra Secreta</span>
                <strong className="text-white text-3xl">{gameData.wordObj?.normal}</strong>
            </div>
            {!isVictory && (
                <div className="mt-4 pt-4 border-t border-white/10">
                    <span className="text-sm text-gray-400 uppercase block mb-1">Los Impostores eran</span>
                    <div className="text-red-400 font-bold text-lg">
                        {gameData.impostorIndices.map(idx => players[idx]).join(', ')}
                    </div>
                </div>
            )}
        </Card>

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