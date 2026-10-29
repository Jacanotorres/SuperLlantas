/* ============================================================
   SUPER LLANTAS · datos del sitio
   Todo el contenido vive aquí. Lo que quede vacío ('' o null)
   simplemente no se muestra en la página.
   Los ítems con `ejemplo: true` son de muestra: borrarlos (o
   quitar la marca) cuando se cargue el inventario real.
   Para usar foto propia: pon la imagen en assets/img/ y escribe
   `img: 'assets/img/mi-foto.webp'` en el ítem.
   ============================================================ */

const SITE = {
  nombre: 'Super Llantas',
  nombreLargo: 'Super Llantas Colombia',
  slogan: 'Llantas para toda moto',
  telefono: '319 266 52 32',
  whatsapp: '573192665232',
  instagram: 'superllantascol',
  correo: '',
  direccion: 'Av. 9AN # 16N-27',
  ciudad: 'Santiago de Cali, Colombia',
  horario: '' // ej.: 'Lunes a sábado · 8:00 a.m. – 6:00 p.m.'
};

/* Tipos de uso / terreno. `art` decide el dibujo de la llanta. */
const TIPOS = [
  { id: 'cross',   nombre: 'Motocross',          corto: 'Cross',   terreno: 'Barro, arena y pista',
    texto: 'Tacos altos y separados para morder la tierra y soltar el barro.', art: 'cross' },
  { id: 'enduro',  nombre: 'Enduro',             corto: 'Enduro',  terreno: 'Trocha, monte y piedra',
    texto: 'Tacos medios y carcasa reforzada: aguantan piedra y pinchazos.', art: 'enduro' },
  { id: 'trail',   nombre: 'Trail / Doble propósito', corto: 'Trail', terreno: 'Calle y camino destapado',
    texto: 'Para ir al trabajo entre semana y salir de ruta el domingo.', art: 'trail' },
  { id: 'calle',   nombre: 'Calle y deportiva',  corto: 'Calle',   terreno: 'Pavimento seco y mojado',
    texto: 'Perfil redondo, agarre en curva y control en lluvia.', art: 'sport' },
  { id: 'scooter', nombre: 'Scooter y urbanas',  corto: 'Scooter', terreno: 'Ciudad, día a día',
    texto: 'Rines pequeños para moverte ágil por la ciudad.', art: 'sport' }
];

/* Llantas. posicion: 'Delantera' | 'Trasera'.
   precio: número en COP, o null para "cotizar". */
const LLANTAS = [
  { id: 'cross-del-21',  nombre: 'Cross Tacos Altos',   tipo: 'cross',   posicion: 'Delantera', medida: '80/100-21', rin: 21,
    uso: 'Terreno blando a intermedio', marca: '', precio: null, destacada: true,  ejemplo: true },
  { id: 'cross-tra-19',  nombre: 'Cross Tacos Altos',   tipo: 'cross',   posicion: 'Trasera',   medida: '110/90-19', rin: 19,
    uso: 'Barro y arena', marca: '', precio: null, destacada: true,  ejemplo: true },
  { id: 'cross-tra-19b', nombre: 'Cross Tacos Medios',  tipo: 'cross',   posicion: 'Trasera',   medida: '100/90-19', rin: 19,
    uso: 'Tierra compacta', marca: '', precio: null, destacada: false, ejemplo: true },
  { id: 'enduro-del-21', nombre: 'Enduro Trocha',       tipo: 'enduro',  posicion: 'Delantera', medida: '90/90-21',  rin: 21,
    uso: 'Monte, piedra y raíces', marca: '', precio: null, destacada: false, ejemplo: true },
  { id: 'enduro-tra-18', nombre: 'Enduro Trocha',       tipo: 'enduro',  posicion: 'Trasera',   medida: '120/90-18', rin: 18,
    uso: 'Monte y trocha', marca: '', precio: null, destacada: true,  ejemplo: true },
  { id: 'enduro-tra-18b',nombre: 'Enduro Extremo',      tipo: 'enduro',  posicion: 'Trasera',   medida: '140/80-18', rin: 18,
    uso: 'Terreno técnico', marca: '', precio: null, destacada: false, ejemplo: true },
  { id: 'trail-del-19',  nombre: 'Trail Mixta',         tipo: 'trail',   posicion: 'Delantera', medida: '90/90-19',  rin: 19,
    uso: 'Calle y destapado', marca: '', precio: null, destacada: false, ejemplo: true },
  { id: 'trail-tra-17',  nombre: 'Trail Mixta',         tipo: 'trail',   posicion: 'Trasera',   medida: '110/90-17', rin: 17,
    uso: 'Calle y destapado', marca: '', precio: null, destacada: false, ejemplo: true },
  { id: 'calle-del-17',  nombre: 'Calle Sport',         tipo: 'calle',   posicion: 'Delantera', medida: '110/70-17', rin: 17,
    uso: 'Pavimento seco y mojado', marca: '', precio: null, destacada: true,  ejemplo: true },
  { id: 'calle-tra-17',  nombre: 'Calle Sport',         tipo: 'calle',   posicion: 'Trasera',   medida: '140/70-17', rin: 17,
    uso: 'Pavimento seco y mojado', marca: '', precio: null, destacada: false, ejemplo: true },
  { id: 'calle-tra-17b', nombre: 'Calle Sport Touring', tipo: 'calle',   posicion: 'Trasera',   medida: '150/60-17', rin: 17,
    uso: 'Carretera y ciudad', marca: '', precio: null, destacada: false, ejemplo: true },
  { id: 'calle-tra-17c', nombre: 'Calle Súper Sport',   tipo: 'calle',   posicion: 'Trasera',   medida: '180/55-17', rin: 17,
    uso: 'Pista y carretera', marca: '', precio: null, destacada: false, ejemplo: true },
  { id: 'scooter-del-12',nombre: 'Urbana Scooter',      tipo: 'scooter', posicion: 'Delantera', medida: '110/70-12', rin: 12,
    uso: 'Ciudad', marca: '', precio: null, destacada: false, ejemplo: true },
  { id: 'scooter-tra-12',nombre: 'Urbana Scooter',      tipo: 'scooter', posicion: 'Trasera',   medida: '130/70-12', rin: 12,
    uso: 'Ciudad', marca: '', precio: null, destacada: false, ejemplo: true }
];

/* Motos. delantera / trasera = medida de llanta que usa.
   Al tocar "Llantas para esta moto" se filtra el catálogo por esas medidas. */
const MOTOS = [
  { id: 'cross-250', nombre: 'Cross 250F', tipo: 'cross', cilindraje: '250 cc', ano: '',
    texto: 'Moto de pista de 4 tiempos. Potente y ligera para el salto y la curva cerrada.',
    delantera: '80/100-21', trasera: '110/90-19', destacada: true, ejemplo: true },
  { id: 'cross-125', nombre: 'Cross 125', tipo: 'cross', cilindraje: '125 cc', ano: '',
    texto: 'Dos tiempos, respuesta inmediata. La puerta de entrada al motocross.',
    delantera: '70/100-19', trasera: '90/100-16', destacada: false, ejemplo: true },
  { id: 'enduro-300', nombre: 'Enduro 300', tipo: 'enduro', cilindraje: '300 cc', ano: '',
    texto: 'Hecha para el monte: suspensión larga y motor con torque desde abajo.',
    delantera: '90/90-21', trasera: '140/80-18', destacada: true, ejemplo: true },
  { id: 'trail-200', nombre: 'Trail 200', tipo: 'trail', cilindraje: '200 cc', ano: '',
    texto: 'Doble propósito: ciudad entre semana y trocha el fin de semana.',
    delantera: '90/90-19', trasera: '110/90-17', destacada: true, ejemplo: true },
  { id: 'deportiva-600', nombre: 'Deportiva 600', tipo: 'calle', cilindraje: '600 cc', ano: '',
    texto: 'Carenada, rápida y precisa. Pide llanta de agarre y buen perfil.',
    delantera: '120/70-17', trasera: '180/55-17', destacada: false, ejemplo: true },
  { id: 'urbana-150', nombre: 'Urbana 150', tipo: 'calle', cilindraje: '150 cc', ano: '',
    texto: 'Ágil y económica para el trayecto diario.',
    delantera: '110/70-17', trasera: '140/70-17', destacada: false, ejemplo: true }
];

/* Servicios (los de las historias del Instagram). Confirmar textos con el cliente. */
const SERVICIOS = [
  { id: 'servicios', titulo: 'Servicios',   icono: 'wrench',
    texto: 'Montaje, desmontaje y revisión de llantas, y atención para tu moto en taller.' },
  { id: 'wash',      titulo: 'Super Wash',  icono: 'drop',
    texto: 'Lavado para tu moto: sale del taller limpia y lista para rodar.' },
  { id: 'viajeros',  titulo: 'Viajeros',    icono: 'route',
    texto: 'Antes de salir a carretera, revisamos tus llantas y te alistamos para el viaje.' },
  { id: 'tienda',    titulo: 'Tienda',      icono: 'bag',
    texto: 'Llantas y productos para tu moto en un solo lugar.' }
];

/* ---------- utilidades compartidas ---------- */
const COP = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

function tipoDe(id) { return TIPOS.find(t => t.id === id) || TIPOS[0]; }

function waLink(texto) {
  return 'https://wa.me/' + SITE.whatsapp + '?text=' + encodeURIComponent(texto || 'Hola Super Llantas, quiero información.');
}

function mapsEmbed() {
  const q = [SITE.direccion, SITE.ciudad].filter(Boolean).join(', ');
  return 'https://www.google.com/maps?q=' + encodeURIComponent(q) + '&output=embed';
}
function mapsLink() {
  const q = [SITE.direccion, SITE.ciudad].filter(Boolean).join(', ');
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
}
