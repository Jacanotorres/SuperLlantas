/* ============================================================
   SUPER LLANTAS · datos del sitio
   Todo el contenido vive aquí. Lo que quede vacío ('' o null)
   simplemente no se muestra en la página.
   ============================================================ */

const SITE = {
  nombre: 'Super Llantas',
  nombreLargo: 'Super Llantas de Colombia',
  slogan: 'Taller de motos de alta gama',
  telefono: '315 470 8828',          // WhatsApp principal
  whatsapp: '573154708828',
  telefono2: '319 266 52 32',        // el que figura en Google Maps e Instagram
  whatsapp2: '573192665232',
  instagram: 'superllantascol',
  correo: '',
  direccion: 'Av. 9AN # 16N-27',
  barrio: 'Barrio Granada',
  ciudad: 'Santiago de Cali, Colombia',
  horario: '',                       // ej.: 'Lunes a sábado · 9:00 a.m. – 6:00 p.m.'
  lat: 3.4614011, lng: -76.5339068,
  calificacion: '4,7',               // Google Maps
  opiniones: 31
};

/* Nombre del segundo negocio (mismo local). Cambiar cuando lo confirme el cliente. */
const LAVADERO = {
  nombre: 'Lavadero de carros'
};

/* Lo que hace el taller. icono: ver Art.icon */
const SERVICIOS = [
  { id: 'llantas', titulo: 'Montaje de llantas', icono: 'tire',
    texto: 'Montamos y desmontamos las llantas de tu moto, y te asesoramos para elegir la medida y el tipo que mejor le queda.',
    puntos: ['Asesoría para escoger tu llanta', 'Montaje y desmontaje', 'Llantas para calle, carretera y destapado'] },
  { id: 'mantenimiento', titulo: 'Mantenimientos', icono: 'wrench',
    texto: 'Mantenimiento preventivo y correctivo para que tu moto siempre responda como el primer día.',
    puntos: ['Revisión general', 'Mantenimiento preventivo', 'Reparaciones y ajustes'] },
  { id: 'aceite', titulo: 'Aceite y lubricantes', icono: 'drop',
    texto: 'Cambio de aceite y lubricantes para cuidar el motor y la transmisión de tu moto.',
    puntos: ['Cambio de aceite', 'Lubricantes para tu moto', 'Recomendación según tu motor'] },
  { id: 'todo', titulo: 'Todo para tu moto', icono: 'moto',
    texto: 'Lo que tu moto necesite, lo resolvemos. Cuéntanos qué buscas y te decimos cómo ayudarte.',
    puntos: ['Atención personalizada', 'Repuestos y accesorios', 'Un solo lugar para todo'] }
];

/* Servicios del lavadero de carros. Confirmar con el cliente. */
const LAVADO = [
  { titulo: 'Lavado exterior', icono: 'drop',  texto: 'Carrocería, vidrios y rines limpios.' },
  { titulo: 'Lavado interior', icono: 'sofa',  texto: 'Tapicería, tablero y alfombras al día.' },
  { titulo: 'Lavado completo', icono: 'sparkle', texto: 'Por dentro y por fuera, de una sola vez.' },
  { titulo: 'Brillo y protección', icono: 'shield', texto: 'Acabado que se nota y protege la pintura.' }
];

/* Tipos de llanta para la página de llantas. art: kind del dibujo. */
const TIPOS = [
  { id: 'deportiva', nombre: 'Deportiva y alta cilindrada', terreno: 'Pavimento, curva y velocidad', art: 'sport',
    texto: 'Perfil redondo y compuestos de agarre para motos de alto desempeño.' },
  { id: 'touring', nombre: 'Touring y carretera', terreno: 'Viajes largos', art: 'sport',
    texto: 'Duración y estabilidad para recorrer kilómetros con comodidad.' },
  { id: 'adventure', nombre: 'Adventure y doble propósito', terreno: 'Calle y camino destapado', art: 'trail',
    texto: 'Tacos medios: ruedas en asfalto y salen de ruta sin problema.' },
  { id: 'offroad', nombre: 'Enduro y motocross', terreno: 'Barro, arena y trocha', art: 'cross',
    texto: 'Tacos altos que muerden la tierra para terreno exigente.' },
  { id: 'urbana', nombre: 'Urbana y scooter', terreno: 'Ciudad, día a día', art: 'sport',
    texto: 'Ágiles y económicas para el trayecto diario.' }
];

/* ---------- utilidades compartidas ---------- */
function waLink(texto, num) {
  return 'https://wa.me/' + (num || SITE.whatsapp) + '?text=' + encodeURIComponent(texto || 'Hola Super Llantas, quiero información.');
}

function mapsEmbed() {
  return 'https://www.google.com/maps?q=' + SITE.lat + ',' + SITE.lng + '&z=17&output=embed';
}
function mapsLink() {
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(SITE.nombreLargo + ', Cali');
}
