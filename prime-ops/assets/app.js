/* Prime Operations — shared shell: navigation, EN/AR switch, demo state shared across pages */
(function(){
const PAGES=[
  ['index.html','Control room','غرفة التحكم','<path d="M3 12h4l3-8 4 16 3-8h4"/>'],
  ['dashboard.html','Management','الإدارة','<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'],
  ['warehouse.html','Warehouse','المستودع','<path d="M3 21V8l9-5 9 5v13"/><path d="M7 21v-8h10v8M7 17h10"/>'],
  ['cold-chain.html','Cold chain','سلسلة التبريد','<path d="M12 2v20M4.9 6l14.2 12M19.1 6 4.9 18"/>'],
  ['packaging.html','Packaging','التغليف','<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10M7.5 5l9 4"/>'],
  ['transport.html','Transport','النقل','<path d="M1 7h13v10H1zM14 10h5l4 4v3h-9"/><circle cx="5" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>'],
  ['driver.html','Driver app','تطبيق السائق','<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>'],
  ['client-portal.html','Client portal','بوابة العملاء','<circle cx="12" cy="8" r="4"/><path d="M4 21c1.6-4 4.6-6 8-6s6.4 2 8 6"/>'],
  ['billing.html','Billing & ZATCA','الفوترة وزاتكا','<path d="M6 2h12v20l-3-2-3 2-3-2-3 2z"/><path d="M9 7h6M9 11h6M9 15h4"/>'],
];
const here=(location.pathname.split('/').pop()||'index.html');

/* demo state shared between pages (driver app -> client portal -> dashboard) */
const KEY='prime-demo-v1';
const DEF={pod:null,extraDelivered:0,tempAck:false,invoices:[]};
window.PrimeState={
  get(){try{return Object.assign({},DEF,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){return {...DEF}}},
  set(p){const s=Object.assign(this.get(),p);localStorage.setItem(KEY,JSON.stringify(s));return s},
  reset(){localStorage.removeItem(KEY)}
};

/* rail */
const rail=document.querySelector('.rail');
if(rail){
  rail.innerHTML=`<a class="logo" href="index.html"><img src="assets/white-logo.svg" alt="Prime Logistics" width="150" height="52"></a>
  <nav aria-label="Modules">${PAGES.map(([h,en,ar,ic],i)=>`${i===1?`<div class="group" data-ar="العمليات">Operations</div>`:''}${i===6?`<div class="group" data-ar="التطبيقات">Apps</div>`:''}
    <a href="${h}" ${h===here?'aria-current="page"':''}><svg viewBox="0 0 24 24">${ic}</svg><span data-ar="${ar}">${en}</span></a>`).join('')}</nav>
  <div class="foot"><b data-ar="عرض تجريبي">Demo build</b><br><span data-ar="بيانات تجريبية، ليست بيانات برايم الحقيقية">Sample data, not Prime's real data</span><br><a href="#" id="resetDemo" style="color:#E8A43A" data-ar="إعادة ضبط العرض">Reset demo</a></div>`;
  document.getElementById('resetDemo').addEventListener('click',e=>{e.preventDefault();PrimeState.reset();toast(isAr()?'تمت إعادة الضبط':'Demo reset');setTimeout(()=>location.reload(),500)});
}

/* mobile nav */
const burger=document.querySelector('.burger');
if(burger){burger.addEventListener('click',()=>{const o=document.body.classList.toggle('nav-open');burger.setAttribute('aria-expanded',o)});
  document.addEventListener('click',e=>{if(document.body.classList.contains('nav-open')&&!e.target.closest('.rail')&&!e.target.closest('.burger'))document.body.classList.remove('nav-open')});}

/* EN / AR */
function isAr(){return document.documentElement.lang==='ar'}
window.isAr=isAr;
function applyLang(l){
  document.documentElement.lang=l; document.documentElement.dir=l==='ar'?'rtl':'ltr';
  document.querySelectorAll('[data-ar]').forEach(el=>{
    if(el.dataset.en===undefined) el.dataset.en=el.textContent;
    el.textContent=l==='ar'?el.dataset.ar:el.dataset.en;
  });
  document.querySelectorAll('[data-ar-ph]').forEach(el=>{
    if(el.dataset.enPh===undefined) el.dataset.enPh=el.placeholder;
    el.placeholder=l==='ar'?el.dataset.arPh:el.dataset.enPh;
  });
  const b=document.querySelector('.lang'); if(b) b.textContent=l==='ar'?'English':'عربي';
  localStorage.setItem('prime-lang',l);
  document.dispatchEvent(new CustomEvent('langchange',{detail:l}));
}
window.applyLang=applyLang;
const lb=document.querySelector('.lang');
if(lb) lb.addEventListener('click',()=>applyLang(isAr()?'en':'ar'));
if(localStorage.getItem('prime-lang')==='ar') applyLang('ar');

/* toast + modal helpers */
let tt; window.toast=function(m){let t=document.querySelector('.toast');if(!t){t=document.createElement('div');t.className='toast';t.setAttribute('role','status');document.body.appendChild(t)}
  t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2600)};
window.openModal=function(id){const m=document.getElementById(id);m.classList.add('on');m.setAttribute('aria-hidden','false');const f=m.querySelector('button,input,select,a');f&&setTimeout(()=>f.focus(),50)};
window.closeModal=function(id){const m=document.getElementById(id);m.classList.remove('on');m.setAttribute('aria-hidden','true')};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('.modal.on').forEach(m=>closeModal(m.id));document.body.classList.remove('nav-open')}});
document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModal(m.id)}));
/* the seven services Prime sells, and which sample clients use which */
window.SERVICES=[['3pl','3PL','3PL','Third-party logistics','الخدمات اللوجستية الطرف الثالث','warehouse.html'],['2pl','2PL','2PL','Second-party logistics','الخدمات اللوجستية الطرف الثاني','transport.html#fleet2pl'],['cold','Cold','تبريد','Temperature-controlled storage','التخزين المبرد','cold-chain.html'],['trans','Transport','نقل','Transportation','النقل','transport.html'],['pack','Packaging','تغليف','Packaging','التغليف','packaging.html'],['wh','Warehousing','تخزين','Warehousing','التخزين','warehouse.html'],['pick','Pick & pack','التقاط وتغليف','Pick and pack','الالتقاط والتغليف','warehouse.html#pack']];
window.CLIENT_SERVICES={'Najd Pharma Distribution':['3pl','cold','wh','pick','trans'],'Al Waha Foods':['3pl','cold','wh','pick','pack','trans'],'Qimma Beverages':['3pl','wh','trans'],'Rawabi Electronics':['3pl','wh','pick','trans'],'Sahara Home Retail':['3pl','wh','pack'],'Tamr Dates Co.':['cold','pack','wh'],'Masar Building Materials':['2pl','trans'],'Gulf Cement Trading':['2pl','trans']};
window.svcTags=function(c){return (CLIENT_SERVICES[c]||[]).map(k=>{const v=SERVICES.find(x=>x[0]===k);return `<span class="svc svc-${k}">${isAr()?v[2]:v[1]}</span>`}).join('')};
window.sar=n=>'SAR '+Number(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
})();
