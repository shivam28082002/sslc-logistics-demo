// Content taken from myvisaservice.com (Oct 2026). Lorem ipsum and template filler on the live site were replaced with copy drawn from the site's own FAQ and About text.
window.MVS = {
  phone: '+91-8800145551', tel: '+918800145551',
  email: 'enquiry@myvisaservice.com',
  address: '303, Gurudwara Rd, Block 47, Beadonpura, Karol Bagh, New Delhi',
  social: { facebook: 'https://www.facebook.com/myvisaserviceofficial/', x: 'https://x.com/myvisaservice1', pinterest: 'https://www.pinterest.com/myvisaservice' },

  countries: [
    ['germany','Germany','6838c3f5422921748550645.jpg'],
    ['united-kingdom','United Kingdom','6838c411269f21748550673.jpg'],
    ['france','France','6838c429ecd531748550697.png'],
    ['italy','Italy','6838c4493a49a1748550729.png'],
    ['spain','Spain','6838c4b6301e31748550838.jpg'],
    ['sweden','Sweden','6838c475f2d1e1748550773.png'],
    ['saudi-arabia','Saudi Arabia','6838c499ce3921748550809.jpg'],
    ['dubai','Dubai','6838c4def40cb1748550878.png'],
    ['qatar','Qatar','6838c4fdc0d3e1748550909.jpg'],
    ['austria','Austria','6838c529090461748550953.png'],
    ['switzerland','Switzerland','6838c547d34e01748550983.jpg'],
    ['finland','Finland','6838c5778733b1748551031.png'],
    ['iceland','Iceland','6838c5a287ad01748551074.png'],
    ['india','India','image-40b88086-6b69-4341-b9f6-e8b2171fee21.jpg'],
    ['usa','USA','image-6f59bbc6-0770-44b2-a801-18219aeca997.png'],
    ['canada','Canada','image-a6afacc5-dc48-4b5d-96f9-64d3d9f6651e.png']
  ].map(([id, name, img]) => ({ id, name, img: 'assets/img/country/' + img })),

  // Visa packages as listed on the live site. Fees in INR, processing time 48 hours for all.
  packages: [
    { id: 1, entry: 'single', title: 'Transit Visa', stay: 'Maximum 96 hours stay', fee: 135, rec: true },
    { id: 2, entry: 'single', title: 'Single Entry Visa', stay: 'Maximum 14 days stay', fee: 165, rec: true },
    { id: 3, entry: 'single', title: 'Single Entry Visa', stay: '30 days stay', fee: 180 },
    { id: 9, entry: 'single', title: 'Single Entry Visa', stay: 'Maximum 15 days stay', fee: 1500, rec: true },
    { id: 4, entry: 'single', title: 'Single Entry Visa', stay: 'Maximum 60 days stay', fee: 475 },
    { id: 5, entry: 'multiple', title: 'Multiple Entry Visa', stay: '30 days stay', fee: 475 },
    { id: 6, entry: 'multiple', title: 'Multiple Entry Visa', stay: 'Maximum 60 days stay', fee: 800, rec: true },
    { id: 7, entry: 'multiple', title: 'Multiple Entry Visa', stay: 'Maximum 90 days stay', fee: 1200 }
  ],

  services: [
    ['plane', 'Tourist visa', 'Help with leisure and holiday visa applications, from the document checklist to submission.'],
    ['brief', 'Business visa', 'Support for travellers attending meetings, conferences and corporate events abroad.'],
    ['cap', 'Student visa', 'Guidance for students going abroad to study, including document support.'],
    ['id', 'Work and employment visa', 'Help with work permit and employment visa applications.'],
    ['family', 'Family and visitor visa', 'Visas for visiting family members or relatives overseas.'],
    ['chat', 'Visa consultation', 'Advice on eligibility, country-specific requirements and how to apply.'],
    ['doc', 'Document review and verification', 'A careful check of every required document to avoid errors.'],
    ['send', 'Application processing', 'Preparation, completion and submission of your visa application.'],
    ['cal', 'Appointment scheduling', 'Booking embassy, consulate or visa application centre appointments.'],
    ['track', 'Visa status tracking', 'Regular updates on your application until a decision is made.'],
    ['passport', 'Travel documentation', 'Support with passport requirements and other travel documents.'],
    ['support', 'Customer support', 'Personal guidance from the first consultation to the final decision.']
  ],

  testimonials: [
    { name: 'Swati Arora', kind: 'Visa application', img: '6838bfb4229ba1748549556.jpg', text: 'From the initial consultation to the final submission, My Visa Service exceeded my expectations. The staff was courteous, knowledgeable, and always available to answer my queries. Their personalized assistance made the entire visa application process smooth and convenient. I would definitely use their services again.' },
    { name: 'Mitanshi Pal', kind: 'Family visit visa', img: '6838c1028d16f1748549890.jpg', text: 'My Visa Service made our family visit visa application simple and organized. Their team ensured all our documents were in order and provided regular updates until the application was completed. I truly appreciate their professionalism and excellent customer support.' },
    { name: 'Preeti Singh', kind: 'Student visa', img: '6838c188d43071748550024.jpg', text: 'Applying for a student visa felt overwhelming until I contacted My Visa Service. They explained every requirement clearly, reviewed my documents thoroughly, and answered all my questions promptly. Their guidance gave me confidence throughout the process. Highly recommended!' },
    { name: 'Mohit Sharma', kind: 'Business visa', img: '6838c1d6db2a41748550102.jpg', text: 'The team at My Visa Service was knowledgeable, responsive, and extremely professional. They helped me obtain my business visa with complete transparency and timely support. Their attention to detail made the application process stress-free. Thank you for the outstanding service!' },
    { name: 'Aman Mathur', kind: 'Tourist visa', img: '6838c22f3f39d1748550191.jpg', text: 'I had an excellent experience with My Visa Service. Their team guided me through every step of my tourist visa application, reviewed all my documents carefully, and kept me updated throughout the process. The entire process was smooth and hassle-free. I highly recommend their professional services.' }
  ],

  posts: [
    { id: 5, slug: 'first-international-visa-application', title: 'How to Prepare for Your First International Visa Application', img: 'assets/img/blog/6839a997ed6521748609431.jpg', mins: 2,
      body: [
        "Planning your first international trip is exciting, but applying for a visa can seem overwhelming if you're unfamiliar with the process. Understanding the requirements and preparing your documents in advance can make the experience much smoother.",
        "The first step is to identify the correct visa category based on the purpose of your travel, whether it's tourism, business, education, employment, or visiting family. Each country has its own eligibility criteria and documentation requirements, so it's important to review them carefully before applying.",
        "Next, gather all the necessary documents, including a valid passport, recent passport-sized photographs, financial statements, travel itinerary, accommodation details, and any additional documents requested by the destination country's embassy or consulate. Ensure that all information provided in your application is accurate and consistent with your supporting documents.",
        "Submitting your application well before your planned travel date is also recommended, as visa processing times vary depending on the destination and the type of visa. Applying early gives you enough time to respond if additional documents or information are requested."
      ] },
    { id: 52, slug: 'why-choose-my-visa-service', title: 'Why Choose My Visa Service for Your Travel Plans?', img: 'assets/img/blog/6838c78aa59b11748551562.jpg', mins: 1,
      body: [
        "Whether you're traveling for tourism, business, education, work, or to visit family, choosing the right visa consultant can simplify your journey. My Visa Service offers personalized guidance, document verification, application assistance, appointment scheduling, and dedicated customer support throughout the process.",
        "With a commitment to accuracy, transparency, and customer satisfaction, My Visa Service helps travelers complete their visa applications with confidence and peace of mind."
      ] },
    { id: 53, slug: 'documents-before-applying', title: 'Documents You Need Before Applying for a Visa', img: 'assets/img/blog/6838c7b35f37a1748551603.jpg', mins: 1,
      body: [
        "Every country has different visa requirements, but most applications require a valid passport, passport-sized photographs, a completed application form, travel itinerary, accommodation details, financial statements, and supporting documents based on the visa category.",
        "Preparing these documents in advance helps speed up the application process. A professional document review ensures everything is complete before submission."
      ] }
  ],

  faqs: [
    ['What services does My Visa Service provide?',
     `<p>End-to-end visa and travel documentation help for individuals, families, students and businesses:</p><ul>
      <li><strong>Tourist visas</strong>: leisure and holiday travel applications.</li>
      <li><strong>Business visas</strong>: meetings, conferences and corporate events.</li>
      <li><strong>Student visas</strong>: study abroad applications, including document support.</li>
      <li><strong>Work and employment visas</strong>: work permit and employment visa applications.</li>
      <li><strong>Family and visitor visas</strong>: visiting family members or relatives overseas.</li>
      <li><strong>Visa consultation</strong>: eligibility, country requirements and procedures.</li>
      <li><strong>Document review and verification</strong> to minimise errors.</li>
      <li><strong>Application processing</strong>: preparation, completion and submission.</li>
      <li><strong>Appointment scheduling</strong> at embassies, consulates and visa centres.</li>
      <li><strong>Visa status tracking</strong> with regular updates.</li>
      <li><strong>Travel documentation</strong>: passport requirements and other documents.</li>
      <li><strong>Customer support</strong> from first consultation to final decision.</li></ul>`],
    ['Which countries do you support visa applications for?',
     `<p>Supported destinations include the United States, Canada, United Kingdom, Australia, New Zealand, France, Germany, Italy, Spain, Switzerland, Denmark, Cyprus, Belarus, Kenya, Brunei, Singapore, United Arab Emirates, Japan and South Korea.</p><p>We also provide visa processing and consultation for virtually all other countries, for tourist, business, student, work and visitor visas.</p>`],
    ['How do I get started?',
     `<ol><li><strong>Choose your destination and visa type</strong>: tourist, business, student, work or visitor.</li>
      <li><strong>Contact us</strong> to discuss your travel plans, eligibility and documents.</li>
      <li><strong>Receive a document checklist</strong> for your destination.</li>
      <li><strong>Submit your documents</strong> for verification and review.</li>
      <li><strong>Application preparation and submission</strong>, including appointments where required.</li>
      <li><strong>Track your application</strong> with updates until a decision is made.</li></ol>
      <p>Call <a href="tel:+918800145551">+91-8800145551</a> or email <a href="mailto:enquiry@myvisaservice.com">enquiry@myvisaservice.com</a>.</p>`],
    ['What are your service charges?',
     `<p>Charges depend on the destination country, visa category, processing time, and embassy or consulate fees, so there is no single price list for every visa. Your total cost may include:</p><ul>
      <li>Visa consultation (if applicable)</li><li>Professional service or processing fee</li><li>Embassy or consulate visa fee</li>
      <li>Visa application centre charges (where applicable)</li><li>Courier or document handling charges (if required)</li><li>Optional express or urgent processing fees</li></ul>`],
    ['How long does the visa process take?',
     `<p>Processing time depends on the country, the visa category, how complete your application is, and the embassy's workload. Typical timelines:</p><ul>
      <li><strong>E-visas</strong>: often 24 to 72 hours.</li>
      <li><strong>Tourist and business visas</strong>: usually 5 to 15 working days.</li>
      <li><strong>Student and work visas</strong>: generally 2 to 8 weeks or more.</li>
      <li><strong>Immigration or long-term visas</strong>: several weeks to a few months.</li></ul>`],
    ['Do you assist with visa interview preparation?',
     `<p>Yes. For countries where a personal interview is part of the process, we help you prepare:</p><ul>
      <li>What to expect in the visa interview</li><li>Commonly asked questions</li><li>Presenting your travel purpose clearly and confidently</li>
      <li>Reviewing your supporting documents before the interview</li><li>Country-specific requirements and interview guidelines</li>
      <li>Making sure your application matches your interview answers</li></ul>`],
    ['Can My Visa Service guarantee a visa approval?',
     `<p>No. Approval is solely at the discretion of the embassy, consulate or immigration authority, and no legitimate consultancy can guarantee a visa. What we do:</p><ul>
      <li>Guide you to the right visa category</li><li>Review and verify your documents for accuracy and completeness</li><li>Prepare and submit your application</li>
      <li>Help with appointments and application tracking</li><li>Support you throughout to minimise errors and delays</li></ul>
      <p>Be cautious of anyone promising a "100% guaranteed visa".</p>`],
    ['What if my visa gets rejected?',
     `<p>We help you understand the reason for the refusal and plan the next step:</p><ul>
      <li>Review the refusal letter to find the reason</li><li>Identify missing, incorrect or insufficient documents</li>
      <li>Advise on how to address the embassy's concerns</li><li>Prepare a stronger application if you are eligible to reapply</li></ul>
      <p>Visa fees and embassy decisions are generally non-refundable. A rejection does not always mean you cannot apply again; rules vary by country.</p>`],
    ['Is my personal information safe with you?',
     `<p>Yes. Your information is used only for your visa application: processing it, communicating with you, coordinating with embassies, consulates and visa centres, and giving you updates.</p>
      <p>See our <a href="privacy.html">Privacy Policy</a>, <a href="terms.html">Terms and Conditions</a> and <a href="refund.html">Refund Policy</a>. Only share the documents your application needs, and always use our official website and contact details.</p>`]
  ]
};

// ---- Redesign additions (Oct 2026) ----
// Business details live here so they can be changed in one place.
Object.assign(window.MVS, {
  config: {
    brand: 'My Visa Service', parent: 'Paras Holidays',
    phone: '+91-8800145551', tel: '+918800145551',
    // WhatsApp: set to '' to hide the floating button. Uses the published phone number; confirm it is on WhatsApp before launch.
    whatsapp: '918800145551',
    email: 'enquiry@myvisaservice.com',
    address: '303, Gurudwara Rd, Block 47, Beadonpura, Karol Bagh, New Delhi'
  },

  // Countries for the visa finder. flag = file in assets/img/country when the site already has one.
  places: [
    ['india','India','image-40b88086-6b69-4341-b9f6-e8b2171fee21.jpg'],['schengen','Schengen Area (any Schengen country)',null,'schengen'],
    ['united-kingdom','United Kingdom','6838c411269f21748550673.jpg'],['usa','United States','image-6f59bbc6-0770-44b2-a801-18219aeca997.png'],
    ['canada','Canada','image-a6afacc5-dc48-4b5d-96f9-64d3d9f6651e.png'],['australia','Australia'],['new-zealand','New Zealand'],
    ['uae','United Arab Emirates','6838c4def40cb1748550878.png'],['saudi-arabia','Saudi Arabia','6838c499ce3921748550809.jpg'],['qatar','Qatar','6838c4fdc0d3e1748550909.jpg'],
    ['germany','Germany','6838c3f5422921748550645.jpg','schengen'],['france','France','6838c429ecd531748550697.png','schengen'],['italy','Italy','6838c4493a49a1748550729.png','schengen'],
    ['spain','Spain','6838c4b6301e31748550838.jpg','schengen'],['switzerland','Switzerland','6838c547d34e01748550983.jpg','schengen'],['austria','Austria','6838c529090461748550953.png','schengen'],
    ['sweden','Sweden','6838c475f2d1e1748550773.png','schengen'],['finland','Finland','6838c5778733b1748551031.png','schengen'],['iceland','Iceland','6838c5a287ad01748551074.png','schengen'],
    ['netherlands','Netherlands',null,'schengen'],['greece','Greece',null,'schengen'],['portugal','Portugal',null,'schengen'],['denmark','Denmark',null,'schengen'],
    ['cyprus','Cyprus'],['japan','Japan'],['south-korea','South Korea'],['singapore','Singapore'],['brunei','Brunei'],['kenya','Kenya'],['belarus','Belarus'],
    ['thailand','Thailand'],['malaysia','Malaysia'],['indonesia','Indonesia'],['vietnam','Vietnam'],['turkey','Türkiye'],['egypt','Egypt'],['russia','Russia'],
    ['bangladesh','Bangladesh'],['nepal','Nepal'],['sri-lanka','Sri Lanka'],['ireland','Ireland'],['south-africa','South Africa'],['china','China']
  ].map(([id, name, flag, group]) => ({ id, name, flag: flag ? 'assets/img/country/' + flag : null, group: group || null })),

  purposes: [['tourism', 'Tourism'], ['business', 'Business'], ['study', 'Study'], ['work', 'Work'], ['family', 'Family visit']],

  // Illustrative visa categories by purpose; wording deliberately general.
  visaTypes: {
    tourism: { t: 'Tourist or visitor visa', d: 'For holidays and sightseeing. Usually a short stay with no work allowed.', docs: ['Passport with enough validity', 'Travel itinerary and hotel bookings', 'Recent bank statements'] },
    business: { t: 'Business visitor visa', d: 'For meetings, conferences and trade events. Not for taking up employment.', docs: ['Invitation letter from the host company', 'Covering letter from your employer', 'Company and personal financial documents'] },
    study: { t: 'Student visa', d: 'For full-time study at a recognised institution, usually once you hold an offer or admission letter.', docs: ['Offer or admission letter', 'Proof of funds for fees and living costs', 'Academic records and test scores'] },
    work: { t: 'Work visa or permit', d: 'For taking up a job abroad. Most routes need a job offer or employer sponsorship first.', docs: ['Job offer or employment contract', 'Qualifications and experience letters', 'Employer or sponsor documents'] },
    family: { t: 'Family visit visa', d: 'For visiting relatives who live in the destination country.', docs: ['Invitation letter from your relative', 'Proof of relationship', "Your relative's residence status"] }
  },

  // Home page destinations (photos from Unsplash, see CREDITS.md)
  showcase: [
    { id: 'schengen', cls: 'feat', name: 'Schengen Area', img: 'assets/img/photo/schengen.jpg', k: 'One visa for most of Europe', d: 'A single short-stay visa covers France, Germany, Italy, Switzerland and most of Europe. We help you apply through the right country for your plans.' },
    { id: 'united-kingdom', cls: 'd-uk', name: 'United Kingdom', img: 'assets/img/photo/uk.jpg', d: 'Visitor, student and business visas for London and beyond.' },
    { id: 'usa', cls: 'd-usa', name: 'United States', img: 'assets/img/photo/usa.jpg', d: 'Interview-based visas. We help with the forms and interview preparation.' },
    { id: 'canada', cls: 'd-ca', name: 'Canada', img: 'assets/img/photo/canada.jpg', d: 'Visitor and study applications with careful document checks.' },
    { id: 'australia', cls: 'd-au', name: 'Australia', img: 'assets/img/photo/australia.jpg', d: 'Visitor and student visas, prepared and filed online.' },
    { id: 'uae', cls: 'd-ae', name: 'United Arab Emirates', img: 'assets/img/photo/uae.jpg', d: 'Short visit visas for Dubai and Abu Dhabi.' }
  ],

  homeFaqs: [
    ['What happens in a consultation?', '<p>You tell us where you are going, why, and when. We explain which visa category usually fits, what documents it typically needs and how the application works for your destination. Your exact requirements depend on your circumstances and the rules of the issuing authority.</p>'],
    ['Which documents will I need?', '<p>Most applications ask for a valid passport, photographs, a completed form, your travel plans, accommodation details and financial statements. Each country and visa type adds its own documents, so we give you a checklist for your case.</p>'],
    ['How long does a visa take?', '<p>It varies by country, visa type and season. E-visas can take a few days; tourist and business visas often take a few weeks; study, work and long-stay visas can take longer. The embassy or authority sets the timeline, so apply well before you travel.</p>'],
    ['What do your services cost?', '<p>Our service fee depends on the destination and visa type. Government, embassy and visa-centre fees are separate and paid to those bodies. We tell you all costs before any work starts.</p>'],
    ['Can you guarantee my visa?', '<p>No. Only the embassy, consulate or immigration authority decides. We help you submit a complete, accurate application, which avoids refusals caused by missing or inconsistent documents. Be cautious of anyone who promises a guaranteed visa.</p>'],
    ['Do I need to visit your office?', '<p>No. Most of the work can be done by phone and email. You are also welcome at our office in Karol Bagh, New Delhi.</p>']
  ]
});
MVS.services.forEach(s => { s.id = s[1].toLowerCase().replace(/[^a-z]+/g, '-').replace(/-$/, '') });
