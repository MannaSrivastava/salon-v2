// ============================================================
//  SERVICES CONFIGURATION
//  Each service: { id, name, price, desc, image, duration, icon }
//  image: path relative to root e.g. "images/haircut-m.jpg"
//         leave "" to show emoji icon placeholder
//  duration: in minutes (displayed as info)
//  homeServiceAllowed: false to disable home service for this specific item
// ============================================================

const SERVICES = {

  // ── MALE SERVICES ─────────────────────────────────────────
  male: [
    { id:"m1", name:"Men's Haircut",      price:150,  desc:"Precision cut styled to your preference",          image:"images/mens-haircut.jpg",    duration:30, icon:"✂️" },
    { id:"m2", name:"Beard Trim & Shape", price:100,  desc:"Clean shape-up with straight razor finish",        image:"images/beard-trim.jpg",      duration:20, icon:"🪒" },
    { id:"m3", name:"Hair + Beard Combo", price:220,  desc:"Full groom package — haircut and beard together",  image:"images/combo-m.jpg",         duration:50, icon:"💈" },
    { id:"m4", name:"Head Massage",       price:199,  desc:"Deep relaxing scalp massage with oil",             image:"images/head-massage.jpg",    duration:30, icon:"🧖‍♂️" },
    { id:"m5", name:"Face Clean-up",      price:249,  desc:"Cleansing, scrub & moisturizing for men",          image:"images/face-cleanup-m.jpg",  duration:30, icon:"✨" },
    { id:"m6", name:"Hair Colour",        price:499,  desc:"Single colour application with toning",            image:"images/hair-colour-m.jpg",   duration:60, icon:"🎨" },
  ],

  // ── FEMALE SERVICES ───────────────────────────────────────
  female: [
    { id:"f1", name:"Women's Haircut",      price:299,  desc:"Expert cut tailored to your face shape",         image:"images/womens-haircut.jpg", duration:45,  icon:"✂️" },
    { id:"f2", name:"Blow Dry & Styling",   price:349,  desc:"Professional blow-out for any occasion",         image:"images/blowdry.jpg",        duration:40,  icon:"💨" },
    { id:"f3", name:"Hair Colour (Global)", price:1499, desc:"Full head colour with premium products",         image:"images/hair-colour-f.jpg",  duration:90,  icon:"🎨" },
    { id:"f4", name:"Highlights / Balayage",price:2499, desc:"Sun-kissed highlights or balayage effect",       image:"images/highlights.jpg",     duration:120, icon:"🌟" },
    { id:"f5", name:"Facial",              price:799,  desc:"Deep cleansing facial with glow mask",            image:"images/facial.jpg",         duration:60,  icon:"🌸" },
    { id:"f6", name:"Waxing (Full Arms)",  price:299,  desc:"Smooth finish full arm waxing",                  image:"images/waxing-arms.jpg",    duration:30,  icon:"🌿" },
    { id:"f7", name:"Manicure",            price:399,  desc:"Nail shaping, cuticle care & polish",            image:"images/manicure.jpg",       duration:40,  icon:"💅" },
    { id:"f8", name:"Pedicure",            price:499,  desc:"Foot soak, scrub, massage & nail finish",        image:"images/pedicure.jpg",       duration:50,  icon:"🦶" },
  ],

  // ── KIDS SERVICES ─────────────────────────────────────────
  kids: [
    { id:"k1", name:"Kids' Haircut (Boy)",   price:99,  desc:"Fun & friendly cut for boys up to 12 yrs",       image:"images/kids-boy-cut.jpg",  duration:20, icon:"👦" },
    { id:"k2", name:"Kids' Haircut (Girl)",  price:149, desc:"Neat trim or full cut for girls up to 12 yrs",   image:"images/kids-girl-cut.jpg", duration:25, icon:"👧" },
    { id:"k3", name:"Kids' Hair Wash & Dry", price:99,  desc:"Gentle shampoo, condition & blow-dry",           image:"images/kids-wash.jpg",     duration:20, icon:"🚿" },
    { id:"k4", name:"Baby's First Haircut",  price:199, desc:"Special first haircut with a keepsake lock",     image:"images/baby-cut.jpg",      duration:30, icon:"👶" },
  ],

  // ── TIME SLOTS PER CATEGORY ───────────────────────────────
  // These appear per-item in the cart summary for the user to pick
  timeSlots: {
    male: [
      "09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM",
      "12:00 PM","12:30 PM","02:00 PM","02:30 PM","03:00 PM","03:30 PM",
      "04:00 PM","04:30 PM","05:00 PM","05:30 PM","06:00 PM","06:30 PM",
      "07:00 PM","07:30 PM",
    ],
    female: [
      "10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM",
      "02:00 PM","02:30 PM","03:00 PM","03:30 PM","04:00 PM","04:30 PM",
      "05:00 PM","05:30 PM","06:00 PM","06:30 PM","07:00 PM",
    ],
    kids: [
      "10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM",
      "03:00 PM","03:30 PM","04:00 PM","04:30 PM","05:00 PM",
    ],
  },
};
