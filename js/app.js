/* ============================================================
   SALON WEBSITE v2.0 — Main Application
   Features: per-item date+slot+home-service in cart,
   4 themes, gallery lightbox, WhatsApp link in message
   ============================================================ */

// ── STATE ────────────────────────────────────────────────────
const state = {
  activeCategory: 'male',
  // cart item: { ...serviceObj, category, date, slot, homeService }
  cart: [],
};

const TODAY = new Date().toISOString().split('T')[0];

// ── BOOT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  buildHero();
  buildCatNav();
  buildAllServices();
  buildGallery();
  buildQR();
  buildLocation();
  buildFooter();
  bindScrollTop();
  setTimeout(() => {
    const l = document.getElementById('loader');
    if (l) l.classList.add('hidden');
  }, 700);
});

// ── THEME ─────────────────────────────────────────────────────
function applyTheme() {
  const valid = ['luxury-burgundy','emerald-spa','midnight-gold','blush-rose'];
  const t = valid.includes(SHOP.theme) ? SHOP.theme : 'luxury-burgundy';
  document.documentElement.setAttribute('data-theme', t);
  // Also set on body for broader CSS selector support
  document.body.setAttribute('data-theme', t);
}

// ── SVG ICONS ────────────────────────────────────────────────
const SVG = {
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.523 5.845L.057 23.428l5.756-1.508A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.018-1.38l-.36-.214-3.717.975.993-3.63-.235-.374A9.817 9.817 0 012.182 12C2.182 6.584 6.584 2.182 12 2.182S21.818 6.584 21.818 12 17.416 21.818 12 21.818z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
  facebook:  `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  youtube:   `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>`,
};

function socialIconsHtml() {
  return Object.entries(SHOP.social)
    .filter(([, url]) => url)
    .map(([key]) => {
      if (!SVG[key]) return '';
      return `<a href="${SHOP.social[key]}" target="_blank" rel="noopener"
        class="social-btn" title="${key}" aria-label="${key}">${SVG[key]}</a>`;
    }).join('');
}

// ── HERO ──────────────────────────────────────────────────────
function buildHero() {
  const el = document.getElementById('hero-inner');
  if (!el) return;

  const logo = SHOP.logo
    ? `<img src="${SHOP.logo}" alt="${SHOP.name}" class="hero-logo" onerror="this.style.display='none'">`
    : '';

  const hours = SHOP.hours.map(h =>
    `<p><strong>${h.days}:</strong> ${h.time}</p>`
  ).join('');

  el.innerHTML = `
    <div class="hero-left fade-in">
      ${logo}
      <div>
        ${SHOP.tagline ? `<div class="hero-tagline">${SHOP.tagline}</div>` : ''}
        <div class="hero-name">${SHOP.name}</div>
      </div>
    </div>
    <div class="hero-right fade-in">
      ${SHOP.phone  ? `<a href="tel:${SHOP.phone}" class="hero-phone">📞 ${SHOP.phone}</a>` : ''}
      ${SHOP.email  ? `<div class="hero-email">✉️ ${SHOP.email}</div>` : ''}
      <div class="hero-hours">${hours}</div>
      <div class="hero-social">${socialIconsHtml()}</div>
    </div>
  `;
}

// ── CATEGORY NAV ─────────────────────────────────────────────
function buildCatNav() {
  const el = document.getElementById('cat-nav-inner');
  if (!el) return;

  const tabs = [
    { key:'male',   icon:'👨', label:'Men',   desc:'Grooming' },
    { key:'female', icon:'👩', label:'Women', desc:'Beauty' },
    { key:'kids',   icon:'🧒', label:'Kids',  desc:'Fun Cuts' },
  ];

  el.innerHTML = `<span class="cat-nav-label">Browse:</span>` +
    tabs.map(t => `
      <button class="cat-tab ${t.key === state.activeCategory ? 'active' : ''}"
        data-cat="${t.key}" onclick="switchCategory('${t.key}')">
        <span class="tab-icon">${t.icon}</span>
        ${t.label}
        <span class="tab-count ${getCartCountForCat(t.key) > 0 ? 'has-items' : ''}"
          id="tab-count-${t.key}">${getCartCountForCat(t.key)}</span>
      </button>
    `).join('');
}

function getCartCountForCat(cat) {
  return state.cart.filter(s => s.category === cat).length;
}

function updateTabCounts() {
  ['male','female','kids'].forEach(cat => {
    const el = document.getElementById(`tab-count-${cat}`);
    if (!el) return;
    const n = getCartCountForCat(cat);
    el.textContent = n;
    el.classList.toggle('has-items', n > 0);
  });
}

function switchCategory(cat) {
  state.activeCategory = cat;
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.toggle('active', t.dataset.cat === cat));
  document.querySelectorAll('.cat-panel').forEach(p => p.classList.toggle('active', p.dataset.cat === cat));
  document.getElementById('services-section')?.scrollIntoView({ behavior:'smooth', block:'start' });
}

// ── BUILD SERVICE PANELS ──────────────────────────────────────
function buildAllServices() {
  const container = document.getElementById('services-container');
  if (!container) return;

  const catMeta = {
    male:   { label:"Men's Services",   icon:'👨', sub:'Premium grooming for the modern man',       cls:'male' },
    female: { label:"Women's Services", icon:'👩', sub:'Beauty & wellness treatments for women',     cls:'female' },
    kids:   { label:"Kids' Services",   icon:'🧒', sub:'Gentle & fun cuts for little ones',          cls:'kids' },
  };

  container.innerHTML = Object.keys(catMeta).map(cat => {
    const meta = catMeta[cat];
    const svcs = SERVICES[cat] || [];
    const cards = svcs.map((svc, i) => serviceCardHtml(svc, cat, i)).join('');

    return `
      <div class="cat-panel ${cat === state.activeCategory ? 'active' : ''}" data-cat="${cat}">
        <div class="cat-header ${meta.cls}">
          <span class="cat-header-icon">${meta.icon}</span>
          <div class="cat-header-text">
            <h3>${meta.label}</h3>
            <p>${meta.sub}</p>
          </div>
        </div>
        <div class="services-grid" id="grid-${cat}">${cards}</div>
      </div>
    `;
  }).join('');
}

function serviceCardHtml(svc, cat, idx) {
  const imgHtml = svc.image
    ? `<img src="${svc.image}" alt="${svc.name}" loading="lazy"
         onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
    : '';
  const iconStyle = svc.image ? 'style="display:none"' : '';
  const dur = svc.duration ? `<span class="card-duration">⏱ ${svc.duration} min</span>` : '';

  return `
    <div class="service-card" id="card-${svc.id}" data-id="${svc.id}" data-cat="${cat}"
         onclick="toggleService('${svc.id}','${cat}')"
         style="animation-delay:${idx * 0.055}s">
      <div class="card-img-wrap">
        ${imgHtml}
        <div class="card-icon-placeholder" ${iconStyle}>${svc.icon || '💇'}</div>
        <div class="card-selected-badge">✓</div>
        ${dur}
      </div>
      <div class="card-body">
        <div class="card-name">${svc.name}</div>
        ${svc.desc ? `<div class="card-desc">${svc.desc}</div>` : ''}
        <div class="card-price">${SHOP.currency}${svc.price} <span>/ session</span></div>
        <button class="card-select-btn" id="btn-${svc.id}">Add to Booking</button>
      </div>
    </div>
  `;
}

// ── TOGGLE SERVICE IN CART ────────────────────────────────────
function toggleService(id, cat) {
  const svc = (SERVICES[cat] || []).find(s => s.id === id);
  if (!svc) return;

  const idx = state.cart.findIndex(s => s.id === id);
  if (idx > -1) {
    state.cart.splice(idx, 1);
    showToast(`Removed: ${svc.name}`);
  } else {
    state.cart.push({ ...svc, category: cat, date: '', slot: '', homeService: false });
    showToast(`Added: ${svc.name}`);
  }

  syncCardUI(id);
  updateTabCounts();
  renderCart();
}

function syncCardUI(id) {
  const card = document.getElementById(`card-${id}`);
  const btn  = document.getElementById(`btn-${id}`);
  if (!card || !btn) return;
  const inCart = state.cart.some(s => s.id === id);
  card.classList.toggle('selected', inCart);
  btn.textContent = inCart ? '✓ Selected' : 'Add to Booking';
}

function removeFromCart(id) {
  const item = state.cart.find(s => s.id === id);
  if (item) {
    showToast(`Removed: ${item.name}`);
    state.cart = state.cart.filter(s => s.id !== id);
    syncCardUI(id);
    updateTabCounts();
    renderCart();
  }
}

// ── CART RENDER ───────────────────────────────────────────────
function renderCart() {
  const section = document.getElementById('cart-section');
  if (!section) return;

  if (state.cart.length === 0) {
    section.classList.remove('visible');
    updateBookingBtn();
    return;
  }
  section.classList.add('visible');

  // Count badge
  const countEl = document.getElementById('cart-count');
  if (countEl) countEl.textContent = state.cart.length;

  // Items
  const listEl = document.getElementById('cart-list');
  if (listEl) listEl.innerHTML = state.cart.map(item => cartItemHtml(item)).join('');

  // Total
  recalcTotal();
  updateBookingBtn();
}

function cartItemHtml(item) {
  const cat   = item.category;
  const slots = SERVICES.timeSlots[cat] || [];
  const hs    = SHOP.homeService;

  const slotChips = slots.map(s => `
    <label class="slot-mini-label">
      <input type="radio" name="slot-${item.id}" value="${s}"
        ${item.slot === s ? 'checked' : ''}
        onchange="updateCartItem('${item.id}','slot','${s}')">
      <span class="slot-mini-chip">${s}</span>
    </label>
  `).join('');

  const homeRow = hs && hs.enabled ? `
    <div class="cart-item-home-row">
      <div class="home-toggle-wrap">
        <label class="home-toggle">
          <input type="checkbox" ${item.homeService ? 'checked' : ''}
            onchange="updateCartItem('${item.id}','homeService',this.checked)">
          <span class="home-toggle-track"></span>
        </label>
        <span class="home-toggle-label">🏠 ${hs.label}</span>
      </div>
      ${item.homeService ? `<span class="home-charge-badge">+${SHOP.currency}${hs.extraCharge} ${hs.chargeLabel}</span>` : ''}
    </div>
  ` : '';

  return `
    <div class="cart-item-card" id="cart-card-${item.id}">
      <div class="cart-item-top">
        <div class="cart-item-info">
          <span class="cart-item-icon">${item.icon || '💇'}</span>
          <div class="cart-item-name-wrap">
            <div class="cart-item-name">${item.name}</div>
            <span class="cart-item-badge badge-${cat}">${cat === 'male' ? 'Men' : cat === 'female' ? 'Women' : 'Kids'}</span>
          </div>
        </div>
        <span class="cart-item-price">${SHOP.currency}${item.price}</span>
        <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" title="Remove">✕</button>
      </div>

      <div class="cart-item-details">
        <div class="cart-detail-group">
          <label>📅 Preferred Date</label>
          <input type="date" value="${item.date || ''}" min="${TODAY}"
            onchange="updateCartItem('${item.id}','date',this.value)">
        </div>
        <div class="cart-detail-group">
          <label>🕐 Time Slot</label>
          <div class="slot-mini-grid">${slotChips}</div>
        </div>
      </div>

      ${homeRow}
    </div>
  `;
}

function updateCartItem(id, field, value) {
  const item = state.cart.find(s => s.id === id);
  if (!item) return;
  item[field] = value;

  // Refresh home charge badge without full re-render
  if (field === 'homeService') {
    const card = document.getElementById(`cart-card-${id}`);
    if (card) {
      const badge = card.querySelector('.home-charge-badge');
      if (value) {
        if (!badge) {
          const row = card.querySelector('.cart-item-home-row');
          if (row) row.insertAdjacentHTML('beforeend',
            `<span class="home-charge-badge">+${SHOP.currency}${SHOP.homeService.extraCharge} ${SHOP.homeService.chargeLabel}</span>`);
        }
      } else {
        if (badge) badge.remove();
      }
    }
  }
  recalcTotal();
}

function recalcTotal() {
  const hs = SHOP.homeService;
  let total = state.cart.reduce((a, s) => a + s.price, 0);
  if (hs && hs.enabled) {
    const homeCount = state.cart.filter(s => s.homeService).length;
    if (homeCount > 0) total += hs.extraCharge; // charge once per booking
  }
  const el = document.getElementById('cart-total-amount');
  if (el) el.textContent = `${SHOP.currency}${total}`;

  const note = document.getElementById('cart-total-note');
  const homeCount = hs && hs.enabled ? state.cart.filter(s => s.homeService).length : 0;
  if (note) note.textContent = homeCount > 0
    ? `Includes ${SHOP.currency}${hs.extraCharge} ${hs.chargeLabel}`
    : 'Estimated total before confirmation';
}

function updateBookingBtn() {
  const btn = document.getElementById('book-btn');
  if (!btn) return;
  const n = state.cart.length;
  btn.textContent = '';
  btn.innerHTML = `${SVG.whatsapp} Book via WhatsApp${n > 0 ? ` (${n} service${n>1?'s':''})` : ''}`;
}

// ── BOOKING FORM (just name + phone; date/slot are per-item) ──
document.addEventListener('DOMContentLoaded', () => {
  const formEl = document.getElementById('booking-form-inner');
  if (!formEl) return;

  formEl.innerHTML = `
    <div class="form-row">
      <div class="form-group">
        <label>👤 Your Name *</label>
        <input type="text" id="f-name" placeholder="Enter your full name" autocomplete="name">
      </div>
      <div class="form-group">
        <label>📱 Mobile Number *</label>
        <input type="tel" id="f-phone" placeholder="+91 98765 43210" autocomplete="tel">
      </div>
    </div>
    <p class="form-note">
      📝 Dates and time slots are set per service in the cart above.
      ${SHOP.homeService && SHOP.homeService.enabled ? `🏠 Toggle home service per item if you'd like us to visit you.` : ''}
    </p>
    <button class="book-btn" id="book-btn" onclick="openConfirmModal()">
      ${SVG.whatsapp} Book via WhatsApp
    </button>
  `;
});

// ── CONFIRMATION MODAL ────────────────────────────────────────
function openConfirmModal() {
  const name  = document.getElementById('f-name')?.value.trim();
  const phone = document.getElementById('f-phone')?.value.trim();

  if (!name)  { showToast('⚠️ Please enter your name');         return; }
  if (!phone) { showToast('⚠️ Please enter your phone number'); return; }
  if (state.cart.length === 0) { showToast('⚠️ No services selected!'); return; }

  const modal = document.getElementById('modal-body');
  if (!modal) return;

  const hs = SHOP.homeService;
  const hasHome = hs && hs.enabled && state.cart.some(s => s.homeService);
  let total = state.cart.reduce((a, s) => a + s.price, 0);
  if (hasHome) total += hs.extraCharge;

  const serviceRows = state.cart.map(s => `
    <div class="confirm-svc-row">
      <div class="confirm-svc-row-inner">
        <div>
          <div class="confirm-svc-name">${s.icon || ''} ${s.name}
            ${s.homeService ? `<span class="home-badge">🏠 Home</span>` : ''}
          </div>
          <div class="confirm-svc-meta">
            📅 ${s.date ? formatDate(s.date) : 'Date not set'} &nbsp;|&nbsp;
            🕐 ${s.slot || 'Slot not set'}
          </div>
        </div>
        <div class="confirm-svc-price">${SHOP.currency}${s.price}</div>
      </div>
    </div>
  `).join('');

  const homeChargeRow = hasHome ? `
    <div class="confirm-svc-row">
      <div class="confirm-svc-row-inner">
        <div class="confirm-svc-name">🚗 ${hs.chargeLabel}</div>
        <div class="confirm-svc-price">${SHOP.currency}${hs.extraCharge}</div>
      </div>
    </div>` : '';

  modal.innerHTML = `
    <div class="confirm-field">
      <label>Full Name</label>
      <input type="text" id="m-name" value="${escHtml(name)}">
    </div>
    <div class="confirm-field">
      <label>Mobile Number</label>
      <input type="tel" id="m-phone" value="${escHtml(phone)}">
    </div>
    <div class="confirm-services-block">
      <h4>📋 Selected Services</h4>
      ${serviceRows}
      ${homeChargeRow}
      <div class="confirm-total-row">
        <span>Total Estimate</span>
        <span>${SHOP.currency}${total}</span>
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn-cancel" onclick="closeModal()">✕ Go Back</button>
      <button class="btn-confirm" onclick="sendWhatsApp()">
        ${SVG.whatsapp} Confirm & Send
      </button>
    </div>
  `;

  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

// ── SEND WHATSAPP ─────────────────────────────────────────────
function sendWhatsApp() {
  const name  = document.getElementById('m-name')?.value.trim();
  const phone = document.getElementById('m-phone')?.value.trim();
  if (!name || !phone) { showToast('Please fill all fields'); return; }

  const hs = SHOP.homeService;
  const hasHome = hs && hs.enabled && state.cart.some(s => s.homeService);
  let total = state.cart.reduce((a, s) => a + s.price, 0);
  if (hasHome) total += hs.extraCharge;

  const catLabel = { male:'Men', female:'Women', kids:'Kids' };

  const serviceLines = state.cart.map(s =>
    `  • [${catLabel[s.category]}] ${s.name} — ${SHOP.currency}${s.price}\n` +
    `    📅 ${s.date ? formatDate(s.date) : 'Date TBD'}  🕐 ${s.slot || 'Slot TBD'}` +
    (s.homeService ? `  🏠 Home Service` : '')
  ).join('\n');

  const homeChargeLine = hasHome
    ? `\n🚗 ${hs.chargeLabel}: ${SHOP.currency}${hs.extraCharge}` : '';

  const websiteLine = SHOP.website ? `\n🌐 Booked via: ${SHOP.website}` : '';

  const msg =
`Hello ${SHOP.name}! 👋
I'd like to book the following services.

👤 *Name:* ${name}
📱 *Phone:* ${phone}

📋 *Services:*
${serviceLines}
${homeChargeLine}

💰 *Total Estimate:* ${SHOP.currency}${total}
${websiteLine}

Please confirm my appointment. Thank you! 🙏`;

  window.open(`https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  closeModal();
  showToast('✅ Opening WhatsApp…');
}

// ── GALLERY ───────────────────────────────────────────────────
function buildGallery() {
  const section = document.getElementById('gallery-section');
  if (!section) return;

  const items = (SHOP.gallery || []).filter(g => g.image);
  if (items.length === 0) {
    section.style.display = 'none';
    return;
  }

  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  grid.innerHTML = items.map((g, i) => `
    <div class="gallery-item" onclick="openLightbox(${i})">
      <img src="${g.image}" alt="${g.caption || ''}" loading="lazy"
           onerror="this.closest('.gallery-item').style.display='none'">
      ${g.caption ? `<div class="gallery-caption">${g.caption}</div>` : ''}
    </div>
  `).join('');

  // Build lightbox images array on window
  window._galleryImages = items;
}

function openLightbox(idx) {
  const items = window._galleryImages || [];
  const img   = document.getElementById('lightbox-img');
  const lb    = document.getElementById('lightbox');
  if (!img || !lb) return;
  img.src = items[idx]?.image || '';
  lb.classList.add('open');
  lb.dataset.idx = idx;
}

function closeLightbox() {
  document.getElementById('lightbox')?.classList.remove('open');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// ── QR CODE ───────────────────────────────────────────────────
function buildQR() {
  const wrap  = document.getElementById('qr-wrap');
  const urlEl = document.getElementById('qr-url');
  if (!wrap) return;

  const url = SHOP.website || window.location.href;
  if (urlEl) urlEl.textContent = url;

  // Try QRCode.js first, fallback to API
  if (typeof QRCode !== 'undefined') {
    // pick colors from theme
    const themeColors = {
      'luxury-burgundy': { dark:'6b1e3b', light:'fdf6ee' },
      'emerald-spa':     { dark:'1a5c3a', light:'f4f9f6' },
      'midnight-gold':   { dark:'e2b04a', light:'12121f' },
      'blush-rose':      { dark:'9d3d6b', light:'fef5f8' },
    };
    const theme = SHOP.theme || 'luxury-burgundy';
    const cols  = themeColors[theme] || themeColors['luxury-burgundy'];
    new QRCode(wrap, {
      text: url, width: 180, height: 180,
      colorDark:  `#${cols.dark}`,
      colorLight: `#${cols.light}`,
      correctLevel: QRCode.CorrectLevel.M,
    });
  } else {
    const img = document.createElement('img');
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(url)}`;
    img.alt = 'QR Code'; img.style.borderRadius = '8px';
    wrap.appendChild(img);
  }
}

// ── LOCATION ──────────────────────────────────────────────────
function buildLocation() {
  const addr = SHOP.address || {};
  const el   = document.getElementById('address-content');
  if (!el) return;

  const lines = [addr.line1, addr.line2,
    [addr.city, addr.state].filter(Boolean).join(', ') + (addr.pincode ? ` — ${addr.pincode}` : '')
  ].filter(Boolean).join('<br>');

  const hours = (SHOP.hours || []).map(h =>
    `<div class="hours-row"><span>${h.days}</span><span>${h.time}</span></div>`
  ).join('');

  const dir = SHOP.googleMapsLink
    ? `<a href="${SHOP.googleMapsLink}" target="_blank" class="directions-btn">📍 Get Directions</a>` : '';

  el.innerHTML = `
    <p class="address-line">${lines}</p>
    ${SHOP.phone ? `<p class="address-sub">📞 ${SHOP.phone}</p>` : ''}
    ${SHOP.email ? `<p class="address-sub">✉️ ${SHOP.email}</p>` : ''}
    <div class="hours-grid">
      <h4>Opening Hours</h4>${hours}
    </div>
    ${dir}
  `;

  const mapWrap = document.getElementById('map-wrap');
  if (!mapWrap) return;
  if (SHOP.googleMapsEmbed) {
    mapWrap.innerHTML = `<iframe src="${SHOP.googleMapsEmbed}" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
  } else {
    mapWrap.innerHTML = `
      <div class="map-placeholder">
        <span>🗺️</span><p>${addr.city || 'Location'}</p>
        ${dir}
      </div>`;
  }
}

// ── FOOTER (creator only) ─────────────────────────────────────
function buildFooter() {
  const el = document.getElementById('footer-inner');
  if (!el) return;

  const c = CREATOR;
  const builtBy   = c.builtBy   ? `Built by <a href="${c.builtByLink||'#'}" target="_blank" rel="noopener"><strong>${c.builtBy}</strong></a>` : '';
  const tagline   = c.tagline   ? `<span>${c.tagline}</span>` : '';
  const contact   = c.contact   ? `<a href="mailto:${c.contact}">${c.contact}</a>` : '';
  const cPhone    = c.phone     ? `<span>${c.phone}</span>` : '';

  el.innerHTML = `
    <div class="footer-creator-block">
      ${builtBy} ${tagline}<br>
      ${contact} ${cPhone}
    </div>
    <div class="footer-badge">
      ${c.version ? `<span>${c.version}</span>` : ''}
      <span>© ${c.year || new Date().getFullYear()}</span>
    </div>
    <div class="footer-copy">
      Website designed & developed by
      ${c.builtBy ? `<a href="${c.builtByLink||'#'}" target="_blank">${c.builtBy}</a>` : 'WebCraft Studio'}.
      All rights reserved.
    </div>
  `;
}

// ── SCROLL TOP ────────────────────────────────────────────────
function bindScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', scrollY > 400), { passive: true });
  btn.addEventListener('click', () => scrollTo({ top:0, behavior:'smooth' }));
}

// ── UTILITIES ─────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 2800);
}

function escHtml(str) {
  return String(str).replace(/[&<>"']/g, m =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

function formatDate(d) {
  if (!d) return '';
  return new Date(d + 'T00:00:00').toLocaleDateString('en-IN', {
    weekday:'short', day:'numeric', month:'short', year:'numeric'
  });
}

// Backdrop close
document.addEventListener('click', e => {
  if (e.target.id === 'modal-overlay') closeModal();
  if (e.target.id === 'lightbox') closeLightbox();
});
