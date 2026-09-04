/* ============================================================
   DATOS EDITABLES — cambia solo lo que está aquí abajo
   ============================================================ */
   const DATOS = {
    invitado:        "Familia Salazar Arreaga",     // a quién va dirigida (portada)
    nombreQuince:     "Adela Salazar Arreaga",
    fraseHero:        "“Hoy comienza un nuevo capítulo, lleno de sueños por cumplir y momentos por vivir.”",
    padre:            "Alejandro Salazar Carrasco",
    madre:            "María Arreaga Carriel",
  
    // Fecha y hora del evento en formato ISO: "AAAA-MM-DDTHH:mm:00"
    fechaEventoISO:   "2026-09-12T19:00:00",
    fechaLegible:      "Sábado 12 de Septiembre, 2026",
    horaLegible:       "19:00",
  
    lugarNombre:      "25 y Chember ",
    lugarDireccion:   "(Arriba de Farmacia Keyla)",
    // Coordenadas exactas del lugar (para centrar el mapa embebido)
    mapaQuery:        "-2.2091104,-79.9246065",
    // Link que abre el botón "Abrir en Google Maps"
    mapaLink:         "https://maps.app.goo.gl/MvisbTU4nvXcLZmE6",

    // contactoConfirmacion: ,
  };
  
  /* ============================================================
     No necesitas tocar nada debajo de esta línea
     ============================================================ */
  
  // Pinta los datos en el DOM
  document.getElementById('p-invitado').textContent   = DATOS.invitado;
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
  document.getElementById('d-mapa-link').href  = DATOS.mapaLink;
  
  // ---------- Abrir invitación (portada -> contenido) ----------
  const portada   = document.getElementById('portada');
  const contenido = document.getElementById('contenido');
  const audio     = document.getElementById('audio-fondo');
  const btnMusica = document.getElementById('control-musica');
  
  portada.addEventListener('click', () => {
    portada.classList.add('abriendo');
    setTimeout(() => {
      portada.classList.add('cerrando');
    }, 450);
    setTimeout(() => {
      portada.style.display = 'none';
      contenido.classList.add('visible');
      audio.play().catch(() => { /* el navegador puede bloquear autoplay */ });
    }, 1050);
  }, { once:true });
  
  // ---------- Animación al hacer scroll dentro de la invitación ----------
  const seccionesAnimadas = document.querySelectorAll('.reveal');
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });
  
  seccionesAnimadas.forEach((seccion) => observador.observe(seccion));
  
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
