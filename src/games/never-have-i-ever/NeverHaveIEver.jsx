import React, { useState } from 'react';
import { Beer, ArrowLeft, RefreshCw, Home } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';

const NeverHaveIEver = ({ onExit }) => {
  // Base de datos de frases (Mezcla de niveles: Suave, Fiesta, Atrevido)
  const phrases = [
    "Yo nunca he fingido estar enfermo para faltar al trabajo o escuela.",
    "Yo nunca he usado el cepillo de dientes de otra persona.",
    "Yo nunca me he quedado dormido en el cine.",
    "Yo nunca he enviado un mensaje a la persona equivocada.",
    "Yo nunca he mentido sobre mi edad.",
    "Yo nunca he robado algo de un hotel (shampoo, toallas).",
    "Yo nunca he hecho pipí en una piscina.",
    "Yo nunca he sido expulsado de un bar o club.",
    "Yo nunca he tenido una cita a ciegas.",
    "Yo nunca he stalkeado a mi ex en redes sociales.",
    "Yo nunca he comido algo que se cayó al suelo.",
    "Yo nunca he usado Tinder o una app de citas.",
    "Yo nunca he dicho 'te amo' sin sentirlo.",
    "Yo nunca he olvidado el cumpleaños de mi mejor amigo.",
    "Yo nunca he salido de fiesta dos días seguidos.",
    "Yo nunca he besado a alguien cuyo nombre no sabía.",
    "Yo nunca he perdido mi celular en una fiesta.",
    "Yo nunca he tenido una multa de tráfico.",
    "Yo nunca he cantado en un karaoke sobrio.",
    "Yo nunca he llorado viendo una película de Disney.",
    "Yo nunca he mentido en el juego de Yo Nunca.",
    "Yo nunca he tenido un crush con un profesor/a.",
    "Yo nunca he revisado el teléfono de mi pareja.",
    "Yo nunca he vomitado en público.",
    "Yo nunca he bailado sobre una mesa.",
    "Yo nunca he enviado un nude.",
    "Yo nunca he tenido un sueño erótico con alguien presente aquí.",
    "Yo nunca he besado a más de una persona en la misma noche.",
    "Yo nunca he tenido una relación a distancia.",
    "Yo nunca he fingido un orgasmo.",
    "Yo nunca me he bañado desnudo en el mar.",
    "Yo nunca he sido infiel.",
    "Yo nunca he tenido sexo en un lugar público.",
    "Yo nunca he besado a un amigo/a de mi ex.",
    "Yo nunca he robado un beso.",
    "Yo nunca he tenido una aventura de una noche.",
    "Yo nunca he hecho trampa en un examen importante.",
    "Yo nunca he mentido en mi currículum.",
    "Yo nunca he gastado todo mi sueldo en un fin de semana.",
    "Yo nunca he comido comida de la basura (por accidente o no).",
    "Yo nunca he tenido miedo a la oscuridad de adulto.",
    "Yo nunca he hablado solo en voz alta en la calle.",
    "Yo nunca he confundido a un extraño con alguien que conocía.",
    "Yo nunca he entrado al baño equivocado.",
    "Yo nunca he salido sin ropa interior a la calle.",
    "Yo nunca he tenido un amigo con derechos.",
    "Yo nunca he besado a alguien del mismo sexo.",
    "Yo nunca he tenido sexo en un coche.",
    "Yo nunca he grabado un video íntimo.",
    "Yo nunca he enviado un mensaje borracho del que me arrepentí.",
    "Yo nunca he despertado sin saber dónde estaba.",
    "Yo nunca he tenido una pelea física en una fiesta.",
    "Yo nunca he roto algo valioso y lo he escondido.",
    "Yo nunca he culpado a mi mascota por un gas que me tiré.",
    "Yo nunca he usado la misma ropa interior dos días seguidos.",
    "Yo nunca he besado a alguien con mal aliento.",
    "Yo nunca he tenido sexo en la playa.",
    "Yo nunca he sido pillado teniendo sexo por mis padres.",
    "Yo nunca he tenido una fantasía con el novio/a de un amigo/a.",
    "Yo nunca he hecho 'ghosting' a alguien.",
    "Yo nunca he llorado para evitar una multa.",
    "Yo nunca he robado comida del refrigerador de mis compañeros de piso.",
    "Yo nunca he dicho que me gustaba un regalo que odiaba.",
    "Yo nunca he fingido recibir una llamada para escapar de una conversación incómoda.",
    "Yo nunca he copiado en un examen de la universidad.",
    "Yo nunca he dormido en la calle.",
    "Yo nunca he hecho autostop.",
    "Yo nunca he perdido un vuelo.",
    "Yo nunca he comido insectos.",
    "Yo nunca he montado a caballo.",
    "Yo nunca he disparado un arma.",
    "Yo nunca he sido arrestado.",
    "Yo nunca he roto un hueso.",
    "Yo nunca he tenido varicela.",
    "Yo nunca he estado en una ambulancia.",
    "Yo nunca he donado sangre.",
    "Yo nunca he corrido un maratón.",
    "Yo nunca he escalado una montaña.",
    "Yo nunca he saltado en paracaídas.",
    "Yo nunca he hecho puenting.",
    "Yo nunca he viajado solo a otro país.",
    "Yo nunca he aprendido otro idioma fluido.",
    "Yo nunca he tocado un instrumento en público.",
    "Yo nunca he salido en la televisión.",
    "Yo nunca he conocido a un famoso.",
    "Yo nunca he pedido un autógrafo.",
    "Yo nunca he ganado un sorteo o lotería.",
    "Yo nunca he encontrado dinero en la calle (más de 10$).",
    "Yo nunca he devuelto una cartera encontrada.",
    "Yo nunca he hecho voluntariado.",
    "Yo nunca he plantado un árbol.",
    "Yo nunca he ordeñado una vaca.",
    "Yo nunca he pescado un pez.",
    "Yo nunca he cazado un animal.",
    "Yo nunca he hecho fuego sin encendedor.",
    "Yo nunca he dormido en una tienda de campaña.",
    "Yo nunca he visto un fantasma.",
    "Yo nunca he jugado a la ouija.",
    "Yo nunca he tenido una experiencia paranormal.",
    "Yo nunca he ido a una vidente o tarotista.",
    "Yo nunca he creído en los horóscopos.",
    "Yo nunca he tenido un deja-vu muy fuerte.",
    "Yo nunca he tenido parálisis del sueño.",
    "Yo nunca he sido hipnotizado.",
    "Yo nunca he ido a terapia.",
    "Yo nunca he llorado en el trabajo.",
    "Yo nunca he tenido un ataque de pánico.",
    "Yo nunca he tomado ansiolíticos.",
    "Yo nunca he fumado.",
    "Yo nunca he probado drogas blandas.",
    "Yo nunca he probado drogas duras.",
    "Yo nunca he estado borracho antes del mediodía.",
    "Yo nunca he bebido solo en casa.",
    "Yo nunca he hecho una mezcla de bebidas que me hizo vomitar.",
    "Yo nunca he jugado al Beer Pong.",
    "Yo nunca he hecho un 'hidalgo'.",
    "Yo nunca he bebido hasta perder la memoria (blackout).",
    "Yo nunca he despertado con un desconocido.",
    "Yo nunca he tenido resaca de dos días.",
    "Yo nunca he prometido 'no volver a beber nunca más'.",
    "Yo nunca he bebido alcohol del ombligo de alguien.",
    "Yo nunca he hecho un baile erótico a alguien.",
    "Yo nunca he ido a un club de striptease.",
    "Yo nunca he pagado por sexo.",
    "Yo nunca he usado juguetes sexuales.",
    "Yo nunca he tenido sexo telefónico (o videollamada hot).",
    "Yo nunca he hecho sexting en el trabajo.",
    "Yo nunca he tenido sexo en la casa de mis padres.",
    "Yo nunca he tenido sexo en la casa de mis suegros.",
    "Yo nunca he tenido sexo en un baño de avión.",
    "Yo nunca he tenido sexo en un probador de ropa.",
    "Yo nunca he tenido sexo en el cine.",
    "Yo nunca he tenido sexo en un ascensor.",
    "Yo nunca he tenido sexo en un bosque.",
    "Yo nunca he tenido sexo en una piscina.",
    "Yo nunca he tenido sexo con alguien 10 años mayor.",
    "Yo nunca he tenido sexo con alguien 10 años menor.",
    "Yo nunca he tenido un trío.",
    "Yo nunca he participado en una orgía.",
    "Yo nunca he sido atado en la cama.",
    "Yo nunca he usado disfraces en la intimidad.",
    "Yo nunca he grabado a alguien sin su consentimiento.",
    "Yo nunca he sido grabado sin mi consentimiento.",
    "Yo nunca he enviado una foto íntima a un grupo de WhatsApp por error.",
    "Yo nunca he llamado a mi pareja con el nombre de mi ex.",
    "Yo nunca he tenido sexo con un compañero de trabajo.",
    "Yo nunca he tenido sexo con un jefe/a.",
    "Yo nunca he tenido sexo con un vecino/a.",
    "Yo nunca he besado a la hermana/o de un amigo.",
    "Yo nunca he salido con dos personas a la vez.",
    "Yo nunca he tenido una relación abierta.",
    "Yo nunca he perdonado una infidelidad.",
    "Yo nunca he espiado a mis vecinos.",
    "Yo nunca he robado wifi del vecino.",
    "Yo nunca he usado la cuenta de Netflix de un ex.",
    "Yo nunca he creado un perfil falso en redes sociales.",
    "Yo nunca he comprado seguidores o likes.",
    "Yo nunca he photoshopeado mi cuerpo en una foto.",
    "Yo nunca he mentido sobre dónde estaba en una foto de Instagram.",
    "Yo nunca he borrado una foto porque no tuvo suficientes likes.",
    "Yo nunca he dejado de seguir a alguien por envidia.",
    "Yo nunca he silenciadas las historias de un amigo.",
    "Yo nunca he discutido con desconocidos en internet.",
    "Yo nunca he bloqueado a un familiar en redes sociales.",
    "Yo nunca he buscado mi propio nombre en Google.",
    "Yo nunca he buscado el nombre de mi pareja en Google.",
    "Yo nunca he mentido sobre haber visto una película famosa.",
    "Yo nunca he mentido sobre haber leído un libro.",
    "Yo nunca he fingido reírme de un chiste que no entendí.",
    "Yo nunca he fingido que me gusta la comida que cocinó alguien.",
    "Yo nunca he tirado comida a la basura a escondidas.",
    "Yo nunca he devuelto ropa después de usarla.",
    "Yo nunca he probado comida de perro o gato.",
    "Yo nunca he chupado un limón entero sin hacer muecas.",
    "Yo nunca he intentado lamerme el codo.",
    "Yo nunca he intentado mover cosas con la mente.",
    "Yo nunca he hablado con mis plantas.",
    "Yo nunca he puesto nombre a mi coche.",
    "Yo nunca he tenido un amigo imaginario.",
    "Yo nunca he orinado en la ducha.",
    "Yo nunca me he hurgado la nariz y me lo he comido.",
    "Yo nunca he olido mi propia ropa interior sucia.",
    "Yo nunca he dejado de bañarme por más de 3 días.",
    "Yo nunca he usado desodorante en lugar de bañarme.",
    "Yo nunca he tenido piojos.",
    "Yo nunca he tenido hongos en los pies.",
    "Yo nunca he perdido una uña.",
    "Yo nunca me he depilado todo el cuerpo.",
    "Yo nunca me he teñido el pelo de un color loco.",
    "Yo nunca me he rapado la cabeza.",
    "Yo nunca me he hecho un tatuaje del que me arrepiento.",
    "Yo nunca me he hecho un piercing yo mismo.",
    "Yo nunca he ocultado un tatuaje a mis padres.",
    "Yo nunca he conducido sin carnet.",
    "Yo nunca he conducido borracho.",
    "Yo nunca he chocado el coche de otra persona.",
    "Yo nunca he rayado un coche y me he ido sin dejar nota.",
    "Yo nunca he robado una señal de tráfico.",
    "Yo nunca he entrado a una casa abandonada.",
    "Yo nunca he hecho grafitis.",
    "Yo nunca he robado dinero de la cartera de mis padres.",
    "Yo nunca he falsificado la firma de mis padres.",
    "Yo nunca he hecho novillos (faltar a clase) todo el día.",
    "Yo nunca he sido suspendido de la escuela.",
    "Yo nunca he copiado un trabajo entero de internet.",
    "Yo nunca he dormido en clase.",
    "Yo nunca he insultado a un profesor.",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [history, setHistory] = useState([0]); // Para poder volver atrás si queremos
  const [animation, setAnimation] = useState('');

  const nextPhrase = () => {
    setAnimation('animate-slideOutLeft');
    setTimeout(() => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * phrases.length);
        } while (newIndex === currentIndex);
        
        setCurrentIndex(newIndex);
        setCurrentPhrase(phrases[newIndex]);
        setAnimation('animate-slideInRight');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Fondo ambiental */}
        <div className="absolute inset-0 bg-yellow-900/10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-600/10 blur-[100px] rounded-full"></div>
        
        {/* Botón Salir */}
        <button onClick={onExit} className="absolute top-4 left-4 p-2 bg-white/10 rounded-full hover:bg-white/20 text-gray-300 z-50">
            <Home size={24} />
        </button>

        <div className="mb-8 z-10">
            <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                <Beer size={40} className="text-yellow-500" />
            </div>
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 uppercase tracking-tighter">
                Yo Nunca
            </h2>
            <p className="text-gray-400 text-sm mt-2">Si lo hiciste... ¡bebe!</p>
        </div>

        {/* Tarjeta de la Frase */}
        <div className={`w-full max-w-md perspective-1000 ${animation}`}>
            <Card className="min-h-[300px] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-black border-yellow-500/30 shadow-2xl transform transition-all hover:scale-[1.02]">
                <p className="text-yellow-500/50 text-6xl font-serif absolute top-4 left-4">“</p>
                <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                    {currentPhrase}
                </p>
                <p className="text-yellow-500/50 text-6xl font-serif absolute bottom-4 right-4">”</p>
            </Card>
        </div>

        <div className="mt-10 z-10 w-full max-w-xs">
            <Button onClick={nextPhrase} variant="primary" className="!bg-gradient-to-r !from-yellow-600 !to-orange-600">
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

export default NeverHaveIEver;