import React, { useState, useEffect, useRef } from 'react';
import { Bomb, ArrowLeft, Zap, Skull, Home, Play } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';

const BombGame = ({ onExit }) => {
  const [gameState, setGameState] = useState('setup'); // setup, ticking, exploded
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [intensity, setIntensity] = useState(0); // 0 a 100 (para la animación)
  
  // Referencias para el temporizador
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const durationRef = useRef(0);

  // --- BASE DE DATOS DE TEMAS ---
  const prompts = [
    "Palabras que rimen con 'AMOR'", "Marcas de Autos", "Nombres de mujer con M", "Animales que vuelan",
    "Cosas que encuentras en un baño", "Insultos (sin ofenderse)", "Marcas de Cerveza", "Países de Europa",
    "Palabras que terminen en '-CIÓN'", "Palabras que empiecen por 'P'", "Ingredientes de Pizza",
    "Deportes con pelota", "Personajes de Los Simpson", "Cosas rojas", "Cosas que huelen mal",
    "Superhéroes", "Marcas de Ropa", "Partes del cuerpo", "Verbos en infinitivo (ar, er, ir)",
    "Nombres de hombre con J", "Capitales del mundo", "Sabores de helado", "Cosas que haces en la cama",
    "Palabras en Inglés que usamos en Español", "Cosas redondas", "Frutas", "Verduras",
    "Animales marinos", "Instrumentos musicales", "Cosas que llevas en la cartera/bolsillo",
    "Excusas para llegar tarde", "Películas de Disney", "Cosas que se rompen fácil",
    "Palabras que rimen con 'GATO'", "Cosas frías", "Cosas calientes", "Marcas de tecnología",
    "Redes sociales", "Youtubers o Influencers", "Cantantes de Reggaetón", "Equipos de Fútbol",
    "Cosas pegajosas", "Cosas que compras en la farmacia", "Cosas ilegales", "Razones para divorciarse",
    "Cosas que flotan", "Cosas que hay en una nevera", "Cosas que dan miedo", "Animales extintos",
    "Palabras esdrújulas", "Palabras de 4 letras", "Nombres de mascotas", "Cosas de plástico"
  ];

  // --- LÓGICA ---

  const startGame = () => {
    // 1. Elegir tema
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentPrompt(randomPrompt);

    // 2. Definir duración aleatoria (entre 15 y 45 segundos)
    const randomDuration = Math.floor(Math.random() * (45000 - 15000 + 1) + 15000);
    durationRef.current = randomDuration;
    startTimeRef.current = Date.now();

    // 3. Iniciar estado
    setGameState('ticking');
    setIntensity(0);

    // 4. Loop de animación y control
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = elapsed / durationRef.current; // 0.0 a 1.0

      if (progress >= 1) {
        explode();
      } else {
        // Aumentar intensidad exponencialmente para más tensión al final
        setIntensity(Math.pow(progress, 2) * 100); 
      }
    }, 100);
  };

  const explode = () => {
    clearInterval(timerRef.current);
    setGameState('exploded');
    // Aquí podrías disparar vibración del navegador si es compatible
    if (navigator.vibrate) navigator.vibrate([500, 100, 500]); 
  };

  // Limpiar timer al salir
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  // --- RENDER ---

  // 1. SETUP
  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <div className="absolute inset-0 bg-orange-900/10 pointer-events-none"></div>
        <button onClick={onExit} className="absolute top-4 left-4 p-2 bg-white/10 rounded-full hover:bg-white/20 text-gray-300 z-50"><Home size={24} /></button>
        
        <div className="mb-8 z-10 animate-bounce-slow">
           <div className="w-24 h-24 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                <Bomb size={48} className="text-orange-500" />
            </div>
            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 uppercase tracking-tighter">
                LA BOMBA
            </h2>
            <p className="text-gray-400 mt-4 max-w-xs mx-auto text-sm">
                Pasen el celular mientras responden. Nadie sabe cuándo explotará...
            </p>
        </div>

        <Button onClick={startGame} variant="primary" className="!bg-gradient-to-r !from-orange-600 !to-red-600 !text-xl !py-6 animate-pulse">
            <Zap size={24} className="mr-2" /> ENCENDER MECHA
        </Button>
      </div>
    );
  }

  // 2. TICKING (JUEGO ACTIVO)
  if (gameState === 'ticking') {
    // Calculamos estilos dinámicos basados en la intensidad
    // El fondo parpadea más rápido y más rojo cuanto más cerca del final
    const pulseSpeed = Math.max(0.2, 1 - (intensity / 100)); // De 1s a 0.2s
    const scale = 1 + (intensity / 500); // Crece un poco

    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center relative overflow-hidden transition-colors duration-300"
           style={{ backgroundColor: `rgba(${intensity * 2}, 0, 0, 0.3)` }}>
        
        {/* Fondo animado de peligro */}
        <div className="absolute inset-0 pointer-events-none" 
             style={{ 
               boxShadow: `inset 0 0 ${intensity * 2}px rgba(255, 0, 0, ${intensity/100})`,
               animation: `pulse-red ${pulseSpeed}s infinite`
             }}>
        </div>

        <div className="z-10 w-full max-w-md">
            <p className="text-gray-400 font-bold tracking-widest uppercase mb-4 animate-pulse">Rápido, digan...</p>
            
            <Card className="bg-gray-900/90 border-orange-500 shadow-2xl p-8 mb-10 transform transition-transform" style={{ transform: `scale(${scale})` }}>
                <p className="text-3xl md:text-4xl font-black text-white leading-tight uppercase">
                    {currentPrompt}
                </p>
            </Card>

            <div className="w-48 h-48 mx-auto relative flex items-center justify-center">
                <div className="absolute inset-0 bg-red-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
                <Bomb size={120} className="text-white relative z-10" 
                      style={{ 
                          animation: `shake ${pulseSpeed}s infinite`,
                          color: intensity > 80 ? '#ef4444' : 'white'
                      }} />
                {/* Mecha */}
                <div className="absolute top-0 right-10 text-yellow-400 text-4xl animate-bounce">
                    🔥
                </div>
            </div>
        </div>

        <style jsx>{`
            @keyframes shake {
                0% { transform: translate(1px, 1px) rotate(0deg); }
                10% { transform: translate(-1px, -2px) rotate(-1deg); }
                20% { transform: translate(-3px, 0px) rotate(1deg); }
                30% { transform: translate(3px, 2px) rotate(0deg); }
                40% { transform: translate(1px, -1px) rotate(1deg); }
                50% { transform: translate(-1px, 2px) rotate(-1deg); }
                60% { transform: translate(-3px, 1px) rotate(0deg); }
                70% { transform: translate(3px, 1px) rotate(-1deg); }
                80% { transform: translate(-1px, -1px) rotate(1deg); }
                90% { transform: translate(1px, 2px) rotate(0deg); }
                100% { transform: translate(1px, -2px) rotate(-1deg); }
            }
            @keyframes pulse-red {
                0% { opacity: 0.5; }
                50% { opacity: 1; }
                100% { opacity: 0.5; }
            }
        `}</style>
      </div>
    );
  }

  // 3. EXPLODED
  if (gameState === 'exploded') {
      return (
        <div className="min-h-screen bg-red-600 flex flex-col items-center justify-center p-6 text-center animate-shake">
            <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
            
            <Skull size={100} className="text-black mb-6 animate-bounce" />
            
            <h1 className="text-6xl md:text-8xl font-black text-white mb-4 drop-shadow-lg">
                ¡BOOM!
            </h1>
            
            <Card className="bg-black/40 border-black/20 p-6 mb-10 w-full max-w-xs backdrop-blur-none">
                <p className="text-white text-xl font-bold uppercase">
                    Quien tenga el celular...
                </p>
                <div className="text-4xl mt-2">🍺</div>
                <p className="text-white text-2xl font-black mt-2 uppercase">
                    ¡BEBE!
                </p>
            </Card>

            <div className="w-full max-w-xs space-y-4 z-10">
                <Button onClick={startGame} variant="secondary" className="!bg-white !text-red-600 hover:!bg-gray-100">
                    OTRA RONDA
                </Button>
                <button onClick={onExit} className="text-white/70 hover:text-white underline font-bold">
                    Volver al menú
                </button>
            </div>

            <style jsx>{`
                .animate-shake {
                    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                }
            `}</style>
        </div>
      );
  }
};

export default BombGame;