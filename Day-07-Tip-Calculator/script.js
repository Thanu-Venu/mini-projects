const billEl = document.getElementById('bill');
const peopleEl = document.getElementById('people');
const taxEl = document.getElementById('tax');

const tipButtons = Array.from(document.querySelectorAll('.tip-btn'));
const customTipEl = document.getElementById('customTip');
const tipSlider = document.getElementById('tipSlider');
const tipSliderValue = document.getElementById('tipSliderValue');

const tipAmountEl = document.getElementById('tipAmount');
const totalAmountEl = document.getElementById('totalAmount');

const roundUpEl = document.getElementById('roundUp');
const saveDataEl = document.getElementById('saveData');
const resetBtn = document.getElementById('resetBtn');
const copyBtn = document.getElementById('copyBtn');

const themeSwitch = document.getElementById('themeSwitch');
const body = document.body;

const billError = document.getElementById('billError');
const peopleError = document.getElementById('peopleError');

// Keys
const STORAGE_KEY = 'tipCalcData_v1';
const THEME_KEY = 'tipCalcTheme_v1';

// App state
let currentTip = parseFloat(tipSlider.value) || 15; // percent
let lastSaved = null;

// UTIL: format money
function fmt(v){
  // show two decimals always
  return Number(v).toFixed(2);
}

// UTIL: show/hide error
function showError(el, show){
  if(show){ el.classList.remove('hidden'); }
  else { el.classList.add('hidden'); }
}

// Set active tip button by percent (if matches).
function setActiveButtonByPercent(p){
  let matched = false;
  tipButtons.forEach(btn=>{
    const val = parseFloat(btn.dataset.tip);
    if(!isNaN(val) && Number(val) === Number(p)){
      btn.classList.add('active'); matched = true;
    } else btn.classList.remove('active');
  });
  if(!matched){
    tipButtons.forEach(b=>b.classList.remove('active'));
  }
}

// CALCULATION
function calculateAndRender(save=false){
  const bill = parseFloat(billEl.value) || 0;
  const people = parseInt(peopleEl.value, 10) || 0;
  const taxPercent = parseFloat(taxEl.value) || 0;
  const tipPercent = parseFloat(currentTip) || 0;
  const roundUp = roundUpEl.checked;
  const savePref = saveDataEl.checked;

  // Validation
  const billValid = bill > 0;
  const peopleValid = people >= 1;
  showError(billError, !billValid);
  showError(peopleError, !peopleValid);

  if(!billValid || !peopleValid){
    // show zeroed outputs
    tipAmountEl.innerText = "0.00";
    totalAmountEl.innerText = "0.00";
    if(save && savePref) persistState();
    return;
  }

  // Step 1: apply tax before tip
  const taxedTotal = bill + (bill * (taxPercent/100)); // bill + tax
  // Step 2: tip amount is on taxed total
  let tipTotal = taxedTotal * (tipPercent/100);
  let tipPerPerson = tipTotal / people;
  // Step 3: base per-person share (taxed subtotal divided)
  let basePerPerson = taxedTotal / people;
  // Step 4: total per person (before rounding)
  let totalPerPerson = basePerPerson + tipPerPerson;

  // Round-up: if enabled, adjust tip so total per person becomes ceil(totalPerPerson)
  if(roundUp){
    const roundedTotal = Math.ceil(totalPerPerson);
    // recompute tipPerPerson = roundedTotal - basePerPerson
    tipPerPerson = roundedTotal - basePerPerson;
    // in rare precision negatives, clamp
    if(tipPerPerson < 0) tipPerPerson = 0;
    totalPerPerson = roundedTotal;
  }

  // Render
  tipAmountEl.innerText = fmt(tipPerPerson);
  totalAmountEl.innerText = fmt(totalPerPerson);

  // Save if user requested (and if requested by caller)
  if(save && savePref) persistState();
  else if(savePref && !save) persistState(); // also persist whenever enabled to keep consistent
}

// Persist current UI state to localStorage
function persistState(){
  const payload = {
    bill: billEl.value || "",
    people: peopleEl.value || "",
    tax: taxEl.value || "",
    tipPercent: String(currentTip),
    roundUp: roundUpEl.checked,
    saveData: saveDataEl.checked
  };
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }catch(e){
    console.warn('Could not persist state', e);
  }
}

// Load persistent state if available
function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return false;
    const data = JSON.parse(raw);
    // Only load if 'saveData' was enabled when saved
    if(data.saveData !== true) return false;

    if(data.bill !== undefined) billEl.value = data.bill;
    if(data.people !== undefined) peopleEl.value = data.people;
    if(data.tax !== undefined) taxEl.value = data.tax;
    if(data.tipPercent !== undefined){
      currentTip = parseFloat(data.tipPercent) || currentTip;
      tipSlider.value = currentTip;
      tipSliderValue.textContent = currentTip;
      customTipEl.value = Number.isFinite(currentTip) ? currentTip : "";
      setActiveButtonByPercent(currentTip);
    }
    roundUpEl.checked = !!data.roundUp;
    saveDataEl.checked = true;
    return true;
  }catch(e){
    console.warn('Failed to load state', e);
    return false;
  }
}

// Load theme
function loadTheme(){
  try{
    const t = localStorage.getItem(THEME_KEY);
    if(t === 'dark'){
      body.classList.add('dark');
      themeSwitch.checked = true;
      document.documentElement.classList.add('dark');
    }else{
      body.classList.remove('dark');
      themeSwitch.checked = false;
      document.documentElement.classList.remove('dark');
    }
  }catch(e){ }
}

// Event wiring
function wireEvents(){
  // Tip preset buttons
  tipButtons.forEach(btn=>{
    btn.addEventListener('click', () => {
      // get percent
      const p = parseFloat(btn.dataset.tip);
      if(isNaN(p)) return;
      currentTip = p;
      tipSlider.value = currentTip;
      tipSliderValue.textContent = currentTip;
      customTipEl.value = "";
      setActiveButtonByPercent(currentTip);
      calculateAndRender(true);
    });
  });

  // Custom tip input
  customTipEl.addEventListener('input', (e)=>{
    const v = parseFloat(e.target.value);
    if(!isNaN(v)){
      currentTip = v;
      tipSlider.value = currentTip;
      tipSliderValue.textContent = currentTip;
      setActiveButtonByPercent(currentTip); // will remove active if none match
    }else{
      // if empty, don't change slider
    }
    calculateAndRender(true);
  });

  // Tip slider
  tipSlider.addEventListener('input', (e)=>{
    const v = parseFloat(e.target.value);
    currentTip = v;
    tipSliderValue.textContent = v;
    customTipEl.value = v;
    setActiveButtonByPercent(currentTip);
    calculateAndRender(true);
  });

  // Bill / People / Tax inputs
  [billEl, peopleEl, taxEl].forEach(el=>{
    el.addEventListener('input', () => calculateAndRender(true));
  });

  // Round up toggle
  roundUpEl.addEventListener('change', () => calculateAndRender(true));

  // Save data toggle: persist or clear stored data
  saveDataEl.addEventListener('change', ()=>{
    if(saveDataEl.checked){
      // Immediately persist current state
      persistState();
    } else {
      // Remove stored data
      try{ localStorage.removeItem(STORAGE_KEY); }catch(e){}
    }
  });

  // Reset button
  resetBtn.addEventListener('click', ()=>{
    billEl.value = "";
    peopleEl.value = "";
    taxEl.value = "";
    customTipEl.value = "";
    tipSlider.value = 15;
    tipSliderValue.textContent = 15;
    currentTip = 15;
    roundUpEl.checked = false;
    setActiveButtonByPercent(currentTip);
    tipAmountEl.innerText = "0.00";
    totalAmountEl.innerText = "0.00";
    saveDataEl.checked = false;
    showError(billError, false);
    showError(peopleError, false);
    try{ localStorage.removeItem(STORAGE_KEY); }catch(e){}
    calculateAndRender();
  });

  // Copy results
  copyBtn.addEventListener('click', async ()=>{
    const tip = tipAmountEl.innerText;
    const total = totalAmountEl.innerText;
    const txt = `Tip / person: ${tip}\nTotal / person: ${total}`;
    try{
      await navigator.clipboard.writeText(txt);
      copyBtn.textContent = 'Copied ✔';
      setTimeout(()=> copyBtn.textContent = 'Copy', 1400);
    }catch(e){
      copyBtn.textContent = 'Copy failed';
      setTimeout(()=> copyBtn.textContent = 'Copy', 1400);
    }
  });

  // Theme toggle
  themeSwitch.addEventListener('change', ()=>{
    const dark = themeSwitch.checked;
    if(dark){
      body.classList.add('dark');
      document.documentElement.classList.add('dark');
      try{ localStorage.setItem(THEME_KEY,'dark'); }catch(e){}
    } else {
      body.classList.remove('dark');
      document.documentElement.classList.remove('dark');
      try{ localStorage.setItem(THEME_KEY,'light'); }catch(e){}
    }
  });

  // keyboard accessibility: Enter on custom tip commits value
  customTipEl.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter') {
      e.preventDefault();
      calculateAndRender(true);
      customTipEl.blur();
    }
  });

  // initial calculation when typing stops (debounce)
  let debounceTimer;
  [billEl, peopleEl, taxEl, customTipEl].forEach(el=>{
    el.addEventListener('input', ()=>{
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(()=> calculateAndRender(true), 180);
    });
  });
}

// Init
function init(){
  loadTheme();
  const hadSaved = loadState(); // loads only if saveData was true
  // set slider / UI defaults
  tipSliderValue.textContent = tipSlider.value;
  currentTip = parseFloat(tipSlider.value);

  setActiveButtonByPercent(currentTip);

  // wire events and calculate
  wireEvents();
  // initial calc (do not force save unless user opted)
  calculateAndRender(false);
}

init();
