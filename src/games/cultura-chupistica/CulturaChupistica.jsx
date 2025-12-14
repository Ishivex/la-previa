import React, { useState } from 'react';
import { Brain, ArrowLeft, RefreshCw, Home, AlertTriangle } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';

const CulturaChupistica = ({ onExit }) => {
  // Base de datos de Categorías (200+)
  const categories = [
    // MARCAS
    "Marcas de Cerveza", "Marcas de Autos", "Marcas de Ropa Deportiva", "Marcas de Cigarros", 
    "Marcas de Condones", "Marcas de Celulares", "Marcas de Maquillaje", "Marcas de Refrescos",
    "Marcas de Zapatillas", "Marcas de Lujo", "Marcas de Comida Rápida", "Marcas de Chocolate",
    "Marcas de Papel Higiénico", "Marcas de Autos Japoneses", "Marcas de Relojes", "Marcas de Whiskey",
    "Marcas de Tequila", "Marcas de Vodka", "Marcas de Ropa Interior", "Marcas de Cereales",
    "Marcas de Tecnología", "Marcas de Motos", "Marcas de Champú", "Marcas de Desodorante",
    "Marcas de Coches Alemanes", "Marcas de Streaming (Netflix, etc)", "Redes Sociales",
    
    // GEOGRAFÍA
    "Países de Europa", "Países de América del Sur", "Países de Asia", "Capitales del Mundo",
    "Ciudades de Estados Unidos", "Ciudades de España", "Islas del Caribe", "Mares y Océanos",
    "Idiomas del mundo", "Monedas (Dólar, Euro...)", "Banderas con color Rojo", "Banderas con color Azul",
    "Países que empiecen por A", "Países que empiecen por C", "Montañas o Volcanes famosos",
    "Destinos turísticos de playa", "Gentilicios (Mexicano, etc.)", "Aerolíneas",
    
    // CINE Y TV
    "Películas de Disney", "Películas de Pixar", "Películas de Terror", "Películas de Marvel",
    "Películas de Harry Potter", "Películas de Star Wars", "Series de Netflix", "Series de Comedia (Sitcoms)",
    "Villanos de Disney", "Superhéroes de DC", "Actores Ganadores del Oscar", "Actrices de Hollywood",
    "Personajes de Los Simpson", "Personajes de Bob Esponja", "Personajes de Game of Thrones",
    "Dibujos animados de los 90", "Películas de Zombies", "Directores de Cine famosos",
    "Películas protagonizadas por Brad Pitt", "Películas protagonizadas por Leonardo DiCaprio",
    "Películas de Acción", "Películas Románticas", "Programas de Reality Show",
    
    // MÚSICA
    "Géneros Musicales", "Cantantes de Reggaetón", "Cantantes de Pop Femeninas", "Bandas de Rock",
    "Canciones de Bad Bunny", "Canciones de Shakira", "Instrumentos Musicales", "Cantantes fallecidos",
    "Boy Bands (Bandas de chicos)", "Raperos famosos", "Canciones que tengan la palabra 'Amor'",
    "Canciones que tengan la palabra 'Baby'", "Canciones para llorar", "Canciones de Karaoke clásicas",
    "Festivales de Música", "DJs famosos", "Cantantes Mexicanos", "Cantantes Colombianos",
    
    // DEPORTES
    "Deportes Olímpicos", "Equipos de Fútbol (Europa)", "Jugadores de Fútbol famosos", 
    "Deportes con pelota", "Deportes de contacto", "Tenistas famosos", "Equipos de la NBA",
    "Pilotos de Fórmula 1", "Estadios de fútbol famosos", "Deportes acuáticos",
    "Campeones del Mundial de Fútbol", "Marcas de coches de F1", "Posiciones en el fútbol",
    
    // NATURALEZA Y ANIMALES
    "Razas de Perros", "Razas de Gatos", "Animales de la Granja", "Animales de la Selva",
    "Animales Marinos", "Insectos", "Aves", "Flores", "Frutas", "Verduras", "Animales que vuelan",
    "Animales venenosos", "Animales extintos (Dinosaurios, etc)", "Frutas rojas", "Frutas cítricas",
    "Partes del cuerpo humano", "Órganos del cuerpo", "Huesos del cuerpo", "Desastres naturales",
    
    // FIESTA Y ALCOHOL
    "Tipos de Cócteles", "Tragos con Ron", "Tragos con Vodka", "Juegos para beber",
    "Razones para brindar", "Tipos de Vino", "Nombres de Bares o Discotecas", "Excusas para no beber",
    "Síntomas de la resaca", "Cosas que haces cuando estás borracho", "Remedios para la resaca",
    "Tipos de vasos o copas", "Canciones para bailar borracho",
    
    // PICANTE (+18)
    "Posiciones Sexuales", "Sinónimos de Pene", "Sinónimos de Vagina", "Sinónimos de Sexo",
    "Lugares para tener sexo", "Juguetes sexuales", "Zonas erógenas", "Tipos de besos",
    "Fetiches comunes", "Métodos anticonceptivos", "Apps de citas", "Partes del cuerpo atractivas",
    "Cosas que se dicen en la cama", "Ropa interior sexy", "Estrellas porno famosas",
    "Motivos para terminar una relación", "Mentiras que dicen los hombres", "Mentiras que dicen las mujeres",
    "Lugares públicos donde no deberías desnudarte", 
    
    // VIDA COTIDIANA
    "Cosas que encuentras en un baño", "Cosas que encuentras en una cocina", "Cosas que llevas en el bolso/cartera",
    "Cosas que hay en una nevera", "Cosas que hay en un auto", "Muebles de casa", "Electrodomésticos",
    "Herramientas de construcción", "Útiles escolares", "Profesiones", "Oficios", "Hobbies",
    "Colores", "Días de la semana en inglés", "Meses del año", "Signos del Zodiaco",
    "Platillos de comida italiana", "Platillos de comida mexicana", "Ingredientes de una pizza",
    "Sabores de helado", "Tipos de queso", "Tipos de pan", "Cosas que se comen con cuchara",
    "Cosas redondas", "Cosas cuadradas", "Cosas pegajosas", "Cosas que huelen mal",
    "Cosas que huelen bien", "Cosas que hacen ruido", "Cosas que se rompen fácilmente",
    "Cosas que flotan", "Cosas rojas", "Cosas verdes", "Cosas amarillas",
    "Nombres de mujer que empiezan con M", "Nombres de hombre que empiezan con J",
    "Apellidos comunes", "Insultos (suaves)", "Groserías", "Palabrotas",
    "Excusas para llegar tarde", "Excusas para no ir a trabajar", "Excusas para no salir",
    "Cosas que dan miedo", "Cosas que dan suerte", "Cosas que dan mala suerte",
    "Supersticiones", "Personajes históricos", "Presidentes de tu país", "Reyes o Reinas",
    "Santos", "Dioses griegos", "Planetas del sistema solar", "Elementos químicos",
    "Materias de la escuela", "Transportes públicos", "Partes de un coche",
    "Cosas que compras en el supermercado", "Cosas que compras en la farmacia",
    "Videojuegos famosos", "Consolas de videojuegos", "Personajes de Mario Bros",
    "Pokémon de la primera generación", "Apps que tienes en tu celular", "Emojis más usados",
    "Hashtags populares", "Youtubers famosos", "Influencers", "Cosas de los años 90",
    "Cosas de los años 2000", "Cosas que ya no existen", "Inventos famosos",
    "Premios Nobel", "Capitales de Europa", "Monumentos famosos (Torre Eiffel, etc)",
    "Museos famosos", "Parques de atracciones", "Cosas que haces antes de dormir",
    "Cosas que haces al despertar", "Rutina de mañana", "Deportes extremos",
    "Tipos de baile", "Instrumentos de cuerda", "Instrumentos de viento",
    "Bandas sonoras de películas", "Villanos de Batman", "Héroes de Marvel",
    "Películas de Tom Cruise", "Películas de comedia", "Películas tristes",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [animation, setAnimation] = useState('');

  const nextCategory = () => {
    setAnimation('animate-popIn');
    setTimeout(() => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * categories.length);
        } while (newIndex === currentIndex);
        
        setCurrentIndex(newIndex);
        setCurrentCategory(categories[newIndex]);
        // Remove animation class to re-trigger later if needed, 
        // but simple state change usually re-renders. 
        // For pop effect we can toggle a key or explicit class removal.
        setTimeout(() => setAnimation(''), 500);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Fondo ambiental Rosa/Magenta */}
        <div className="absolute inset-0 bg-pink-900/10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-600/10 blur-[100px] rounded-full"></div>
        
        {/* Botón Salir */}
        <button onClick={onExit} className="absolute top-4 left-4 p-2 bg-white/10 rounded-full hover:bg-white/20 text-gray-300 z-50">
            <Home size={24} />
        </button>

        <div className="mb-8 z-10">
            <div className="w-20 h-20 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.2)]">
                <Brain size={40} className="text-pink-500" />
            </div>
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500 uppercase tracking-tighter leading-tight">
                Cultura<br/>Chupística
            </h2>
            <p className="text-gray-400 text-sm mt-3 flex items-center justify-center gap-2">
                <AlertTriangle size={16} className="text-yellow-500"/>
                <span>Sin repetir ni soplar...</span>
            </p>
        </div>

        {/* Tarjeta de la Categoría */}
        <div className={`w-full max-w-md perspective-1000`}>
            <Card className={`min-h-[280px] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-black border-pink-500/30 shadow-2xl transform transition-all hover:scale-[1.02] relative overflow-hidden ${animation}`}>
                
                <p className="text-pink-400 text-sm font-bold mb-6 uppercase tracking-widest border border-pink-500/20 px-3 py-1 rounded-full">
                    Nombren...
                </p>
                
                <p className="text-3xl md:text-4xl font-black text-white leading-tight drop-shadow-lg">
                    {currentCategory}
                </p>

                <div className="mt-8 text-xs text-gray-500 italic">
                    "El que repita, se equivoque o tarde mucho... ¡BEBE!"
                </div>
            </Card>
        </div>

        <div className="mt-10 z-10 w-full max-w-xs">
            <Button onClick={nextCategory} variant="primary" className="!bg-gradient-to-r !from-pink-600 !to-rose-600 !shadow-pink-500/30">
                <RefreshCw size={20} /> SIGUIENTE
            </Button>
        </div>

        <style jsx>{`
            .perspective-1000 { perspective: 1000px; }
            @keyframes popIn {
                0% { opacity: 0; transform: scale(0.9) translateY(20px); }
                100% { opacity: 1; transform: scale(1) translateY(0); }
            }
            .animate-popIn { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        `}</style>
    </div>
  );
};

export default CulturaChupistica;