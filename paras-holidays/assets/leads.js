/* Paras Holidays demo: shared lead store (localStorage) used by the website and the lead inbox */
window.ParasLeads = (function () {
  const KEY = 'paras-leads-v1';
  const WA = '919717995564';
  const SEED = [
    { id: 'L-1041', name: 'Rohit Malhotra', phone: '98101 2xxxx', trip: 'Kashmir', when: 'December', who: 'Family, 2 adults + 2 kids', budget: '₹25–40k per person', source: 'Google Ads', status: 'Quote sent', created: -26, follow: 0, note: 'Wants houseboat 1 night + Gulmarg gondola.' },
    { id: 'L-1042', name: 'Ananya & Karan', phone: '99711 4xxxx', trip: 'Bali', when: 'February', who: 'Couple (honeymoon)', budget: '₹60k+ per person', source: 'Instagram', status: 'New', created: -2, follow: 0, note: '' },
    { id: 'L-1043', name: 'Suresh Gupta', phone: '98180 7xxxx', trip: 'Great European Capitals (group tour)', when: 'May 2026', who: 'Group, 9 adults', budget: '₹2.5L+ per person', source: 'Website planner', status: 'Contacted', created: -5, follow: 1, note: 'Wants Schengen visa help for all 9; two senior citizens.' },
    { id: 'L-1044', name: 'Meenal Arora', phone: '98731 1xxxx', trip: 'Dubai', when: 'January', who: 'Family, 3 adults', budget: '₹40–60k per person', source: 'WhatsApp', status: 'Booked', created: -72, follow: null, note: 'Visa done. Desert safari + Burj Khalifa 124.' },
    { id: 'L-1045', name: 'Vikram Sethi', phone: '99100 8xxxx', trip: 'Turkey', when: 'Not decided', who: 'Friends, 4 adults', budget: '₹1–2.5L per person', source: 'Website planner', status: 'New', created: -1, follow: 0, note: '' },
    { id: 'L-1046', name: 'Pooja Bansal', phone: '98113 5xxxx', trip: 'Kerala', when: 'December', who: 'Couple', budget: '₹25–40k per person', source: 'Google Ads', status: 'Quote sent', created: -30, follow: -1, note: 'Compared with another agent. Follow up today.' },
    { id: 'L-1047', name: 'Harish Kapoor', phone: '98990 2xxxx', trip: 'Manali', when: 'March', who: 'Family, 2 adults + 1 kid', budget: 'Under ₹15k per person', source: 'Visa checklist', status: 'Lost', created: -120, follow: null, note: 'Booked by road with relatives.' },
    { id: 'L-1048', name: 'Nisha Verma', phone: '97170 6xxxx', trip: 'Goa', when: 'December', who: 'Friends, 6 adults', budget: '₹15–25k per person', source: 'Exit offer', status: 'Contacted', created: -9, follow: 2, note: 'New Year week, wants North Goa.' }
  ];
  const now = () => Date.now();
  function all() {
    let mine = [];
    try { mine = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) {}
    const seed = SEED.map(l => ({ ...l, createdAt: now() + l.created * 3600e3, followAt: l.follow == null ? null : now() + l.follow * 86400e3, demo: false }));
    return mine.concat(seed);
  }
  function add(l) {
    let mine = [];
    try { mine = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) {}
    const lead = { id: 'L-' + (1049 + mine.length), status: 'New', createdAt: now(), followAt: now(), note: '', demo: true, ...l };
    mine.unshift(lead); localStorage.setItem(KEY, JSON.stringify(mine)); return lead;
  }
  function update(id, patch) {
    let mine = [];
    try { mine = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) {}
    const i = mine.findIndex(x => x.id === id);
    if (i >= 0) { Object.assign(mine[i], patch); localStorage.setItem(KEY, JSON.stringify(mine)); return true; }
    const s = JSON.parse(localStorage.getItem(KEY + '-seedpatch') || '{}'); s[id] = { ...(s[id] || {}), ...patch };
    localStorage.setItem(KEY + '-seedpatch', JSON.stringify(s)); return true;
  }
  function list() {
    const s = JSON.parse(localStorage.getItem(KEY + '-seedpatch') || '{}');
    return all().map(l => s[l.id] ? { ...l, ...s[l.id] } : l);
  }
  function reset() { localStorage.removeItem(KEY); localStorage.removeItem(KEY + '-seedpatch'); }
  const wa = text => 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text);
  return { list, add, update, reset, wa, WA };
})();
