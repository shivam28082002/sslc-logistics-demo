/* Prime Operations — shared shell: navigation, EN/AR switch, demo state shared across pages */
(function(){
const PAGES=[
  ['index.html','Control room','غرفة التحكم','<path d="M3 12h4l3-8 4 16 3-8h4"/>'],
  ['dashboard.html','Management','الإدارة','<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'],
  ['warehouse.html','Warehouse','المستودع','<path d="M3 21V8l9-5 9 5v13"/><path d="M7 21v-8h10v8M7 17h10"/>'],
  ['tpl-warehousing.html','Third-party warehousing','تخزين الطرف الثالث','<path d="M2 21V9l7-4 7 4v12"/><path d="M5 21v-6h8v6"/><path d="M16 11h6v10h-6"/>'],
  ['cold-chain.html','Cold chain','سلسلة التبريد','<path d="M12 2v20M4.9 6l14.2 12M19.1 6 4.9 18"/>'],
  ['packaging.html','Packaging','التغليف','<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10M7.5 5l9 4"/>'],
  ['transport.html','Transport','النقل','<path d="M1 7h13v10H1zM14 10h5l4 4v3h-9"/><circle cx="5" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>'],
  ['tpl-transport.html','Third-party logistics','النقل عبر طرف ثالث','<path d="M1 8h11v9H1zM12 11h5l4 4v2h-9"/><circle cx="5" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M15 3l3 3-3 3"/><path d="M9 6h9"/>'],
  ['driver.html','Driver app','تطبيق السائق','<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>'],
  ['client-portal.html','Client portal','بوابة العملاء','<circle cx="12" cy="8" r="4"/><path d="M4 21c1.6-4 4.6-6 8-6s6.4 2 8 6"/>'],
  ['billing.html','Billing & ZATCA','الفوترة وزاتكا','<path d="M6 2h12v20l-3-2-3 2-3-2-3 2z"/><path d="M9 7h6M9 11h6M9 15h4"/>'],
];
const here=(location.pathname.split('/').pop()||'index.html');

/* demo sign-in: three roles. Prime staff see everything; a customer and a partner warehouse see only their own pages.
   Demo only: accounts live in this file and the session is kept in this browser. */
window.PrimeUsers=[
  {email:'admin@primelogistics.sa',name:'Abzair Khan',role:'admin',org:'Prime Logistics'},
  {email:'ops@alwahafoods.sa',name:'Khalid Al-Qahtani',role:'customer',org:'Al Waha Foods',customer:'Al Waha Foods'},
  {email:'logistics@najdpharma.sa',name:'Reem Al-Saud',role:'customer',org:'Najd Pharma Distribution',customer:'Najd Pharma Distribution'},
  {email:'ops@khumracold.sa',name:'Hassan Al-Ghamdi',role:'partner',org:'Al Khumra Cold Stores',whId:'W-02'},
  {email:'ops@rimalstorage.sa',name:'Turki Al-Shammari',role:'partner',org:'Rimal Storage, Sudair',whId:'W-01'}];
window.PrimeDemoPassword='demo123';
window.PrimeAuth={
  get(){try{return JSON.parse(localStorage.getItem('prime-session'))}catch(e){return null}},
  signIn(email,pw){const u=PrimeUsers.find(x=>x.email===String(email).trim().toLowerCase());if(!u||pw!==PrimeDemoPassword)return null;localStorage.setItem('prime-session',JSON.stringify(u));return u},
  signOut(){localStorage.removeItem('prime-session');location.href='login.html'}};
const ROLE_PAGES={
  customer:u=>[['customer.html','Our account','حسابنا','<path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-6h6v6"/>'],...(u.customer==='Al Waha Foods'?[['client-portal.html','Contract services','خدمات العقد','<circle cx="12" cy="8" r="4"/><path d="M4 21c1.6-4 4.6-6 8-6s6.4 2 8 6"/>']]:[])],
  partner:u=>[['partner.html','Goods held for Prime','بضائع برايم لدينا','<path d="M2 21V9l7-4 7 4v12"/><path d="M5 21v-6h8v6"/><path d="M16 11h6v10h-6"/>']]};
const SESSION=PrimeAuth.get();
if(here!=='login.html'){
  const ok=SESSION&&(SESSION.role==='admin'?!['customer.html','partner.html'].includes(here):ROLE_PAGES[SESSION.role](SESSION).some(p=>p[0]===here));
  if(!ok){document.documentElement.style.visibility='hidden';location.replace(SESSION?ROLE_PAGES[SESSION.role]?ROLE_PAGES[SESSION.role](SESSION)[0][0]:'index.html':'login.html?next='+encodeURIComponent(here+location.search))}
}
const NAV=SESSION&&SESSION.role!=='admin'?ROLE_PAGES[SESSION.role](SESSION):PAGES;

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
  rail.innerHTML=`<a class="logo" href="${NAV[0][0]}"><img src="assets/white-logo.svg" alt="Prime Logistics" width="150" height="52"></a>
  ${SESSION&&SESSION.role!=='admin'?`<div class="group" style="padding-top:0">${SESSION.org}</div>`:''}
  <nav aria-label="Modules">${NAV.map(([h,en,ar,ic],i)=>`${h==='dashboard.html'?`<div class="group" data-ar="العمليات">Operations</div>`:''}${h==='driver.html'?`<div class="group" data-ar="التطبيقات">Apps</div>`:''}
    <a href="${h}" ${h===here?'aria-current="page"':''}><svg viewBox="0 0 24 24">${ic}</svg><span data-ar="${ar}">${en}</span></a>`).join('')}</nav>
  <div class="foot"><b data-ar="عرض تجريبي">Demo build</b><br><span data-ar="بيانات تجريبية، ليست بيانات برايم الحقيقية">Sample data, not Prime's real data</span><br><a href="#" id="resetDemo" style="color:#E8A43A" data-ar="إعادة ضبط العرض">Reset demo</a>${SESSION?` · <a href="#" id="railOut" style="color:#E8A43A" data-ar="خروج">Sign out</a>`:''}</div>`;
  const ro=document.getElementById('railOut');if(ro)ro.addEventListener('click',e=>{e.preventDefault();PrimeAuth.signOut()});
  document.getElementById('resetDemo').addEventListener('click',e=>{e.preventDefault();PrimeState.reset();localStorage.removeItem('prime-tpl-v1');toast(isAr()?'تمت إعادة الضبط':'Demo reset');setTimeout(()=>location.reload(),500)});
}

/* signed-in user menu on the avatar */
const av=document.querySelector('.top .avatar');
if(av&&SESSION){
  const ini=SESSION.name.split(' ').map(w=>w[0]).filter(c=>/[A-Z]/.test(c)).slice(0,2).join('');
  const roleTxt={admin:['Prime staff','موظف برايم'],customer:['Customer','عميل'],partner:['Partner warehouse','مستودع شريك']}[SESSION.role];
  const wrap=document.createElement('div');wrap.className='um';
  wrap.innerHTML=`<button class="avatar" type="button" aria-haspopup="true" aria-expanded="false" title="${SESSION.name}">${ini}</button>
    <div class="um-pop" hidden><b>${SESSION.name}</b><span>${SESSION.email}</span><span>${SESSION.org} · <span data-ar="${roleTxt[1]}">${roleTxt[0]}</span></span>
    <a href="login.html" data-ar="تبديل المستخدم التجريبي">Switch demo user</a><button type="button" class="um-out" data-ar="تسجيل الخروج">Sign out</button></div>`;
  av.replaceWith(wrap);
  const b=wrap.querySelector('.avatar'),pop=wrap.querySelector('.um-pop');
  b.addEventListener('click',e=>{e.stopPropagation();pop.hidden=!pop.hidden;b.setAttribute('aria-expanded',!pop.hidden)});
  document.addEventListener('click',e=>{if(!wrap.contains(e.target)){pop.hidden=true;b.setAttribute('aria-expanded','false')}});
  wrap.querySelector('.um-out').addEventListener('click',()=>PrimeAuth.signOut());
  const st=document.createElement('style');st.textContent=`.um{position:relative}.um .avatar{border:0;cursor:pointer}.um-pop{position:absolute;inset-inline-end:0;top:44px;background:#fff;border:1px solid var(--line);border-radius:10px;box-shadow:0 14px 30px -12px rgba(0,0,0,.3);padding:12px 14px;min-width:240px;z-index:60;display:flex;flex-direction:column;gap:3px;font-size:13.5px}.um-pop[hidden]{display:none}.um-pop span{color:var(--steel-d)}.um-pop a,.um-pop button{margin-top:6px;text-align:start;border:0;background:none;padding:6px 0 0;border-top:1px solid var(--line);font-weight:600;color:var(--green);cursor:pointer;text-decoration:none}.um-pop a+button{border-top:0;margin-top:0}`;
  document.head.appendChild(st);
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
