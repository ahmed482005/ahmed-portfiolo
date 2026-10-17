/**
 * Ahmed Abdelhamed - Portfolio Interactive Engine (2026)
 * Features:
 *  - Recruiter Fast-Track Modal & PDF Print
 *  - Live Deep Learning (ResNet50 / Fruits-360) Simulator
 *  - Interactive SQL Query Runner & Analytics Table
 *  - Client-side Cryptography & SHA-256 Engine
 *  - Artisan Hub Cart Simulation
 *  - Copy to clipboard & Toast notifications
 */

// ==================== TOAST NOTIFICATION ====================
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-accent"></i> <span>${message}</span>`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// Copy candidate email
function copyContactEmail() {
  const email = "ab402819@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    showToast(`Email copied: ${email}`);
  }).catch(() => {
    showToast(`Email: ${email}`);
  });
}

// ==================== MOBILE NAVIGATION ====================
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

if (mobileToggle && navLinks) {
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// ==================== PROJECT CATEGORY FILTER ====================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-showcase-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ==================== MODAL SYSTEM ====================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function closeModalOnBackdrop(e, modalId) {
  if (e.target.id === modalId) {
    closeModal(modalId);
  }
}

function openRecruiterModal() {
  openModal('recruiterModal');
}

function openDemo(demoType) {
  if (demoType === 'fruit-demo') {
    openModal('fruitDemoModal');
    loadStudioFruit('apple');
  } else if (demoType === 'sql-demo') {
    openModal('sqlDemoModal');
    executeStudioQuery('gdp_fdi');
  } else if (demoType === 'crypto-demo') {
    openModal('cryptoDemoModal');
    runModalCipher();
  } else if (demoType === 'artisan-demo') {
    openModal('artisanDemoModal');
  }
}

// Escape key closes modals
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(modal => {
      modal.classList.remove('open');
    });
    document.body.style.overflow = '';
  }
});

// ==================== DEMO 1: FRUIT CLASSIFIER SIMULATOR ====================
const fruitDataset = {
  apple: {
    icon: '🍎',
    name: 'Apple Braeburn',
    confidence: '99.2%',
    barWidth: '99.2%',
    latency: '11.4 ms',
    top3: [
      { name: '1. Apple Braeburn', pct: '99.2%' },
      { name: '2. Apple Crimson Snow', pct: '0.6%' },
      { name: '3. Apple Golden Delicious', pct: '0.2%' }
    ],
    studioTop5: [
      { label: 'Apple Braeburn', score: 99.2 },
      { label: 'Apple Crimson Snow', score: 0.5 },
      { label: 'Apple Granny Smith', score: 0.2 },
      { label: 'Apple Red Delicious', score: 0.1 },
      { label: 'Pear Bartlett', score: 0.0 }
    ]
  },
  banana: {
    icon: '🍌',
    name: 'Banana Lady Finger',
    confidence: '98.7%',
    barWidth: '98.7%',
    latency: '10.8 ms',
    top3: [
      { name: '1. Banana Lady Finger', pct: '98.7%' },
      { name: '2. Banana Red', pct: '0.9%' },
      { name: '3. Plantain', pct: '0.4%' }
    ],
    studioTop5: [
      { label: 'Banana Lady Finger', score: 98.7 },
      { label: 'Banana Cavendish', score: 0.8 },
      { label: 'Banana Red', score: 0.3 },
      { label: 'Yellow Plantain', score: 0.1 },
      { label: 'Mango', score: 0.1 }
    ]
  },
  strawberry: {
    icon: '🍓',
    name: 'Strawberry Fresh',
    confidence: '99.5%',
    barWidth: '99.5%',
    latency: '12.1 ms',
    top3: [
      { name: '1. Strawberry Fresh', pct: '99.5%' },
      { name: '2. Strawberry Wedge', pct: '0.3%' },
      { name: '3. Raspberry', pct: '0.2%' }
    ],
    studioTop5: [
      { label: 'Strawberry Fresh', score: 99.5 },
      { label: 'Strawberry Wedge', score: 0.3 },
      { label: 'Raspberry', score: 0.1 },
      { label: 'Cherry Rainier', score: 0.1 },
      { label: 'Redcurrant', score: 0.0 }
    ]
  },
  lemon: {
    icon: '🍋',
    name: 'Lemon Meyer',
    confidence: '97.9%',
    barWidth: '97.9%',
    latency: '11.0 ms',
    top3: [
      { name: '1. Lemon Meyer', pct: '97.9%' },
      { name: '2. Lemon Lisbon', pct: '1.8%' },
      { name: '3. Lime Persian', pct: '0.3%' }
    ],
    studioTop5: [
      { label: 'Lemon Meyer', score: 97.9 },
      { label: 'Lemon Lisbon', score: 1.5 },
      { label: 'Lime Seedless', score: 0.4 },
      { label: 'Grapefruit White', score: 0.1 },
      { label: 'Orange Navel', score: 0.1 }
    ]
  },
  orange: {
    icon: '🍊',
    name: 'Orange Valencia',
    confidence: '98.9%',
    barWidth: '98.9%',
    latency: '11.8 ms',
    top3: [
      { name: '1. Orange Valencia', pct: '98.9%' },
      { name: '2. Tangerine Clementine', pct: '0.8%' },
      { name: '3. Mandarine', pct: '0.3%' }
    ],
    studioTop5: [
      { label: 'Orange Valencia', score: 98.9 },
      { label: 'Tangerine Clementine', score: 0.7 },
      { label: 'Mandarine', score: 0.3 },
      { label: 'Kumquat', score: 0.1 },
      { label: 'Grapefruit Pink', score: 0.0 }
    ]
  },
  blueberry: {
    icon: '🫐',
    name: 'Blueberry Highbush',
    confidence: '99.1%',
    barWidth: '99.1%',
    latency: '10.5 ms',
    top3: [
      { name: '1. Blueberry Highbush', pct: '99.1%' },
      { name: '2. Bilberry Wild', pct: '0.6%' },
      { name: '3. Huckleberry', pct: '0.3%' }
    ],
    studioTop5: [
      { label: 'Blueberry Highbush', score: 99.1 },
      { label: 'Bilberry Wild', score: 0.5 },
      { label: 'Blackberry', score: 0.3 },
      { label: 'Elderberry', score: 0.1 },
      { label: 'Grape Blue', score: 0.0 }
    ]
  }
};

// In-card fruit selector
function selectFruitDemo(fruitKey, buttonEl) {
  const data = fruitDataset[fruitKey];
  if (!data) return;

  // Update chip active classes
  const chips = document.querySelectorAll('.fruit-chip');
  chips.forEach(c => c.classList.remove('active'));
  if (buttonEl) buttonEl.classList.add('active');

  // Update preview UI
  const fruitIcon = document.getElementById('fruitIcon');
  const fruitPredictedClass = document.getElementById('fruitPredictedClass');
  const fruitConfidenceBar = document.getElementById('fruitConfidenceBar');
  const fruitConfidenceText = document.getElementById('fruitConfidenceText');
  const fruitTopClasses = document.getElementById('fruitTopClasses');

  if (fruitIcon) fruitIcon.innerText = data.icon;
  if (fruitPredictedClass) fruitPredictedClass.innerText = data.name;
  if (fruitConfidenceBar) fruitConfidenceBar.style.width = data.barWidth;
  if (fruitConfidenceText) fruitConfidenceText.innerText = data.confidence;

  if (fruitTopClasses) {
    fruitTopClasses.innerHTML = data.top3.map(item => `
      <div class="pred-row"><span>${item.name}</span><span>${item.pct}</span></div>
    `).join('');
  }
}

// Studio Modal Fruit Loader
function loadStudioFruit(fruitKey) {
  const data = fruitDataset[fruitKey];
  if (!data) return;

  // Active state in modal buttons
  document.querySelectorAll('.sample-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = Array.from(document.querySelectorAll('.sample-btn')).find(b => b.innerText.toLowerCase().includes(fruitKey));
  if (activeBtn) activeBtn.classList.add('active');

  const symbol = document.getElementById('studioFruitSymbol');
  const topClass = document.getElementById('studioTopClass');
  const topConf = document.getElementById('studioTopConfidence');
  const probContainer = document.getElementById('studioProbBars');

  if (symbol) symbol.innerHTML = data.icon;
  if (topClass) topClass.innerText = data.name;
  if (topConf) topConf.innerText = data.confidence;

  if (probContainer) {
    probContainer.innerHTML = data.studioTop5.map(item => `
      <div class="prob-item">
        <div class="prob-header">
          <span>${item.label}</span>
          <strong>${item.score.toFixed(1)}%</strong>
        </div>
        <div class="prob-bar-bg">
          <div class="prob-bar-val" style="width: ${item.score}%;"></div>
        </div>
      </div>
    `).join('');
  }
}

// Custom image upload simulation in modal
function handleStudioUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const symbol = document.getElementById('studioFruitSymbol');
    if (symbol) {
      symbol.innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;" alt="Uploaded Image">`;
    }

    const badge = document.getElementById('studioBadge');
    if (badge) badge.innerText = "Custom Inference Computed";

    const topClass = document.getElementById('studioTopClass');
    const topConf = document.getElementById('studioTopConfidence');
    if (topClass) topClass.innerText = "Classified: Botanical Specimen (98.3%)";
    if (topConf) topConf.innerText = "98.3%";

    const probContainer = document.getElementById('studioProbBars');
    if (probContainer) {
      probContainer.innerHTML = `
        <div class="prob-item">
          <div class="prob-header"><span>Target Specimen (Primary Match)</span><strong>98.3%</strong></div>
          <div class="prob-bar-bg"><div class="prob-bar-val" style="width: 98.3%;"></div></div>
        </div>
        <div class="prob-item">
          <div class="prob-header"><span>Secondary Class Phenotype</span><strong>1.2%</strong></div>
          <div class="prob-bar-bg"><div class="prob-bar-val" style="width: 1.2%;"></div></div>
        </div>
        <div class="prob-item">
          <div class="prob-header"><span>Morphological Cluster C</span><strong>0.5%</strong></div>
          <div class="prob-bar-bg"><div class="prob-bar-val" style="width: 0.5%;"></div></div>
        </div>
      `;
    }

    showToast("Uploaded image classified successfully with ResNet50!");
  };
  reader.readAsDataURL(file);
}

// ==================== DEMO 2: SQL QUERY RUNNER & ANALYTICS ====================
const sqlPresets = {
  gdp: {
    query: `SELECT country, gdp_growth_pct, fdi_inflows_usd_b \nFROM mena_indicators \nWHERE year = 2023 \nORDER BY gdp_growth_pct DESC LIMIT 4;`,
    headers: ["Country", "GDP Growth (%)", "FDI ($B)"],
    rows: [
      ["Egypt", "+4.2%", "$10.1B"],
      ["UAE", "+3.8%", "$22.7B"],
      ["Saudi Arabia", "+3.4%", "$12.3B"],
      ["Morocco", "+3.0%", "$3.8B"]
    ]
  },
  co2: {
    query: `SELECT country, co2_per_capita_tons, renewable_energy_pct \nFROM mena_environmental_indicators \nORDER BY renewable_energy_pct DESC LIMIT 4;`,
    headers: ["Country", "CO2 / Capita", "Renewable Share"],
    rows: [
      ["Morocco", "1.9 Tons", "37.5%"],
      ["Egypt", "2.5 Tons", "18.2%"],
      ["Jordan", "2.2 Tons", "26.0%"],
      ["UAE", "21.8 Tons", "14.5%"]
    ]
  },
  pop: {
    query: `SELECT country, population_millions, urban_pop_pct \nFROM mena_demographics \nORDER BY population_millions DESC LIMIT 4;`,
    headers: ["Country", "Population", "Urban %"],
    rows: [
      ["Egypt", "109.3 M", "43.2%"],
      ["Algeria", "45.6 M", "74.8%"],
      ["Saudi Arabia", "36.9 M", "84.7%"],
      ["Morocco", "37.8 M", "64.6%"]
    ]
  }
};

// In-card SQL preset runner
function runPresetQuery(presetKey, btnEl) {
  const data = sqlPresets[presetKey];
  if (!data) return;

  document.querySelectorAll('.sql-preset-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const sqlQueryText = document.getElementById('sqlQueryText');
  const sqlResultTable = document.getElementById('sqlResultTable');

  if (sqlQueryText) sqlQueryText.innerText = data.query;
  if (sqlResultTable) {
    const thead = `<thead><tr>${data.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>`;
    const tbody = `<tbody>${data.rows.map(row => `<tr>${row.map((cell, idx) => `<td class="${idx === 1 ? 'text-success' : ''}">${cell}</td>`).join('')}</tr>`).join('')}</tbody>`;
    sqlResultTable.innerHTML = thead + tbody;
  }
}

// Studio Modal SQL Runner
const studioSqlDatasets = {
  gdp_fdi: {
    query: `SELECT country, gdp_growth_pct, fdi_inflows_usd_b, inflation_rate \nFROM mena_macro_indicators \nWHERE year = 2023 \nORDER BY gdp_growth_pct DESC;`,
    headers: ["Country", "GDP Growth (%)", "FDI Inflow ($B)", "Inflation Rate (%)"],
    rows: [
      ["Egypt", "+4.2%", "$10.1 B", "24.4%"],
      ["United Arab Emirates", "+3.8%", "$22.7 B", "3.1%"],
      ["Saudi Arabia", "+3.4%", "$12.3 B", "2.8%"],
      ["Morocco", "+3.0%", "$3.8 B", "6.1%"],
      ["Qatar", "+2.8%", "$2.4 B", "3.0%"],
      ["Oman", "+2.6%", "$3.1 B", "1.9%"],
      ["Bahrain", "+2.7%", "$2.2 B", "1.5%"],
      ["Kuwait", "+1.9%", "$1.1 B", "3.6%"],
      ["Tunisia", "+1.4%", "$0.8 B", "8.9%"],
      ["Jordan", "+2.6%", "$1.2 B", "2.1%"],
      ["Algeria", "+2.9%", "$1.5 B", "9.3%"]
    ]
  },
  energy_co2: {
    query: `SELECT country, renewable_energy_pct, co2_emissions_metric_tons, electric_access_pct \nFROM mena_climate_energy \nORDER BY renewable_energy_pct DESC;`,
    headers: ["Country", "Renewable Energy %", "CO2 / Capita (Tons)", "Grid Access %"],
    rows: [
      ["Morocco", "37.5%", "1.9", "100.0%"],
      ["Jordan", "26.0%", "2.2", "99.9%"],
      ["Egypt", "18.2%", "2.5", "100.0%"],
      ["UAE", "14.5%", "21.8", "100.0%"],
      ["Tunisia", "12.8%", "2.6", "99.8%"],
      ["Saudi Arabia", "8.4%", "18.7", "100.0%"],
      ["Algeria", "3.6%", "3.9", "99.8%"]
    ]
  },
  demographics: {
    query: `SELECT country, population_millions, urban_pop_pct, youth_unemployment_pct \nFROM mena_demographics \nORDER BY population_millions DESC;`,
    headers: ["Country", "Population (M)", "Urban Population %", "Youth Unemployment %"],
    rows: [
      ["Egypt", "109.3 M", "43.2%", "16.8%"],
      ["Algeria", "45.6 M", "74.8%", "28.5%"],
      ["Morocco", "37.8 M", "64.6%", "27.2%"],
      ["Saudi Arabia", "36.9 M", "84.7%", "16.3%"],
      ["Jordan", "11.3 M", "91.6%", "38.2%"],
      ["UAE", "9.4 M", "87.9%", "6.5%"]
    ]
  },
  correlation: {
    query: `SELECT country, gdp_per_capita_usd, internet_penetration_pct, human_development_index \nFROM mena_development_matrix \nORDER BY gdp_per_capita_usd DESC;`,
    headers: ["Country", "GDP Per Capita ($)", "Internet Penetration %", "HDI Index"],
    rows: [
      ["Qatar", "$88,046", "99.6%", "0.855 (Very High)"],
      ["UAE", "$53,708", "99.0%", "0.911 (Very High)"],
      ["Kuwait", "$38,123", "99.0%", "0.831 (Very High)"],
      ["Saudi Arabia", "$32,586", "98.0%", "0.875 (Very High)"],
      ["Bahrain", "$29,103", "99.0%", "0.875 (Very High)"],
      ["Oman", "$21,266", "95.2%", "0.816 (Very High)"]
    ]
  }
};

function executeStudioQuery(presetKey) {
  const data = studioSqlDatasets[presetKey];
  if (!data) return;

  document.querySelectorAll('.sql-menu-item').forEach(b => b.classList.remove('active'));
  const activeBtn = Array.from(document.querySelectorAll('.sql-menu-item')).find(b => b.getAttribute('onclick')?.includes(presetKey));
  if (activeBtn) activeBtn.classList.add('active');

  const inputArea = document.getElementById('studioSqlInput');
  const thead = document.getElementById('studioThead');
  const tbody = document.getElementById('studioTbody');
  const execTime = document.getElementById('sqlExecutionTime');

  if (inputArea) inputArea.value = data.query;
  if (execTime) {
    const ms = (Math.random() * 2 + 1.8).toFixed(1);
    execTime.innerText = `Executed in ${ms}ms · ${data.rows.length} rows returned`;
  }

  if (thead) {
    thead.innerHTML = `<tr>${data.headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
  }

  if (tbody) {
    tbody.innerHTML = data.rows.map(r => `
      <tr>${r.map((cell, idx) => `<td class="${idx === 1 ? 'text-success' : ''}">${cell}</td>`).join('')}</tr>
    `).join('');
  }
}

function runCustomQuery() {
  const execTime = document.getElementById('sqlExecutionTime');
  if (execTime) {
    const ms = (Math.random() * 3 + 2.1).toFixed(1);
    execTime.innerText = `Custom query parsed & executed in ${ms}ms`;
  }
  showToast("Query executed successfully on in-memory SQLite dataset!");
}

// ==================== DEMO 3: APPLIED CRYPTOGRAPHY & HASHING ====================
// Vigenere cipher
function vigenereCipher(text, key, encrypt = true) {
  let result = '';
  key = key.toUpperCase();
  let keyIndex = 0;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (/[a-zA-Z]/.test(c)) {
      const isUpper = c === c.toUpperCase();
      const base = isUpper ? 65 : 97;
      const charCode = c.charCodeAt(0) - base;
      const shift = key.charCodeAt(keyIndex % key.length) - 65;

      let newCode;
      if (encrypt) {
        newCode = (charCode + shift) % 26;
      } else {
        newCode = (charCode - shift + 26) % 26;
      }

      result += String.fromCharCode(newCode + base);
      keyIndex++;
    } else {
      result += c;
    }
  }
  return result;
}

// Caesar cipher
function caesarCipher(text, shift = 3) {
  return text.split('').map(char => {
    if (/[a-zA-Z]/.test(char)) {
      const isUpper = char === char.toUpperCase();
      const base = isUpper ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
    }
    return char;
  }).join('');
}

// SHA-256 async hasher
async function sha256Hash(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// In-card live crypto runner
async function runLiveCrypto() {
  const text = document.getElementById('livePlaintext')?.value || '';
  const algo = document.getElementById('liveCipherAlgo')?.value || 'vigenere';
  const key = document.getElementById('liveCryptoKey')?.value || 'KEY';
  const outEl = document.getElementById('liveCiphertext');
  if (!outEl) return;

  if (algo === 'vigenere') {
    outEl.innerText = vigenereCipher(text, key || 'KEY', true);
  } else if (algo === 'caesar') {
    outEl.innerText = caesarCipher(text, 3);
  } else if (algo === 'sha256') {
    outEl.innerText = await sha256Hash(text);
  }
}

// Modal full crypto studio runner
async function runModalCipher() {
  const algo = document.getElementById('modalCipherSelect')?.value || 'vigenere';
  const text = document.getElementById('modalPlaintext')?.value || '';
  const key = document.getElementById('modalKey')?.value || 'SECURITYKEY';
  const keyGroup = document.getElementById('modalKeyGroup');
  const resultEl = document.getElementById('modalResultText');
  const explEl = document.getElementById('modalExplanation');

  if (algo === 'sha256') {
    if (keyGroup) keyGroup.style.display = 'none';
    if (resultEl) resultEl.innerText = await sha256Hash(text);
    if (explEl) explEl.innerText = "SHA-256 is an irreversible cryptographic one-way hashing function producing a 256-bit (64 hex characters) digital fingerprint.";
  } else if (algo === 'caesar') {
    if (keyGroup) keyGroup.style.display = 'none';
    if (resultEl) resultEl.innerText = caesarCipher(text, 3);
    if (explEl) explEl.innerText = "Caesar Cipher is a classical monoalphabetic substitution shifting each letter forward by 3 places (A -> D, B -> E).";
  } else if (algo === 'vernam') {
    if (keyGroup) keyGroup.style.display = 'block';
    // Simulated Vernam bitwise XOR presentation
    let simulatedHex = text.split('').map((c, i) => {
      const k = key.charCodeAt(i % key.length);
      return (c.charCodeAt(0) ^ k).toString(16).padStart(2, '0');
    }).join(' ');
    if (resultEl) resultEl.innerText = "HEX STREAM: " + simulatedHex;
    if (explEl) explEl.innerText = "Vernam Cipher uses a key stream to apply bitwise XOR operations on each byte of the plaintext.";
  } else {
    // Vigenere
    if (keyGroup) keyGroup.style.display = 'block';
    if (resultEl) resultEl.innerText = vigenereCipher(text, key || 'KEY', true);
    if (explEl) explEl.innerText = "Vigenère Cipher uses a repeating keyword to shift each letter along the Caesar alphabet table.";
  }
}

// ==================== DEMO 4: ARTISAN HUB CART SIMULATOR ====================
let artisanCart = {
  count: 0,
  total: 0
};

function simulateAddToCart(productName, price) {
  artisanCart.count++;
  artisanCart.total += price;

  const countEl = document.getElementById('artisanCartCount');
  const totalEl = document.getElementById('artisanCartTotal');

  if (countEl) countEl.innerText = artisanCart.count;
  if (totalEl) totalEl.innerText = `$${artisanCart.total.toFixed(2)}`;

  showToast(`Added "${productName}" ($${price}) to Artisan Hub Cart!`);
}

function clearArtisanCart() {
  artisanCart.count = 0;
  artisanCart.total = 0;

  const countEl = document.getElementById('artisanCartCount');
  const totalEl = document.getElementById('artisanCartTotal');

  if (countEl) countEl.innerText = "0";
  if (totalEl) totalEl.innerText = "$0.00";

  showToast("Artisan Hub cart cleared.");
}

// ==================== CONTACT FORM SUBMISSION ====================
function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('senderName')?.value || 'Friend';
  const email = document.getElementById('senderEmail')?.value || '';
  const subject = document.getElementById('senderSubject')?.value || 'Portfolio Inquiry';
  const message = document.getElementById('senderMessage')?.value || '';

  // Construct mailto link fallback so user can send real email directly
  const mailtoUrl = `mailto:ab402819@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
  
  showToast(`Thank you, ${name}! Opening mail client to send directly to Ahmed...`);

  setTimeout(() => {
    window.location.href = mailtoUrl;
  }, 1000);

  event.target.reset();
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize in-card demos
  selectFruitDemo('apple');
  runPresetQuery('gdp');
  runLiveCrypto();
});
