import React, { useState } from 'react';
import { Fingerprint, ArrowLeft, RefreshCw, Home, Users } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';

const MostLikelyTo = ({ onExit }) => {
  // Base de datos masiva de preguntas (200+)
  const questions = [
    "¿Quién es más probable que se haga millonario por accidente?",
    "¿Quién es más probable que sobreviva a un apocalipsis zombie?",
    "¿Quién es más probable que muera primero en una película de terror?",
    "¿Quién es más probable que se case por dinero?",
    "¿Quién es más probable que termine en la cárcel?",
    "¿Quién es más probable que se una a una secta?",
    "¿Quién es más probable que llore en público?",
    "¿Quién es más probable que se olvide del cumpleaños de su pareja?",
    "¿Quién es más probable que adopte 10 gatos?",
    "¿Quién es más probable que se haga famoso en TikTok?",
    "¿Quién es más probable que incendie la cocina intentando cocinar?",
    "¿Quién es más probable que se mude a otro país por amor?",
    "¿Quién es más probable que tenga una identidad secreta?",
    "¿Quién es más probable que se ría en un momento inapropiado (funeral, etc.)?",
    "¿Quién es más probable que gane un Nobel?",
    "¿Quién es más probable que se convierta en stripper?",
    "¿Quién es más probable que gaste todo su sueldo en un día?",
    "¿Quién es más probable que tenga un hijo en secreto?",
    "¿Quién es más probable que espíe a sus vecinos?",
    "¿Quién es más probable que se tatúe algo de lo que se arrepienta?",
    "¿Quién es más probable que llegue tarde a su propia boda?",
    "¿Quién es más probable que bese a su ex esta noche?",
    "¿Quién es más probable que tenga una aventura de una noche?",
    "¿Quién es más probable que se emborrache primero?",
    "¿Quién es más probable que vomite esta noche?",
    "¿Quién es más probable que pierda su celular en la fiesta?",
    "¿Quién es más probable que termine durmiendo en la calle?",
    "¿Quién es más probable que se pelee con un guardia de seguridad?",
    "¿Quién es más probable que robe algo de una tienda?",
    "¿Quién es más probable que se convierta en monja o cura?",
    "¿Quién es más probable que gane un reality show?",
    "¿Quién es más probable que mienta en su currículum?",
    "¿Quién es más probable que tenga un fetiche extraño?",
    "¿Quién es más probable que se enamore de un profesor?",
    "¿Quién es más probable que tenga el historial de búsqueda más sucio?",
    "¿Quién es más probable que nunca se bañe?",
    "¿Quién es más probable que use la misma ropa interior 3 días seguidos?",
    "¿Quién es más probable que coma algo del suelo?",
    "¿Quién es más probable que se haga una cirugía plástica?",
    "¿Quién es más probable que tenga más hijos?",
    "¿Quién es más probable que se case primero?",
    "¿Quién es más probable que nunca se case?",
    "¿Quién es más probable que viva con sus padres hasta los 40?",
    "¿Quién es más probable que se convierta en presidente?",
    "¿Quién es más probable que falsifique su propia muerte?",
    "¿Quién es más probable que mate a alguien por accidente?",
    "¿Quién es más probable que se quede calvo primero?",
    "¿Quién es más probable que done todo su dinero a la caridad?",
    "¿Quién es más probable que se convierta en vegano?",
    "¿Quién es más probable que gane una pelea callejera?",
    "¿Quién es más probable que llore viendo una película de Disney?",
    "¿Quién es más probable que se asuste de su propia sombra?",
    "¿Quién es más probable que crea en fantasmas?",
    "¿Quién es más probable que haya sido abducido por alienígenas?",
    "¿Quién es más probable que se convierta en un meme?",
    "¿Quién es más probable que rompa su teléfono hoy?",
    "¿Quién es más probable que se caiga en público?",
    "¿Quién es más probable que tenga mal aliento?",
    "¿Quién es más probable que ronque más fuerte?",
    "¿Quién es más probable que hable dormido?",
    "¿Quién es más probable que tenga pesadillas a menudo?",
    "¿Quién es más probable que sea sonámbulo?",
    "¿Quién es más probable que tenga un amigo imaginario?",
    "¿Quién es más probable que lea el pensamiento de los demás?",
    "¿Quién es más probable que sea un espía?",
    "¿Quién es más probable que tenga doble vida?",
    "¿Quién es más probable que tenga un hijo favorito?",
    "¿Quién es más probable que olvide el nombre de sus hijos?",
    "¿Quién es más probable que pierda a sus hijos en el parque?",
    "¿Quién es más probable que sea el peor conductor?",
    "¿Quién es más probable que choque el auto de sus padres?",
    "¿Quién es más probable que reciba más multas de tráfico?",
    "¿Quién es más probable que nunca saque la licencia de conducir?",
    "¿Quién es más probable que viaje al espacio?",
    "¿Quién es más probable que descubra una cura para una enfermedad?",
    "¿Quién es más probable que escriba un libro?",
    "¿Quién es más probable que se convierta en actor/actriz porno?",
    "¿Quién es más probable que tenga una cuenta de OnlyFans?",
    "¿Quién es más probable que pague por contenido para adultos?",
    "¿Quién es más probable que sea infiel?",
    "¿Quién es más probable que perdone una infidelidad?",
    "¿Quién es más probable que tenga una relación abierta?",
    "¿Quién es más probable que sea poliamoroso?",
    "¿Quién es más probable que se enamore de la pareja de un amigo?",
    "¿Quién es más probable que rompa una pareja?",
    "¿Quién es más probable que sea el tercero en discordia?",
    "¿Quién es más probable que tenga un sugar daddy/mommy?",
    "¿Quién es más probable que sea un sugar daddy/mommy?",
    "¿Quién es más probable que pague por sexo?",
    "¿Quién es más probable que tenga sexo en un lugar público?",
    "¿Quién es más probable que lo pillen teniendo sexo?",
    "¿Quién es más probable que tenga sexo en el trabajo?",
    "¿Quién es más probable que tenga sexo en un avión?",
    "¿Quién es más probable que tenga sexo con un desconocido?",
    "¿Quién es más probable que tenga sexo en la primera cita?",
    "¿Quién es más probable que no use protección?",
    "¿Quién es más probable que tenga una ETS?",
    "¿Quién es más probable que finja un orgasmo?",
    "¿Quién es más probable que se quede dormido durante el sexo?",
    "¿Quién es más probable que diga el nombre equivocado durante el sexo?",
    "¿Quién es más probable que tenga juguetes sexuales escondidos?",
    "¿Quién es más probable que sea virgen?",
    "¿Quién es más probable que mienta sobre su número de parejas sexuales?",
    "¿Quién es más probable que tenga el corazón roto?",
    "¿Quién es más probable que rompa el corazón de alguien?",
    "¿Quién es más probable que vuelva con su ex?",
    "¿Quién es más probable que stalkee a su ex?",
    "¿Quién es más probable que llame a su ex borracho?",
    "¿Quién es más probable que odie la Navidad?",
    "¿Quién es más probable que ame demasiado su cumpleaños?",
    "¿Quién es más probable que haga la mejor fiesta?",
    "¿Quién es más probable que sea el alma de la fiesta?",
    "¿Quién es más probable que se vaya sin despedirse (bomba de humo)?",
    "¿Quién es más probable que baile sobre la mesa?",
    "¿Quién es más probable que cante en el karaoke aunque cante mal?",
    "¿Quién es más probable que se desnude cuando bebe?",
    "¿Quién es más probable que pierda la dignidad esta noche?",
    "¿Quién es más probable que necesite que lo cuiden cuando bebe?",
    "¿Quién es más probable que sea el conductor designado?",
    "¿Quién es más probable que no beba nada?",
    "¿Quién es más probable que fume?",
    "¿Quién es más probable que pruebe drogas?",
    "¿Quién es más probable que trafique drogas (como chiste... o no)?",
    "¿Quién es más probable que tenga problemas con la ley?",
    "¿Quién es más probable que demande a alguien?",
    "¿Quién es más probable que sea demandado?",
    "¿Quién es más probable que se declare en bancarrota?",
    "¿Quién es más probable que pierda todo su dinero en apuestas?",
    "¿Quién es más probable que gane la lotería y lo pierda todo?",
    "¿Quién es más probable que viva en una mansión?",
    "¿Quién es más probable que viva en una furgoneta?",
    "¿Quién es más probable que se una al ejército?",
    "¿Quién es más probable que deserte del ejército?",
    "¿Quién es más probable que sea pacifista?",
    "¿Quién es más probable que inicie una pelea?",
    "¿Quién es más probable que huya de una pelea?",
    "¿Quién es más probable que llore para salir de una multa?",
    "¿Quién es más probable que coquetee con un policía?",
    "¿Quién es más probable que insulte a un policía?",
    "¿Quién es más probable que se haga amigo de un criminal?",
    "¿Quién es más probable que visite a alguien en la cárcel?",
    "¿Quién es más probable que escriba cartas a presos?",
    "¿Quién es más probable que se obsesione con un asesino en serie?",
    "¿Quién es más probable que resuelva un crimen?",
    "¿Quién es más probable que cometa el crimen perfecto?",
    "¿Quién es más probable que sea secuestrado?",
    "¿Quién es más probable que se una al circo?",
    "¿Quién es más probable que tenga fobia a los payasos?",
    "¿Quién es más probable que tenga fobia a las alturas?",
    "¿Quién es más probable que salte en paracaídas?",
    "¿Quién es más probable que haga puenting?",
    "¿Quién es más probable que nade con tiburones?",
    "¿Quién es más probable que escale el Everest?",
    "¿Quién es más probable que corra un maratón sin entrenar?",
    "¿Quién es más probable que se lesione haciendo deporte?",
    "¿Quién es más probable que odie hacer ejercicio?",
    "¿Quién es más probable que se haga adicto al gimnasio?",
    "¿Quién es más probable que use esteroides?",
    "¿Quién es más probable que se haga una operación de cambio de sexo?",
    "¿Quién es más probable que cambie de nombre?",
    "¿Quién es más probable que desaparezca sin dejar rastro?",
    "¿Quién es más probable que se convierta en ermitaño?",
    "¿Quién es más probable que viva sin tecnología?",
    "¿Quién es más probable que sea adicto al celular?",
    "¿Quién es más probable que se tome más selfies?",
    "¿Quién es más probable que use más filtros en las fotos?",
    "¿Quién es más probable que mienta en redes sociales?",
    "¿Quién es más probable que compre seguidores?",
    "¿Quién es más probable que sea cancelado en Twitter?",
    "¿Quién es más probable que inicie un debate en internet?",
    "¿Quién es más probable que sea un troll en internet?",
    "¿Quién es más probable que sea hackeado?",
    "¿Quién es más probable que hackee a alguien?",
    "¿Quién es más probable que pierda la contraseña de todo?",
    "¿Quién es más probable que caiga en una estafa piramidal?",
    "¿Quién es más probable que inicie una estafa piramidal?",
    "¿Quién es más probable que venda cosas puerta a puerta?",
    "¿Quién es más probable que trabaje en un call center?",
    "¿Quién es más probable que odie su trabajo?",
    "¿Quién es más probable que sea despedido?",
    "¿Quién es más probable que renuncie haciendo un escándalo?",
    "¿Quién es más probable que se acueste con el jefe?",
    "¿Quién es más probable que se convierta en jefe?",
    "¿Quién es más probable que sea el jefe más odiado?",
    "¿Quién es más probable que robe material de oficina?",
    "¿Quién es más probable que coma el almuerzo de otro?",
    "¿Quién es más probable que llegue tarde todos los días?",
    "¿Quién es más probable que trabaje más horas?",
    "¿Quién es más probable que se jubile joven?",
    "¿Quién es más probable que nunca se jubile?",
    "¿Quién es más probable que muera de estrés?",
    "¿Quién es más probable que viva hasta los 100 años?",
    "¿Quién es más probable que parezca más joven de lo que es?",
    "¿Quién es más probable que parezca más viejo de lo que es?",
    "¿Quién es más probable que use botox?",
    "¿Quién es más probable que se tiña el pelo de un color loco?",
    "¿Quién es más probable que se rape la cabeza?",
    "¿Quién es más probable que se deje crecer la barba hasta el suelo?",
    "¿Quién es más probable que nunca se corte las uñas?",
    "¿Quién es más probable que tenga los pies más feos?",
    "¿Quién es más probable que huela mal?",
    "¿Quién es más probable que use demasiado perfume?",
    "¿Quién es más probable que se vista peor?",
    "¿Quién es más probable que se vista mejor?",
    "¿Quién es más probable que gaste más en ropa?",
    "¿Quién es más probable que use ropa de segunda mano?",
    "¿Quién es más probable que haga su propia ropa?",
    "¿Quién es más probable que se convierta en diseñador de moda?",
    "¿Quién es más probable que sea modelo?",
    "¿Quién es más probable que se caiga en la pasarela?",
    "¿Quién es más probable que salga en la portada de una revista?",
    "¿Quién es más probable que escriba su autobiografía?",
    "¿Quién es más probable que tenga una película sobre su vida?",
    "¿Quién es más probable que sea interpretado por Brad Pitt / Angelina Jolie?",
    "¿Quién es más probable que gane un Oscar?",
    "¿Quién es más probable que olvide su discurso de aceptación?",
    "¿Quién es más probable que se tropiece al subir al escenario?",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [animation, setAnimation] = useState('');

  const nextQuestion = () => {
    setAnimation('animate-slideOutLeft');
    setTimeout(() => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * questions.length);
        } while (newIndex === currentIndex);
        
        setCurrentIndex(newIndex);
        setCurrentQuestion(questions[newIndex]);
        setAnimation('animate-slideInRight');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Fondo ambiental Azul/Indigo para diferenciarlo */}
        <div className="absolute inset-0 bg-blue-900/10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full"></div>
        
        {/* Botón Salir */}
        <button onClick={onExit} className="absolute top-4 left-4 p-2 bg-white/10 rounded-full hover:bg-white/20 text-gray-300 z-50">
            <Home size={24} />
        </button>

        <div className="mb-8 z-10">
            <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                <Fingerprint size={40} className="text-blue-500" />
            </div>
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 uppercase tracking-tighter leading-tight">
                Quién es más<br/>probable
            </h2>
            <p className="text-gray-400 text-sm mt-3 flex items-center justify-center gap-2">
                <Users size={16} />
                <span>A la cuenta de 3, señalen a alguien</span>
            </p>
        </div>

        {/* Tarjeta de la Pregunta */}
        <div className={`w-full max-w-md perspective-1000 ${animation}`}>
            <Card className="min-h-[320px] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-black border-blue-500/30 shadow-2xl transform transition-all hover:scale-[1.02] relative overflow-hidden">
                {/* Decoración de fondo */}
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Fingerprint size={120} />
                </div>
                
                <p className="text-blue-500 text-xl font-bold mb-4 uppercase tracking-widest">¿Quién...</p>
                <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed z-10">
                    {currentQuestion}
                </p>
            </Card>
        </div>

        <div className="mt-10 z-10 w-full max-w-xs">
            <Button onClick={nextQuestion} variant="primary" className="!bg-gradient-to-r !from-blue-600 !to-indigo-600 !shadow-blue-500/30">
                <RefreshCw size={20} /> SIGUIENTE
            </Button>
        </div>

        <style jsx>{`
            .perspective-1000 { perspective: 1000px; }
            .animate-slideOutLeft { animation: slideOutLeft 0.3s forwards; }
            .animate-slideInRight { animation: slideInRight 0.3s forwards; }
            
            @keyframes slideOutLeft {
                from { opacity: 1; transform: translateX(0) rotateY(0); }
                to { opacity: 0; transform: translateX(-100px) rotateY(-10deg); }
            }
            @keyframes slideInRight {
                from { opacity: 0; transform: translateX(100px) rotateY(10deg); }
                to { opacity: 1; transform: translateX(0) rotateY(0); }
            }
        `}</style>
    </div>
  );
};

export default MostLikelyTo;