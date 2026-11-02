/* Lógica de cada página. Todo sale de data.js. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const page = document.body.dataset.page;

  function reveal() {
    const els = document.querySelectorAll('.reveal:not(.is-in)');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('is-in')); return; }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { threshold: .08 });
    els.forEach((e, i) => { e.style.transitionDelay = Math.min(i % 5, 4) * 60 + 'ms'; io.observe(e); });
  }

  /* ---------- servicios del taller ---------- */
  function serviceCards(el) {
    if (!el) return;
    el.innerHTML = SERVICIOS.map((s, i) => `
      <article class="svc reveal">
        <span class="svc__num">${String(i + 1).padStart(2, '0')}</span>
        <div class="svc__ico">${Art.icon(s.icono, 30)}</div>
        <h3>${esc(s.titulo)}</h3>
        <p class="muted">${esc(s.texto)}</p>
      </article>`).join('');
  }

  function serviceRows(el) {
    if (!el) return;
    el.innerHTML = SERVICIOS.map((s, i) => `
      <article class="row reveal" id="${s.id}">
        <div class="row__ico"><span class="row__num">${String(i + 1).padStart(2, '0')}</span>${Art.icon(s.icono, 46)}</div>
        <div class="row__txt">
          <h2 class="h3">${esc(s.titulo)}</h2>
          <p class="muted">${esc(s.texto)}</p>
          <ul class="ticks">${s.puntos.map(p => `<li>${Art.icon('check', 18)}${esc(p)}</li>`).join('')}</ul>
        </div>
        <a class="btn btn--sm btn--dark" href="${waLink('Hola Super Llantas, quiero información sobre: ' + s.titulo + '.')}" target="_blank" rel="noopener"><span>Consultar</span></a>
      </article>`).join('');
  }

  /* ---------- páginas ---------- */
  function initHome() {
    const hero = $('#hero-wheel');
    if (hero) hero.innerHTML = Art.wheel('sport', { spin: true, label: 'Rin de moto de alta gama' });
    const split = $('#split-moto');
    if (split) split.innerHTML = Art.moto('sport', { label: 'Moto deportiva' });
    const car = $('#home-car');
    if (car) car.innerHTML = Art.car({ label: 'Carro en el lavadero' });
    serviceCards($('#servicios-grid'));
  }

  function initServicios() { serviceRows($('#servicios-rows')); }

  function initLavadero() {
    const car = $('#lav-car');
    if (car) car.innerHTML = Art.car({ label: 'Carro con espuma' });
    $('#lav-grid').innerHTML = LAVADO.map((s, i) => `
      <article class="svc reveal">
        <span class="svc__num">${String(i + 1).padStart(2, '0')}</span>
        <div class="svc__ico">${Art.icon(s.icono, 30)}</div>
        <h3>${esc(s.titulo)}</h3>
        <p class="muted">${esc(s.texto)}</p>
      </article>`).join('');
  }

  function initContacto() {
    const info = $('#info');
    const items = [
      SITE.telefono && ['wa', 'WhatsApp', `<a href="${waLink()}" target="_blank" rel="noopener">${esc(SITE.telefono)}</a>`],
      SITE.telefono2 && ['phone', 'Teléfono', `<a href="tel:+${SITE.whatsapp2}">${esc(SITE.telefono2)}</a>`],
      SITE.direccion && ['pin', 'Visítanos', `<a href="${mapsLink()}" target="_blank" rel="noopener">${esc(SITE.direccion)}${SITE.barrio ? ' · ' + esc(SITE.barrio) : ''}<br>${esc(SITE.ciudad)}</a>`],
      SITE.instagram && ['insta', 'Instagram', `<a href="https://www.instagram.com/${SITE.instagram}/" target="_blank" rel="noopener">@${esc(SITE.instagram)}</a>`],
      SITE.horario && ['clock', 'Horario', esc(SITE.horario)],
      SITE.correo && ['mail', 'Correo', `<a href="mailto:${esc(SITE.correo)}">${esc(SITE.correo)}</a>`]
    ].filter(Boolean);
    info.innerHTML = items.map(([ic, t, v]) => `<div class="info reveal"><span class="info__ico">${Art.icon(ic, 24)}</span><div><h4>${t}</h4><p>${v}</p></div></div>`).join('');

    const form = $('#form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form));
      const lines = [`Hola Super Llantas, soy ${d.nombre}.`];
      if (d.asunto) lines.push(`Me interesa: ${d.asunto}.`);
      if (d.moto) lines.push(`Mi moto: ${d.moto}.`);
      if (d.mensaje) lines.push(d.mensaje);
      window.open(waLink(lines.join(' ')), '_blank', 'noopener');
    });
  }

  /* ---------- común a todas ---------- */
  document.querySelectorAll('[data-wheel]').forEach(el => { el.innerHTML = Art.wheel(el.dataset.wheel, { spin: true }); });
  document.querySelectorAll('[data-moto]').forEach(el => { el.innerHTML = Art.moto(el.dataset.moto, {}); });
  document.querySelectorAll('[data-wa]').forEach(el => { el.href = waLink(el.dataset.wa); });
  document.querySelectorAll('[data-maps-link]').forEach(el => { el.href = mapsLink(); });
  document.querySelectorAll('[data-map]').forEach(el => {
    el.innerHTML = `<iframe title="Ubicación de ${esc(SITE.nombre)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${mapsEmbed()}"></iframe>`;
  });
  document.querySelectorAll('[data-site]').forEach(el => { el.textContent = SITE[el.dataset.site] ?? ''; });
  document.querySelectorAll('[data-lav]').forEach(el => { el.textContent = LAVADERO[el.dataset.lav] ?? ''; });

  if (page === 'inicio') initHome();
  if (page === 'servicios') initServicios();
  if (page === 'lavadero') initLavadero();
  if (page === 'contacto') initContacto();
  reveal();
})();
