/* Prime Operations — third-party logistics (hired trucks) and third-party warehousing.
   Demo only: all data is simulated and kept in this browser (localStorage). No payments, no real invoices. */
(function(){

/* ===== DEMO ASSUMPTIONS: change them here ===== */
const ASSUME={
  currency:'SAR',            // Saudi riyal, shown as "SAR 5,000.00"
  vatPct:15,                 // VAT on customer invoices (KSA standard rate)
  demoDate:'2026-10-28',     // "today" for the demo: open storage is billed up to and including this date
  transportMarkupPct:20,     // default markup on cost for hired trucks
  storageMarkupPct:25,       // default markup on cost for partner-warehouse storage
  country:'Saudi Arabia'
};
/* Billing policy for storage: a day is billed when goods are in the partner warehouse at the start of that day.
   Goods received on a date are billed from that date; goods released on a date are NOT billed for that date.
   Storage is billed per calendar month, so each month is a separate charge and can never be counted twice. */

const KEY='prime-tpl-v1';
const DAY=864e5;
const n2=v=>Math.round((+v||0)*100)/100;
const d2n=s=>{const [y,m,d]=s.split('-').map(Number);return Date.UTC(y,m-1,d)};
const n2d=n=>new Date(n).toISOString().slice(0,10);
const addDays=(s,k)=>n2d(d2n(s)+k*DAY);
const monthOf=s=>s.slice(0,7);
const monthRange=ym=>{const [y,m]=ym.split('-').map(Number);const last=new Date(Date.UTC(y,m,0)).getUTCDate();return {from:ym+'-01',to:ym+'-'+String(last).padStart(2,'0'),days:last}};
const fmt=v=>ASSUME.currency+' '+(+v||0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});

/* ---------- pricing: markup on cost ---------- */
/* pct:   customer charge = cost × (1 + markup% / 100)
   fixed: customer charge = cost + fixed markup */
function price(cost,type,val){
  const c=+cost, v=+val, err=[];
  if(cost===''||cost==null||!isFinite(c)) err.push('cost'); else if(c<0) err.push('cost-neg');
  if(val===''||val==null||!isFinite(v)) err.push('markup'); else if(v<0) err.push('markup-neg');
  if(err.length) return {ok:false,err,cost:0,markup:0,charge:0};
  const markup=type==='fixed'?n2(v):n2(c*v/100);
  return {ok:true,err,cost:n2(c),markup,charge:n2(c+markup),pctOfCost:c?markup/c*100:0};
}

/* ---------- storage: billed day by day from stock movements ---------- */
function qtyOn(rec,day){return rec.moves.reduce((a,m)=>m.date<=day?a+m.qty:a,0)}
function storageFor(rec,wh,from,to){
  const end=[to,ASSUME.demoDate].sort()[0]; let start=[from,rec.start].sort().reverse()[0];
  let base=0,days=0,qtyDays=0;
  for(let d=start; d<=end; d=addDays(d,1)){
    const q=qtyOn(rec,d); if(q<=0) continue;
    days++; qtyDays+=q;
    if(wh.rateType==='monthly') base+=wh.rate/monthRange(monthOf(d)).days;
    else base+=q*wh.rate;
  }
  base=n2(base); const markup=n2(base*rec.markupPct/100);
  return {days,qtyDays,base,markup,charge:n2(base+markup),upto:end};
}
const RATE_LABEL={pallet_day:['per pallet per day','لكل منصة يومياً'],unit_day:['per unit per day','لكل وحدة يومياً'],monthly:['fixed monthly fee, pro-rated by days stored','رسوم شهرية ثابتة، حسب أيام التخزين']};
const UNIT_FOR={pallet_day:'pallets',unit_day:'units',monthly:'pallets'};

/* ---------- seed data (Saudi Arabia) ---------- */
function seed(){
  const vendors=[
    {id:'V-101',type:'contract',name:'Al Majd Land Transport Co.',contact:'Fahad Al-Qahtani',phone:'+966 50 412 7731',city:'Riyadh',country:'Saudi Arabia',start:'2026-01-01',end:'2026-12-31',vehicles:'Reefer trailer 40ft, Flatbed 12m',rates:[{route:'Riyadh to Dammam',vehicle:'Reefer trailer 40ft',rate:1650},{route:'Riyadh to Jeddah',vehicle:'Reefer trailer 40ft',rate:3150},{route:'Riyadh to Dammam',vehicle:'Flatbed 12m',rate:1400}],terms:'Net 30, monthly statement',status:'Active'},
    {id:'V-102',type:'contract',name:'Sahel Al Sharqiya Logistics',contact:'Majed Al-Dossary',phone:'+966 55 230 9184',city:'Dammam',country:'Saudi Arabia',start:'2026-03-01',end:'2027-02-28',vehicles:'Curtain-side 13.6m, Box truck 7t',rates:[{route:'Dammam to Riyadh',vehicle:'Curtain-side 13.6m',rate:1500},{route:'Dammam to Jubail',vehicle:'Box truck 7t',rate:650}],terms:'Net 45, monthly statement',status:'Active'},
    {id:'V-103',type:'contract',name:'Hijaz Fleet Services',contact:'Abdulrahman Bakr',phone:'+966 54 778 0362',city:'Jeddah',country:'Saudi Arabia',start:'2025-07-01',end:'2026-06-30',vehicles:'Reefer truck 10t',rates:[{route:'Jeddah to Mecca',vehicle:'Reefer truck 10t',rate:780}],terms:'Net 30, monthly statement',status:'Expired'},
    {id:'V-201',type:'spot',name:'Saeed Al-Harbi',phone:'+966 56 301 4479',plate:'RJD 4821',vehicle:'Reefer truck 10t',capacity:'10 t / 14 pallets',city:'Riyadh',country:'Saudi Arabia',tripCost:1700,payMethod:'Cash',status:'Active'},
    {id:'V-202',type:'spot',name:'Imran Shaikh',phone:'+966 57 884 2093',plate:'DMM 3307',vehicle:'Flatbed 12m',capacity:'24 t',city:'Dammam',country:'Saudi Arabia',tripCost:1350,payMethod:'Cash',status:'Active'},
    {id:'V-203',type:'spot',name:'Nawaf Al-Otaibi',phone:'+966 53 619 2250',plate:'JED 9174',vehicle:'Box truck 7t',capacity:'7 t / 10 pallets',city:'Jeddah',country:'Saudi Arabia',tripCost:950,payMethod:'Bank transfer',status:'Active'}
  ];
  const B=(id,date,customer,ship,from,to,veh,qty,vid,plate,cost,mt,mv,status,pay)=>({id,date,customer,shipment:ship,pickup:from,destination:to,vehicleType:veh,qty,vendorId:vid,vehicle:plate,cost,markupType:mt,markupVal:mv,status,vendorPay:pay,inv:{status:'Unbilled',no:null}});
  const bookings=[
    B('TB-2609-014','2026-09-08','Al Waha Foods','SH-88412 · 18 pallets chilled dairy','Riyadh, 2nd Industrial City','Dammam, 2nd Industrial City','Reefer trailer 40ft',1,'V-101','RYD 2210',1650,'pct',20,'Delivered',{status:'Paid',method:'Bank transfer',amount:1650,date:'2026-10-05',ref:'STMT-AMJ-09'}),
    B('TB-2609-021','2026-09-19','Al Waha Foods','SH-88590 · 12 pallets frozen poultry','Riyadh, 2nd Industrial City','Jeddah, Al Khumra','Reefer trailer 40ft',1,'V-101','RYD 2244',3150,'pct',20,'Delivered',{status:'Paid',method:'Bank transfer',amount:3150,date:'2026-10-05',ref:'STMT-AMJ-09'}),
    B('TB-2609-026','2026-09-24','Najd Pharma Distribution','SH-88671 · 9 pallets vaccines (2–8°C)','Riyadh, Al Sulay','Mecca, Al Kakiyah','Reefer truck 10t',1,'V-201','RJD 4821',2400,'pct',22,'Delivered',{status:'Paid',method:'Cash',amount:2400,date:'2026-09-24',ref:'CV-0912'}),
    B('TB-2610-003','2026-10-04','Al Waha Foods','SH-89012 · 20 pallets chilled juice','Riyadh, 2nd Industrial City','Dammam, 2nd Industrial City','Reefer trailer 40ft',1,'V-101','RYD 2261',1650,'pct',20,'Delivered',{status:'On statement',method:'',amount:0,date:'',ref:''}),
    B('TB-2610-007','2026-10-09','Masar Building Materials','SH-89140 · steel rebar 22 t','Dammam, 1st Industrial City','Riyadh, Al Masani','Flatbed 12m',1,'V-202','DMM 3307',1350,'fixed',300,'Delivered',{status:'Paid',method:'Cash',amount:1350,date:'2026-10-09',ref:'CV-0951'}),
    B('TB-2610-011','2026-10-14','Qimma Beverages','SH-89233 · 26 pallets water','Dammam, 2nd Industrial City','Riyadh, Al Sulay','Curtain-side 13.6m',2,'V-102','DMM 7712',3000,'pct',18,'Delivered',{status:'On statement',method:'',amount:0,date:'',ref:''}),
    B('TB-2610-015','2026-10-18','Najd Pharma Distribution','SH-89305 · 6 pallets insulin','Riyadh, Al Sulay','Jeddah, Al Khumra','Reefer truck 10t',1,'V-201','RJD 4821',2900,'pct',22,'Delivered',{status:'Unpaid',method:'',amount:0,date:'',ref:''}),
    B('TB-2610-019','2026-10-23','Rawabi Electronics','SH-89388 · 8 pallets TVs','Jeddah, Al Khumra','Mecca, Al Kakiyah','Box truck 7t',1,'V-203','JED 9174',950,'fixed',250,'In transit',{status:'Unpaid',method:'',amount:0,date:'',ref:''}),
    B('TB-2610-022','2026-10-27','Al Waha Foods','SH-89451 · 14 pallets dates & dairy','Riyadh, 2nd Industrial City','Jeddah, Al Khumra','Reefer trailer 40ft',1,'V-101','RYD 2290',3150,'pct',20,'Confirmed',{status:'On statement',method:'',amount:0,date:'',ref:''}),
    B('TB-2610-023','2026-10-28','Sahara Home Retail','SH-89470 · 30 pallets furniture','Dammam, 2nd Industrial City','Riyadh, Al Sulay','Curtain-side 13.6m',1,'V-102','DMM 7735',1500,'pct',20,'Cancelled',{status:'On statement',method:'',amount:0,date:'',ref:''})
  ];
  bookings[9].inv.status='Excluded';
  const warehouses=[
    {id:'W-01',name:'Rimal Storage, Sudair Logistics Park',city:'Sudair',address:'Sudair City for Industry and Business, Zone B, Warehouse 14, Riyadh Province',contact:'Turki Al-Shammari',phone:'+966 50 917 3346',email:'ops@rimalstorage.sa',type:'Ambient',capacity:2400,available:610,rateType:'pallet_day',rate:2.25,terms:'Net 30',status:'Active'},
    {id:'W-02',name:'Al Khumra Cold Stores',city:'Jeddah',address:'Al Khumra District, Street 41, Jeddah 22526',contact:'Hassan Al-Ghamdi',phone:'+966 55 641 0827',email:'bookings@khumracold.sa',type:'Cold (2–8°C and −18°C)',capacity:1200,available:140,rateType:'pallet_day',rate:3.8,terms:'Net 30',status:'Active'},
    {id:'W-03',name:'Eastern Gate Warehousing',city:'Dammam',address:'2nd Industrial City, Road 128, Dammam 34332',contact:'Yousef Al-Mutairi',phone:'+966 54 300 5189',email:'eg.ops@easterngate.sa',type:'Ambient, bonded',capacity:500,available:180,rateType:'monthly',rate:9500,terms:'Monthly in advance',status:'Active'},
    {id:'W-04',name:'Kakiyah Pick Hub',city:'Mecca',address:'Al Kakiyah Industrial Area, Mecca 24236',contact:'Ali Al-Zahrani',phone:'+966 56 205 7714',email:'hub@kakiyahpick.sa',type:'Ambient, small parcels',capacity:60000,available:21000,rateType:'unit_day',rate:0.06,terms:'Net 15',status:'Active'},
    {id:'W-05',name:'Qassim Agri Store',city:'Buraydah',address:'Industrial City 1, Buraydah 52366',contact:'Saleh Al-Rashidi',phone:'+966 53 118 4902',email:'store@qassimagri.sa',type:'Ambient, dry',capacity:800,available:800,rateType:'pallet_day',rate:1.9,terms:'Net 30',status:'Inactive'}
  ];
  const S=(id,customer,goods,ref,whId,start,moves,expected,mk,status)=>({id,customer,goods,ref,whId,start,unit:UNIT_FOR[warehouses.find(w=>w.id===whId).rateType],moves,expected,markupPct:mk,status,billed:{},excluded:{}});
  const stock=[
    S('XS-0412','Al Waha Foods','Chilled juice overflow (Ramadan stock)','SKU WF-JUICE-1L','W-02','2026-09-10',[{date:'2026-09-10',qty:120,note:'Received 120 pallets'},{date:'2026-10-06',qty:-40,note:'Released 40 pallets to Jeddah DC'}],'2026-11-15',25,'In storage'),
    S('XS-0415','Najd Pharma Distribution','Vaccine cartons (2–8°C)','SKU NP-VAX-0925','W-02','2026-10-02',[{date:'2026-10-02',qty:36,note:'Received 36 pallets'}],'2026-11-30',30,'In storage'),
    S('XS-0418','Rawabi Electronics','Televisions 55" (Q4 promotion)','PO RE-77120','W-01','2026-09-20',[{date:'2026-09-20',qty:300,note:'Received 300 pallets'},{date:'2026-10-12',qty:80,note:'Received 80 pallets'}],'2026-12-20',25,'In storage'),
    S('XS-0421','Sahara Home Retail','Flat-pack furniture','PO SH-4410','W-03','2026-09-01',[{date:'2026-09-01',qty:150,note:'Received 150 pallets'},{date:'2026-10-20',qty:-150,note:'Released all 150 pallets'}],'2026-10-20',20,'Released'),
    S('XS-0424','Qimma Beverages','Water 330ml, retail units','SKU QB-W330','W-04','2026-10-05',[{date:'2026-10-05',qty:18000,note:'Received 18,000 units'},{date:'2026-10-21',qty:-6000,note:'Released 6,000 units'}],'2026-11-10',25,'In storage')
  ];
  const st={v:1,vendors,bookings,warehouses,stock,invoices:[],seq:{tb:24,xs:425,inv:1,v1:104,v2:204,w:6}};
  /* one past invoice so the history is not empty: Al Waha Foods, September, paid */
  const inv=generate(st,'Al Waha Foods','2026-09',null,'2026-10-01'); inv.status='Paid'; inv.paidDate='2026-10-22';
  return st;
}

/* ---------- store ---------- */
function get(){try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&s.v===1)return s}catch(e){} const s=seed();save(s);return s}
function save(s){localStorage.setItem(KEY,JSON.stringify(s));return s}
function reset(){localStorage.removeItem(KEY)}

/* ---------- billable charges ---------- */
const vendorOf=(s,id)=>s.vendors.find(v=>v.id===id);
const whOf=(s,id)=>s.warehouses.find(w=>w.id===id);
function bookingPrice(b){return price(b.cost,b.markupType,b.markupVal)}
/* every customer charge as one line. key is unique: TR:<booking> or ST:<stock>:<month> */
function charges(s,f={}){
  const out=[];
  for(const b of s.bookings){
    const m=monthOf(b.date); if(f.month&&f.month!==m) continue; if(f.customer&&f.customer!==b.customer) continue;
    const p=bookingPrice(b), v=vendorOf(s,b.vendorId);
    out.push({key:'TR:'+b.id,kind:'transport',ref:b.id,customer:b.customer,month:m,date:b.date,desc:`${b.pickup} → ${b.destination} · ${b.vehicleType}${b.qty>1?' ×'+b.qty:''}`,descAr:`نقل ${b.pickup} ← ${b.destination}`,vendor:v?v.name:'',cost:p.cost,markup:p.markup,charge:p.charge,
      status:b.status==='Cancelled'&&b.inv.status==='Unbilled'?'Excluded':b.inv.status,invoiceNo:b.inv.no,vendorPaid:b.vendorPay.status==='Paid',vendorPay:b.vendorPay.status});
  }
  const months=f.month?[f.month]:[...new Set(s.stock.flatMap(r=>{const a=[];for(let m=monthOf(r.start);m<=monthOf(ASSUME.demoDate);m=monthOf(addDays(monthRange(m).to,1)))a.push(m);return a}))];
  for(const r of s.stock){ if(f.customer&&f.customer!==r.customer) continue; const w=whOf(s,r.whId);
    for(const m of months){ const {from,to}=monthRange(m); const c=storageFor(r,w,from,to); if(!c.days) continue;
      const b=r.billed[m]; out.push({key:'ST:'+r.id+':'+m,kind:'storage',ref:r.id,customer:r.customer,month:m,date:to,desc:`${r.goods} · ${w.name} · ${c.qtyDays.toLocaleString('en-US')} ${r.unit.replace(/s$/,'')}-days over ${c.days} days${c.upto<to?' (to '+c.upto+')':''}`,descAr:`تخزين ${r.goods} · ${w.name}`,vendor:w.name,
        qtyDays:c.qtyDays,cost:b?b.cost:c.base,markup:b?b.markup:c.markup,charge:b?b.charge:c.charge,days:c.days,status:b?'Invoiced':(r.excluded[m]?'Excluded':'Unbilled'),invoiceNo:b?b.no:null,vendorPaid:false,vendorPay:'Accrued'}); } }
  return out;
}
function isInvoiced(s,key){return s.invoices.some(i=>i.lines.some(l=>l.key===key))}
/* generate a monthly customer invoice from every Unbilled charge. Already-invoiced or excluded charges are skipped. */
function generate(s,customer,month,onlyKeys,date){
  const lines=charges(s,{customer,month}).filter(l=>l.status==='Unbilled'&&!isInvoiced(s,l.key)&&(!onlyKeys||onlyKeys.includes(l.key)));
  if(!lines.length) return null;
  const no='TPI-'+month.replace('-','').slice(2)+'-'+String(s.seq.inv++).padStart(3,'0');
  const sub=n2(lines.reduce((a,l)=>a+l.charge,0)), vat=n2(sub*ASSUME.vatPct/100);
  const inv={no,customer,month,date:date||ASSUME.demoDate,status:'Generated',lines:lines.map(l=>({key:l.key,kind:l.kind,ref:l.ref,desc:l.desc,cost:l.cost,markup:l.markup,charge:l.charge})),subtotal:sub,vat,total:n2(sub+vat),cost:n2(lines.reduce((a,l)=>a+l.cost,0))};
  for(const l of lines){
    if(l.kind==='transport'){const b=s.bookings.find(x=>x.id===l.ref);b.inv={status:'Invoiced',no}}
    else {const r=s.stock.find(x=>x.id===l.ref);r.billed[l.key.split(':')[2]]={no,cost:l.cost,markup:l.markup,charge:l.charge}}
  }
  s.invoices.unshift(inv); return inv;
}
const CUSTOMERS=['Al Waha Foods','Najd Pharma Distribution','Qimma Beverages','Rawabi Electronics','Sahara Home Retail','Tamr Dates Co.','Masar Building Materials','Gulf Cement Trading'];
const CITIES=['Riyadh','Jeddah','Dammam','Mecca','Medina','Jubail','Sudair','Buraydah','Khobar','Tabuk'];
const VEHICLES=['Reefer trailer 40ft','Reefer truck 10t','Curtain-side 13.6m','Flatbed 12m','Box truck 7t','Pickup 1.5t'];
const MONTHS=[['2026-10','October 2026','أكتوبر 2026'],['2026-09','September 2026','سبتمبر 2026']];

/* status labels, EN / AR */
const L={Unbilled:'غير مفوتر',Invoiced:'مفوتر',Excluded:'مستبعد',Paid:'مدفوع',Unpaid:'غير مدفوع','On statement':'على كشف الحساب',Accrued:'مستحق',Confirmed:'مؤكد','In transit':'في الطريق',Delivered:'تم التسليم',Cancelled:'ملغى',Draft:'مسودة',Generated:'صادرة',Overdue:'متأخرة',Active:'نشط',Inactive:'غير نشط',Expired:'منتهي','In storage':'في المخزن',Released:'تم الإفراج',contract:'عقد شهري',spot:'استئجار فوري'};
const PILL={Unbilled:'p-warn',Invoiced:'p-ok',Excluded:'p-mute',Paid:'p-ok',Unpaid:'p-bad','On statement':'p-info',Accrued:'p-info',Confirmed:'p-info','In transit':'p-warn',Delivered:'p-ok',Cancelled:'p-mute',Draft:'p-mute',Generated:'p-info',Overdue:'p-bad',Active:'p-ok',Inactive:'p-mute',Expired:'p-mute','In storage':'p-info',Released:'p-mute'};
const lab=k=>window.isAr&&isAr()&&L[k]?L[k]:k;
const pill=k=>`<span class="pill ${PILL[k]||'p-mute'}">${lab(k)}</span>`;
const esc=v=>String(v??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

window.TPL={ASSUME,KEY,get,save,reset,price,storageFor,qtyOn,charges,generate,isInvoiced,bookingPrice,vendorOf,whOf,monthOf,monthRange,addDays,fmt,n2,RATE_LABEL,UNIT_FOR,CUSTOMERS,CITIES,VEHICLES,MONTHS,lab,pill,esc};
})();
