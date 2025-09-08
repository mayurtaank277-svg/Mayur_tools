/* ---------------------------
   Tools Metadata & rendering
   --------------------------- */
const tools = [
  { id: "loan", title: "Loan Calculator", category: "Calculator", description: "Calculate EMI for loans." },
  { id: "bmi", title: "BMI Calculator", category: "Calculator", description: "Calculate Body Mass Index." },
  { id: "age", title: "Age Calculator", category: "Calculator", description: "Find your exact age." },
  { id: "percentage", title: "Percentage Calculator", category: "Calculator", description: "Find percentage values." },
  { id: "tip", title: "Tip Calculator", category: "Calculator", description: "Calculate tips easily." },

  { id: "length", title: "Length Converter", category: "Converter", description: "Convert meters, km, miles, etc." },
  { id: "weight", title: "Weight Converter", category: "Converter", description: "Convert grams, kg, pounds, etc." },
  { id: "temperature", title: "Temperature Converter", category: "Converter", description: "Celsius, Fahrenheit, Kelvin." },

  { id: "wordcount", title: "Word Counter", category: "Text Utility", description: "Count words in text." },
  { id: "case", title: "Case Converter", category: "Text Utility", description: "Convert text case." },
  { id: "charcount", title: "Character Counter", category: "Text Utility", description: "Count characters in text." },
  { id: "reverse", title: "Text Reverser", category: "Text Utility", description: "Reverse your text." },

  { id: "password", title: "Password Generator", category: "Random Generator", description: "Generate random passwords." },
  { id: "randomnum", title: "Random Number", category: "Random Generator", description: "Generate a random number." },
  { id: "uuid", title: "UUID Generator", category: "Random Generator", description: "Generate unique IDs." },
  { id: "coin", title: "Coin Toss", category: "Random Generator", description: "Flip a coin." },
  { id: "qr", title: "QR Code Generator", category: "Random Generator", description: "Generate QR codes." },

  { id: "resizer", title: "Image Resizer", category: "Image Tool", description: "Resize an image." },
  { id: "compressor", title: "Image Compressor", category: "Image Tool", description: "Compress images." }
];

const grid = document.getElementById("toolsGrid");
const toolContainer = document.getElementById("toolContainer");

function renderTools(list) {
  grid.innerHTML = "";
  list.forEach(t => {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("role", "listitem");
    card.innerHTML = `<h3>${escapeHtml(t.title)}</h3><p>${escapeHtml(t.description)}</p>`;
    card.addEventListener("click", () => loadTool(t.id));
    grid.appendChild(card);
  });
}
renderTools(tools);

/* Safe text escape for innerHTML usage above */
function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

/* ---------------------------
   Search & Category Filter
   --------------------------- */
document.getElementById("search").addEventListener("input", filterTools);
document.getElementById("categoryFilter").addEventListener("change", filterTools);

function filterTools() {
  const q = document.getElementById("search").value.trim().toLowerCase();
  const cat = document.getElementById("categoryFilter").value;
  const filtered = tools.filter(t => {
    const matchesQ = t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
    const matchesCat = cat === "all" ? true : t.category === cat;
    return matchesQ && matchesCat;
  });
  renderTools(filtered);
}

/* ---------------------------
   Tool Loader: injects HTML for each tool
   --------------------------- */
function loadTool(id) {
  // Clear previous listeners/state by replacing content
  toolContainer.innerHTML = ""; 
  switch (id) {
    case "loan":
      toolContainer.innerHTML = `
        <h2>Loan Calculator</h2>
        <input id="loanAmount" type="number" placeholder="Loan Amount (principal)" />
        <input id="interestRate" type="number" placeholder="Annual Interest Rate (%)" />
        <input id="years" type="number" placeholder="Years" />
        <button id="loanCalcBtn">Calculate EMI</button>
        <div id="loanResult" class="tool-output" aria-live="polite"></div>`;
      document.getElementById("loanCalcBtn").addEventListener("click", calculateLoan);
      break;

    case "bmi":
      toolContainer.innerHTML = `
        <h2>BMI Calculator</h2>
        <input id="bmiWeight" type="number" placeholder="Weight (kg)" />
        <input id="bmiHeight" type="number" placeholder="Height (cm)" />
        <button id="bmiCalcBtn">Calculate BMI</button>
        <div id="bmiResult" class="tool-output" aria-live="polite"></div>`;
      document.getElementById("bmiCalcBtn").addEventListener("click", calculateBMI);
      break;

    case "age":
      toolContainer.innerHTML = `
        <h2>Age Calculator</h2>
        <input id="dob" type="date" />
        <button id="ageCalcBtn">Calculate Age</button>
        <div id="ageResult" class="tool-output" aria-live="polite"></div>`;
      document.getElementById("ageCalcBtn").addEventListener("click", calculateAge);
      break;

    case "percentage":
      toolContainer.innerHTML = `
        <h2>Percentage Calculator</h2>
        <input id="part" type="number" placeholder="Part value" />
        <input id="whole" type="number" placeholder="Whole value" />
        <button id="percentBtn">Calculate Percentage</button>
        <div id="percentResult" class="tool-output" aria-live="polite"></div>`;
      document.getElementById("percentBtn").addEventListener("click", calculatePercentage);
      break;

    case "tip":
      toolContainer.innerHTML = `
        <h2>Tip Calculator</h2>
        <input id="bill" type="number" placeholder="Bill Amount" />
        <input id="tipPercent" type="number" placeholder="Tip % (e.g., 15)" />
        <button id="tipBtn">Calculate Tip</button>
        <div id="tipResult" class="tool-output" aria-live="polite"></div>`;
      document.getElementById("tipBtn").addEventListener("click", calculateTip);
      break;

    case "length":
      toolContainer.innerHTML = `
        <h2>Length Converter</h2>
        <input id="meters" type="number" placeholder="Meters" />
        <button id="lenBtn">Convert</button>
        <div id="lengthResult" class="tool-output" aria-live="polite"></div>`;
      document.getElementById("lenBtn").addEventListener("click", convertLength);
      break;

    case "weight":
      toolContainer.innerHTML = `
        <h2>Weight Converter</h2>
        <input id="kg" type="number" placeholder="Kilograms" />
        <button id="wtBtn">Convert</button>
        <div id="weightResult" class="tool-output" aria-live="polite"></div>`;
      document.getElementById("wtBtn").addEventListener("click", convertWeight);
      break;

    case "temperature":
      toolContainer.innerHTML = `
        <h2>Temperature Converter</h2>
        <input id="celsius" type="number" placeholder="Celsius" />
        <button id="tempBtn">Convert</button>
        <div id="tempResult" class="tool-output" aria-live="polite"></div>`;
      document.getElementById("tempBtn").addEventListener("click", convertTemp);
      break;

    case "wordcount":
      toolContainer.innerHTML = `
        <h2>Word Counter</h2>
        <textarea id="wordText" placeholder="Paste or type text here..."></textarea>
        <button id="wordBtn">Count Words</button>
        <div id="wordResult" class="tool-output" aria-live="polite"></div>`;
      document.getElementById("wordBtn").addEventListener("click", countWords);
      break;

    case "case":
      toolContainer.innerHTML = `
        <h2>Case Converter</h2>
        <textarea id="caseText" placeholder="Text to convert..."></textarea>
        <button id="upperBtn">UPPERCASE</button>
        <button id="lowerBtn">lowercase</button>
        <div id="caseResult" class="tool-output" aria-live="polite"></div>`;
      document.getElementById("upperBtn").addEventListener("click", toUpperCaseText);
      document.getElementById("lowerBtn").addEventListener("click", toLowerCaseText);
      break;

    case "charcount":
      toolContainer.innerHTML = `
        <h2>Character Counter</h2>
        <textarea id="charText" placeholder="Type text..."></textarea>
        <button id="charBtn">Count Characters</button>
        <div id="charResult" class="tool-output" aria-live="polite"></div>`;
      document.getElementById("charBtn").addEventListener("click", countChars);
      break;

    case "reverse":
      toolContainer.innerHTML = `
        <h2>Text Reverser</h2>
        <textarea id="reverseText" placeholder="Text to reverse..."></textarea>
        <button id="revBtn">Reverse Text</button>
        <div id="reverseResult" class="tool-output" aria-live="polite"></div>`;
      document.getElementById("revBtn").addEventListener("click", reverseText);
      break;

    case "password":
      toolContainer.innerHTML = `
        <h2>Password Generator</h2>
        <input id="passLength" type="number" placeholder="Length (e.g., 12)" />
        <button id="passBtn">Generate Password</button>
        <div id="passwordResult" class="tool-output" aria-live="polite"></div>`;
      document.getElementById("passBtn").addEventListener("click", generatePassword);
      break;

    case "randomnum":
      toolContainer.innerHTML = `
        <h2>Random Number Generator</h2>
        <input id="minNum" type="number" placeholder="Min" />
        <input id="maxNum" type="number" placeholder="Max" />
        <button id="randBtn">Generate</button>
        <div id="randomResult" class="tool-output" aria-live="polite"></div>`;
      document.getElementById("randBtn").addEventListener("click", randomNumber);
      break;

    case "uuid":
      toolContainer.innerHTML = `
        <h2>UUID (v4) Generator</h2>
        <button id="uuidBtn">Generate UUID</button>
        <div id="uuidResult" class="tool-output" aria-live="polite"></div>`;
      document.getElementById("uuidBtn").addEventListener("click", generateUUID);
      break;

    case "coin":
      toolContainer.innerHTML = `
        <h2>Coin Toss</h2>
        <button id="coinBtn">Flip Coin</button>
        <div id="coinResult" class="tool-output" aria-live="polite"></div>`;
      document.getElementById("coinBtn").addEventListener("click", coinToss);
      break;

    case "qr":
      toolContainer.innerHTML = `
        <h2>QR Code Generator</h2>
        <input id="qrText" type="text" placeholder="Enter text or URL" />
        <button id="qrBtn">Generate QR</button>
        <div id="qrResult" class="tool-output" aria-live="polite"></div>`;
      document.getElementById("qrBtn").addEventListener("click", generateQR);
      break;

    case "resizer":
      toolContainer.innerHTML = `
        <h2>Image Resizer</h2>
        <input id="resizeFile" type="file" accept="image/*" />
        <input id="resizeWidth" type="number" placeholder="New width (px)" />
        <input id="resizeHeight" type="number" placeholder="New height (px)" />
        <button id="resizeBtn">Resize</button>
        <div class="tool-output"><canvas id="resizeCanvas"></canvas></div>`;
      document.getElementById("resizeBtn").addEventListener("click", resizeImage);
      break;

    case "compressor":
      toolContainer.innerHTML = `
        <h2>Image Compressor</h2>
        <input id="compressFile" type="file" accept="image/*" />
        <input id="quality" type="number" step="0.1" min="0.1" max="1" placeholder="Quality (0.1 - 1.0)" />
        <button id="compressBtn">Compress</button>
        <div class="tool-output"><canvas id="compressCanvas"></canvas></div>`;
      document.getElementById("compressBtn").addEventListener("click", compressImage);
      break;

    default:
      toolContainer.innerHTML = `<p>Tool not found.</p>`;
  }
}

/* ---------------------------
   Tool Implementations
   --------------------------- */

function calculateLoan() {
  const p = Number(document.getElementById("loanAmount").value);
  const annualRate = Number(document.getElementById("interestRate").value);
  const years = Number(document.getElementById("years").value);

  if (!p || !annualRate || !years) {
    document.getElementById("loanResult").innerText = "Please enter valid principal, rate and years.";
    return;
  }
  const r = annualRate / 100 / 12; // monthly rate
  const n = years * 12;
  // EMI formula
  const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  document.getElementById("loanResult").innerText = `EMI: ${emi.toFixed(2)} (Monthly)`;
}

function calculateBMI() {
  const w = Number(document.getElementById("bmiWeight").value);
  const hcm = Number(document.getElementById("bmiHeight").value);
  if (!w || !hcm) {
    document.getElementById("bmiResult").innerText = "Please enter weight and height.";
    return;
  }
  const h = hcm / 100;
  const bmi = w / (h * h);
  let cat = "Normal";
  if (bmi < 18.5) cat = "Underweight";
  else if (bmi >= 25) cat = "Overweight";
  document.getElementById("bmiResult").innerText = `BMI: ${bmi.toFixed(2)} — ${cat}`;
}

function calculateAge() {
  const dobVal = document.getElementById("dob").value;
  if (!dobVal) {
    document.getElementById("ageResult").innerText = "Please choose a date.";
    return;
  }
  const dob = new Date(dobVal);
  const now = new Date();
  if (dob > now) {
    document.getElementById("ageResult").innerText = "Date of birth can't be in the future.";
    return;
  }
  let years = now.getFullYear() - dob.getFullYear();
  let months = now.getMonth() - dob.getMonth();
  let days = now.getDate() - dob.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  document.getElementById("ageResult").innerText = `${years} years, ${months} months, ${days} days`;
}

function calculatePercentage() {
  const part = Number(document.getElementById("part").value);
  const whole = Number(document.getElementById("whole").value);
  if (isNaN(part) || isNaN(whole) || whole === 0) {
    document.getElementById("percentResult").innerText = "Please enter valid numbers (whole ≠ 0).";
    return;
  }
  const percent = (part / whole) * 100;
  document.getElementById("percentResult").innerText = `${percent.toFixed(2)}%`;
}

function calculateTip() {
  const bill = Number(document.getElementById("bill").value);
  const tipPercent = Number(document.getElementById("tipPercent").value);
  if (isNaN(bill) || isNaN(tipPercent)) {
    document.getElementById("tipResult").innerText = "Please enter a bill and tip percent.";
    return;
  }
  const tip = (bill * tipPercent) / 100;
  const total = bill + tip;
  document.getElementById("tipResult").innerText = `Tip: ${tip.toFixed(2)} — Total: ${total.toFixed(2)}`;
}

function convertLength() {
  const m = Number(document.getElementById("meters").value);
  if (isNaN(m)) {
    document.getElementById("lengthResult").innerText = "Enter a valid number (meters).";
    return;
  }
  const km = m / 1000;
  const miles = m * 0.000621371;
  const ft = m * 3.28084;
  document.getElementById("lengthResult").innerText = `${m} m = ${km.toFixed(4)} km | ${miles.toFixed(4)} mi | ${ft.toFixed(2)} ft`;
}

function convertWeight() {
  const kg = Number(document.getElementById("kg").value);
  if (isNaN(kg)) {
    document.getElementById("weightResult").innerText = "Enter a valid number (kg).";
    return;
  }
  const lbs = kg * 2.20462;
  const g = kg * 1000;
  document.getElementById("weightResult").innerText = `${kg} kg = ${lbs.toFixed(2)} lb | ${g.toFixed(0)} g`;
}

function convertTemp() {
  const c = Number(document.getElementById("celsius").value);
  if (isNaN(c)) {
    document.getElementById("tempResult").innerText = "Enter a valid Celsius temperature.";
    return;
  }
  const f = (c * 9/5) + 32;
  const k = c + 273.15;
  document.getElementById("tempResult").innerText = `${c} °C = ${f.toFixed(2)} °F | ${k.toFixed(2)} K`;
}

function countWords() {
  const text = document.getElementById("wordText").value.trim();
  if (!text) {
    document.getElementById("wordResult").innerText = "Words: 0";
    return;
  }
  const words = text.split(/\s+/).filter(Boolean).length;
  document.getElementById("wordResult").innerText = `Words: ${words}`;
}

function toUpperCaseText() {
  const t = document.getElementById("caseText").value;
  document.getElementById("caseResult").innerText = t.toUpperCase();
}

function toLowerCaseText() {
  const t = document.getElementById("caseText").value;
  document.getElementById("caseResult").innerText = t.toLowerCase();
}

function countChars() {
  const t = document.getElementById("charText").value;
  document.getElementById("charResult").innerText = `Characters: ${t.length}`;
}

function reverseText() {
  const t = document.getElementById("reverseText").value;
  document.getElementById("reverseResult").innerText = t.split("").reverse().join("");
}

function generatePassword() {
  const len = Number(document.getElementById("passLength").value) || 12;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{};:,.<>?";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  document.getElementById("passwordResult").innerText = out;
}

function randomNumber() {
  const min = Number(document.getElementById("minNum").value);
  const max = Number(document.getElementById("maxNum").value);
  if (!Number.isFinite(min) || !Number.isFinite(max) || max < min) {
    document.getElementById("randomResult").innerText = "Enter valid min and max (max ≥ min).";
    return;
  }
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  document.getElementById("randomResult").innerText = `Result: ${result}`;
}

function generateUUID() {
  // RFC4122 v4 style
  const uuid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
  document.getElementById("uuidResult").innerText = uuid;
}

function coinToss() {
  const res = Math.random() < 0.5 ? "Heads" : "Tails";
  document.getElementById("coinResult").innerText = res;
}

function generateQR() {
  const text = document.getElementById("qrText").value.trim();
  const out = document.getElementById("qrResult");
  out.innerHTML = "";
  if (!text) {
    out.innerText = "Enter text or URL to generate a QR code.";
    return;
  }
  // Use api.qrserver.com (public free API)
  // encodeURIComponent to safely pass data
  const size = "200x200";
  const src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${encodeURIComponent(text)}`;
  const img = document.createElement("img");
  img.alt = "QR code";
  img.src = src;
  img.width = 200;
  img.height = 200;
  out.appendChild(img);
}

/* ---------------------------
   Image Tools (resizer, compressor)
   --------------------------- */

function resizeImage() {
  const fileInput = document.getElementById("resizeFile");
  const width = Number(document.getElementById("resizeWidth").value);
  const height = Number(document.getElementById("resizeHeight").value);
  const canvas = document.getElementById("resizeCanvas");
  const ctx = canvas.getContext("2d");

  if (!fileInput.files || fileInput.files.length === 0) {
    alert("Please choose an image file.");
    return;
  }
  const file = fileInput.files[0];
  const img = new Image();
  const reader = new FileReader();
  reader.onload = (e) => {
    img.onload = function() {
      const targetW = width > 0 ? width : img.width;
      const targetH = height > 0 ? height : img.height;
      canvas.width = targetW;
      canvas.height = targetH;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, targetW, targetH);
      // Keep displayed size responsive via CSS; no further action required.
    };
    img.onerror = function() {
      alert("Invalid image file.");
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function compressImage() {
  const fileInput = document.getElementById("compressFile");
  const qualityInput = Number(document.getElementById("quality").value);
  const quality = (Number.isFinite(qualityInput) && qualityInput > 0 && qualityInput <= 1) ? qualityInput : 0.8;
  const canvas = document.getElementById("compressCanvas");
  const ctx = canvas.getContext("2d");

  if (!fileInput.files || fileInput.files.length === 0) {
    alert("Please choose an image file.");
    return;
  }
  const file = fileInput.files[0];
  const img = new Image();
  const reader = new FileReader();
  reader.onload = (e) => {
    img.onload = function() {
      // draw at original size
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      // show compressed image as data URL (JPEG)
      const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
      // show compressed result by replacing canvas image content
      const tempImg = new Image();
      tempImg.onload = function() {
        // draw compressed image back to canvas scaled to same size
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);
        // also provide a download link
        showDownloadLink(compressedDataUrl, file.name);
      };
      tempImg.src = compressedDataUrl;
    };
    img.onerror = function() {
      alert("Invalid image file.");
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function showDownloadLink(dataUrl, originalName) {
  // remove existing link if present
  const existing = document.getElementById("downloadCompressed");
  if (existing) existing.remove();

  const link = document.createElement("a");
  link.id = "downloadCompressed";
  link.href = dataUrl;
  link.download = `compressed_${originalName.replace(/\s+/g,'_') || 'image.jpg'}`;
  link.textContent = "Download compressed image";
  link.style.display = "inline-block";
  link.style.marginTop = "8px";
  link.style.color = "#fff";
  toolContainer.appendChild(link);
}

/* ---------------------------
   End of script
   --------------------------- */
