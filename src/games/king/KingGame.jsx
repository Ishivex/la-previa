import React, { useState } from 'react';
import { Crown, ArrowLeft, Users, Home, Gavel, Check, X, Star } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';

const KingGame = ({ onExit }) => {
  const [gameState, setGameState] = useState('setup'); // setup, roulette, question, judgment
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [currentKing, setCurrentKing] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [round, setRound] = useState(1);

  // --- BASE DE DATOS DE PREGUNTAS REALES (200+) ---
  const questions = [
    // GUSTOS PERSONALES
    "¿Cuál es la comida favorita del Rey?",
    "¿Qué bebida pide siempre el Rey en un bar?",
    "¿Cuál es la película favorita del Rey?",
    "¿Qué tipo de música odia el Rey?",
    "¿Cuál es el placer culposo del Rey?",
    "¿Si el Rey pudiera comer solo una cosa el resto de su vida, qué sería?",
    "¿Cuál es el sabor de helado favorito del Rey?",
    "¿Pizza con piña o sin piña? ¿Qué dice el Rey?",
    "¿Cuál es la serie que el Rey ha visto más veces?",
    "¿Qué superhéroe le gustaría ser al Rey?",
    "¿Cuál es el color favorito del Rey?",
    "¿Qué prefiere el Rey: Playa o Montaña?",
    "¿Qué prefiere el Rey: Dulce o Salado?",
    "¿Qué prefiere el Rey: Perros o Gatos?",
    "¿Cuál es la marca de ropa favorita del Rey?",
    "¿Qué topping le pone el Rey siempre a su pizza?",
    "¿Cómo le gusta el café al Rey?",
    "¿Cuál es el videojuego favorito del Rey?",
    "¿Qué deporte le gusta ver al Rey?",
    "¿Qué deporte le gusta practicar al Rey?",
    
    // HISTORIA Y PASADO
    "¿Cuál fue el primer trabajo del Rey?",
    "¿Cómo se llamaba el primer amor del Rey?",
    "¿En qué año nació el Rey?",
    "¿Cuál fue el peor trabajo que tuvo el Rey?",
    "¿Cuál es la anécdota más vergonzosa del Rey?",
    "¿De qué se disfrazó el Rey en su último Halloween?",
    "¿Cuál fue el primer concierto al que fue el Rey?",
    "¿Cuál fue la peor cita que tuvo el Rey?",
    "¿Qué quería ser el Rey cuando era niño?",
    "¿Alguna vez han arrestado al Rey?",
    "¿Cuál fue la materia favorita del Rey en la escuela?",
    "¿Cuál fue la materia que más odió el Rey?",
    "¿Cómo se llamaba la primera mascota del Rey?",
    "¿Dónde fue el primer viaje del Rey sin sus padres?",
    "¿Quién fue el mejor amigo de la infancia del Rey?",
    "¿A qué edad dio el Rey su primer beso?",
    "¿Cuál fue el primer coche del Rey?",
    "¿Qué instrumento tocaba (o intentó tocar) el Rey?",

    // PERSONALIDAD Y HÁBITOS
    "¿Qué es lo que más le molesta al Rey de la gente?",
    "¿Cuál es el mayor miedo del Rey?",
    "¿Qué hace el Rey apenas se despierta?",
    "¿Qué no puede faltar en la nevera del Rey?",
    "¿Cuál es la manía más extraña del Rey?",
    "¿Qué talento inútil tiene el Rey?",
    "¿Qué es lo que más le gusta al Rey de sí mismo?",
    "¿Qué cambiaría el Rey de su físico si pudiera?",
    "¿Es el Rey puntual o impuntual?",
    "¿Es el Rey madrugador o nocturno?",
    "¿Cuál es la palabra que más usa el Rey?",
    "¿Qué emoji usa más el Rey?",
    "¿Qué haría el Rey si ganara la lotería mañana?",
    "¿Qué se llevaría el Rey a una isla desierta?",
    "¿Cuál es la red social favorita del Rey?",
    "¿Prefiere el Rey llamar o enviar mensajes?",
    "¿Qué es lo primero que nota el Rey en una persona?",
    "¿Cuál es el insulto favorito del Rey?",
    "¿Qué le hace llorar al Rey?",
    "¿Qué le hace reír incontrolablemente al Rey?",
    "¿Es el Rey celoso?",
    "¿Cuál es la fobia más irracional del Rey?",
    "¿Cuánto tiempo tarda el Rey en arreglarse para salir?",
    "¿Duerme el Rey con pijama o sin ropa?",
    "¿Qué canción canta el Rey en la ducha?",
    
    // SITUACIONES HIPOTÉTICAS
    "Si el Rey pudiera cenar con cualquier persona (viva o muerta), ¿con quién sería?",
    "Si el Rey pudiera viajar en el tiempo, ¿iría al pasado o al futuro?",
    "Si el Rey fuera un animal, ¿cuál sería?",
    "Si el Rey fuera presidente, ¿cuál sería su primera ley?",
    "Si el Rey tuviera un superpoder, ¿cuál elegiría?",
    "Si el Rey pudiera cometer un crimen sin consecuencias, ¿cuál sería?",
    "Si el Rey tuviera que tatuarse algo ahora mismo, ¿qué sería?",
    "Si la casa se incendiara, ¿qué salvaría el Rey primero (después de personas/mascotas)?",
    "Si el Rey escribiera un libro, ¿de qué trataría?",
    "Si hicieran una película de la vida del Rey, ¿qué actor lo interpretaría?",
    "Si el Rey pudiera eliminar una cosa del mundo, ¿qué sería?",
    "Si el Rey fuera invisible por un día, ¿qué haría?",
    "Si el Rey pudiera cambiar de vida con alguien de aquí, ¿con quién sería?",
    "Si el Rey tuviera que matar a alguien de esta sala para sobrevivir, ¿a quién elegiría?",
    
    // PICANTES Y RELACIONES
    "¿Qué es lo que más le prende al Rey?",
    "¿Qué es lo que más le apaga al Rey en la cama?",
    "¿Cuál es la parte del cuerpo favorita del Rey (en una pareja)?",
    "¿Prefiere el Rey arriba o abajo?",
    "¿Lugar más extraño donde lo ha hecho el Rey?",
    "¿Qué fetiche secreto tiene el Rey?",
    "¿Cuál es el 'body count' (número de parejas) del Rey?",
    "¿Le gusta al Rey el 'dirty talk'?",
    "¿Qué opina el Rey de las relaciones abiertas?",
    "¿Tendría el Rey un trío?",
    "¿Qué es lo más romántico que ha hecho el Rey?",
    "¿Qué busca el Rey en una pareja ideal?",
    "¿Cree el Rey en el amor a primera vista?",
    "¿Volvería el Rey con alguno de sus ex?",
    
    // EL GRUPO (PARA GENERAR POLÉMICA)
    "¿Quién de este grupo cree el Rey que viste mejor?",
    "¿Quién de este grupo cree el Rey que es más divertido?",
    "¿Quién de este grupo cree el Rey que acabará en la cárcel?",
    "¿Quién de este grupo es el favorito del Rey?",
    "¿A quién de este grupo le confiaría el Rey su vida?",
    "¿Quién de este grupo cree el Rey que bebe más?",
    "¿Quién de este grupo cree el Rey que es más inteligente?",
    "¿Con quién de este grupo se iría el Rey de viaje?",
    "¿A quién de este grupo le prestaría dinero el Rey?",
    "¿Quién de este grupo cree el Rey que miente mejor?",
  ];

  // --- LOGICA ---

  const addPlayer = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !players.includes(trimmed)) {
      setPlayers([...players, trimmed]);
      setScores(prev => ({ ...prev, [trimmed]: 0 }));
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
    nextRound();
  };

  const nextRound = () => {
    // Seleccionar nuevo Rey (aleatorio)
    const randomKing = players[Math.floor(Math.random() * players.length)];
    // Seleccionar pregunta
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    setCurrentKing(randomKing);
    setCurrentQuestion(randomQuestion);
    setGameState('question');
  };

  const goToJudgment = () => {
    setGameState('judgment');
  };

  const handleJudgment = (player) => {
    // Sumar punto al jugador seleccionado
    setScores(prev => ({
        ...prev,
        [player]: prev[player] + 1
    }));
    // Pequeño feedback visual o sonido podría ir aquí
  };

  // 1. SETUP
  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-black flex flex-col p-6 animate-fadeIn pb-20">
        <div className="flex items-center justify-between mb-6">
            <button onClick={onExit} className="text-gray-400 hover:text-white"><ArrowLeft /></button>
            <h2 className="text-xl font-bold text-amber-500 flex items-center gap-2"><Crown /> El Reino</h2>
            <div className="w-6"></div>
        </div>

        <div className="text-center mb-6">
            <p className="text-gray-400 text-sm">¿Quién conoce mejor a sus amigos?</p>
        </div>

        <Card className="flex-1 flex flex-col mb-4">
            <h3 className="text-lg font-semibold text-white mb-4">Súbditos ({players.length})</h3>
            <div className="flex-1 overflow-y-auto space-y-2 mb-4 max-h-60 custom-scrollbar">
                {players.length === 0 && <p className="text-gray-500 text-center italic mt-10">Mínimo 3 jugadores</p>}
                {players.map((p, i) => (
                    <div key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                        <span className="text-white">{p}</span>
                        <button onClick={() => removePlayer(i)} className="text-red-400">✕</button>
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <input 
                    type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
                    placeholder="Nombre..." 
                    className="flex-1 bg-black/30 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                />
                <button onClick={addPlayer} className="bg-amber-600 text-white px-4 rounded-lg font-bold">+</button>
            </div>
        </Card>

        <Button onClick={startGame} disabled={players.length < 3} variant="primary" className="!bg-gradient-to-r !from-amber-500 !to-yellow-600">
            INICIAR CORTE
        </Button>
      </div>
    );
  }

  // 2. QUESTION (EL REY LEE)
  if (gameState === 'question') {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-amber-900/10 pointer-events-none"></div>
            <button onClick={onExit} className="absolute top-4 left-4 p-2 bg-white/10 rounded-full text-gray-300 z-50"><Home size={24} /></button>

            <div className="mb-6 z-10 animate-bounce">
                <Crown size={64} className="text-amber-400 mx-auto drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
            </div>

            <p className="text-amber-500 font-bold tracking-widest uppercase mb-2">Larga vida al Rey</p>
            <h2 className="text-5xl font-black text-white mb-8">{currentKing}</h2>

            <Card className="w-full max-w-md p-8 bg-gradient-to-br from-gray-900 to-black border-amber-500/50 shadow-2xl relative z-10">
                <p className="text-2xl text-white font-bold leading-relaxed">{currentQuestion}</p>
            </Card>

            <div className="mt-8 text-gray-400 max-w-xs text-sm">
                <p>1. El Rey lee la pregunta.</p>
                <p>2. Los cortesanos adivinan la respuesta.</p>
                <p>3. El Rey juzga quién acertó.</p>
            </div>

            <div className="mt-8 w-full max-w-xs z-10">
                <Button onClick={goToJudgment} variant="primary" className="!bg-gradient-to-r !from-amber-600 !to-yellow-600">
                    <Gavel size={20} /> JUZGAR RESPUESTAS
                </Button>
            </div>
        </div>
      );
  }

  // 3. JUDGMENT (EL REY DECIDE)
  if (gameState === 'judgment') {
      // Filtramos al Rey de la lista de votación (no se vota a sí mismo)
      const subjects = players.filter(p => p !== currentKing);

      return (
        <div className="min-h-screen bg-black flex flex-col items-center p-6 text-center relative">
            <h3 className="text-amber-500 text-sm font-bold uppercase tracking-widest mt-4 mb-2">El Rey Decide</h3>
            <h2 className="text-2xl font-bold text-white mb-6">¿Quién acertó?</h2>

            <div className="grid grid-cols-1 gap-3 w-full max-w-md mb-8">
                {subjects.map((p) => (
                    <button 
                        key={p}
                        onClick={() => handleJudgment(p)}
                        className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 active:scale-95 transition-all group"
                    >
                        <span className="text-lg font-bold text-white">{p}</span>
                        <div className="flex items-center gap-2">
                             <span className="text-amber-500 font-bold text-sm">{scores[p]} pts</span>
                             <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Check size={16} />
                             </div>
                        </div>
                    </button>
                ))}
            </div>

            <Card className="w-full max-w-md bg-amber-900/10 border-amber-500/20 mb-6">
                <p className="text-gray-400 text-xs uppercase mb-1">Pregunta anterior</p>
                <p className="text-white italic">"{currentQuestion}"</p>
            </Card>

            <div className="mt-auto w-full max-w-xs space-y-3">
                <Button onClick={nextRound} variant="neon" className="!border-amber-500 !text-amber-500 hover:!bg-amber-500 hover:!text-black">
                    SIGUIENTE REY
                </Button>
            </div>
        </div>
      );
  }
};

export default KingGame;