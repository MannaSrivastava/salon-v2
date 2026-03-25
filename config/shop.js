// ============================================================
//  SHOP CONFIGURATION — Edit all values here
//  Leave any field as "" to hide it from the website
// ============================================================

const SHOP = {
  name:    "Glamour Studio",
  tagline: "Premium Unisex Salon — Look Good, Feel Great",
  logo:    "images/logo.png",   // "" to show text name only

  phone:     "+91 98765 43210",
  whatsapp:  "919876543210",    // digits only — country code + number, no spaces or +
  email:     "hello@glamourstudio.in",
  website:   "https://glamourstudio.in",  // used in QR code & WhatsApp message

  address: {
    line1:   "Shop No. 5, Green Park Complex",
    line2:   "Near City Mall, MG Road",
    city:    "Bangalore",
    state:   "Karnataka",
    pincode: "560001",
  },

  // Google Maps — paste the src URL from Google Maps → Share → Embed a map
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnNDAuNiJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin",
  googleMapsLink:  "https://maps.google.com/?q=12.9716,77.5946",

  hours: [
    { days: "Monday – Saturday", time: "9:00 AM – 8:00 PM" },
    { days: "Sunday",            time: "10:00 AM – 6:00 PM" },
  ],

  social: {
    whatsapp:  "https://wa.me/919876543210",
    instagram: "https://instagram.com/glamourstudio",
    facebook:  "https://facebook.com/glamourstudio",
    youtube:   "",   // "" to hide
  },

  currency: "₹",

  // ── HOME SERVICE ────────────────────────────────────────────
  // Set enabled: false to disable the home service option entirely
  homeService: {
    enabled:    true,
    label:      "Home Service",
    desc:       "We come to your doorstep",
    extraCharge: 150,   // added to total if selected
    chargeLabel: "Travel Charge",
  },

  // ── GALLERY ─────────────────────────────────────────────────
  // Add image paths and optional captions. Leave array empty [] to hide gallery.
  gallery: [
    { image: "images/gallery/salon-interior.jpg", caption: "Our Salon Interior" },
    { image: "images/gallery/styling-station.jpg", caption: "Styling Station" },
    { image: "images/gallery/women-styling.jpg",   caption: "Hair Styling" },
    { image: "images/gallery/kids-zone.jpg",       caption: "Kids Zone" },
    { image: "images/gallery/men-grooming.jpg",    caption: "Men's Grooming" },
    { image: "images/gallery/products.jpg",        caption: "Premium Products" },
  ],

  // ── THEME ────────────────────────────────────────────────────
  // Choose one of the theme IDs below:
  //   "luxury-burgundy"  — Deep burgundy + gold (default, classic salon)
  //   "emerald-spa"      — Forest green + champagne (premium spa feel)
  //   "midnight-gold"    — Dark charcoal + bold gold (modern luxury)
  //   "blush-rose"       — Soft pink + rose gold (feminine boutique)
  theme: "luxury-burgundy",
};
