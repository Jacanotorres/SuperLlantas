/* ============================================================
   SUPER LLANTAS · ilustraciones en SVG (llantas y motos)
   Se dibujan por código para no depender de fotos. Cuando un
   ítem trae `img`, la página usa la foto en lugar de esto.
   ============================================================ */
const Art = (() => {
  let uid = 0;
  const polar = (r, deg, c = 100) => {
    const a = (deg - 90) * Math.PI / 180;
    return [c + r * Math.cos(a), c + r * Math.sin(a)];
  };
  const f = n => n.toFixed(2);

  function knobs(n, w, h, top, offset, rx = 1.6) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const a = (360 / n) * i + offset;
      s += `<rect x="${100 - w / 2}" y="${top}" width="${w}" height="${h}" rx="${rx}" transform="rotate(${f(a)} 100 100)"/>`;
    }
    return s;
  }

  function slits(n, top, h, lean) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const a = (360 / n) * i;
      s += `<rect x="98.9" y="${top}" width="2.2" height="${h}" rx="1" transform="rotate(${f(a)} 100 100) skewX(${lean})"/>`;
    }
    return s;
  }

  function wireSpokes(n, hub, rim, twist) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const a = (360 / n) * i;
      const [x1, y1] = polar(hub, a);
      const [x2, y2] = polar(rim, a + (i % 2 ? twist : -twist));
      s += `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}"/>`;
    }
    return s;
  }

  function castSpokes(n, hub, rim) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const a = (360 / n) * i;
      const p = [polar(hub, a - 16), polar(rim, a - 7), polar(rim, a + 7), polar(hub, a + 16)];
      s += `<polygon points="${p.map(q => f(q[0]) + ',' + f(q[1])).join(' ')}"/>`;
    }
    return s;
  }

  /* Contenido de una rueda, centrada en (100,100), radio 97. */
  function wheelInner(kind, opts = {}) {
    const id = 'w' + (++uid);
    const rim = opts.rim || '#c8c8ce';
    const accent = opts.accent || '#ea2b33';
    let tread = '', body = '';

    if (kind === 'cross') {
      tread = `<g fill="#17171a" stroke="#3c3c42" stroke-width=".7">${knobs(22, 10.5, 13, 3, 0)}${knobs(22, 8.5, 10, 5, 8.18)}</g>`;
    } else if (kind === 'enduro') {
      tread = `<g fill="#17171a" stroke="#3c3c42" stroke-width=".6">${knobs(30, 8, 10.5, 3.5, 0)}${knobs(30, 6.5, 8, 5.5, 6)}</g>`;
    } else if (kind === 'trail') {
      tread = `<g fill="#17171a" stroke="#34343a" stroke-width=".5">${knobs(40, 5.4, 8, 4.5, 0, 1)}${knobs(40, 4.6, 6.4, 6, 4.5, 1)}</g>`;
    } else { // sport / scooter
      tread = `<circle cx="100" cy="100" r="96" fill="#0c0c0d" stroke="#2e2e33" stroke-width="1"/>
        <g fill="#26262a">${slits(60, 5, 8, 22)}</g>
        <circle cx="100" cy="100" r="95.5" fill="none" stroke="#3a3a40" stroke-width=".6" opacity=".7"/>`;
    }

    const carcassR = kind === 'sport' ? 88 : 88;
    if (kind === 'sport') {
      body = `<g fill="#cfcfd5" stroke="#6c6c73" stroke-width=".6">${castSpokes(5, 14, 58)}</g>
        <circle cx="100" cy="100" r="40" fill="none" stroke="#8c8c93" stroke-width="6"/>
        <circle cx="100" cy="100" r="40" fill="none" stroke="#131315" stroke-width="2.4" stroke-dasharray="2.2 3.6"/>
        <circle cx="100" cy="100" r="22" fill="#26262a" stroke="#4a4a50"/>
        <path d="M122,64 a44,44 0 0 1 20,18 l-7,5 a36,36 0 0 0 -16,-14z" fill="${accent}"/>`;
    } else {
      body = `<g stroke="#b6b6bc" stroke-width=".9" fill="none" opacity=".9">${wireSpokes(18, 12, 58, 17)}</g>`;
    }

    const gold = kind === 'sport' ? '#8d8d94' : '#e0b43a';
    const inner = `
      <defs>
        <radialGradient id="${id}s" cx=".5" cy=".5" r=".5">
          <stop offset=".55" stop-color="#000" stop-opacity="0"/>
          <stop offset="1" stop-color="#000" stop-opacity=".5"/>
        </radialGradient>
        <linearGradient id="${id}r" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f3f3f6"/><stop offset=".5" stop-color="${rim}"/><stop offset="1" stop-color="#6d6d74"/>
        </linearGradient>
        <path id="${id}p" d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0"/>
      </defs>
      <g class="wheel-rot">
        <circle cx="100" cy="100" r="${carcassR}" fill="#0e0e10"/>
        ${tread}
        <circle cx="100" cy="100" r="82" fill="#121214" stroke="#222226" stroke-width="1"/>
        <circle cx="100" cy="100" r="78" fill="none" stroke="#1b1b1e" stroke-width="2"/>
        <text font-family="Barlow Condensed, Arial Narrow, sans-serif" font-weight="800" font-size="8.2" fill="#6a6a72" letter-spacing="2">
          <textPath href="#${id}p" textLength="466" lengthAdjust="spacing">SUPER LLANTAS ★ SUPER LLANTAS ★ SUPER LLANTAS ★ SUPER LLANTAS ★</textPath>
        </text>
        <circle cx="100" cy="100" r="62" fill="#08080a"/>
        ${body}
        <circle cx="100" cy="100" r="61" fill="none" stroke="url(#${id}r)" stroke-width="5.5"/>
        <circle cx="100" cy="100" r="64.5" fill="none" stroke="#000" stroke-opacity=".5" stroke-width="1.2"/>
        <circle cx="100" cy="100" r="11.5" fill="${gold}" stroke="#000" stroke-opacity=".5"/>
        <circle cx="100" cy="100" r="5.5" fill="#1a1a1d" stroke="${accent}" stroke-width="1.4"/>
      </g>
      <circle cx="100" cy="100" r="97" fill="url(#${id}s)"/>
      <path d="M30,62 A78,78 0 0 1 82,24" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="3" stroke-linecap="round"/>`;
    return inner;
  }

  function wheel(kind, opts = {}) {
    return `<svg class="art-wheel${opts.spin ? ' is-spin' : ''}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${opts.label || 'Llanta de moto'}">${wheelInner(kind, opts)}</svg>`;
  }

  /* ---------- motos (vista lateral, mirando a la derecha) ---------- */
  function moto(kind, opts = {}) {
    const wk = kind === 'cross' ? 'cross' : kind === 'enduro' ? 'enduro' : kind === 'trail' ? 'trail' : 'sport';
    const red = opts.color || '#ea2b33';
    const R = [92, 168], F = [352, 168], s = 0.63;
    const place = (c, k) => `<g transform="translate(${c[0] - 100 * s} ${c[1] - 100 * s}) scale(${s})">${wheelInner(k, opts)}</g>`;
    let parts = '';

    if (kind === 'cross' || kind === 'enduro') {
      const enduro = kind === 'enduro';
      parts = `
        <!-- subchasis / swingarm / shock -->
        <path d="M160,150 L92,168" stroke="#2c2c31" stroke-width="9" stroke-linecap="round"/>
        <path d="M184,96 L158,148" stroke="#e0b43a" stroke-width="8" stroke-linecap="round"/>
        <path d="M184,96 L158,148" stroke="#111" stroke-width="2" stroke-dasharray="3 4" stroke-linecap="round"/>
        <!-- engine -->
        <path d="M164,114 L240,106 L254,170 L172,178 Z" fill="#2b2b30" stroke="#0a0a0b" stroke-width="2"/>
        <path d="M192,84 L234,80 L240,108 L188,114 Z" fill="#3c3c42" stroke="#0a0a0b" stroke-width="2"/>
        <circle cx="216" cy="148" r="17" fill="#55555d" stroke="#0a0a0b" stroke-width="2"/>
        <circle cx="216" cy="148" r="7" fill="#1b1b1e"/>
        <!-- exhaust -->
        <path d="M240,122 C262,152 214,178 178,152 L124,124" fill="none" stroke="#b9b9c1" stroke-width="7" stroke-linecap="round"/>
        <path d="M152,134 L64,102" stroke="#dcdce1" stroke-width="17" stroke-linecap="round"/>
        <path d="M152,134 L64,102" stroke="#8d8d95" stroke-width="3" stroke-linecap="round" opacity=".7" transform="translate(0 -4)"/>
        <ellipse cx="62" cy="101" rx="3.5" ry="8.5" transform="rotate(20 62 101)" fill="#17171a"/>
        <!-- rear fender + seat -->
        <path d="M50,84 L100,98 L106,120 L58,104 Z" fill="${red}" stroke="#0a0a0b" stroke-width="2"/>
        <path d="M98,98 C134,94 182,88 216,82 L224,97 C190,107 142,116 106,120 Z" fill="#141416" stroke="#000" stroke-width="2"/>
        <!-- tank / shrouds -->
        <path d="M204,86 C232,68 266,64 292,72 L296,98 C274,116 238,122 214,114 Z" fill="${red}" stroke="#0a0a0b" stroke-width="2"/>
        <path d="M226,98 C246,92 268,92 288,96" stroke="#fff" stroke-width="3" fill="none" opacity=".85"/>
        <!-- fork -->
        <path d="M296,64 L328,122" stroke="#d3d3d9" stroke-width="10" stroke-linecap="round"/>
        <path d="M328,122 L352,168" stroke="#e0b43a" stroke-width="9" stroke-linecap="round"/>
        <!-- front fender -->
        <path d="M318,112 C340,98 376,102 396,122 L388,130 C366,114 340,114 322,124 Z" fill="${red}" stroke="#0a0a0b" stroke-width="2"/>
        <!-- bars -->
        <path d="M296,62 L272,42" stroke="#e6e6ea" stroke-width="5" stroke-linecap="round"/>
        <path d="M274,44 L258,40" stroke="#111" stroke-width="8" stroke-linecap="round"/>
        ${enduro
          ? `<path d="M300,50 L322,66 L316,82 L296,72 Z" fill="#f4f4f6" stroke="#0a0a0b" stroke-width="2"/><circle cx="313" cy="68" r="5" fill="#ffe9a0"/>`
          : `<path d="M300,46 L334,74 L324,98 L294,80 Z" fill="#ffc21a" stroke="#0a0a0b" stroke-width="2"/><text x="311" y="82" font-family="Anton, Impact, sans-serif" font-size="25" fill="#0a0a0b" transform="rotate(34 311 82)">1</text>`}`;
    } else if (kind === 'trail') {
      parts = `
        <path d="M160,150 L92,168" stroke="#2c2c31" stroke-width="9" stroke-linecap="round"/>
        <path d="M186,100 L160,148" stroke="#b9b9c1" stroke-width="8" stroke-linecap="round"/>
        <path d="M164,112 L244,106 L256,172 L172,180 Z" fill="#2b2b30" stroke="#0a0a0b" stroke-width="2"/>
        <circle cx="214" cy="148" r="17" fill="#55555d" stroke="#0a0a0b" stroke-width="2"/>
        <circle cx="214" cy="148" r="7" fill="#1b1b1e"/>
        <path d="M242,128 C262,156 216,180 182,156 L124,130" fill="none" stroke="#b9b9c1" stroke-width="7" stroke-linecap="round"/>
        <path d="M148,138 L66,110" stroke="#dcdce1" stroke-width="16" stroke-linecap="round"/>
        <path d="M44,92 L102,98 L106,116 L54,108 Z" fill="${red}" stroke="#0a0a0b" stroke-width="2"/>
        <path d="M64,96 L48,96" stroke="#2c2c31" stroke-width="5" stroke-linecap="round"/>
        <path d="M100,98 C136,96 184,92 214,90 L220,104 C190,112 142,120 106,118 Z" fill="#141416" stroke="#000" stroke-width="2"/>
        <path d="M200,92 C226,64 268,62 290,74 L298,100 C276,120 236,124 208,112 Z" fill="${red}" stroke="#0a0a0b" stroke-width="2"/>
        <path d="M224,94 C246,88 268,90 290,96" stroke="#fff" stroke-width="3" fill="none" opacity=".85"/>
        <path d="M296,66 L330,124" stroke="#d3d3d9" stroke-width="10" stroke-linecap="round"/>
        <path d="M330,124 L352,168" stroke="#9c9ca4" stroke-width="9" stroke-linecap="round"/>
        <path d="M320,108 C340,98 372,102 392,120 L384,128 C364,114 342,114 324,122 Z" fill="${red}" stroke="#0a0a0b" stroke-width="2"/>
        <path d="M298,62 L274,42" stroke="#e6e6ea" stroke-width="5" stroke-linecap="round"/>
        <path d="M276,44 L260,40" stroke="#111" stroke-width="8" stroke-linecap="round"/>
        <path d="M304,52 L324,40 L330,62 Z" fill="#7fb7d6" opacity=".55" stroke="#0a0a0b" stroke-width="1.5"/>
        <path d="M302,66 L330,70 L332,92 L306,92 Z" fill="#f4f4f6" stroke="#0a0a0b" stroke-width="2"/>
        <circle cx="323" cy="80" r="6" fill="#ffe9a0"/>`;
    } else { // sport
      parts = `
        <path d="M168,150 L92,168" stroke="#2c2c31" stroke-width="9" stroke-linecap="round"/>
        <path d="M190,104 L164,150" stroke="#e0b43a" stroke-width="7" stroke-linecap="round"/>
        <path d="M172,112 L252,112 L262,176 L178,184 Z" fill="#2b2b30" stroke="#0a0a0b" stroke-width="2"/>
        <path d="M190,178 L262,178 L252,192 L196,192 Z" fill="#3a3a41" stroke="#0a0a0b" stroke-width="2"/>
        <path d="M236,180 L104,152" stroke="#cfcfd5" stroke-width="9" stroke-linecap="round" opacity=".95"/>
        <path d="M118,155 L98,150" stroke="#17171a" stroke-width="9" stroke-linecap="round"/>
        <path d="M44,96 C70,82 112,84 134,96 L120,118 L58,112 Z" fill="${red}" stroke="#0a0a0b" stroke-width="2"/>
        <path d="M118,98 C146,90 186,90 204,96 L198,112 L128,116 Z" fill="#141416" stroke="#000" stroke-width="2"/>
        <path d="M196,94 C220,74 256,76 270,92 L262,116 L204,116 Z" fill="${red}" stroke="#0a0a0b" stroke-width="2"/>
        <path d="M222,96 C238,90 254,92 266,98" stroke="#fff" stroke-width="3" fill="none" opacity=".85"/>
        <path d="M268,94 C296,78 338,92 358,118 L352,134 C322,138 290,134 262,122 Z" fill="${red}" stroke="#0a0a0b" stroke-width="2"/>
        <path d="M284,86 L306,64 L320,70 L304,96 Z" fill="#7fb7d6" opacity=".6" stroke="#0a0a0b" stroke-width="1.5"/>
        <path d="M312,112 L352,168" stroke="#cfcfd5" stroke-width="8" stroke-linecap="round"/>
        <path d="M318,112 L330,100" stroke="#111" stroke-width="7" stroke-linecap="round"/>
        <path d="M330,96 L346,100" stroke="#e6e6ea" stroke-width="4" stroke-linecap="round"/>
        <path d="M336,130 C356,122 382,128 392,142 L386,148 C372,138 354,138 340,146 Z" fill="${red}" stroke="#0a0a0b" stroke-width="2"/>
        <circle cx="338" cy="110" r="5" fill="#ffe9a0"/>`;
    }

    return `<svg class="art-moto${opts.spin ? ' is-spin' : ''}" viewBox="0 0 440 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${opts.label || 'Moto'}">
      <ellipse cx="222" cy="232" rx="196" ry="8" fill="#000" opacity=".45"/>
      ${place(R, wk)}
      ${place(F, wk)}
      ${parts}
    </svg>`;
  }

  /* ---------- carro (vista lateral, mirando a la derecha) con espuma ---------- */
  function car(opts = {}) {
    const s = 0.46, R = [132, 158], F = [392, 158];
    const place = c => `<g transform="translate(${c[0] - 100 * s} ${c[1] - 100 * s}) scale(${s})">${wheelInner('sport', opts)}</g>`;
    const bubbles = [[190,62,9],[222,48,6],[270,56,11],[318,50,7],[352,70,8],[246,38,5],[150,92,7],[420,92,6],[300,34,5],[204,84,5]]
      .map(([x, y, r]) => `<circle class="bub" cx="${x}" cy="${y}" r="${r}" fill="rgba(255,255,255,.10)" stroke="rgba(255,255,255,.55)" stroke-width="1.4"/><circle cx="${x - r * .3}" cy="${y - r * .3}" r="${r * .22}" fill="#fff" opacity=".7"/>`).join('');
    return `<svg class="art-car" viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${opts.label || 'Carro'}">
      <defs>
        <linearGradient id="carG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34343c"/><stop offset=".55" stop-color="#1b1b20"/><stop offset="1" stop-color="#0f0f12"/></linearGradient>
        <linearGradient id="carW" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a3a4a"/><stop offset="1" stop-color="#0c1219"/></linearGradient>
      </defs>
      <ellipse cx="262" cy="206" rx="236" ry="9" fill="#000" opacity=".5"/>
      <path d="M22,160 L26,136 C28,124 44,118 70,114 L150,102 C172,82 194,66 226,60 L316,58 C346,58 368,72 394,96 L440,104 C474,108 498,122 500,142 L500,160 Z" fill="url(#carG)" stroke="#44444d" stroke-width="2"/>
      <path d="M172,100 C188,80 206,70 230,68 L264,68 L262,98 Z" fill="url(#carW)" stroke="#0a0a0c" stroke-width="2"/>
      <path d="M276,68 L316,68 C336,70 350,82 370,98 L276,98 Z" fill="url(#carW)" stroke="#0a0a0c" stroke-width="2"/>
      <path d="M268,70 L268,142" stroke="#0a0a0c" stroke-width="2.5"/>
      <path d="M252,112 L262,112" stroke="#9a9aa4" stroke-width="3" stroke-linecap="round"/>
      <path d="M172,100 C190,82 206,72 230,70 L316,70" fill="none" stroke="#fff" stroke-opacity=".14" stroke-width="3"/>
      <path d="M476,118 L496,126 L494,132 L472,128 Z" fill="#fff3c4"/>
      <path d="M24,136 L42,132 L42,142 L24,144 Z" fill="#ea2b33"/>
      <path d="M40,146 L470,146" stroke="#ea2b33" stroke-width="2.5" opacity=".8"/>
      <circle cx="${R[0]}" cy="${R[1]}" r="52" fill="#050506"/><circle cx="${F[0]}" cy="${F[1]}" r="52" fill="#050506"/>
      ${place(R)}${place(F)}
      ${opts.foam === false ? '' : bubbles}
    </svg>`;
  }

  /* Iconos de línea para servicios. */
  const ICONS = {
    wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3.5 17.2a2 2 0 0 0 2.8 2.8l5.8-5.8a4 4 0 0 0 5.1-5.4l-2.7 2.7-2.4-.5-.5-2.4z"/>',
    drop: '<path d="M12 3s6 6.2 6 10.5a6 6 0 0 1-12 0C6 9.2 12 3 12 3z"/><path d="M9 14a3 3 0 0 0 3 3"/>',
    route: '<circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="6" r="2.2"/><path d="M8 18h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7"/>',
    bag: '<path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    pin: '<path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    insta: '<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17" cy="7" r=".8" fill="currentColor"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    wa: '<path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8L4 20z"/><path d="M9 9c0 3 3 6 6 6l1.2-1.4-2-1-.9.8a4 4 0 0 1-2-2l.8-.9-1-2z"/>',
    tire: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v5M12 16v5M3 12h5M16 12h5"/>',
    moto: '<circle cx="6" cy="16" r="3.5"/><circle cx="18" cy="16" r="3.5"/><path d="M6 16l3-6h5l4 6M9 10L8 7h3M14 10l2-3h3"/>',
    sofa: '<path d="M7 4h6l2 9h4a2 2 0 0 1 2 2v3H5v-3a2 2 0 0 1 2-2h3L7 4z"/>',
    sparkle: '<path d="M11 3l1.8 5.2L18 10l-5.2 1.8L11 17l-1.8-5.2L4 10l5.2-1.8z"/><path d="M19 15l.7 1.8 1.8.7-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7z"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 5-5"/>',
    star: '<path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z" fill="currentColor"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>'
  };
  const icon = (name, size = 24) =>
    `<svg class="ico" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;

  return { wheel, moto, car, icon };
})();
