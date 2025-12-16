import React, { useState, useEffect } from 'react';
import { Video, ArrowLeft, Check, X, RefreshCw, Home, Clock } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';

const MimicGame = ({ onExit }) => {
  // Base de datos de Mímica (200+ Palabras)
  const words = [
    // ANIMALES
    "Gorila", "Gallina", "Canguro", "Pingüino", "Serpiente", "Elefante", "Jirafa", "Tiranosaurio Rex",
    "Gato asustado", "Perro haciendo pipí", "Mosca", "Mosquito", "Perezoso", "Cangrejo", "Lobo aullando",
    "Pez fuera del agua", "Rana", "Caballo", "Toro", "Cerdo", "Mono", "Águila", "Murciélago", "Ballena",
    "Delfín", "Tiburón", "Pulpo", "Camello", "Hámster", "Ardilla", "Castor", "Foca aplaudiendo",
    
    // ACCIONES
    "Lavarse los dientes", "Ducharse con agua fría", "Cambiar un pañal", "Planchar una camisa",
    "Manejar un auto de carreras", "Pisar caca de perro", "Caminar sobre brasas calientes",
    "Recibir una mala noticia", "Ganar la lotería", "Ver una película de terror", "Comer limón",
    "Tener mucho frío", "Tener muchas ganas de orinar", "Estar borracho", "Caminar con tacones",
    "Pintarse las uñas", "Afeitarse", "Maquillarse", "Secarse el pelo", "Cortar cebolla (llorando)",
    "Sacar a pasear un perro rebelde", "Montar a caballo", "Ordeñar una vaca", "Pescar un pez grande",
    "Hacer surf", "Esquiar", "Jugar tenis", "Boxear", "Levantar pesas", "Hacer yoga", "Meditar",
    "Bailar ballet", "Bailar reggaetón", "Bailar tango", "Tocar la guitarra", "Tocar la batería",
    "Tocar el violín", "Cantar ópera", "Dirigir una orquesta", "Ser un DJ", "Sacarse una selfie",
    "Escribir un mensaje rápido", "Jugar videojuegos", "Ver un partido de fútbol (gol)",
    "Hacerse el dormido", "Roncar fuerte", "Tener una pesadilla", "Despertar tarde",
    "Perder el autobús", "Llamar a un taxi", "Abrir un paraguas con viento", "Caminar contra el viento",
    "Resbalar con una cáscara de plátano", "Chocarse con una puerta de vidrio", "Pisar una pieza de Lego",
    "Quemarse la lengua", "Comer espaguetis", "Beber con pajita", "Inflar un globo",
    
    // PELÍCULAS / PERSONAJES
    "Harry Potter", "Spider-Man", "Batman", "Superman", "Wonder Woman", "Hulk", "Iron Man",
    "Capitán América", "Thor", "Joker", "Darth Vader", "Yoda", "Chewbacca", "E.T.",
    "Titanic (escena del barco)", "El Rey León", "Shrek", "Toy Story (Buzz Lightyear)",
    "Frozen (Elsa)", "Mickey Mouse", "Pikachu", "Mario Bros", "Sonic", "Piratas del Caribe",
    "James Bond", "Indiana Jones", "Terminator", "Rocky Balboa", "Forrest Gump", "El Exorcista",
    "Frankenstein", "Drácula", "La Momia", "Hombre Lobo", "Zombie", "Fantasma", "Bruja",
    "Michael Jackson (bailando)", "Elvis Presley", "Marilyn Monroe", "Freddie Mercury",
    "Beyoncé", "Shakira", "Lady Gaga", "Messi", "Cristiano Ronaldo", "Donald Trump",
    
    // PROFESIONES
    "Bombero", "Policía", "Ladrón", "Médico", "Cirujano", "Dentista", "Enfermero", "Veterinario",
    "Profesor", "Científico loco", "Astronauta", "Piloto de avión", "Azafata", "Soldado",
    "Cocinero / Chef", "Camarero", "Panadero", "Carnicero", "Pescadero", "Granjero", "Jardinero",
    "Albañil", "Fontanero", "Electricista", "Pintor (de casas)", "Pintor (artista)", "Escultor",
    "Fotógrafo", "Modelo", "Actor", "Payaso", "Mimo", "Mago", "Domador de leones", "Trapecista",
    "Bailarina de striptease", "Sacerdote", "Monja", "Presidente", "Juez", "Abogado", "Detective",
    "Espía", "Ninja", "Samurái", "Vaquero", "Indio", "Pirata", "Vikingo", "Robot",
    
    // DEPORTES
    "Fútbol (portero)", "Fútbol (chutar penalti)", "Baloncesto (tiro libre)", "Voleibol (remate)",
    "Tenis (saque)", "Ping Pong", "Bádminton", "Golf (swing)", "Béisbol (batear)", "Rugby",
    "Fútbol Americano", "Natación (crol)", "Natación (mariposa)", "Salto de trampolín",
    "Waterpolo", "Surf", "Windsurf", "Kitesurf", "Esquí acuático", "Remo", "Piragüismo",
    "Atletismo (salto de valla)", "Atletismo (salto de altura)", "Atletismo (salto de longitud)",
    "Lanzamiento de jabalina", "Lanzamiento de peso", "Gimnasia rítmica", "Patinaje artístico",
    "Hockey sobre hielo", "Curling", "Escalada", "Paracaidismo", "Puenting", "Bolos",
    "Billar", "Dardos", "Tiro con arco", "Esgrima", "Karate", "Judo", "Sumo", "Lucha libre",
    
    // OBJETOS (Difícil: Ser el objeto)
    "Lavadora", "Licuadora", "Tostadora", "Microondas", "Aspiradora", "Ventilador",
    "Secador de pelo", "Taladro", "Motosierra", "Cortacésped", "Reloj de péndulo",
    "Despertador", "Teléfono vibrando", "Cámara de fotos", "Televisión sin señal",
    "Radio", "Coche arrancando", "Moto acelerando", "Avión despegando", "Helicóptero",
    "Tren de vapor", "Barco hundiéndose", "Submarino", "Cohete espacial",
    "Árbol cayendo", "Flor abriéndose", "Volcán en erupción", "Olas del mar",
    "Estatua", "Muñeco de nieve", "Espantapájaros", "Semáforo", "Cajero automático",
  ];

  const [gameState, setGameState] = useState('intro'); // intro, playing, result
  const [currentWord, setCurrentWord] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(0);

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setGameState('result');
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    nextWord();
    setGameState('playing');
    setIsActive(true);
  };

  const nextWord = () => {
    const random = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(random);
  };

  const handleCorrect = () => {
    setScore(score + 1);
    nextWord();
  };

  const handleSkip = () => {
    nextWord();
  };

  // 1. INTRO
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <div className="absolute inset-0 bg-teal-900/10 pointer-events-none"></div>
        <button onClick={onExit} className="absolute top-4 left-4 p-2 bg-white/10 rounded-full hover:bg-white/20 text-gray-300 z-50"><Home size={24} /></button>
        
        <div className="mb-8 z-10">
           <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-teal-500/30">
                <Video size={40} className="text-teal-500" />
            </div>
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500 uppercase">Mímica</h2>
            <p className="text-gray-400 mt-4 max-w-xs mx-auto">
                Tienes 60 segundos para que tu equipo adivine la mayor cantidad de palabras posible. ¡Solo gestos!
            </p>
        </div>
        <Button onClick={startGame} variant="primary" className="!bg-gradient-to-r !from-teal-600 !to-emerald-600">COMENZAR TURNO</Button>
      </div>
    );
  }

  // 2. PLAYING
  if (gameState === 'playing') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center relative">
        <div className="absolute top-6 right-6 flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full border border-gray-700">
            <Clock size={20} className={timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-teal-400'} />
            <span className={`text-2xl font-mono font-bold ${timeLeft < 10 ? 'text-red-500' : 'text-white'}`}>{timeLeft}s</span>
        </div>
        
        <div className="mb-2 text-gray-500 font-bold uppercase tracking-widest text-sm">Puntos: {score}</div>
        
        <Card className="w-full max-w-sm aspect-square flex flex-col items-center justify-center p-4 mb-8 bg-gray-900 border-teal-500/30">
            <p className="text-4xl md:text-5xl font-black text-white leading-tight uppercase">{currentWord}</p>
        </Card>

        <div className="flex gap-4 w-full max-w-sm">
            <button onClick={handleSkip} className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-500 py-6 rounded-2xl flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform">
                <X size={32} />
                <span className="font-bold">PASAR</span>
            </button>
            <button onClick={handleCorrect} className="flex-1 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-500 py-6 rounded-2xl flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform">
                <Check size={32} />
                <span className="font-bold">CORRECTO</span>
            </button>
        </div>
      </div>
    );
  }

  // 3. RESULT
  if (gameState === 'result') {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-gray-400 uppercase tracking-widest mb-4">Tiempo Terminado</h2>
            <div className="text-8xl font-black text-white mb-2">{score}</div>
            <p className="text-teal-500 font-bold text-xl mb-10">Puntos Conseguidos</p>
            
            <div className="w-full max-w-xs space-y-4">
                <Button onClick={startGame} variant="primary" className="!bg-gradient-to-r !from-teal-600 !to-emerald-600">SIGUIENTE JUGADOR</Button>
                <Button onClick={() => setGameState('intro')} variant="secondary">VOLVER AL INICIO</Button>
                <button onClick={onExit} className="text-gray-500 underline mt-4">Salir al menú principal</button>
            </div>
        </div>
      );
  }
};

export default MimicGame;