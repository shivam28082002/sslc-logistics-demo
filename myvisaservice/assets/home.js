// Home page behaviour: visa finder, destination mosaic, services, reviews, FAQ and call-back form.
(function () {
  const D = MVS, I = ICON, $ = s => document.querySelector(s), C = D.config;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const place = id => D.places.find(p => p.id === id);

  /* ---------- visa finder ---------- */
  const from = Combo($('#fFrom'), D.places.filter(p => p.id !== 'schengen'), () => clearErr('fFrom'));
  const to = Combo($('#fTo'), D.places, () => clearErr('fTo'));
  from.set('india');
  $('#fPurpose').insertAdjacentHTML('beforeend', D.purposes.map(([v, t]) => `<label><input type="radio" name="purpose" value="${v}"><span>${t}</span></label>`).join(''));
  $('#fPurpose').addEventListener('change', () => clearErr('fPurpose'));

  const setErr = (id, msg) => { const el = $('#' + id); $('#' + id + '-e').textContent = msg; if (el.tagName === 'FIELDSET') el.classList.add('bad'); else el.setAttribute('aria-invalid', 'true') };
  function clearErr(id) { const el = $('#' + id); $('#' + id + '-e').textContent = ''; el.classList.remove('bad'); el.removeAttribute('aria-invalid') }

  const res = $('#results');
  $('#fForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = from.value(), t = to.value(), p = (document.querySelector('[name=purpose]:checked') || {}).value, en = $('#fEntry').value;
    const bad = [];
    if (!f) { setErr('fFrom', $('#fFrom').value ? 'Pick a country from the list.' : 'Choose your citizenship.'); bad.push('fFrom') }
    if (!t) { setErr('fTo', $('#fTo').value ? 'Pick a destination from the list.' : 'Choose where you are travelling.'); bad.push('fTo') }
    if (!p) { setErr('fPurpose', 'Choose the purpose of your trip.'); bad.push('fPurpose') }
    if (bad.length) { const first = bad[0] === 'fPurpose' ? document.querySelector('[name=purpose]') : $('#' + bad[0]); first.focus(); return }
    res.hidden = false;
    res.innerHTML = '<div class="loading" role="status"><span class="spin" aria-hidden="true"></span>Looking up visa options…</div>';
    setTimeout(() => show(f, t, p, en), 650);
  });

  function show(f, t, p, en) {
    const F = place(f), T = place(t), pl = D.purposes.find(x => x[0] === p)[1];
    const sameCountry = f === t || (F.group === 'schengen' && T.group === 'schengen' && ['tourism', 'business', 'family'].includes(p));
    if (sameCountry) {
      res.innerHTML = `<div class="empty-state"><h3>You may not need a visa for this trip</h3>
        <p style="color:var(--slate)">${f === t ? `You're travelling within ${esc(T.name)}, your own country.` : `${esc(F.name)} and ${esc(T.name)} are both in the Schengen Area, so citizens usually travel freely for short visits.`} Rules can still differ for long stays, work or study, or if you hold another nationality.</p>
        <a class="btn btn-line" href="contact.html?to=${t}&purpose=${p}">Ask an advisor to confirm</a></div>`;
      res.focus && res.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); return;
    }
    const schengen = T.group === 'schengen';
    const longStay = ['study', 'work'].includes(p);
    const V = D.visaTypes[p];
    const main = schengen ? (longStay ? { t: 'National long-stay visa (type D)', d: `${V.d} For study or work in a Schengen country you apply to that country, not for a Schengen-wide visa.`, docs: V.docs } : { t: 'Schengen short-stay visa (type C)', d: `${V.d} One visa usually covers short visits across the Schengen countries; you apply through your main destination.`, docs: V.docs.concat(['Travel medical insurance']) }) : V;
    const enq = (visa) => `contact.html?to=${t}&from=${f}&purpose=${p}&visa=${encodeURIComponent(visa)}`;
    const cards = [
      { k: `Most relevant for ${pl.toLowerCase()}`, t: main.t, d: main.d, list: main.docs.map(x => `Often asked for: ${x.charAt(0).toLowerCase() + x.slice(1)}`), cta: ['Enquire about this visa', enq(main.t)] },
      { k: 'If your forms are ready', t: 'Document check', d: 'Already started your application? We review your forms and supporting documents for gaps and inconsistencies before you submit.', list: ['Line-by-line form review', 'Checklist matched to your visa', 'Notes on anything to fix'], cta: ['Enquire about a document check', enq('Document check')] },
      { k: 'If you are unsure', t: 'Visa consultation', d: `A one-to-one conversation about your trip to ${esc(T.name)}: which visa fits, what it needs, and how long to allow.`, list: ['Eligibility questions answered', 'Timeline planned around your travel', 'Costs explained before you commit'], cta: ['Book a consultation', enq('Visa consultation')] }
    ];
    res.innerHTML = `<div class="res-head"><div><h3>Visa options for ${pl.toLowerCase()} in ${esc(T.name)}</h3><p>Citizenship: ${esc(F.name)}${en !== 'any' ? `. You prefer ${en} entry; whether it is offered depends on the destination and visa type` : ''}.</p></div>
      <span class="demo-flag">${I.info}Illustrative demo information</span></div>
      <div class="res-list">${cards.map(c => `<article class="res"><span class="k">${c.k}</span><h4>${c.t}</h4><p>${c.d}</p><ul>${c.list.map(x => `<li>${I.check}<span>${x}</span></li>`).join('')}</ul><a class="btn btn-navy" href="${c.cta[1]}">${c.cta[0]} ${I.arrow}</a></article>`).join('')}</div>
      <p class="res-foot">This is general, illustrative information, not immigration advice. Visa types, eligibility, documents, fees and processing times depend on your passport, purpose and circumstances, and are set by the issuing authority. An advisor will confirm what applies to you.</p>`;
    res.setAttribute('tabindex', '-1'); res.focus({ preventScroll: true });
    const top = res.getBoundingClientRect().top + scrollY - 110; if (Math.abs(scrollY - top) > 200) scrollTo({ top, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  /* ---------- destinations ---------- */
  $('#mosaic').innerHTML = D.showcase.map((d, i) => `<a class="dcard ${d.cls} rv" href="index.html?to=${d.id}#finder" data-to="${d.id}">
      <img src="${d.img}" alt="" loading="lazy" ${i ? '' : 'sizes="(max-width:1000px) 100vw, 58vw"'}>
      <div class="dc-b">${d.k ? `<span class="k">${d.k}</span>` : ''}<h3>${d.name}</h3><p>${d.d}</p><span class="go">Explore visa options ${I.arrow}</span></div></a>`).join('');
  const pickDest = id => { to.set(id); clearErr('fTo'); $('#finder').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); setTimeout(() => { const r = document.querySelector('[name=purpose]:checked') || document.querySelector('[name=purpose]'); r.focus({ preventScroll: true }) }, 450); toast(place(id).name + ' selected. Now choose your travel purpose.') };
  $('#mosaic').addEventListener('click', e => { const a = e.target.closest('[data-to]'); if (!a) return; e.preventDefault(); pickDest(a.dataset.to) });
  const qs = new URLSearchParams(location.search);
  if (qs.get('to') && place(qs.get('to'))) { to.set(qs.get('to')) }

  /* ---------- services ---------- */
  const SV = [
    ['plane', 'Tourist and visitor visas', 'Holidays, sightseeing and short visits, with a checklist made for your destination.', 'tourist-visa'],
    ['brief', 'Business visas', 'Meetings, conferences and trade events, with the right invitation and employer letters.', 'business-visa'],
    ['cap', 'Student visas', 'Guidance once you hold an admission offer, including funds and academic documents.', 'student-visa'],
    ['id', 'Work visas', 'Support with work permit and employment visa applications once you have a job offer.', 'work-and-employment-visa'],
    ['family', 'Family visit visas', 'Visiting relatives abroad, with invitation and relationship documents in order.', 'family-and-visitor-visa'],
    ['chat', 'Visa consultation', 'A one-to-one session on eligibility, documents and timing before you apply.', 'visa-consultation']
  ];
  $('#svcList').innerHTML = SV.map(([i, t, d, id]) => `<div class="svc-row rv"><span class="ic">${I[i]}</span><div><h3>${t}</h3><p>${d}</p></div><a class="lnk" href="services.html#${id}" aria-label="Details: ${t}">Details ${I.arrow}</a></div>`).join('');

  /* ---------- reviews (sample, one at a time) ---------- */
  const Q = D.testimonials; let qi = 0;
  $('#qStage').innerHTML = Q.map((q, i) => `<figure class="q${i ? '' : ' on'}" id="q${i}" aria-hidden="${!!i}"><blockquote>${esc(q.text)}</blockquote><figcaption><b>Sample review</b>${q.kind} client</figcaption></figure>`).join('');
  const qShow = n => { qi = (n + Q.length) % Q.length; document.querySelectorAll('.q').forEach((el, i) => { el.classList.toggle('on', i === qi); el.setAttribute('aria-hidden', i !== qi) }); $('#qCount').textContent = `${qi + 1} / ${Q.length}` };
  $('#qPrev').onclick = () => qShow(qi - 1); $('#qNext').onclick = () => qShow(qi + 1); qShow(0);

  /* ---------- FAQ ---------- */
  $('#hfaq').innerHTML = D.homeFaqs.map(([q, a], i) => `<div class="qa"><h3><button type="button" aria-expanded="false" aria-controls="ha${i}" id="hq${i}">${q}<span class="pm">${I.plus}</span></button></h3><div class="ans" id="ha${i}" role="region" aria-labelledby="hq${i}"><div>${a}</div></div></div>`).join('');
  $('#hfaq').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const qa = b.closest('.qa'), on = !qa.classList.contains('on'); qa.classList.toggle('on', on); b.setAttribute('aria-expanded', on) });

  /* ---------- call-back form ---------- */
  const rules = { cbN: v => v.trim().length > 1 || 'Enter your name.', cbP: v => v.replace(/\D/g, '').length >= 10 || 'Enter a phone number with at least 10 digits.' };
  const check = id => { const r = rules[id]($('#' + id).value); const ok = r === true; $('#' + id).setAttribute('aria-invalid', !ok); $('#' + id).setAttribute('aria-describedby', id + '-e'); $('#' + id + '-e').textContent = ok ? '' : r; return ok };
  Object.keys(rules).forEach(id => $('#' + id).addEventListener('input', () => { if ($('#' + id).getAttribute('aria-invalid') === 'true') check(id) }));
  $('#cbF').addEventListener('submit', e => {
    e.preventDefault(); const ok = Object.keys(rules).map(check); const bad = Object.keys(rules).find((k, i) => !ok[i]); if (bad) { $('#' + bad).focus(); return }
    const n = esc($('#cbN').value.trim().split(' ')[0]);
    $('#cbWrap').innerHTML = `<div class="done-card" tabindex="-1" id="cbDone"><div class="ok">${I.check}</div><h3>Thank you, ${n}</h3><p style="color:var(--slate)">In the live site, a visa advisor would now call you back on the number you gave.</p><p class="note">Demo only: this request has not been sent or stored. To reach the team now, call <a href="tel:${C.tel}">${C.phone}</a>.</p></div>`;
    $('#cbDone').focus();
  });

  /* timeline line fills as the section is reached */
  const tl = $('#tl');
  if ('IntersectionObserver' in window) new IntersectionObserver((es, o) => es.forEach(en => { if (en.isIntersecting) { tl.style.setProperty('--prog', '100%'); o.disconnect() } }), { threshold: .4 }).observe(tl);
  else tl.style.setProperty('--prog', '100%');

  MVSreveal();
})();
