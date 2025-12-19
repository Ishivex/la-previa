import React, { useState } from 'react';
import { HelpCircle, ArrowLeft, RefreshCw, Home, Flame, MessageCircle, AlertTriangle } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';

const TruthOrDare = ({ onExit }) => {
  const [isHotMode, setIsHotMode] = useState(false); // Estado para el modo picante

  // --- BASE NORMAL (VERDAD) ---
  const truthsNormal = [
    "¿Cuál es tu mayor miedo?", "¿Qué es lo peor que has hecho borracho?", 
    "¿Quién de aquí te cae peor?", "¿Has robado algo alguna vez?",
    "¿Cuál es la mentira más grande que has dicho?", "¿Has espiado el celular de tu pareja?",
    "¿Qué es lo más vergonzoso que te ha pasado?", "¿Te has hecho pipí en la cama de adulto?",
    "¿Cuál es tu peor hábito?", "¿Qué es lo que más odias de tu personalidad?",
    "¿Quién fue tu primer amor?", "¿Qué harías si fueras invisible?",
    "¿Has comido comida de la basura?", "¿Te has tirado un pedo y culpado a otro?",
    "¿Cuál es tu placer culposo?", "¿Has usado la ropa interior de otra persona?",
    "¿Quién de aquí te parece más atractivo/a?", "¿Te han arrestado?",
    "¿Qué parte de tu cuerpo te gusta menos?", "¿Has sido despedido?",
    "¿Si pudieras borrar un año de tu vida, cuál sería?", "¿Has llorado en el trabajo?",
    "¿Qué nombre le pondrías a tu hijo que todos odiarían?", "¿Has fingido que te gusta un regalo?",
    "¿Cuál es la peor comida que has probado?", "¿Has vomitado sobre alguien?",
    "¿Te has enamorado del profesor/a?", "¿Has copiado en un examen importante?",
    "¿Qué harías con 1 millón de dólares?", "¿Cuál es tu olor favorito?",
    "¿Te has bañado sin ducharte por más de 3 días?", "¿Has usado la misma ropa interior 2 días seguidos?",
    "¿Cuál es el chisme más grande que sabes de alguien aquí?", "¿A quién de aquí llevarías a una isla desierta?",
    "¿Has bloqueado a alguien en redes sociales sin razón?", "¿Tienes alguna cuenta falsa?",
    "¿Has stalkeado a tu ex esta semana?", "¿Has mentido sobre tu edad?",
    "¿Has mentido en tu currículum?", "¿Te has quedado dormido en el cine?",
    "¿Has roncado en una cita?", "¿Has tenido un moco colgando sin darte cuenta?",
    "¿Has saludado a alguien que no te saludaba a ti?", "¿Has entrado al baño equivocado?",
    "¿Has roto algo en una tienda y lo has escondido?", "¿Has robado wifi del vecino?",
    "¿Has leído el diario de alguien?", "¿Te has besado con alguien cuyo nombre no sabías?",
    "¿Qué es lo más tonto que has hecho por amor?", "¿Has tenido una cita a ciegas?"
  ];

  // --- BASE NORMAL (RETO) ---
  const daresNormal = [
    "Besa a la persona a tu derecha en la mejilla.", "Haz 20 flexiones.",
    "Deja que el grupo te revise el historial del celular.", "Baila sin música por 1 minuto.",
    "Quítate una prenda de ropa (zapatos cuentan).", "Bebe un shot sin usar las manos.",
    "Deja que te pinten la cara con un marcador.", "Come una cucharada de mostaza/picante.",
    "Lame el cuello de la persona a tu derecha.", "Canta una canción a todo pulmón.",
    "Imita a alguien del grupo.", "Haz twerking por 30 segundos.",
    "Besa el suelo.", "Lame el pie de alguien.", "Deja que te huelan las axilas.",
    "Llama a tu mamá y dile que estás embarazada/vas a ser papá.", "Camina como modelo.",
    "Chupa el dedo de alguien.", "Bebe del ombligo de alguien (Body shot).",
    "Come algo sin usar las manos.", "Habla con acento extranjero por 3 turnos.",
    "No parpadees por 1 minuto.", "Haz el pino (parada de manos) contra la pared.",
    "Deja que alguien te despeine.", "Ponte los calcetines en las manos.",
    "Bebe un vaso de agua al revés.", "Intenta lamer tu codo.",
    "Haz cosquillas a la persona de tu izquierda.", "Deja que te hagan cosquillas.",
    "Grita por la ventana '¡Amo a mi suegra!'.", "Manda un audio cantando al grupo de la familia.",
    "Haz una cara fea y deja que te tomen una foto.", "Actúa como un perro.",
    "Haz de camarero para todos por 5 minutos.", "Baila la Macarena.",
    "Haz una declaración de amor a una silla.", "Abraza a la persona que elijas por 1 minuto.",
    "Déjate maquillar por el grupo.", "Bebe un shot de limón puro.",
    "Come un ajo crudo (o un pedazo de cebolla).", "Haz 10 sentadillas.",
    "Da 5 vueltas rápido e intenta caminar recto.", "Ponte la camisa al revés.",
    "Haz mímica de tu película favorita.", "Deja que alguien te escriba en la frente.",
    "Hazte una selfie vergonzosa y súbela a Instagram (bórrala en 5 min).", 
    "Llama a un restaurante y pide pizza (si no venden pizza).",
    "Habla rimando todo por 2 turnos.", "Solo puedes responder con preguntas por 2 turnos."
  ];

  // --- BASE HOT (+18) ---
  const truthsHot = [
    "¿Cuál es tu fantasía sexual secreta?", 
    "¿Has sido infiel alguna vez?",
    "¿Con cuántas personas te has acostado?", 
    "¿Has hecho un trío?",
    "¿Cuál es tu posición favorita?", 
    "¿Has tenido sexo en un lugar público?",
    "¿Te has grabado teniendo sexo?", 
    "¿Has enviado nudes?",
    "¿Te has acostado con alguien de este grupo?", 
    "¿Qué es lo más sucio que has hecho en la cama?",
    "¿Has tenido sexo anal?", 
    "¿Te gusta que te aten?", 
    "¿Tragas o escupes?", 
    "¿Has fingido un orgasmo?", 
    "¿Cuál es el lugar más raro donde te has masturbado?", 
    "¿Te pone caliente alguien de aquí?",
    "¿Has tenido sexo con alguien de tu mismo sexo?", 
    "¿Has pagado por sexo?",
    "¿Has tenido sexo en el trabajo?", 
    "¿Te has acostado con el ex de un amigo?",
    "¿Prefieres sexo rudo o suave?",
    "¿Te han pillado teniendo sexo?",
    "¿Has tenido sexo en un coche?",
    "¿Has tenido sexo en la playa?",
    "¿Has tenido sexo en el cine?",
    "¿Has tenido sexo en la casa de tus padres?",
    "¿Has tenido una aventura de una noche?",
    "¿Has tenido un amigo con derechos?",
    "¿Te has acostado con alguien 10 años mayor?",
    "¿Te has acostado con alguien 10 años menor?",
    "¿Has usado juguetes sexuales?",
    "¿Tienes algún fetiche con los pies?",
    "¿Te gusta que te digan cosas sucias?",
    "¿Cuál es la parte de tu cuerpo más sensible?",
    "¿Te has masturbado pensando en un amigo/a?",
    "¿Has tenido un sueño erótico con alguien de aquí?",
    "¿Qué ropa interior llevas puesta?",
    "¿Has salido a la calle sin ropa interior?",
    "¿Te has bañado desnudo con alguien?",
    "¿Has tenido sexo telefónico?",
    "¿Has hecho sexting en el trabajo/escuela?",
    "¿Te has olvidado del nombre de la persona mientras lo hacían?",
    "¿Has tenido sexo con un desconocido?",
    "¿Has tenido sexo sin protección con un desconocido?",
    "¿Has tenido un susto de embarazo?",
    "¿Has ido a un club de striptease?",
    "¿Has hecho un baile erótico?",
    "¿Te gusta que te muerdan?",
    "¿Te gusta que te nalgueen?",
    "¿Has tenido sexo con la luz encendida?",
    "¿Te has disfrazado para tener sexo?",
    "¿Te gusta ver porno? ¿Qué categoría?",
    "¿Has tenido sexo con dos personas en el mismo día?",
    "¿Has tenido sexo con un vecino?",
    "¿Te has acostado con el hermano/a de un amigo?",
    "¿Has tenido sexo en un avión?",
    "¿Has tenido sexo en un ascensor?",
    "¿Te han hecho un chupón visible antes de un evento importante?",
    "¿Has tenido sexo durante la menstruación?",
    "¿Te has acostado con alguien solo por despecho?",
    "¿Has tenido sexo con alguien que olía mal?",
    "¿Te has quedado dormido durante el sexo?",
    "¿Has dicho el nombre equivocado durante el sexo?",
    "¿Has tenido sexo con alguien casado?",
    "¿Has tenido sexo con alguien comprometido?",
    "¿Te has masturbado hoy?",
    "¿Te has masturbado en el baño de una fiesta?",
    "¿Te gusta que te vean o ver?",
    "¿Has tenido sexo frente a un espejo?",
    "¿Has tenido sexo en una piscina?",
    "¿Qué es lo que más te prende de una persona?",
    "¿Qué es lo que más te apaga en la cama?",
    "¿Has tenido sexo oral mientras conducías?",
    "¿Has tenido sexo oral en un cine?",
    "¿Te has tragado el semen?",
    "¿Has probado tu propio semen/fluidos?",
    "¿Has tenido sexo con música de fondo?",
    "¿Te has grabado masturbándote?",
    "¿Has tenido cibersexo?",
    "¿Has usado comida en el sexo?",
    "¿Has tenido sexo en un probador de ropa?",
    "¿Has tenido sexo en un bosque/parque?",
    "¿Te han hecho una propuesta indecente por dinero?",
    "¿Has tenido sexo con alguien famoso (o casi)?",
    "¿Has tenido sexo con gemelos/as?",
    "¿Has tenido sexo con alguien de otra raza?",
    "¿Has tenido sexo con alguien que no hablaba tu idioma?",
    "¿Te has acostado con tu jefe/a?",
    "¿Te has acostado con tu empleado/a?",
    "¿Te has acostado con tu médico/a?",
    "¿Te has acostado con tu entrenador/a?",
    "¿Has tenido sexo anal pasivo?",
    "¿Has tenido sexo anal activo?",
    "¿Te has hecho un enema?",
    "¿Te has depilado integralmente para una cita?",
    "¿Te has puesto lencería sexy debajo de la ropa normal?",
    "¿Has tenido sexo con calcetines?",
    "¿Has tenido sexo sin ducharte después del gimnasio?",
    "¿Has tenido sexo con resaca?",
    "¿Has tenido sexo estando muy borracho?"
  ];

  const daresHot = [
    "Haz un baile erótico a alguien del grupo.", 
    "Besa a la persona que elijas en el cuello.",
    "Quítate la ropa interior y dásela al grupo.", 
    "Simula un orgasmo ruidoso.",
    "Deja que alguien te toque por debajo de la ropa (pecho/pierna).", 
    "Dale un beso francés a la persona de tu izquierda.",
    "Muerde el labio de alguien suavemente.", 
    "Susurra algo muy sucio al oído de alguien.",
    "Ponte un hielo en la ropa interior hasta que se derrita.", 
    "Haz un chupón a alguien (donde no se vea).",
    "Deja que alguien te nalguee fuerte.", 
    "Intercambia ropa con alguien del sexo opuesto.",
    "Bebe un shot del escote o pantalón de alguien.", 
    "Lame el pezón de alguien (por encima de la ropa).",
    "Gime el nombre de alguien del grupo.", 
    "Tócate sensualmente por 1 minuto mirándote a los ojos de alguien.",
    "Deja que alguien te escriba algo en el cuerpo con la boca.", 
    "Haz 'body shot' a la persona más atractiva.",
    "Muestra tu última foto íntima (si tienes).", 
    "Besa la parte interna del muslo de alguien.",
    "Quítate la camisa/camiseta.",
    "Deja que alguien te quite una prenda con los dientes.",
    "Come una fruta de forma erótica.",
    "Siéntate en el regazo de alguien durante 3 turnos.",
    "Deja que alguien te bese el abdomen.",
    "Besa a la persona que tienes enfrente.",
    "Haz un masaje erótico a alguien por 1 minuto.",
    "Ponte la mano de alguien en tu pecho/paquete por 10 segundos.",
    "Lame la oreja de alguien.",
    "Chupa un dedo de la persona de tu derecha sensualmente.",
    "Deja que alguien te meta la mano en el bolsillo trasero.",
    "Baila pegado con alguien una canción lenta.",
    "Haz que alguien te dé una nalgada cada vez que digas 'sí'.",
    "Bebe un trago de la boca de otra persona.",
    "Deja que alguien te lama el cuello.",
    "Pasa un hielo por el cuerpo de alguien con tu boca.",
    "Véndate los ojos y deja que alguien te bese donde quiera.",
    "Véndate los ojos y adivina quién te besa.",
    "Deja que alguien te muerda el cuello.",
    "Haz una pose sexual con alguien (con ropa).",
    "Simula tener sexo con una almohada/cojín.",
    "Haz gemidos durante el turno de otro jugador.",
    "Di qué es lo que más te gusta de la persona a tu derecha en la cama (invéntalo si no sabes).",
    "Confiesa con quién de aquí tendrías sexo.",
    "Confiesa con quién de aquí harías un trío.",
    "Deja que alguien te baje la cremallera del pantalón/falda con los dientes.",
    "Métete la mano en la ropa interior por 1 minuto.",
    "Deja que alguien te toque el trasero.",
    "Besa a la persona que el grupo elija.",
    "Quítate el sujetador/calzoncillo sin quitarte la ropa de encima.",
    "Deja que alguien te meta un dedo en la boca.",
    "Lame la cara de alguien.",
    "Haz un video fingiendo tener sexo y mándalo a un amigo (bórralo luego).",
    "Deja que alguien te deje una marca de labial en el cuerpo.",
    "Come crema batida o chocolate del cuerpo de alguien.",
    "Deja que te aten las manos por 2 turnos.",
    "Besa a 3 personas del grupo.",
    "Haz un striptease hasta quedarte en ropa interior.",
    "Deja que alguien te dé un masaje en los glúteos.",
    "Besa el ombligo de la persona a tu izquierda.",
    "Deja que alguien te bese la espalda.",
    "Susurra tu fantasía sexual al oído de la persona de tu derecha.",
    "Muestra tu historial de búsqueda porno (si te atreves).",
    "Deja que alguien te toque los pezones (por fuera).",
    "Haz twerking en la pared.",
    "Simula una posición del Kamasutra con alguien.",
    "Deja que alguien te bese los pies.",
    "Besa los pies de alguien.",
    "Bebe un shot servido en el cuerpo de alguien.",
    "Deja que alguien te muerda la oreja.",
    "Haz que parezca que estás teniendo un orgasmo.",
    "Di el nombre de tu ex gimiendo.",
    "Deja que alguien te toque la entrepierna por encima de la ropa.",
    "Besa a alguien con lengua por 10 segundos.",
    "Haz la cucharita con alguien en el suelo por 1 minuto.",
    "Deja que alguien se siente en tu cara (con ropa).",
    "Siéntate en la cara de alguien (con ropa).",
    "Lame el dedo de alguien.",
    "Deja que alguien te lama el dedo.",
    "Haz un baile de reggaetón muy pegado con alguien.",
    "Deja que alguien te agarre del pelo mientras te besa.",
    "Besa a alguien estilo Spiderman (al revés).",
    "Deja que alguien te quite los calcetines con la boca.",
    "Haz un masaje de pies a alguien.",
    "Deja que alguien te bese las manos.",
    "Besa el cuello de la persona que te parezca más sexy.",
    "Deja que alguien te dé un beso esquimal en el cuello.",
    "Ponte a gatas y deja que alguien te nalguee.",
    "Haz que alguien te monte a caballito.",
    "Deja que alguien te lleve en brazos.",
    "Besa a la persona más alta del grupo.",
    "Besa a la persona más baja del grupo.",
    "Intercambia un beso con la persona que tiene los ojos más bonitos.",
    "Deja que alguien te dé un beso en la frente.",
    "Besa la mano de todos los jugadores.",
    "Deja que alguien te dé un beso en la mejilla muy cerca de los labios.",
    "Haz que alguien te dé un beso sorpresa en cualquier momento del juego.",
    "Besa a la persona que tenga la misma edad que tú (o cercana)."
  ];

  const [currentText, setCurrentText] = useState(null);
  const [type, setType] = useState(null); 
  const [animation, setAnimation] = useState('');

  const getQuestionPool = (type) => {
    if (type === 'truth') {
        return isHotMode ? [...truthsNormal, ...truthsHot] : truthsNormal;
    } else {
        return isHotMode ? [...daresNormal, ...daresHot] : daresNormal;
    }
  };

  const pickTruth = () => {
    const pool = getQuestionPool('truth');
    const random = pool[Math.floor(Math.random() * pool.length)];
    setType('truth');
    setAnimation('animate-flipIn');
    setCurrentText(random);
  };

  const pickDare = () => {
    const pool = getQuestionPool('dare');
    const random = pool[Math.floor(Math.random() * pool.length)];
    setType('dare');
    setAnimation('animate-flipIn');
    setCurrentText(random);
  };

  const reset = () => {
    setCurrentText(null);
    setType(null);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden transition-colors duration-500 ${isHotMode ? 'bg-red-950' : 'bg-black'}`}>
        
        {/* Fondo ambiental */}
        <div className={`absolute inset-0 pointer-events-none opacity-20 ${isHotMode ? 'bg-red-600' : 'bg-violet-900'}`}></div>
        
        {/* Botón Salir */}
        <button onClick={onExit} className="absolute top-4 left-4 p-2 bg-white/10 rounded-full hover:bg-white/20 text-gray-300 z-50"><Home size={24} /></button>
        
        {/* Toggle Modo HOT */}
        <div className="absolute top-4 right-4 z-50">
            <button 
                onClick={() => setIsHotMode(!isHotMode)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-all ${isHotMode ? 'bg-red-600 border-red-400 text-white shadow-[0_0_15px_red]' : 'bg-gray-800 border-gray-600 text-gray-400'}`}
            >
                <Flame size={18} className={isHotMode ? 'fill-current animate-pulse' : ''} />
                <span className="text-xs font-bold uppercase">{isHotMode ? 'MODO HOT ACTIVADO' : 'MODO HOT APAGADO'}</span>
            </button>
        </div>

        <div className="mb-8 z-10 mt-12">
           <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border transition-colors ${isHotMode ? 'bg-red-500/20 border-red-500/50' : 'bg-violet-500/20 border-violet-500/30'}`}>
                {isHotMode ? <AlertTriangle size={40} className="text-red-500" /> : <HelpCircle size={40} className="text-violet-500" />}
            </div>
            <h2 className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r uppercase ${isHotMode ? 'from-red-500 to-orange-500' : 'from-violet-400 to-purple-500'}`}>
                {isHotMode ? 'VERDAD O RETO 🔥' : 'VERDAD O RETO'}
            </h2>
            {isHotMode && <p className="text-red-400 text-sm font-bold mt-2 animate-pulse">¡PREGUNTAS +18 ACTIVADAS!</p>}
        </div>

        {!currentText ? (
            <div className="flex flex-col gap-4 w-full max-w-xs z-10">
                <button onClick={pickTruth} className="bg-blue-600 hover:bg-blue-500 text-white p-8 rounded-2xl font-black text-2xl shadow-lg shadow-blue-500/30 transition-transform hover:scale-105 flex flex-col items-center gap-2">
                    <MessageCircle size={32} /> VERDAD
                </button>
                <div className="text-gray-500 font-bold">- O -</div>
                <button onClick={pickDare} className={`text-white p-8 rounded-2xl font-black text-2xl shadow-lg transition-transform hover:scale-105 flex flex-col items-center gap-2 ${isHotMode ? 'bg-red-700 hover:bg-red-600 shadow-red-500/50' : 'bg-red-600 hover:bg-red-500 shadow-red-500/30'}`}>
                    <Flame size={32} /> RETO
                </button>
            </div>
        ) : (
            <div className={`w-full max-w-md perspective-1000 ${animation}`}>
                <Card className={`min-h-[300px] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-black border shadow-2xl relative overflow-hidden ${type === 'truth' ? 'border-blue-500/50' : 'border-red-500/50'}`}>
                    <p className={`text-xl font-bold mb-6 uppercase tracking-widest ${type === 'truth' ? 'text-blue-400' : 'text-red-400'}`}>
                        {type === 'truth' ? 'VERDAD' : 'RETO'}
                    </p>
                    {isHotMode && (truthsHot.includes(currentText) || daresHot.includes(currentText)) && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">HOT 🔥</div>
                    )}
                    <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                        {currentText}
                    </p>
                </Card>
                <div className="mt-8">
                    <Button onClick={reset} variant="secondary">SIGUIENTE TURNO</Button>
                </div>
            </div>
        )}
        
        <style jsx>{`
            @keyframes flipIn {
                from { transform: rotateY(90deg); opacity: 0; }
                to { transform: rotateY(0); opacity: 1; }
            }
            .animate-flipIn { animation: flipIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        `}</style>
    </div>
  );
};

export default TruthOrDare;