import React, { useState } from 'react';
import { HelpCircle, ArrowLeft, RefreshCw, Home, Flame, MessageCircle } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';

const TruthOrDare = ({ onExit }) => {
  // 100 Verdades
  const truths = [
    "¿Cuál es tu mayor miedo?", "¿Qué es lo peor que has hecho borracho?", "¿Has sido infiel alguna vez?",
    "¿Quién de aquí te cae peor?", "¿Quién de aquí te parece más atractivo/a?", "¿Cuál es tu fantasía sexual secreta?",
    "¿Has robado algo alguna vez?", "¿Cuál es la mentira más grande que has dicho a tus padres?",
    "¿Has espiado el celular de tu pareja?", "¿Qué es lo más vergonzoso que te ha pasado en la cama?",
    "¿Te has hecho pipí en la cama de adulto?", "¿Has besado a alguien de tu mismo sexo?",
    "¿Cuál es tu peor hábito?", "¿Qué es lo que más odias de tu personalidad?",
    "¿Has tenido sexo en un lugar público?", "¿Cuál fue tu peor cita?", "¿Has fingido un orgasmo?",
    "¿Te arrepientes de haberte acostado con alguien?", "¿Has enviado nudes a la persona equivocada?",
    "¿Cuál es el sueño más raro que has tenido?", "¿Te has enamorado del novio/a de un amigo/a?",
    "¿Qué harías si fueras invisible por un día?", "¿Has comido comida de la basura?",
    "¿Te has tirado un pedo y culpado a otro?", "¿Cuál es tu placer culposo?",
    "¿Has usado la ropa interior de otra persona?", "¿Has tenido una enfermedad venérea?",
    "¿Quién fue tu primer amor?", "¿Qué es lo más ilegal que has hecho?",
    "¿Te hueles la ropa interior para ver si está limpia?", "¿Has orinado en una piscina?",
    "¿Has sido arrestado?", "¿Te han puesto los cuernos?", "¿Has tenido un trío?",
    "¿Te gustaría tener un trío?", "¿Con qué famoso tendrías sexo?",
    "¿Qué parte de tu cuerpo te gusta menos?", "¿Qué parte de tu cuerpo te gusta más?",
    "¿Has tenido sexo con un compañero de trabajo?", "¿Has tenido sexo con un profesor?",
    "¿Has besado a más de una persona en una noche?", "¿Cuál es tu posición sexual favorita?",
    "¿Te gusta que te aten?", "¿Te gusta el sexo rudo o suave?",
    "¿Has grabado un video íntimo?", "¿Has tenido sexo telefónico?",
    "¿Te has masturbado hoy?", "¿Con qué frecuencia te masturbas?",
    "¿Has pensado en alguien de aquí mientras te masturbabas?", "¿Qué ropa interior llevas puesta?",
    "¿Has salido de casa sin ropa interior?", "¿Te has bañado desnudo en el mar?",
    "¿Has tenido sexo en un coche?", "¿Has tenido sexo en la playa?",
    "¿Has tenido sexo en el cine?", "¿Has tenido sexo en un baño público?",
    "¿Has tenido sexo en la casa de tus padres?", "¿Has tenido sexo en una fiesta?",
    "¿Has tenido una aventura de una noche?", "¿Has tenido un amigo con derechos?",
    "¿Te has acostado con un ex?", "¿Volverías con tu ex?",
    "¿Has stalkeado a tu ex recientemente?", "¿Tienes una cuenta falsa en redes sociales?",
    "¿Has comprado seguidores?", "¿Has editado tus fotos para verte más delgado/a?",
    "¿Has mentido sobre tu edad?", "¿Has mentido sobre tu trabajo?",
    "¿Has robado dinero a tus padres?", "¿Has hecho trampa en un examen?",
    "¿Has sido despedido de un trabajo?", "¿Has renunciado a un trabajo haciendo un escándalo?",
    "¿Has tenido una pelea física?", "¿Has roto algo de valor y lo has escondido?",
    "¿Has conducido borracho?", "¿Has tenido un accidente de coche?",
    "¿Has vomitado sobre alguien?", "¿Te has quedado dormido en el baño?",
    "¿Has salido de fiesta sin ducharte?", "¿Has usado la misma ropa dos días seguidos?",
    "¿Has besado a alguien con mal aliento?", "¿Has tenido sexo con alguien que olía mal?",
    "¿Has fingido estar enfermo para no ir a trabajar?", "¿Has fingido estar enfermo para no tener sexo?",
    "¿Has llorado para conseguir algo?", "¿Has coqueteado con un policía para evitar una multa?",
    "¿Has robado en un supermercado?", "¿Has comido algo en el súper sin pagarlo?",
    "¿Has devuelto ropa después de usarla?", "¿Has regalado algo que te regalaron a ti?",
    "¿Has olvidado el cumpleaños de tu pareja?", "¿Has llamado a tu pareja con el nombre de tu ex?",
    "¿Te has olvidado del nombre de la persona con la que te acostaste?", "¿Has tenido sexo sin protección con un desconocido?",
    "¿Has tenido un susto de embarazo?", "¿Has pagado por sexo?", "¿Has cobrado por sexo?",
    "¿Has ido a un club de striptease?", "¿Has hecho un baile erótico?",
  ];

  // 100 Retos
  const dares = [
    "Besa a la persona a tu derecha.", "Besa a la persona a tu izquierda.",
    "Dale un masaje a la persona que elijas.", "Deja que el grupo te revise el historial del celular.",
    "Envía un mensaje a tu ex diciendo 'Te extraño'.", "Publica una foto vergonzosa en tu historia de Instagram.",
    "Baila sin música por 1 minuto.", "Haz un baile erótico a alguien del grupo.",
    "Quítate una prenda de ropa.", "Intercambia una prenda de ropa con alguien.",
    "Bebe un shot sin usar las manos.", "Haz 20 flexiones.",
    "Deja que te pinten la cara con un marcador.", "Come una cucharada de picante o mostaza.",
    "Lame el cuello de la persona a tu derecha.", "Deja que alguien te lama la oreja.",
    "Siéntate en el regazo de alguien por 3 turnos.", "Habla con acento extranjero por el resto del juego.",
    "Canta una canción a todo pulmón.", "Imita a alguien del grupo.",
    "Deja que el grupo te envíe un mensaje a quien quieran.", "Haz twerking por 30 segundos.",
    "Besa el suelo.", "Lame el pie de alguien.", "Deja que te huelan las axilas.",
    "Muestra tu última foto de la galería.", "Llama a tu mamá y dile que estás embarazada/vas a ser papá.",
    "Pide una pizza a un número al azar.", "Grita por la ventana '¡Soy virgen!'.",
    "Camina como modelo por la habitación.", "Finge un orgasmo ruidoso.",
    "Chupa el dedo de alguien.", "Deja que alguien te muerda.",
    "Hazle un chupón a alguien.", "Deja que te hagan un chupón.",
    "Bebe del ombligo de alguien (Body shot).", "Haz el pino (parada de manos) contra la pared.",
    "Da 10 vueltas rápido e intenta caminar recto.", "Toma un trago de cada vaso en la mesa.",
    "Come algo sin usar las manos.", "Deja que alguien te dé de comer en la boca.",
    "Véndate los ojos y adivina quién te toca.", "Besa a la persona que te parezca más atractiva.",
    "Haz un striptease parcial.", "Quítate los calcetines con los dientes.",
    "Huele los pies de la persona a tu izquierda.", "Bebe agua del plato de una mascota (si hay).",
    "Ladra como un perro a un extraño (o por la ventana).", "Gatea como un bebé.",
    "Ponte la ropa interior por fuera.", "Ponte los calcetines en las manos.",
    "Bebe un vaso de agua al revés.", "Intenta lamer tu codo.",
    "Métete un hielo en la ropa interior.", "Deja que alguien te meta un hielo en la espalda.",
    "Cómete un plátano de forma seductora.", "Simula tener sexo con una almohada.",
    "Gime el nombre de alguien del grupo.", "Di el alfabeto al revés.",
    "Haz una cara fea y deja que te tomen una foto.", "No parpadees por 1 minuto.",
    "Mira fijamente a alguien sin reírte.", "Haz cosquillas a alguien.",
    "Deja que te hagan cosquillas.", "Susurra algo sucio al oído de alguien.",
    "Muerde el labio de alguien suavemente.", "Da un beso esquimal a alguien.",
    "Abraza a alguien por 1 minuto.", "Pide matrimonio a alguien del grupo.",
    "Declara tu amor a un objeto.", "Actúa como un animal por 1 minuto.",
    "Haz ruidos de animales durante el turno de otro.", "Habla rimando todo lo que dices.",
    "Solo puedes responder con preguntas.", "No puedes decir 'Sí' ni 'No'.",
    "Bebe cada vez que alguien diga tu nombre.", "Haz de camarero para todos por 5 minutos.",
    "Limpia algo de la casa.", "Besa tu propio reflejo en el espejo.",
    "Baila con una escoba.", "Haz una pose de yoga difícil.",
    "Tócate la nariz con la lengua.", "Cruza los ojos.",
    "Mueve las orejas (si puedes).", "Haz un truco de magia (o inténtalo).",
    "Cuenta un chiste malo.", "Ríete como una bruja.",
    "Llora falsamente.", "Actúa como si estuvieras borracho (si no lo estás).",
    "Actúa como si estuvieras sobrio (si estás borracho).", "Haz una imitación de un famoso.",
    "Haz una imitación de un profesor.", "Haz una imitación de tu jefe.",
    "Llama a un restaurante y pide algo que no vendan.", "Pregunta la hora a un extraño.",
    "Sal a la calle y saluda a todos.", "Abraza a un árbol.",
    "Besa una pared.", "Lame una cuchara y pégatela en la nariz.",
    "Ponte una cuchara en equilibrio en la nariz.", "Haz malabares con 3 objetos.",
    "Haz una torre de cartas (o vasos).", "Bebe un shot de limón puro.",
    "Come una rodaja de cebolla cruda.", "Muerde un ajo.",
  ];

  const [currentText, setCurrentText] = useState(null);
  const [type, setType] = useState(null); // 'truth' or 'dare'
  const [animation, setAnimation] = useState('');

  const pickTruth = () => {
    const random = truths[Math.floor(Math.random() * truths.length)];
    setType('truth');
    setAnimation('animate-flipIn');
    setCurrentText(random);
  };

  const pickDare = () => {
    const random = dares[Math.floor(Math.random() * dares.length)];
    setType('dare');
    setAnimation('animate-flipIn');
    setCurrentText(random);
  };

  const reset = () => {
    setCurrentText(null);
    setType(null);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-violet-900/10 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-violet-600/10 blur-[100px] rounded-full"></div>
        <button onClick={onExit} className="absolute top-4 left-4 p-2 bg-white/10 rounded-full hover:bg-white/20 text-gray-300 z-50"><Home size={24} /></button>
        
        <div className="mb-8 z-10">
           <div className="w-20 h-20 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-violet-500/30">
                <HelpCircle size={40} className="text-violet-500" />
            </div>
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500 uppercase">Verdad o Reto</h2>
        </div>

        {!currentText ? (
            <div className="flex flex-col gap-4 w-full max-w-xs z-10">
                <button onClick={pickTruth} className="bg-blue-600 hover:bg-blue-500 text-white p-8 rounded-2xl font-black text-2xl shadow-lg shadow-blue-500/30 transition-transform hover:scale-105 flex flex-col items-center gap-2">
                    <MessageCircle size={32} /> VERDAD
                </button>
                <div className="text-gray-500 font-bold">- O -</div>
                <button onClick={pickDare} className="bg-red-600 hover:bg-red-500 text-white p-8 rounded-2xl font-black text-2xl shadow-lg shadow-red-500/30 transition-transform hover:scale-105 flex flex-col items-center gap-2">
                    <Flame size={32} /> RETO
                </button>
            </div>
        ) : (
            <div className={`w-full max-w-md perspective-1000 ${animation}`}>
                <Card className={`min-h-[300px] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-black border shadow-2xl relative overflow-hidden ${type === 'truth' ? 'border-blue-500/50' : 'border-red-500/50'}`}>
                    <p className={`text-xl font-bold mb-6 uppercase tracking-widest ${type === 'truth' ? 'text-blue-400' : 'text-red-400'}`}>
                        {type === 'truth' ? 'VERDAD' : 'RETO'}
                    </p>
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