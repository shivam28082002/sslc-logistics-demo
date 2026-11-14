/* Prime Operations — Load board (driver marketplace). Shared by load-board.html (Prime staff) and loads-driver.html (driver app).
   Demo only: loads, offers and drivers are sample data kept in this browser (localStorage). No calls or messages are placed,
   no money moves. Accepting an offer creates a hired-truck booking in Third-party logistics (prime-tpl-v1). */
(function(){
const KEY='prime-loads-v1';

/* approximate road distances in km between the demo cities */
const KM={'Dammam|Riyadh':400,'Dammam|Jubail':95,'Dammam|Khobar':20,'Riyadh|Jeddah':950,'Jeddah|Mecca':80,'Riyadh|Buraydah':330,'Khobar|Riyadh':415,
  'Dammam|Hafr Al Batin':460,'Jubail|Riyadh':480,'Jeddah|Medina':420,'Riyadh|Sudair':160,'Dammam|Jeddah':1330,'Jubail|Khobar':100,'Mecca|Riyadh':870,
  'Buraydah|Dammam':640,'Hafr Al Batin|Riyadh':490,'Jeddah|Tabuk':1020,'Riyadh|Tabuk':1290,'Dammam|Mecca':1250,'Medina|Riyadh':850,'Dammam|Sudair':500,
  'Buraydah|Jeddah':1000,'Jubail|Jeddah':1400,'Jeddah|Khobar':1350,'Khobar|Mecca':1270,'Buraydah|Jubail':690,'Buraydah|Khobar':660,'Hafr Al Batin|Jubail':370,
  'Hafr Al Batin|Khobar':470,'Jubail|Mecca':1330,'Mecca|Medina':440,'Dammam|Medina':1240,'Jubail|Medina':1260,'Khobar|Medina':1250};
function km(a,b){if(a===b)return 8;return KM[a+'|'+b]||KM[b+'|'+a]||null}

const CITY_AR={Riyadh:'الرياض',Jeddah:'جدة',Dammam:'الدمام',Mecca:'مكة',Medina:'المدينة',Jubail:'الجبيل',Sudair:'سدير',Buraydah:'بريدة',Khobar:'الخبر',Tabuk:'تبوك','Hafr Al Batin':'حفر الباطن'};
const CITY_UR={Riyadh:'ریاض',Jeddah:'جدہ',Dammam:'دمام',Mecca:'مکہ',Medina:'مدینہ',Jubail:'جبیل',Sudair:'سدیر',Buraydah:'بریدہ',Khobar:'خبر',Tabuk:'تبوک','Hafr Al Batin':'حفر الباطن'};
const REGION={Riyadh:['Riyadh','الرياض','ریاض'],Sudair:['Riyadh','الرياض','ریاض'],Jeddah:['Makkah','مكة المكرمة','مکہ'],Mecca:['Makkah','مكة المكرمة','مکہ'],Medina:['Madinah','المدينة المنورة','مدینہ'],
  Dammam:['Eastern','الشرقية','مشرقی'],Jubail:['Eastern','الشرقية','مشرقی'],Khobar:['Eastern','الشرقية','مشرقی'],'Hafr Al Batin':['Eastern','الشرقية','مشرقی'],Buraydah:['Qassim','القصيم','قصیم'],Tabuk:['Tabuk','تبوك','تبوک']};
const TRUCK={'Flatbed 12m':['سطحة 12م','فلیٹ بیڈ 12 میٹر'],'Curtain-side 13.6m':['ستارة 13.6م','پردے والا ٹرالر 13.6م'],'Reefer trailer 40ft':['تريلا مبردة 40 قدم','ریفر ٹرالر 40 فٹ'],
  'Reefer truck 10t':['شاحنة مبردة 10 طن','ریفر ٹرک 10 ٹن'],'Box truck 7t':['شاحنة صندوق 7 طن','باکس ٹرک 7 ٹن'],'Dyna 4t':['دينا 4 طن','ڈائنا 4 ٹن'],'Pickup 1.5t':['بيك أب 1.5 طن','پک اپ 1.5 ٹن']};
const TRUCKS=Object.keys(TRUCK);

/* sample driver pool used for "drivers notified" counts: [truck, city, count] */
const POOL=[['Flatbed 12m','Dammam',41],['Flatbed 12m','Riyadh',57],['Flatbed 12m','Jubail',18],['Flatbed 12m','Khobar',12],['Curtain-side 13.6m','Riyadh',36],['Curtain-side 13.6m','Dammam',29],
  ['Reefer trailer 40ft','Riyadh',22],['Reefer trailer 40ft','Jeddah',19],['Reefer truck 10t','Jeddah',26],['Reefer truck 10t','Riyadh',24],['Box truck 7t','Jeddah',33],['Box truck 7t','Dammam',21],
  ['Box truck 7t','Riyadh',38],['Dyna 4t','Riyadh',64],['Dyna 4t','Jeddah',52],['Dyna 4t','Dammam',40],['Pickup 1.5t','Riyadh',70],['Curtain-side 13.6m','Buraydah',9],['Reefer truck 10t','Mecca',8]];
function reach(truck,city){return POOL.filter(p=>p[0]===truck&&(km(p[1],city)||9999)<=200).reduce((a,p)=>a+p[2],0)}

/* marketplace drivers who are not yet Prime vendors */
const DRIVERS={
  'D-01':{name:'Imran Shaikh',phone:'+966 57 884 2093',truck:'Flatbed 12m',plate:'DMM 3307',city:'Dammam',rating:4.8,trips:126,vendorId:'V-202',verified:true},
  'D-02':{name:'Saeed Al-Harbi',phone:'+966 56 301 4479',truck:'Reefer truck 10t',plate:'RJD 4821',city:'Riyadh',rating:4.9,trips:203,vendorId:'V-201',verified:true},
  'D-03':{name:'Waleed Al-Shehri',phone:'+966 55 318 6640',truck:'Reefer trailer 40ft',plate:'RYD 5530',city:'Riyadh',rating:4.6,trips:71,verified:true},
  'D-04':{name:'Hamza Qureshi',phone:'+966 59 207 4418',truck:'Reefer truck 10t',plate:'JED 6602',city:'Jeddah',rating:4.7,trips:94,verified:true},
  'D-05':{name:'Mansour Al-Anazi',phone:'+966 53 772 0915',truck:'Curtain-side 13.6m',plate:'RYD 8814',city:'Riyadh',rating:4.4,trips:38,verified:false},
  'D-06':{name:'Asif Mehmood',phone:'+966 50 664 1283',truck:'Flatbed 12m',plate:'DMM 4410',city:'Khobar',rating:4.5,trips:57,verified:true},
  'D-07':{name:'Nawaf Al-Otaibi',phone:'+966 53 619 2250',truck:'Box truck 7t',plate:'JED 9174',city:'Jeddah',rating:4.8,trips:148,vendorId:'V-203',verified:true}
};
const ME='D-01'; /* the driver signed in on the demo phone */

function seed(){
  const L=(id,by,customer,from,fromArea,to,toArea,truck,cargo,weight,date,ago,budget,status,desc,extra={})=>({id,by,customer,from,fromArea,to,toArea,truck,cargo,weight,date,ago,budget,status,desc,offers:[],views:0,...extra});
  const loads=[
    L('LD-1047','prime','Masar Building Materials','Dammam','2nd Industrial City','Riyadh','Al Masani','Flatbed 12m','Steel rebar bundles',22,'2026-10-28 18:00',12,null,'Open',
      {en:'Steel rebar, 22 t, strapped bundles. Loading at our yard with forklift. Our own flatbeds are busy today.',ar:'حديد تسليح 22 طن، حزم مربوطة. التحميل في ساحتنا بالرافعة الشوكية. شاحناتنا المسطحة مشغولة اليوم.',ur:'سریا 22 ٹن، بندھے ہوئے بنڈل۔ لوڈنگ ہمارے یارڈ میں فورک لفٹ سے۔ آج ہمارے اپنے فلیٹ بیڈ مصروف ہیں۔'}),
    L('LD-1046','prime','Gulf Cement Trading','Khobar','Al Thuqbah','Riyadh','Al Sulay','Flatbed 12m','Cement bags on pallets',24,'2026-10-29 07:00',45,1300,'Open',
      {en:'24 t cement bags, 20 pallets. Tarpaulin required. Unloading by customer crane.',ar:'أكياس أسمنت 24 طن، 20 منصة. يلزم شادر. التنزيل برافعة العميل.',ur:'24 ٹن سیمنٹ کے تھیلے، 20 پیلیٹ۔ ترپال ضروری۔ اتارنا کسٹمر کی کرین سے۔'},{offers:[{driver:'D-06',price:1250,note:{en:'Available tomorrow 6 AM, I am in Khobar.',ar:'متاح غداً 6 صباحاً، أنا في الخبر.',ur:'کل صبح 6 بجے دستیاب، میں خبر میں ہوں۔'},at:'38 min ago',status:'Pending'}]}),
    L('LD-1045','prime','Al Waha Foods','Riyadh','2nd Industrial City','Jeddah','Al Khumra','Reefer trailer 40ft','Frozen poultry, −18°C',16,'2026-10-28 22:00',95,null,'Open',
      {en:'16 pallets frozen poultry at −18°C. Data logger provided. Delivery to Al Khumra DC before 2 PM.',ar:'16 منصة دواجن مجمدة عند −18°م. يتوفر مسجل حرارة. التسليم لمركز الخمرة قبل 2 ظهراً.',ur:'16 پیلیٹ منجمد مرغی −18°C پر۔ ڈیٹا لاگر دیا جائے گا۔ الخمرہ ڈی سی پر دوپہر 2 بجے سے پہلے ڈیلیوری۔'},
      {offers:[{driver:'D-03',price:2950,note:{en:'Reefer pre-cooled, can load tonight 10 PM.',ar:'التبريد جاهز، أستطيع التحميل الليلة 10 مساءً.',ur:'ریفر پہلے سے ٹھنڈا، آج رات 10 بجے لوڈ کر سکتا ہوں۔'},at:'1 h ago',status:'Pending'},{driver:'D-02',price:3100,note:{en:'Can do with my 10 t reefer, 2 trips not needed, fits 16 pallets.',ar:'أستطيع بشاحنتي المبردة، تتسع 16 منصة.',ur:'اپنے ریفر ٹرک سے کر سکتا ہوں، 16 پیلیٹ آ جائیں گے۔'},at:'52 min ago',status:'Pending'}]}),
    L('LD-1044','prime','Najd Pharma Distribution','Jeddah','Al Khumra','Mecca','Al Kakiyah','Reefer truck 10t','Vaccines, 2–8°C',3,'2026-10-29 09:00',130,900,'Open',
      {en:'6 pallets vaccines at 2–8°C. GDP-trained driver preferred. Short city run.',ar:'6 منصات لقاحات عند 2–8°م. يفضل سائق مدرب على ممارسات التوزيع الجيد.',ur:'6 پیلیٹ ویکسین 2–8°C پر۔ GDP تربیت یافتہ ڈرائیور کو ترجیح۔'},{offers:[{driver:'D-04',price:850,note:{en:'GDP certificate available, reefer validated last month.',ar:'لدي شهادة GDP، تم اعتماد التبريد الشهر الماضي.',ur:'GDP سرٹیفکیٹ موجود ہے، ریفر پچھلے مہینے ویلیڈیٹ ہوا۔'},at:'2 h ago',status:'Pending'}]}),
    L('LD-1043','prime','Qimma Beverages','Riyadh','Al Sulay','Buraydah','Industrial City 1','Curtain-side 13.6m','Bottled water',26,'2026-10-29 05:00',210,1400,'Open',
      {en:'26 pallets bottled water. Loading from 5 AM, two loading bays.',ar:'26 منصة مياه معبأة. التحميل من 5 صباحاً.',ur:'26 پیلیٹ بوتل بند پانی۔ صبح 5 بجے سے لوڈنگ۔'},{offers:[{driver:'D-05',price:1350,note:{en:'Ready in Riyadh, curtain-side 13.6 m.',ar:'جاهز في الرياض، ستارة 13.6م.',ur:'ریاض میں تیار ہوں، پردے والا ٹرالر۔'},at:'3 h ago',status:'Pending'}]}),
    L('LD-1042','prime','Sahara Home Retail','Dammam','2nd Industrial City','Jubail','Industrial City','Box truck 7t','Flat-pack furniture',4,'2026-10-29 10:00',300,600,'Open',
      {en:'10 pallets flat-pack furniture to a new store. Tail-lift preferred.',ar:'10 منصات أثاث مفكك لمعرض جديد. يفضل رافعة خلفية.',ur:'10 پیلیٹ فلیٹ پیک فرنیچر نئے اسٹور کے لیے۔ ٹیل لفٹ بہتر ہے۔'}),
    L('LD-1039','prime','Rawabi Electronics','Jeddah','Al Khumra','Mecca','Al Kakiyah','Box truck 7t','LED TVs',5,'2026-10-23 08:00',7200,null,'Assigned',
      {en:'8 pallets TVs, fragile.',ar:'8 منصات تلفزيونات، قابلة للكسر.',ur:'8 پیلیٹ ٹی وی، نازک سامان۔'},{offers:[{driver:'D-07',price:950,note:{en:'',ar:'',ur:''},at:'23 Oct',status:'Accepted'}],booking:'TB-2610-019'}),
    /* other shippers on the open marketplace (visible to drivers only) */
    L('MK-5521','other','Al Dossary Trading Est.','Dammam','1st Industrial City','Hafr Al Batin','Industrial Area','Flatbed 12m','Concrete blocks',25,'2026-10-29 06:00',25,null,'Open',
      {en:'Concrete blocks, 25 t. Call or WhatsApp.',ar:'بلك خرساني 25 طن. اتصل أو واتساب.',ur:'کنکریٹ بلاک 25 ٹن۔ کال یا واٹس ایپ کریں۔'},{owner:'Al Dossary Trading Est.',ownerPhone:'+966 50 118 2274'}),
    L('MK-5518','other','Eastern Pipes Est.','Jubail','2nd Industrial City','Riyadh','Al Masani','Flatbed 12m','Steel pipes 12 m',20,'2026-10-29 14:00',80,1450,'Open',
      {en:'Steel pipes 12 m, 20 t. Need straps and chains.',ar:'أنابيب حديد 12م، 20 طن. يلزم أحزمة وسلاسل.',ur:'اسٹیل پائپ 12 میٹر، 20 ٹن۔ پٹے اور زنجیریں چاہئیں۔'},{owner:'Eastern Pipes Est.',ownerPhone:'+966 55 902 3318'}),
    L('MK-5509','other','Najm Al Riyadh Cargo','Riyadh','Al Sulay','Dammam','2nd Industrial City','Flatbed 12m','Empty steel pallets (return load)',8,'2026-10-30 08:00',160,800,'Open',
      {en:'Return load to Dammam: empty steel pallets, 8 t. Flexible loading time.',ar:'حمولة عودة إلى الدمام: منصات حديد فارغة 8 طن. وقت تحميل مرن.',ur:'دمام واپسی کا لوڈ: خالی اسٹیل پیلیٹ 8 ٹن۔ لوڈنگ کا وقت لچکدار۔'},{owner:'Najm Al Riyadh Cargo',ownerPhone:'+966 53 448 1170',ret:true}),
    L('MK-5502','other','Hijaz Paper Co.','Jeddah','Industrial City 3','Medina','Industrial City','Curtain-side 13.6m','Paper rolls',22,'2026-10-29 16:00',240,null,'Open',
      {en:'Paper rolls, 22 t, keep dry.',ar:'لفائف ورق 22 طن، يحفظ جافاً.',ur:'کاغذ کے رول 22 ٹن، خشک رکھیں۔'},{owner:'Hijaz Paper Co.',ownerPhone:'+966 56 771 9024'})
  ];
  return {v:1,loads,seq:1048,driver:{signedIn:false,lang:null,truck:null,notify:null,offers:{}},log:[]};
}
function get(){let s=null;try{s=JSON.parse(localStorage.getItem(KEY))}catch(e){}if(!s||s.v!==1){s=seed();save(s)}return s}
function save(s){localStorage.setItem(KEY,JSON.stringify(s));return s}
function reset(){localStorage.removeItem(KEY)}

/* driver sends an offer (or updates his pending one) */
function offer(s,loadId,driverId,price,note){const l=s.loads.find(x=>x.id===loadId);if(!l||l.status!=='Open')return null;
  let o=l.offers.find(x=>x.driver===driverId&&x.status==='Pending');
  if(o){o.price=price;o.note={en:note,ar:note,ur:note};o.at='Just now'}else{o={driver:driverId,price,note:{en:note,ar:note,ur:note},at:'Just now',status:'Pending'};l.offers.unshift(o)}
  save(s);return o}

/* Prime accepts an offer: load becomes Assigned, other offers are declined, and a hired-truck booking is created in Third-party logistics */
function accept(s,loadId,driverId){const l=s.loads.find(x=>x.id===loadId);if(!l||l.status!=='Open')return null;
  const o=l.offers.find(x=>x.driver===driverId&&x.status==='Pending');if(!o)return null;
  const d=DRIVERS[driverId],T=window.TPL;let bookingId=null;
  if(T){const S=T.get();let v=S.vendors.find(x=>x.id===d.vendorId)||S.vendors.find(x=>x.phone===d.phone);
    if(!v){v={id:'V-'+S.seq.v2++,type:'spot',name:d.name,phone:d.phone,plate:d.plate,vehicle:d.truck,capacity:'',city:d.city,country:'Saudi Arabia',tripCost:o.price,payMethod:'Cash',status:'Active',source:'Load board'};S.vendors.push(v);d.vendorId=v.id}
    const date=l.date.slice(0,10),ym=date.slice(2,7).replace('-','');bookingId='TB-'+ym+'-'+String(S.seq.tb++).padStart(3,'0');
    S.bookings.push({id:bookingId,date,customer:l.customer,shipment:`${l.id} · ${l.cargo}, ${l.weight} t`,pickup:`${l.from}, ${l.fromArea}`,destination:`${l.to}, ${l.toArea}`,vehicleType:l.truck,qty:1,vendorId:v.id,vehicle:d.plate,cost:o.price,markupType:'pct',markupVal:T.ASSUME.transportMarkupPct,status:'Confirmed',vendorPay:{status:'Unpaid',method:'',amount:0,date:'',ref:''},inv:{status:'Unbilled',no:null},source:'Load board'});
    T.save(S)}
  l.offers.forEach(x=>{if(x!==o&&x.status==='Pending')x.status='Declined'});o.status='Accepted';l.status='Assigned';l.booking=bookingId;save(s);return bookingId}

function post(s,f){const id='LD-'+s.seq++;const l={id,by:'prime',customer:f.customer,from:f.from,fromArea:f.fromArea,to:f.to,toArea:f.toArea,truck:f.truck,cargo:f.cargo,weight:+f.weight,date:f.date,ago:0,budget:f.budget?+f.budget:null,status:'Open',
  desc:{en:f.desc,ar:f.desc,ur:f.desc},offers:[],views:0};s.loads.unshift(l);save(s);return l}
function cancel(s,id){const l=s.loads.find(x=>x.id===id);if(l&&l.status==='Open'){l.status='Cancelled';l.offers.forEach(o=>{if(o.status==='Pending')o.status='Declined'})}save(s)}

function ago(min,lang){const L=lang||'en';
  const T={en:['Just now','min ago','h ago','days ago'],ar:['الآن','دقيقة','ساعة','أيام'],ur:['ابھی','منٹ پہلے','گھنٹے پہلے','دن پہلے']}[L];
  if(min<1)return T[0];if(min<60)return L==='ar'?`منذ ${min} ${T[1]}`:`${min} ${T[1]}`;if(min<1440){const h=Math.round(min/60);return L==='ar'?`منذ ${h} ${T[2]}`:`${h} ${T[2]}`}
  const d=Math.round(min/1440);return L==='ar'?`منذ ${d} ${T[3]}`:`${d} ${T[3]}`}

window.LOADS={KEY,get,save,reset,offer,accept,post,cancel,km,reach,ago,CITY_AR,CITY_UR,REGION,TRUCK,TRUCKS,DRIVERS,ME,POOL};
})();
