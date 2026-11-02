/* Cabecera, pie y botón flotante de WhatsApp compartidos por todas las páginas. */
(function () {
  const page = document.body.dataset.page || '';
  const NAV = [
    ['index.html', 'Inicio', 'inicio'],
    ['servicios.html', 'Servicios', 'servicios'],
    ['lavadero.html', 'Lavadero', 'lavadero'],
    ['contacto.html', 'Contacto', 'contacto']
  ];
  const links = NAV.map(([href, label, id]) =>
    `<a href="${href}"${id === page ? ' class="is-active" aria-current="page"' : ''}>${label}</a>`).join('');

  const header = `
  <header class="site-header" id="top">
    <div class="wrap site-header__in">
      <a class="brand" href="index.html" aria-label="${SITE.nombre} · inicio">
        <img src="assets/img/logo.webp" alt="${SITE.nombre}" width="150" height="78">
      </a>
      <nav class="nav" id="nav" aria-label="Principal">
        ${links}
        <a class="btn btn--sm nav__cta" href="${waLink('Hola Super Llantas, quiero información.')}" target="_blank" rel="noopener"><span>${Art.icon('wa', 18)} WhatsApp</span></a>
      </nav>
      <button class="burger" id="burger" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav"><i></i><i></i><i></i></button>
    </div>
  </header>`;

  const redes = SITE.instagram
    ? `<a href="https://www.instagram.com/${SITE.instagram}/" target="_blank" rel="noopener">${Art.icon('insta', 18)} @${SITE.instagram}</a>` : '';

  const footer = `
  <footer class="site-footer">
    <div class="wrap site-footer__grid">
      <div>
        <img class="site-footer__logo" src="assets/img/logo.webp" alt="${SITE.nombre}" width="200" height="104" loading="lazy">
        <p class="muted">${SITE.slogan}. Montaje de llantas, mantenimientos, aceite y todo para tu moto. Y en el mismo lugar, ${LAVADERO.nombre.toLowerCase()}.</p>
      </div>
      <div>
        <h4>Explora</h4>
        <ul class="flist">${NAV.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h4>Encuéntranos</h4>
        <ul class="flist">
          ${SITE.direccion ? `<li>${Art.icon('pin', 18)}<span>${SITE.direccion}${SITE.barrio ? ' · ' + SITE.barrio : ''}<br>${SITE.ciudad}</span></li>` : ''}
          ${SITE.telefono ? `<li>${Art.icon('wa', 18)}<a href="${waLink()}" target="_blank" rel="noopener">${SITE.telefono}</a></li>` : ''}
          ${SITE.telefono2 ? `<li>${Art.icon('phone', 18)}<a href="tel:+${SITE.whatsapp2}">${SITE.telefono2}</a></li>` : ''}
          ${SITE.horario ? `<li>${Art.icon('clock', 18)}<span>${SITE.horario}</span></li>` : ''}
          ${SITE.correo ? `<li>${Art.icon('mail', 18)}<a href="mailto:${SITE.correo}">${SITE.correo}</a></li>` : ''}
          ${redes ? `<li>${redes}</li>` : ''}
        </ul>
      </div>
    </div>
    <div class="wrap site-footer__bar">
      <span>© ${new Date().getFullYear()} ${SITE.nombreLargo}. Todos los derechos reservados.</span>
      <a href="#top">Volver arriba ↑</a>
    </div>
  </footer>
  <a class="wa-float" href="${waLink('Hola Super Llantas, quiero información.')}" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp">${Art.icon('wa', 28)}</a>`;

  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);

  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
    document.body.classList.toggle('no-scroll', open);
  });
  nav.addEventListener('click', e => {
    if (e.target.closest('a')) { nav.classList.remove('is-open'); burger.classList.remove('is-open'); document.body.classList.remove('no-scroll'); }
  });
  const onScroll = () => document.querySelector('.site-header').classList.toggle('is-stuck', window.scrollY > 10);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
})();
