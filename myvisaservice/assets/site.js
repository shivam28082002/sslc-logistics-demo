// Shared shell: header, footer, icons and small interactions for every page.
(function () {
  const D = window.MVS;
  const P = 'stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"';
  const I = {
    arrow: `<svg viewBox="0 0 24 24" ${P}><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
    up: `<svg viewBox="0 0 24 24" ${P}><path d="M7 17L17 7M8 7h9v9"/></svg>`,
    top: `<svg viewBox="0 0 24 24" ${P}><path d="M12 19V5M6 11l6-6 6 6"/></svg>`,
    left: `<svg viewBox="0 0 24 24" ${P}><path d="M15 6l-6 6 6 6"/></svg>`,
    right: `<svg viewBox="0 0 24 24" ${P}><path d="M9 6l6 6-6 6"/></svg>`,
    check: `<svg viewBox="0 0 24 24" ${P}><path d="M5 12.5l4.5 4.5L19 7"/></svg>`,
    plus: `<svg viewBox="0 0 24 24" ${P}><path d="M12 5v14M5 12h14"/></svg>`,
    menu: `<svg viewBox="0 0 24 24" ${P}><path d="M4 7h16M4 12h16M4 17h10"/></svg>`,
    pin: `<svg viewBox="0 0 24 24" ${P}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" ${P}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" ${P}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" ${P}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
    search: `<svg viewBox="0 0 24 24" ${P}><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>`,
    star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>`,
    plane: `<svg viewBox="0 0 24 24" ${P}><path d="M10.5 13.5L3 11l1.5-1.5 8 .5 4-4.5c1-1 2.5-1.2 3-.7s.3 2-.7 3l-4.5 4 .5 8L13.3 21l-2.5-7.5L7 17v3l-1.2 1.2L4.5 18 2 16.8 3.2 15.6h3z"/></svg>`,
    brief: `<svg viewBox="0 0 24 24" ${P}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 13h18"/></svg>`,
    cap: `<svg viewBox="0 0 24 24" ${P}><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6"/></svg>`,
    id: `<svg viewBox="0 0 24 24" ${P}><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2.2"/><path d="M5.5 16.5c.8-1.8 5.2-1.8 6 0M14 10h4M14 13.5h3"/></svg>`,
    family: `<svg viewBox="0 0 24 24" ${P}><circle cx="8" cy="7" r="2.6"/><circle cx="16.5" cy="8" r="2.2"/><path d="M3 20v-2.5A4.5 4.5 0 017.5 13h1A4.5 4.5 0 0113 17.5V20M14 13.6a4 4 0 017 2.9V20"/></svg>`,
    chat: `<svg viewBox="0 0 24 24" ${P}><path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/></svg>`,
    doc: `<svg viewBox="0 0 24 24" ${P}><path d="M14 3H6a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V8z"/><path d="M14 3v5h5M8.5 13l2 2 4-4"/></svg>`,
    send: `<svg viewBox="0 0 24 24" ${P}><path d="M21 3L10 14M21 3l-7 18-4-7-7-4z"/></svg>`,
    cal: `<svg viewBox="0 0 24 24" ${P}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M8 14.5h3"/></svg>`,
    track: `<svg viewBox="0 0 24 24" ${P}><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 000-6H9a3 3 0 010-6h6.5"/></svg>`,
    passport: `<svg viewBox="0 0 24 24" ${P}><rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10" r="3.2"/><path d="M8.8 10h6.4M12 6.8c1.2 1.6 1.2 4.8 0 6.4M12 6.8c-1.2 1.6-1.2 4.8 0 6.4M9 17h6"/></svg>`,
    support: `<svg viewBox="0 0 24 24" ${P}><path d="M4 14v-2a8 8 0 0116 0v2"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/><path d="M19 19a3 3 0 01-3 2h-3"/></svg>`,
    bolt: `<svg viewBox="0 0 24 24" ${P}><path d="M13 3L5 14h6l-1 7 8-11h-6z"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" ${P}><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>`,
    globe: `<svg viewBox="0 0 24 24" ${P}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"/></svg>`,
    upload: `<svg viewBox="0 0 24 24" ${P}><path d="M12 16V4M7 9l5-5 5 5M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3"/></svg>`,
    fb: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8.5V6.8c0-.8.5-1 1-1h2V2.5h-2.8C11.1 2.5 10.5 4.7 10.5 6.2v2.3H8V12h2.5v9.5H14V12h2.6l.4-3.5z"/></svg>`,
    xx: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 3h3.2l-7 8 8.3 10h-6.5l-5-6.2L4.8 21H1.6l7.5-8.6L1.2 3h6.6l4.6 5.7zm-1.1 16.2h1.8L6.7 4.7H4.8z"/></svg>`,
    pin2: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-3.6 19.3c-.1-.8-.2-2.1 0-3l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.5 1.8-2.5.9 0 1.3.6 1.3 1.4 0 .9-.6 2.2-.9 3.4-.2 1 .5 1.9 1.6 1.9 1.9 0 3.3-2 3.3-4.9 0-2.6-1.8-4.4-4.5-4.4-3 0-4.8 2.3-4.8 4.6 0 .9.4 1.9.8 2.4l.1.4-.3 1.2c0 .2-.2.3-.4.2-1.4-.6-2.2-2.6-2.2-4.2 0-3.4 2.5-6.6 7.2-6.6 3.8 0 6.7 2.7 6.7 6.3 0 3.7-2.4 6.8-5.6 6.8-1.1 0-2.2-.6-2.5-1.3l-.7 2.6c-.2 1-.9 2.2-1.4 2.9A10 10 0 1012 2z"/></svg>`
  };
  window.ICON = I;

  const here = (location.pathname.split('/').pop() || 'index.html').replace(/\?.*/, '');
  const NAV = [['index.html', 'Home'], ['about.html', 'About'], ['services.html', 'All Services'], ['faq.html', 'FAQ'], ['blog.html', 'Blog'], ['contact.html', 'Contact']];
  const cur = h => (h === here || (here === 'post.html' && h === 'blog.html') || (here === '' && h === 'index.html')) ? ' aria-current="page"' : '';

  const header = `
  <a class="sr" href="#main">Skip to content</a>
  <div class="topbar"><div class="wrap">
    <div class="tb-l"><span>${I.pin}${D.address}</span><a href="mailto:${D.email}">${I.mail}${D.email}</a></div>
    <div class="tb-r"><a href="tel:${D.tel}">${I.phone}${D.phone}</a></div>
  </div></div>
  <header class="hdr" id="hdr"><div class="wrap">
    <a class="logo" href="index.html" aria-label="My Visa Service home"><img src="assets/img/misc/footerlogo.png" alt="My Visa Service" width="114" height="58"><small>A unit of<br>Paras Holidays</small></a>
    <nav class="nav" aria-label="Main">${NAV.map(([h, t]) => `<a href="${h}"${cur(h)}>${t}</a>`).join('')}</nav>
    <a class="btn btn-red btn-arrow hdr-cta" href="apply.html">Apply Visa <span class="ar">${I.up}</span></a>
    <button class="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="drawer">${I.menu}</button>
  </div></header>
  <div class="drawer" id="drawer" aria-hidden="true"><div class="panel" role="dialog" aria-label="Menu">
    <button class="x" type="button" aria-label="Close menu">×</button>
    ${NAV.map(([h, t]) => `<a href="${h}"${cur(h)}>${t}</a>`).join('')}
    <a class="btn btn-red" href="apply.html">Apply Visa</a>
    <a class="btn btn-white" href="tel:${D.tel}">Call ${D.phone}</a>
  </div></div>`;

  const footer = `
  <footer class="ftr"><div class="wrap">
    <div class="news">
      <div><h2>Subscribe to our newsletter</h2><p>Visa rule changes and travel tips, straight to your inbox.</p></div>
      <form id="newsF" novalidate><label class="sr" for="newsE">Email address</label><input id="newsE" type="email" placeholder="Your email address" required><button class="btn btn-red" type="submit">Subscribe</button></form>
    </div>
    <div class="fgrid">
      <div class="about-f"><img src="assets/img/misc/footerlogo.png" alt="My Visa Service" width="141" height="72">
        <p>My Visa Service is a trusted visa consultancy dedicated to making international travel simple, convenient, and stress-free. As a unit of Paras Holidays, we guide travellers, students, professionals and businesses through every stage, from document verification and application preparation to submission and status tracking.</p>
        <div class="soc"><a href="${D.social.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${I.fb}</a><a href="${D.social.x}" target="_blank" rel="noopener" aria-label="X">${I.xx}</a><a href="${D.social.pinterest}" target="_blank" rel="noopener" aria-label="Pinterest">${I.pin2}</a></div>
      </div>
      <div><h4>Quick links</h4><ul>${NAV.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}<li><a href="apply.html">Apply Visa</a></li></ul></div>
      <div><h4>Company info</h4><ul><li><a href="privacy.html">Privacy policy</a></li><li><a href="terms.html">Terms and conditions</a></li><li><a href="refund.html">Refund policy</a></li></ul></div>
      <div><h4>Get in touch</h4><ul class="gi">
        <li>${I.pin}<span>${D.address}</span></li>
        <li>${I.phone}<a href="tel:${D.tel}">${D.phone}</a></li>
        <li>${I.mail}<a href="mailto:${D.email}">${D.email}</a></li></ul></div>
    </div>
    <div class="fbot"><span>Copyright © 2026 My Visa Service. All rights reserved.</span><span class="disc">We are a private immigration consultancy and not a government agency.</span></div>
  </div></footer>
  <div class="cookie" id="cookie" role="region" aria-label="Cookie notice"><b>We use cookies</b><p>Cookies remember your preferences and help us understand how the site is used. Read our <a href="privacy.html">privacy policy</a>.</p><div class="row"><button class="btn btn-red" type="button" data-ck="1">Accept</button><button class="btn btn-ghost" type="button" data-ck="0">Decline</button></div></div>
  <button class="totop" id="totop" type="button" aria-label="Back to top">${I.top}</button>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>`;

  document.getElementById('site-header').outerHTML = header;
  document.getElementById('site-footer').outerHTML = footer;

  // icons placed in markup as <i data-i="name"></i>
  document.querySelectorAll('[data-i]').forEach(el => { el.outerHTML = I[el.dataset.i] || '' });

  const $ = s => document.querySelector(s);
  window.toast = msg => { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('on'), 3200) };

  // drawer
  const dr = $('#drawer'), bg = $('.burger');
  const setDr = on => { dr.classList.toggle('on', on); dr.setAttribute('aria-hidden', !on); bg.setAttribute('aria-expanded', on); document.body.style.overflow = on ? 'hidden' : ''; if (on) dr.querySelector('.x').focus(); else bg.focus() };
  bg.addEventListener('click', () => setDr(true));
  dr.addEventListener('click', e => { if (e.target === dr || e.target.classList.contains('x')) setDr(false) });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && dr.classList.contains('on')) setDr(false) });

  // sticky shadow + back to top
  const hdr = $('#hdr'), tt = $('#totop');
  const onScroll = () => { hdr.classList.toggle('stuck', scrollY > 40); tt.classList.toggle('on', scrollY > 700) };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  tt.addEventListener('click', () => scrollTo({ top: 0 }));

  // cookie notice
  let ck = null; try { ck = localStorage.getItem('mvs-cookie') } catch (e) {}
  const cookie = $('#cookie');
  if (!ck) cookie.classList.add('on');
  cookie.addEventListener('click', e => { const b = e.target.closest('[data-ck]'); if (!b) return; try { localStorage.setItem('mvs-cookie', b.dataset.ck) } catch (er) {} cookie.classList.remove('on') });

  // newsletter
  $('#newsF').addEventListener('submit', e => {
    e.preventDefault(); const i = $('#newsE');
    if (!i.checkValidity()) { i.focus(); toast('Enter a valid email address.'); return }
    i.value = ''; toast('Subscribed. Watch your inbox for visa updates.');
  });

  // shared renderers used by several pages
  window.MVSR = {
    pkCard: p => `<article class="pk${p.rec ? ' rec' : ''}">${p.rec ? '<span class="rb">Recommended</span>' : ''}
      <span class="kind">${p.entry === 'single' ? 'Single entry' : 'Multiple entry'}</span><h3>${p.title}</h3><span class="stay">${p.stay}</span>
      <div class="price"><b>₹${p.fee.toLocaleString('en-IN')}</b><span>INR per applicant</span></div>
      <ul><li>${I.clock}Processing time 48 hours</li><li>${I.check}International fast track</li><li>${I.check}Document review included</li></ul>
      <a class="btn btn-ghost" href="apply.html?pkg=${p.id}">Get started ${I.arrow}</a></article>`,
    postCard: p => `<a class="post" href="post.html?id=${p.id}"><div class="im"><img src="${p.img}" alt="" loading="lazy"></div>
      <div class="bd"><span class="meta">Visa guide · ${p.mins} min read</span><h3>${p.title}</h3><span class="lnk">Read article ${I.arrow}</span></div></a>`,
    countryOpts: sel => D.countries.map(c => `<option value="${c.id}"${c.id === sel ? ' selected' : ''}>${c.name}</option>`).join(''),
    pkgOpts: sel => D.packages.map(p => `<option value="${p.id}"${String(p.id) === String(sel) ? ' selected' : ''}>${p.title}, ${p.stay.toLowerCase()} (₹${p.fee.toLocaleString('en-IN')})</option>`).join('')
  };
})();
