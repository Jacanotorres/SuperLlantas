/* Lógica de cada página. Todo sale de data.js. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '');
  const page = document.body.dataset.page;

  /* ---------- tarjetas ---------- */
  function tireArt(l) {
    if (l.img) return `<img src="${esc(l.img)}" alt="Llanta ${esc(l.medida)}" loading="lazy">`;
    return Art.wheel(tipoDe(l.tipo).art, { label: `Llanta ${l.medida}` });
  }

  function tireCard(l) {
    const t = tipoDe(l.tipo);
    const msg = `Hola Super Llantas, quiero cotizar la llanta ${l.medida} (${t.nombre}, ${l.posicion.toLowerCase()}).`;
    return `
    <article class="card tire reveal" data-tipo="${l.tipo}">
      <div class="card__art">
        <span class="tag tag--red">${esc(t.corto)}</span>
        ${l.ejemplo ? '<span class="tag tag--ghost card__ej">Ejemplo</span>' : ''}
        ${tireArt(l)}
      </div>
      <div class="card__body">
        <p class="card__eyebrow">${esc(l.posicion)} · Rin ${esc(l.rin)}</p>
        <h3 class="size">${esc(l.medida)}</h3>
        <p class="card__name">${esc(l.marca ? l.marca + ' · ' : '')}${esc(l.nombre)}</p>
        ${l.uso ? `<p class="muted card__uso">${esc(l.uso)}</p>` : ''}
        <div class="card__foot">
          <span class="price${l.precio ? '' : ' price--ask'}">${l.precio ? COP.format(l.precio) : 'Consulta precio'}</span>
          <a class="btn btn--sm" href="${waLink(msg)}" target="_blank" rel="noopener"><span>Cotizar</span></a>
        </div>
      </div>
    </article>`;
  }

  function motoArt(m) {
    if (m.img) return `<img src="${esc(m.img)}" alt="${esc(m.nombre)}" loading="lazy">`;
    return Art.moto(tipoDe(m.tipo).art, { label: m.nombre });
  }

  function motoCard(m) {
    const t = tipoDe(m.tipo);
    const msg = `Hola Super Llantas, tengo una ${m.nombre}${m.ano ? ' ' + m.ano : ''} y quiero cotizar llantas.`;
    const rows = [
      m.delantera ? `<li><span>Delantera</span><b>${esc(m.delantera)}</b></li>` : '',
      m.trasera ? `<li><span>Trasera</span><b>${esc(m.trasera)}</b></li>` : ''
    ].join('');
    return `
    <article class="card moto reveal" data-tipo="${m.tipo}">
      <div class="card__art card__art--moto">
        <span class="tag tag--red">${esc(t.corto)}</span>
        ${m.ejemplo ? '<span class="tag tag--ghost card__ej">Ejemplo</span>' : ''}
        ${motoArt(m)}
      </div>
      <div class="card__body">
        <p class="card__eyebrow">${esc(m.cilindraje)}${m.ano ? ' · ' + esc(m.ano) : ''}</p>
        <h3 class="size size--name">${esc(m.nombre)}</h3>
        <p class="muted card__uso">${esc(m.texto)}</p>
        ${rows ? `<ul class="spec">${rows}</ul>` : ''}
        <div class="card__foot card__foot--2">
          <a class="btn btn--sm" href="llantas.html?moto=${encodeURIComponent(m.id)}"><span>Ver llantas</span></a>
          <a class="btn btn--sm btn--dark" href="${waLink(msg)}" target="_blank" rel="noopener"><span>Cotizar</span></a>
        </div>
      </div>
    </article>`;
  }

  function empty(msg) {
    return `<div class="empty"><div class="empty__art">${Art.wheel('cross', {})}</div><h3>${msg}</h3>
      <p class="muted">Escríbenos y te conseguimos la medida que necesitas.</p>
      <a class="btn" href="${waLink('Hola Super Llantas, estoy buscando una llanta y no la encuentro en la página.')}" target="_blank" rel="noopener"><span>Pedir por WhatsApp</span></a></div>`;
  }

  function reveal() {
    const els = document.querySelectorAll('.reveal:not(.is-in)');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('is-in')); return; }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { threshold: .08 });
    els.forEach((e, i) => { e.style.transitionDelay = Math.min(i % 6, 5) * 50 + 'ms'; io.observe(e); });
  }

  /* ---------- servicios ---------- */
  function renderServicios(el, withNum) {
    if (!el) return;
    el.innerHTML = SERVICIOS.map((s, i) => `
      <article class="svc reveal">
        <span class="svc__num">${String(i + 1).padStart(2, '0')}</span>
        <div class="svc__ico">${Art.icon(s.icono, 34)}</div>
        <h3>${esc(s.titulo)}</h3>
        <p class="muted">${esc(s.texto)}</p>
      </article>`).join('');
  }

  /* ---------- inicio ---------- */
  function initHome() {
    const hero = $('#hero-wheel');
    if (hero) hero.innerHTML = Art.wheel('cross', { spin: true, label: 'Llanta de motocross' });

    const tipos = $('#tipos-grid');
    if (tipos) tipos.innerHTML = TIPOS.map(t => {
      const n = LLANTAS.filter(l => l.tipo === t.id).length;
      return `<a class="cat reveal" href="llantas.html?tipo=${t.id}">
        <div class="cat__art">${Art.wheel(t.art, { label: t.nombre })}</div>
        <div class="cat__txt">
          <span class="cat__terreno">${esc(t.terreno)}</span>
          <h3>${esc(t.nombre)}</h3>
          <p>${esc(t.texto)}</p>
          <span class="cat__go">${n ? n + ' medidas' : 'Ver llantas'} ${Art.icon('arrow', 18)}</span>
        </div></a>`;
    }).join('');

    const sel = $('#f-tipo');
    if (sel) sel.innerHTML = '<option value="">Todos los tipos</option>' + TIPOS.map(t => `<option value="${t.id}">${esc(t.nombre)}</option>`).join('');

    const dest = $('#destacadas');
    if (dest) {
      const list = LLANTAS.filter(l => l.destacada).slice(0, 4);
      dest.innerHTML = (list.length ? list : LLANTAS.slice(0, 4)).map(tireCard).join('');
    }
    const md = $('#motos-destacadas');
    if (md) {
      const list = MOTOS.filter(m => m.destacada).slice(0, 3);
      md.innerHTML = (list.length ? list : MOTOS.slice(0, 3)).map(motoCard).join('');
    }
    renderServicios($('#servicios-grid'));
  }

  /* ---------- llantas ---------- */
  function initLlantas() {
    const qs = new URLSearchParams(location.search);
    const st = { tipo: qs.get('tipo') || '', pos: qs.get('pos') || '', rin: qs.get('rin') || '', q: qs.get('q') || '', moto: qs.get('moto') || '' };
    const grid = $('#grid'), count = $('#count'), chips = $('#chips'), selPos = $('#f-pos'), selRin = $('#f-rin'), inpQ = $('#f-q'), banner = $('#moto-banner');

    chips.innerHTML = `<button class="chip" data-tipo="">Todas</button>` +
      TIPOS.map(t => `<button class="chip" data-tipo="${t.id}">${esc(t.corto)}</button>`).join('');
    const rines = [...new Set(LLANTAS.map(l => l.rin))].sort((a, b) => a - b);
    selRin.innerHTML = '<option value="">Todos los rines</option>' + rines.map(r => `<option value="${r}">Rin ${r}</option>`).join('');
    selPos.value = st.pos; selRin.value = st.rin; inpQ.value = st.q;

    function sync() {
      const p = new URLSearchParams();
      Object.entries(st).forEach(([k, v]) => { if (v) p.set(k, v); });
      history.replaceState(null, '', location.pathname + (p.toString() ? '?' + p : ''));
    }

    function render() {
      const moto = MOTOS.find(m => m.id === st.moto);
      const medidas = moto ? [moto.delantera, moto.trasera].filter(Boolean) : null;
      const q = norm(st.q);
      const list = LLANTAS.filter(l =>
        (!st.tipo || l.tipo === st.tipo) &&
        (!st.pos || l.posicion === st.pos) &&
        (!st.rin || String(l.rin) === st.rin) &&
        (!medidas || medidas.includes(l.medida)) &&
        (!q || norm([l.medida, l.nombre, l.marca, l.uso, tipoDe(l.tipo).nombre].join(' ')).includes(q)));

      chips.querySelectorAll('.chip').forEach(c => c.classList.toggle('is-on', c.dataset.tipo === st.tipo));
      banner.hidden = !moto;
      if (moto) banner.innerHTML = `<span>Llantas para <b>${esc(moto.nombre)}</b>: ${medidas.map(m => `<i>${esc(m)}</i>`).join(' · ')}</span>
        <a href="llantas.html">Quitar filtro ✕</a>`;
      count.innerHTML = `<b>${list.length}</b> ${list.length === 1 ? 'llanta' : 'llantas'}`;
      grid.innerHTML = list.length ? list.map(tireCard).join('') : empty('No encontramos esa medida');
      reveal(); sync();
    }

    chips.addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) { st.tipo = b.dataset.tipo; render(); } });
    selPos.addEventListener('change', () => { st.pos = selPos.value; render(); });
    selRin.addEventListener('change', () => { st.rin = selRin.value; render(); });
    inpQ.addEventListener('input', () => { st.q = inpQ.value.trim(); render(); });
    $('#f-reset').addEventListener('click', () => { Object.keys(st).forEach(k => st[k] = ''); selPos.value = selRin.value = inpQ.value = ''; render(); });
    render();
  }

  /* ---------- motos ---------- */
  function initMotos() {
    const qs = new URLSearchParams(location.search);
    let tipo = qs.get('tipo') || '';
    const chips = $('#chips'), grid = $('#grid'), count = $('#count');
    chips.innerHTML = `<button class="chip" data-tipo="">Todas</button>` +
      TIPOS.filter(t => MOTOS.some(m => m.tipo === t.id)).map(t => `<button class="chip" data-tipo="${t.id}">${esc(t.corto)}</button>`).join('');
    function render() {
      const list = MOTOS.filter(m => !tipo || m.tipo === tipo);
      chips.querySelectorAll('.chip').forEach(c => c.classList.toggle('is-on', c.dataset.tipo === tipo));
      count.innerHTML = `<b>${list.length}</b> ${list.length === 1 ? 'moto' : 'motos'}`;
      grid.innerHTML = list.length ? list.map(motoCard).join('') : empty('Aún no hay motos en esta categoría');
      reveal();
    }
    chips.addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) { tipo = b.dataset.tipo; render(); } });
    render();
  }

  /* ---------- contacto ---------- */
  function initContacto() {
    const info = $('#info');
    const items = [
      SITE.telefono && ['phone', 'Llámanos', `<a href="tel:+${SITE.whatsapp}">${esc(SITE.telefono)}</a>`],
      SITE.whatsapp && ['wa', 'WhatsApp', `<a href="${waLink()}" target="_blank" rel="noopener">${esc(SITE.telefono || 'Escríbenos')}</a>`],
      SITE.direccion && ['pin', 'Visítanos', `<a href="${mapsLink()}" target="_blank" rel="noopener">${esc(SITE.direccion)}<br>${esc(SITE.ciudad)}</a>`],
      SITE.instagram && ['insta', 'Instagram', `<a href="https://www.instagram.com/${SITE.instagram}/" target="_blank" rel="noopener">@${esc(SITE.instagram)}</a>`],
      SITE.horario && ['clock', 'Horario', esc(SITE.horario)],
      SITE.correo && ['mail', 'Correo', `<a href="mailto:${esc(SITE.correo)}">${esc(SITE.correo)}</a>`]
    ].filter(Boolean);
    info.innerHTML = items.map(([ic, t, v]) => `<div class="info reveal"><span class="info__ico">${Art.icon(ic, 26)}</span><div><h4>${t}</h4><p>${v}</p></div></div>`).join('');

    const map = $('#map');
    if (map && SITE.direccion) map.innerHTML = `<iframe title="Ubicación de ${esc(SITE.nombre)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${mapsEmbed()}"></iframe>`;

    const form = $('#form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form));
      const lines = [`Hola Super Llantas, soy ${d.nombre}.`];
      if (d.moto) lines.push(`Mi moto: ${d.moto}.`);
      if (d.medida) lines.push(`Medida de llanta: ${d.medida}.`);
      if (d.mensaje) lines.push(d.mensaje);
      window.open(waLink(lines.join(' ')), '_blank', 'noopener');
    });
  }

  /* decoraciones y enlaces de WhatsApp declarados en el HTML */
  document.querySelectorAll('[data-wheel]').forEach(el => { el.innerHTML = Art.wheel(el.dataset.wheel, { spin: true }); });
  document.querySelectorAll('[data-moto]').forEach(el => { el.innerHTML = Art.moto(el.dataset.moto, {}); });
  document.querySelectorAll('[data-wa]').forEach(el => { el.href = waLink(el.dataset.wa); });

  if (page === 'inicio') initHome();
  if (page === 'llantas') initLlantas();
  if (page === 'motos') initMotos();
  if (page === 'servicios') renderServicios($('#servicios-grid'));
  if (page === 'contacto') initContacto();
  reveal();
})();
