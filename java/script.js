/* ============================================================
   DATOS EDITABLES — cambia solo lo que está aquí abajo
   ============================================================ */
const DATOS = {
  invitado:        "Familia González",     // a quién va dirigida (portada)
  nombreQuince:     "Isabella Andrade",
  fraseHero:        "“Hoy comienza un nuevo capítulo, lleno de sueños por cumplir y momentos por vivir.”",
  padre:            "Roberto Andrade",
  madre:            "Carla Espinoza",

  // Fecha y hora del evento en formato ISO: "AAAA-MM-DDTHH:mm:00"
  fechaEventoISO:   "2030-12-31T18:00:00",
  fechaLegible:      "Martes 31 de diciembre, 2030",
  horaLegible:       "18:00",

  lugarNombre:      "Salón Jardín Botánico",
  lugarDireccion:   "Av. Principal 123, Guayaquil",
  // Para el mapa, reemplaza "Guayaquil,Ecuador" por tu dirección real
  mapaQuery:        "Guayaquil,Ecuador",

  contactoConfirmacion: "Confirma al +593 98 525 5380",
};

/* ============================================================
   No necesitas tocar nada debajo de esta línea
   ============================================================ */

// Pinta los datos en el DOM
document.getElementById('p-invitado').textContent   = DATOS.invitado;
document.getElementById('p-fecha-corta').textContent = DATOS.fechaLegible.toUpperCase();
document.getElementById('h-nombre').textContent      = DATOS.nombreQuince;
document.getElementById('h-frase').textContent       = DATOS.fraseHero;
document.getElementById('pd-nombres').innerHTML      = DATOS.padre + '<span class="y">&amp;</span>' + DATOS.madre;
document.getElementById('d-fecha').textContent       = DATOS.fechaLegible;
document.getElementById('d-hora').textContent        = DATOS.horaLegible;
document.getElementById('d-lugar').textContent       = DATOS.lugarNombre;
document.getElementById('d-direccion').textContent   = DATOS.lugarDireccion;
document.getElementById('conf-contacto').textContent = DATOS.contactoConfirmacion;
document.getElementById('f-anio').textContent         = new Date().getFullYear();

const mapaURL = "https://www.google.com/maps?q=" + encodeURIComponent(DATOS.mapaQuery);
document.getElementById('d-mapa-iframe').src = mapaURL + "&output=embed";
document.getElementById('d-mapa-link').href  = mapaURL;

// ---------- Abrir invitación (portada -> contenido) ----------
const portada   = document.getElementById('portada');
const contenido = document.getElementById('contenido');
const audio     = document.getElementById('audio-fondo');
const btnMusica = document.getElementById('control-musica');

portada.addEventListener('click', () => {
  portada.style.display = 'none';
  contenido.classList.add('visible');
  audio.play().catch(() => { /* el navegador puede bloquear autoplay */ });
}, { once:true });

btnMusica.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().catch(()=>{});
    btnMusica.classList.remove('pausado');
  } else {
    audio.pause();
    btnMusica.classList.add('pausado');
  }
});

// ---------- Cuenta regresiva ----------
const fechaObjetivo = new Date(DATOS.fechaEventoISO).getTime();

function actualizarCuenta(){
  const ahora = new Date().getTime();
  let dif = fechaObjetivo - ahora;

  if (dif < 0) dif = 0;

  const dias  = Math.floor(dif / (1000*60*60*24));
  const horas = Math.floor((dif % (1000*60*60*24)) / (1000*60*60));
  const min   = Math.floor((dif % (1000*60*60)) / (1000*60));
  const seg   = Math.floor((dif % (1000*60)) / 1000);

  document.getElementById('c-dias').textContent  = String(dias).padStart(2,'0');
  document.getElementById('c-horas').textContent = String(horas).padStart(2,'0');
  document.getElementById('c-min').textContent   = String(min).padStart(2,'0');
  document.getElementById('c-seg').textContent   = String(seg).padStart(2,'0');
}

actualizarCuenta();
setInterval(actualizarCuenta, 1000);
