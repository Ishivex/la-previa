import React, { useState } from 'react';
import { Crown, ArrowLeft, Users, Home, Gavel, Check, Star, RefreshCw } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';

const KingGame = ({ onExit }) => {
  const [gameState, setGameState] = useState('setup'); 
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState({});
  const [inputValue, setInputValue] = useState('');
  
  const [currentKing, setCurrentKing] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [targetScore, setTargetScore] = useState(5);
  const [selectedWinners, setSelectedWinners] = useState([]); // Nuevo: Lista de ganadores del turno

  // --- BASE DE DATOS MASIVA (200+ PREGUNTAS) ---
  const questions = [
    // --- COMIDA Y BEBIDA ---
    "¿Qué comida podría comer el Rey todos los días sin cansarse?",
    "¿Qué ingrediente odia el Rey con toda su alma?",
    "¿Cuál es el trago o bebida 'de confianza' del Rey en una fiesta?",
    "¿Qué prefiere el Rey: una cena elegante o tacos en la calle?",
    "¿Cuál es el sabor de helado favorito del Rey?",
    "¿Pizza con piña o sin piña? ¿Qué dice el Rey?",
    "¿Cuál es el postre favorito del Rey?",
    "¿Qué pide el Rey en el cine: Palomitas saladas, dulces o nachos?",
    "¿Cuál es la fruta favorita del Rey?",
    "¿Qué verdura no puede ni ver el Rey?",
    "¿Cómo le gusta el café al Rey (negro, con leche, dulce)?",
    "¿Cuál es la comida rápida favorita del Rey (McDonalds, KFC, etc)?",
    "¿Qué prefiere el Rey: Cocinar o lavar los platos?",
    "¿Cuál es el plato que mejor cocina el Rey?",
    "¿Qué prefiere el Rey: Vino o Cerveza?",
    "¿Cuál es la salsa favorita del Rey (Ketchup, Mayonesa, Picante)?",
    "¿Qué prefiere el Rey: Desayuno dulce o salado?",
    "¿Cuál es la comida más rara que ha probado el Rey?",
    "¿Es el Rey alérgico a algo?",
    "¿Qué prefiere el Rey: Chocolate negro, con leche o blanco?",
    "¿Cuál es el restaurante favorito del Rey?",
    "¿Qué prefiere el Rey: Sushi o Pizza?",
    "¿Qué prefiere el Rey: Tacos o Hamburguesas?",
    "¿Qué prefiere el Rey: Agua con gas o sin gas?",
    "¿Qué snack compra siempre el Rey en la tienda?",

    // --- ENTRETENIMIENTO Y GUSTOS ---
    "¿Qué canción haría que el Rey salga corriendo a la pista de baile?",
    "¿Qué género de película le da sueño al Rey?",
    "¿Cuál es la película favorita del Rey?",
    "¿Qué tipo de música odia el Rey?",
    "¿Cuál es el placer culposo del Rey (canción, comida o programa de TV)?",
    "¿Cuál es la serie que el Rey ha visto más veces?",
    "¿Qué superhéroe le gustaría ser al Rey?",
    "¿Cuál es el videojuego favorito del Rey?",
    "¿Qué deporte le gusta ver al Rey?",
    "¿Qué deporte le gusta practicar al Rey?",
    "¿Qué prefiere el Rey: Netflix o YouTube?",
    "¿Cuál es el libro favorito del Rey?",
    "¿Quién es el actor/actriz favorito del Rey?",
    "¿Qué prefiere el Rey: Cine o Teatro?",
    "¿Qué prefiere el Rey: Concierto o Festival?",
    "¿Cuál es la banda o cantante favorito del Rey?",
    "¿Qué canción canta el Rey en el karaoke?",
    "¿Qué prefiere el Rey: Terror o Comedia?",
    "¿Cuál es el personaje de ficción favorito del Rey?",
    "¿Qué reality show vería el Rey en secreto?",
    "¿Qué prefiere el Rey: Marvel o DC?",
    "¿Qué prefiere el Rey: Harry Potter o Star Wars?",
    "¿Qué prefiere el Rey: Xbox o PlayStation?",
    "¿Qué prefiere el Rey: Leer o Ver la película?",
    "¿Cuál es el meme favorito del Rey?",

    // --- PERSONALIDAD Y HÁBITOS ---
    "¿Qué es lo primero que nota el Rey en una persona que le atrae?",
    "¿Cuál es la manía más rara del Rey?",
    "¿Qué es lo que más le estresa o enoja al Rey?",
    "¿El Rey es de los que llega 15 minutos antes o 15 minutos tarde?",
    "¿Qué frase o palabra usa el Rey todo el tiempo?",
    "¿Cuál es el mayor miedo irracional del Rey (insectos, payasos, etc)?",
    "¿Si el Rey ganara la lotería hoy, qué sería lo primero que compraría?",
    "¿Qué habilidad inútil tiene el Rey?",
    "¿El Rey duerme con pijama, ropa interior o desnudo?",
    "¿Cuánto tiempo tarda el Rey en arreglarse para salir?",
    "¿Qué hace el Rey cuando está triste para animarse?",
    "¿Es el Rey rencoroso o perdona fácil?",
    "¿Es el Rey madrugador o nocturno?",
    "¿Es el Rey ordenado o desordenado?",
    "¿Qué prefiere el Rey: Llamada o Mensaje?",
    "¿Cuál es la red social que más usa el Rey?",
    "¿Cuántas horas duerme el Rey normalmente?",
    "¿Qué prefiere el Rey: Verano o Invierno?",
    "¿Qué prefiere el Rey: Perros o Gatos?",
    "¿Qué prefiere el Rey: Ciudad o Campo?",
    "¿Es el Rey supersticioso?",
    "¿Cuál es el signo del zodiaco del Rey?",
    "¿Cree el Rey en los horóscopos?",
    "¿Cuál es el color favorito del Rey?",
    "¿Qué prefiere el Rey: Ducha o Baño de tina?",

    // --- PASADO E HISTORIA ---
    "¿Cuál fue el peor trabajo que ha tenido el Rey?",
    "¿Cómo se llamaba el primer 'crush' o amor del Rey?",
    "¿Cuál ha sido el momento más vergonzoso del Rey en público?",
    "¿Por qué razón el Rey iría a la cárcel?",
    "¿Cuál fue la peor cita que ha tenido el Rey?",
    "¿Qué quería ser el Rey cuando era niño?",
    "¿Alguna vez el Rey ha sido infiel (o casi)?",
    "¿Qué mentira usa el Rey frecuentemente para safarse de planes?",
    "¿Cuál es la borrachera que el Rey nunca olvidará (o no recuerda)?",
    "¿A qué edad dio el Rey su primer beso?",
    "¿Cuál fue el primer concierto del Rey?",
    "¿Cuál fue el primer coche del Rey?",
    "¿Ha tenido el Rey alguna cirugía?",
    "¿Se ha roto algún hueso el Rey?",
    "¿Cuál fue la materia favorita del Rey en la escuela?",
    "¿Cuál fue la materia que más odió el Rey?",
    "¿Ha sido el Rey expulsado de clases alguna vez?",
    "¿Cuál era el apodo del Rey en la infancia?",
    "¿Cuál fue el primer viaje del Rey sin sus padres?",
    "¿Ha robado algo el Rey alguna vez?",
    "¿Cuál es el recuerdo más feliz de la infancia del Rey?",
    "¿Ha tenido el Rey una experiencia paranormal?",
    "¿Cuál es la cicatriz más grande del Rey y cómo se la hizo?",
    "¿Ha conocido el Rey a algún famoso?",
    "¿Cuál es el regalo más raro que le han dado al Rey?",

    // --- RELACIONES Y AMOR ---
    "¿Qué busca el Rey en una pareja ideal?",
    "¿Qué es un 'no negociable' para el Rey en una relación?",
    "¿Cree el Rey en el amor a primera vista?",
    "¿Cuál es la parte del cuerpo que más le gusta al Rey (en una pareja)?",
    "¿Qué prefiere el Rey: Rubios/as o Morenos/as?",
    "¿Tendría el Rey una relación abierta?",
    "¿Perdonaría el Rey una infidelidad?",
    "¿Es el Rey celoso?",
    "¿Cuántos hijos quiere tener el Rey?",
    "¿Qué opina el Rey del matrimonio?",
    "¿Cuál es la cita ideal del Rey?",
    "¿Qué es lo más cursi que ha hecho el Rey por amor?",
    "¿Ha llorado el Rey por amor recientemente?",
    "¿Sigue el Rey siendo amigo de sus ex?",
    "¿Volvería el Rey con su último ex?",
    "¿Qué prefiere el Rey: Inteligencia o Belleza?",
    "¿Qué prefiere el Rey: Cara bonita o Buen cuerpo?",
    "¿Ha usado el Rey apps de citas (Tinder, etc)?",
    "¿Cuál es la peor frase para ligar que ha usado el Rey?",
    "¿Quién dijo 'Te amo' primero en su última relación?",
    "¿Qué es lo que más le apaga al Rey en la cama?",
    "¿Qué es lo que más le prende al Rey?",
    "¿Lugar más extraño donde lo ha hecho el Rey?",
    "¿Tiene el Rey algún fetiche confesable?",
    "¿Prefiere el Rey arriba o abajo?",

    // --- SITUACIONES HIPOTÉTICAS ---
    "Si el Rey pudiera golpear a alguien sin consecuencias, ¿a quién sería?",
    "Si el Rey tuviera que eliminar una app de su celular para siempre, ¿cuál sería?",
    "Si el Rey estuviera en una isla desierta con el grupo, ¿a quién se comería primero?",
    "Si el Rey fuera un animal, ¿cuál sería según su personalidad?",
    "Si el Rey tuviera que cambiar de vida con alguien de aquí, ¿con quién sería?",
    "Si el Rey fuera del sexo opuesto por un día, ¿qué es lo primero que haría?",
    "Si el Rey pudiera borrar un evento de su pasado, ¿cuál sería?",
    "Si el Rey pudiera viajar en el tiempo, ¿iría al pasado o al futuro?",
    "Si el Rey pudiera tener un superpoder, ¿cuál elegiría?",
    "Si el Rey fuera invisible por un día, ¿qué haría?",
    "Si el Rey pudiera cenar con cualquier persona (viva o muerta), ¿con quién sería?",
    "Si el Rey ganara 100 millones de dólares, ¿seguiría trabajando?",
    "Si el Rey tuviera que tatuarse algo ahora mismo, ¿qué sería?",
    "Si la casa se incendiara, ¿qué objeto salvaría el Rey primero?",
    "Si el Rey fuera presidente, ¿cuál sería su primera ley?",
    "Si el Rey tuviera que matar a alguien para salvar al mundo, ¿lo haría?",
    "Si el Rey pudiera hablar con los animales, ¿qué les preguntaría?",
    "Si el Rey fuera un fantasma, ¿a quién asustaría primero?",
    "Si el Rey pudiera vivir en cualquier país, ¿cuál elegiría?",
    "Si el Rey tuviera que comer solo una cosa el resto de su vida, ¿qué sería?",
    "Si el Rey pudiera revivir a un músico famoso, ¿a quién elegiría?",
    "Si el Rey fuera un asesino en serie, ¿cuál sería su apodo?",
    "Si el Rey tuviera que participar en un reality show, ¿cuál ganaría?",
    "Si el Rey encontrara una billetera con dinero, ¿la devolvería?",
    "Si el Rey pudiera saber la fecha de su muerte, ¿querría saberla?",

    // --- EL GRUPO (PREJUICIOS AMISTOSOS) ---
    "¿Quién de este grupo cree el Rey que es la peor influencia?",
    "¿A quién de este grupo le confiaría el Rey su mayor secreto?",
    "¿Quién de este grupo cree el Rey que viste peor?",
    "¿Quién de este grupo cree el Rey que gana más dinero (o ganará)?",
    "¿Quién de este grupo cree el Rey que se casará primero?",
    "¿Quién de este grupo cree el Rey que terminará en la cárcel?",
    "¿Quién de este grupo cree el Rey que es más probable que se haga famoso?",
    "¿Con quién de este grupo sobreviviría el Rey a un apocalipsis zombie?",
    "¿A quién de este grupo llevaría el Rey a una pelea callejera?",
    "¿Quién de este grupo cree el Rey que miente mejor?",
    "¿Quién de este grupo cree el Rey que es el más divertido?",
    "¿Quién de este grupo cree el Rey que es el más inteligente?",
    "¿Quién de este grupo cree el Rey que bebe más?",
    "¿Quién de este grupo cree el Rey que liga más?",
    "¿Quién de este grupo cree el Rey que es más dramático?",
    "¿Quién de este grupo cree el Rey que es más tacaño?",
    "¿A quién de este grupo le prestaría dinero el Rey?",
    "¿Con quién de este grupo tendría un hijo el Rey (hipotéticamente)?",
    "¿A quién de este grupo eliminaría el Rey de su vida si fuera obligatorio?",
    "¿Quién de este grupo cree el Rey que cocina mejor?",
    "¿Quién de este grupo cree el Rey que conduce peor?",
    "¿Quién de este grupo cree el Rey que tiene peor gusto musical?",
    "¿Quién de este grupo cree el Rey que será el mejor padre/madre?",
    "¿Quién de este grupo cree el Rey que tiene el historial de búsqueda más sucio?",
    "¿Quién de este grupo cree el Rey que pasaría más tiempo en el baño?",

    // --- RANDOM / CURIOSIDADES ---
    "¿Qué prefiere el Rey: Ser el más listo o el más guapo?",
    "¿Qué prefiere el Rey: Ser rico y desconocido o pobre y famoso?",
    "¿Qué prefiere el Rey: Saber volar o leer mentes?",
    "¿Qué prefiere el Rey: Perder el móvil o perder la cartera?",
    "¿Qué prefiere el Rey: No tener internet o no tener aire acondicionado/calefacción?",
    "¿Qué prefiere el Rey: Viajar solo o acompañado?",
    "¿Qué prefiere el Rey: Regalar o recibir regalos?",
    "¿Qué prefiere el Rey: Fiesta en casa o salir a la disco?",
    "¿Qué prefiere el Rey: Ropa cómoda o ropa a la moda?",
    "¿Qué prefiere el Rey: Tatuajes o Piercings?",
    "¿Qué prefiere el Rey: Barba o Afeitado (o equivalente en mujeres)?",
    "¿Qué prefiere el Rey: Pelo largo o corto?",
    "¿Qué prefiere el Rey: Café o Té?",
    "¿Qué prefiere el Rey: Bicicleta o Coche?",
    "¿Qué prefiere el Rey: Avión o Barco?",
    "¿Qué prefiere el Rey: Hotel de lujo o Camping?",
    "¿Qué prefiere el Rey: Leer un libro o escuchar un audiolibro?",
    "¿Qué prefiere el Rey: Trabajar en oficina o Remoto?",
    "¿Qué prefiere el Rey: Ser jefe o empleado?",
    "¿Qué prefiere el Rey: Madrugar o Trasnochar?",
    "¿Qué prefiere el Rey: Calor o Frío?",
    "¿Qué prefiere el Rey: Montaña rusa o Carrusel?",
    "¿Qué prefiere el Rey: Comida picante o sin picante?",
    "¿Qué prefiere el Rey: Usar reloj o mirar el móvil?",
    "¿Qué prefiere el Rey: Bailar o quedarse en la barra?",
    "¿Qué prefiere el Rey: Cantar bien o Tocar un instrumento?",
    "¿Qué prefiere el Rey: Ser invisible o Teletransportarse?",
    "¿Qué prefiere el Rey: Saber todos los idiomas o Saber tocar todos los instrumentos?",
    "¿Qué prefiere el Rey: Vivir en el espacio o en el fondo del mar?",
    "¿Qué prefiere el Rey: Tener un dragón o un unicornio?",
    "¿Qué prefiere el Rey: Pizza infinita o Tacos infinitos?",
    "¿Qué prefiere el Rey: No tener resaca nunca o No engordar nunca?",
    "¿Qué prefiere el Rey: Que nadie vaya a su boda o Que nadie vaya a su funeral?",
    "¿Qué prefiere el Rey: Encontrar el amor verdadero o Ganar 10 millones?",
    "¿Qué prefiere el Rey: Saber cuándo morirá o Saber cómo morirá?",
    "¿Qué prefiere el Rey: Perder el sentido del gusto o del olfato?",
    "¿Qué prefiere el Rey: Tener hipo por un año o Tener la sensación de estornudar y no poder?",
    "¿Qué prefiere el Rey: Caminar hacia atrás o Hablar gritando?",
    "¿Qué prefiere el Rey: Usar ropa mojada o Usar zapatos una talla menos?",
    "¿Qué prefiere el Rey: Comer solo ensalada o Comer solo postre?",
    "¿Qué prefiere el Rey: Vivir sin música o Vivir sin TV/Cine?",
    "¿Qué prefiere el Rey: Ser atacado por un oso o por un tiburón?",
    "¿Qué prefiere el Rey: Perder todo su cabello o Tener el cuerpo lleno de pelo?",
    "¿Qué prefiere el Rey: Tener 10 hijos o No tener ninguno?",
    "¿Qué prefiere el Rey: Perdonar o Vengarse?",
    "¿Qué prefiere el Rey: Ser temido o Ser amado?",
    "¿Qué prefiere el Rey: La verdad dolorosa o Una mentira piadosa?",
    "¿Qué prefiere el Rey: Salvar a 100 desconocidos o a 1 familiar?",
    "¿Qué prefiere el Rey: Vivir 100 años en el pasado o 100 años en el futuro?",
    "¿Qué prefiere el Rey: Ser un genio infeliz o un ignorante feliz?",
    
    // --- MÁS PREGUNTAS PERSONALES ---
    "¿Cuál es el lugar favorito del mundo del Rey?",
    "¿Qué idioma le gustaría aprender al Rey?",
    "¿Cuál es el juego de mesa favorito del Rey?",
    "¿Qué es lo que más compra el Rey por internet?",
    "¿Cuál es el sabor de pizza favorito del Rey?",
    "¿Qué tipo de humor tiene el Rey (negro, absurdo, simple)?",
    "¿Cuál es la estación del año favorita del Rey?",
    "¿Cuál es la festividad favorita del Rey (Navidad, Halloween)?",
    "¿Qué colecciona el Rey?",
    "¿Cuál es la app más inútil que tiene el Rey en su móvil?",
    "¿Qué sonido odia el Rey?",
    "¿Qué olor le encanta al Rey?",
    "¿Cuál es la flor favorita del Rey?",
    "¿Qué animal exótico tendría el Rey de mascota?",
    "¿Cuál es el deporte que peor se le da al Rey?",
    "¿Cuál es el talento oculto del Rey?",
    "¿Qué es lo que más valora el Rey en una amistad?",
    "¿Qué es lo que no soporta el Rey en una convivencia?",
    "¿Cuál es la tarea doméstica que más odia el Rey?",
    "¿Cuál es la tarea doméstica que no le molesta hacer al Rey?",
    "¿Qué prefiere el Rey: Dormir con calor o con frío?",
    "¿Qué prefiere el Rey: Almohada dura o blanda?",
    "¿Qué prefiere el Rey: Sábanas de seda o de algodón?",
    "¿Cuál es la posición favorita del Rey para dormir?",
    "¿Ronca el Rey?"
  ];

  // --- LOGICA DEL JUEGO ---

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

  // Inicio del juego: Elegimos al primer Rey
  const startGame = () => {
    if (players.length < 3) return;
    pickNewKing();
  };

  const pickNewKing = (excludePlayer = null) => {
    // Reiniciamos puntajes para la nueva ronda de reinado
    const resetScores = {};
    players.forEach(p => resetScores[p] = 0);
    setScores(resetScores);

    // Elegir nuevo rey (intentando que no sea el mismo)
    let candidates = players;
    if (excludePlayer && players.length > 1) {
        candidates = players.filter(p => p !== excludePlayer);
    }
    const randomKing = candidates[Math.floor(Math.random() * candidates.length)];
    
    setCurrentKing(randomKing);
    nextQuestion();
  };

  const nextQuestion = () => {
    setSelectedWinners([]); // Resetear selección al cambiar pregunta
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuestion(randomQuestion);
    setGameState('question');
  };

  const goToJudgment = () => {
    setGameState('judgment');
  };

  const toggleWinner = (player) => {
    if (selectedWinners.includes(player)) {
      setSelectedWinners(selectedWinners.filter(p => p !== player));
    } else {
      setSelectedWinners([...selectedWinners, player]);
    }
  };

  const confirmJudgment = () => {
    // Si no hay ganadores, solo pasamos la pregunta
    if (selectedWinners.length === 0) {
        nextQuestion();
        return;
    }

    // Actualizar scores para TODOS los seleccionados
    const newScores = { ...scores };
    let roundOver = false;

    selectedWinners.forEach(winnerPlayer => {
        const newScore = (newScores[winnerPlayer] || 0) + 1;
        newScores[winnerPlayer] = newScore;
        // Si AL MENOS UNO llega a la meta, se acaba la ronda
        if (newScore >= targetScore) {
            roundOver = true;
        }
    });

    setScores(newScores);

    if (roundOver) {
        setGameState('round_winner');
    } else {
        nextQuestion();
    }
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

        <Card className="flex-1 flex flex-col mb-4 bg-gray-900 border-amber-500/20">
            <h3 className="text-lg font-semibold text-white mb-4">Súbditos ({players.length})</h3>
            <div className="flex-1 overflow-y-auto space-y-2 mb-4 max-h-60 custom-scrollbar">
                {players.length === 0 && <p className="text-gray-500 text-center italic mt-10">Mínimo 3 jugadores</p>}
                {players.map((p, i) => (
                    <div key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                        <span className="text-white">{p}</span>
                        <button onClick={() => removePlayer(i)} className="text-red-400 hover:text-red-300">✕</button>
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
                <button onClick={addPlayer} className="bg-amber-600 hover:bg-amber-500 text-white px-4 rounded-lg font-bold">+</button>
            </div>
        </Card>

        {/* Configuración de Puntos */}
        <div className="flex items-center justify-center gap-4 mb-6 text-gray-400">
            <span>Puntos para ganar:</span>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-2">
                <button onClick={() => setTargetScore(Math.max(1, targetScore - 1))} className="p-2 text-xl">-</button>
                <span className="text-white font-bold text-xl w-6 text-center">{targetScore}</span>
                <button onClick={() => setTargetScore(targetScore + 1)} className="p-2 text-xl">+</button>
            </div>
        </div>

        <Button onClick={startGame} disabled={players.length < 3} variant="primary" className="!bg-gradient-to-r !from-amber-500 !to-yellow-600 text-black font-black">
            CORONAR AL PRIMER REY
        </Button>
      </div>
    );
  }

  // 2. PREGUNTA (El Rey sigue siendo el mismo)
  if (gameState === 'question') {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-amber-900/10 pointer-events-none"></div>
            <button onClick={onExit} className="absolute top-4 left-4 p-2 bg-white/10 rounded-full text-gray-300 z-50"><Home size={24} /></button>

            {/* Marcador Mini */}
            <div className="absolute top-4 right-4 flex flex-col items-end z-10">
                <p className="text-xs text-amber-500 font-bold uppercase mb-1">Puntos para ganar: {targetScore}</p>
                <div className="flex flex-col gap-1">
                    {players.filter(p => p !== currentKing).map(p => (
                        <div key={p} className="flex items-center gap-2 text-xs">
                             <span className="text-gray-400">{p}</span>
                             <div className="bg-amber-500/20 px-1.5 rounded text-amber-400 font-bold">{scores[p]}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-2 z-10 animate-pulse">
                <Crown size={56} className="text-amber-400 mx-auto drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
            </div>
            <p className="text-amber-500 font-bold tracking-widest uppercase mb-1 text-sm">Su Majestad</p>
            <h2 className="text-4xl font-black text-white mb-8">{currentKing}</h2>

            <Card className="w-full max-w-md p-8 bg-gradient-to-br from-gray-900 to-black border-amber-500/50 shadow-2xl relative z-10 transform transition-all hover:scale-[1.02]">
                <p className="text-2xl text-white font-bold leading-relaxed">"{currentQuestion}"</p>
            </Card>

            <div className="mt-8 text-gray-400 max-w-xs text-sm italic">
                "Los cortesanos deben adivinar la respuesta correcta. Solo el Rey sabe la verdad."
            </div>

            <div className="mt-8 w-full max-w-xs z-10">
                <Button onClick={goToJudgment} variant="primary" className="!bg-gradient-to-r !from-amber-600 !to-yellow-600 text-black">
                    <Gavel size={20} /> JUZGAR RESPUESTAS
                </Button>
            </div>
        </div>
      );
  }

  // 3. JUICIO (MULTISELECCIÓN)
  if (gameState === 'judgment') {
      const subjects = players.filter(p => p !== currentKing);

      return (
        <div className="min-h-screen bg-black flex flex-col items-center p-6 text-center relative">
            <h3 className="text-amber-500 text-sm font-bold uppercase tracking-widest mt-4 mb-2">El Rey Decide</h3>
            <h2 className="text-2xl font-bold text-white mb-2">¿Quiénes acertaron?</h2>
            <p className="text-gray-400 text-xs mb-6">Puedes seleccionar a varios ganadores.</p>

            <div className="grid grid-cols-1 gap-3 w-full max-w-md mb-8">
                {subjects.map((p) => {
                    const isSelected = selectedWinners.includes(p);
                    return (
                        <button 
                            key={p}
                            onClick={() => toggleWinner(p)}
                            className={`flex items-center justify-between border p-4 rounded-xl transition-all group
                                ${isSelected 
                                    ? 'bg-amber-500/20 border-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                                }`}
                        >
                            <span className="text-lg font-bold">{p}</span>
                            <div className="flex items-center gap-3">
                                 <div className="flex items-center gap-1 text-amber-500/70">
                                    <Star size={12} fill="currentColor" />
                                    <span className="font-bold text-sm">{scores[p]}</span>
                                 </div>
                                 <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isSelected ? 'bg-green-500 text-black scale-110' : 'bg-white/5 text-transparent'}`}>
                                    <Check size={20} strokeWidth={3} />
                                 </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            <Card className="w-full max-w-md bg-amber-900/10 border-amber-500/20 mb-6 p-4">
                <p className="text-gray-400 text-xs uppercase mb-1">Recordar pregunta</p>
                <p className="text-white italic text-lg">"{currentQuestion}"</p>
            </Card>

             <div className="mt-auto w-full max-w-xs space-y-3 pb-6">
                <Button onClick={confirmJudgment} variant="primary" className={`!bg-gradient-to-r ${selectedWinners.length > 0 ? '!from-green-600 !to-emerald-600' : '!from-gray-700 !to-gray-600'}`}>
                    {selectedWinners.length === 0 ? 'NADIE ACERTÓ (PASAR)' : `CONFIRMAR (${selectedWinners.length})`}
                </Button>
            </div>
        </div>
      );
  }

  // 4. GANADOR DE RONDA (Cambio de Rey)
  if (gameState === 'round_winner') {
      const winner = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

      return (
          <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-amber-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
                  <Crown size={80} className="text-amber-400 relative z-10" />
              </div>
              
              <h2 className="text-gray-400 uppercase tracking-widest text-sm mb-2">Conoce mejor a {currentKing}</h2>
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-600 mb-8">
                  {winner}
              </h1>

              <Card className="bg-gray-900 border-amber-500/30 p-6 mb-8 w-full max-w-xs">
                  <p className="text-white text-lg">¡Ha conseguido <span className="text-amber-400 font-bold">{scores[winner]} puntos</span>!</p>
                  <p className="text-gray-500 text-sm mt-2">Ahora es el momento de cambiar la corona.</p>
              </Card>

              <div className="w-full max-w-xs space-y-4">
                  <Button onClick={() => pickNewKing(currentKing)} variant="primary" className="!bg-gradient-to-r !from-amber-500 !to-yellow-600 text-black">
                      <RefreshCw size={20} /> JUGAR CON NUEVO REY
                  </Button>
                  <Button onClick={() => setGameState('setup')} variant="secondary">
                      VOLVER AL INICIO
                  </Button>
              </div>
          </div>
      );
  }
};

export default KingGame;