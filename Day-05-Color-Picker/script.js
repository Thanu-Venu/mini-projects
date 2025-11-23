/* Advanced Color Picker - all features added (Option C) */
const el = id=>document.getElementById(id);
const colorPicker = el('colorPicker');
const colorPreview = el('colorPreview');
const colorCodeInput = el('hexInput');
const rgbVal = el('rgbVal');
const hslVal = el('hslVal');
const hsbVal = el('hsbVal');
const copyBtn = el('copyBtn');
const randomBtn = el('randomBtn');
const saveBtn = el('saveBtn');
const paletteList = el('paletteList');
const historyList = el('historyList');
const clearPaletteBtn = el('clearPaletteBtn');
const msg = el('msg');
const themeToggle = el('themeToggle');
const resetBtn = el('resetBtn');
const detectNameBtn = el('detectNameBtn');
const colorNameEl = el('colorName');
const contrastVal = el('contrastVal');
const contrastPass = el('contrastPass');
const hSlider = el('hSlider'), sSlider = el('sSlider'), bSlider = el('bSlider');
const gLeft = el('gLeft'), gRight = el('gRight'), applyGradient = el('applyGradient'), gradientPreview = el('gradientPreview'), gradientCss = el('gradientCss');
const tintsRow = el('tintsRow');
const exportTxtBtn = el('exportTxtBtn'), exportJsonBtn = el('exportJsonBtn'), downloadPaletteBtn = el('downloadPaletteBtn');
const wheelCanvas = el('wheelCanvas'), useWheel = el('useWheel');

/* Utilities */
function hexToRgb(hex){
  hex = hex.replace('#','');
  if(hex.length===3) hex = hex.split('').map(x=>x+x).join('');
  const n = parseInt(hex,16);
  return {r:(n>>16)&255, g:(n>>8)&255, b:n&255};
}
function rgbToHex(r,g,b){
  return "#"+[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('');
}
function rgbToHsl(r,g,b){
  r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b);
  let h,s,l=(max+min)/2;
  if(max===min){h=s=0;}else{
    const d=max-min;
    s = l>0.5? d/(2-max-min) : d/(max+min);
    switch(max){
      case r: h = (g-b)/d + (g<b?6:0); break;
      case g: h = (b-r)/d + 2; break;
      case b: h = (r-g)/d + 4; break;
    }
    h/=6;
  }
  return {h: Math.round(h*360), s: Math.round(s*100), l: Math.round(l*100)};
}
function rgbToHsb(r,g,b){
  r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b), d=max-min;
  const v = max;
  const s = max===0?0:d/max;
  let h=0;
  if(d!==0){
    switch(max){
      case r: h=(g-b)/d + (g<b?6:0); break;
      case g: h=(b-r)/d + 2; break;
      case b: h=(r-g)/d + 4; break;
    }
    h/=6;
  }
  return {h: Math.round(h*360), s: Math.round(s*100), b: Math.round(v*100)};
}
function hsbToRgb(h,s,b){
  s/=100; b/=100; h/=360;
  const i = Math.floor(h*6), f = h*6 - i;
  const p = b * (1 - s), q = b * (1 - f*s), t = b * (1 - (1 - f) * s);
  const vals = [
    [b,t,p],
    [q,b,p],
    [p,b,t],
    [p,q,b],
    [t,p,b],
    [b,p,q]
  ];
  const [r,g,bb] = vals[i%6].map(v=>Math.round(v*255));
  return {r,g,b:bb};
}
function luminance(r,g,b){
  const a=[r,g,b].map(v=>{
    v/=255;
    return v<=0.03928? v/12.92 : Math.pow((v+0.055)/1.055,2.4);
  });
  return 0.2126*a[0] + 0.7152*a[1] + 0.0722*a[2];
}
function contrastRatio(hex1,hex2){
  const a=hexToRgb(hex1), b=hexToRgb(hex2);
  const L1 = luminance(a.r,a.g,a.b), L2 = luminance(b.r,b.g,b.b);
  const light = Math.max(L1,L2), dark=Math.min(L1,L2);
  return (light+0.05)/(dark+0.05);
}

/* Color name dataset (small common list) */
const colorNames = {
  "#000000":"Black","#ffffff":"White","#ff0000":"Red","#00ff00":"Lime","#0000ff":"Blue",
  "#ffff00":"Yellow","#ff00ff":"Magenta","#00ffff":"Cyan","#800000":"Maroon","#808000":"Olive",
  "#008000":"Green","#800080":"Purple","#008080":"Teal","#000080":"Navy","#ffa500":"Orange",
  "#a52a2a":"Brown","#ffc0cb":"Pink","#f0e68c":"Khaki","#708090":"SlateGray","#2f4f4f":"DarkSlateGray"
};
function nearestColorName(hex){
  const t = hexToRgb(hex);
  let best=null, bestD=Infinity;
  for(const k in colorNames){
    const c = hexToRgb(k);
    const d = (t.r-c.r)**2 + (t.g-c.g)**2 + (t.b-c.b)**2;
    if(d<bestD){bestD=d; best=k;}
  }
  return colorNames[best] || 'Unknown';
}

/* State + Storage */
let palette = JSON.parse(localStorage.getItem('palette_v1')||'[]');
let history = JSON.parse(localStorage.getItem('history_v1')||'[]');
let theme = localStorage.getItem('theme_v1') || 'light';
document.documentElement.setAttribute('data-theme', theme);

/* Init */
function setColor(hex){
  if(!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex)) return;
  colorPicker.value = hex;
  colorCodeInput.value = hex;
  colorPreview.style.background = hex;
  const rgb = hexToRgb(hex);
  rgbVal.textContent = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
  const hsl = rgbToHsl(rgb.r,rgb.g,rgb.b);
  hslVal.textContent = `${hsl.h}°, ${hsl.s}%, ${hsl.l}%`;
  const hsb = rgbToHsb(rgb.r,rgb.g,rgb.b);
  hsbVal.textContent = `${hsb.h}°, ${hsb.s}%, ${hsb.b}%`;
  hSlider.value = hsb.h; sSlider.value = hsb.s; bSlider.value = hsb.b;
  updateTintsAndShades(hex);
  updateContrast(hex);
  addHistory(hex);
  colorNameEl.textContent = nearestColorName(hex);
}
setColor(colorPicker.value);

/* Event bindings */
colorPicker.addEventListener('input', e => setColor(e.target.value));
colorCodeInput.addEventListener('change', e => setColor(e.target.value.startsWith('#')? e.target.value : '#'+e.target.value));
copyBtn.addEventListener('click', ()=> {
  navigator.clipboard.writeText(colorCodeInput.value);
  showMsg('Copied HEX');
});
randomBtn.addEventListener('click', ()=> {
  const rnd = '#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');
  setColor(rnd);
});
saveBtn.addEventListener('click', ()=> {
  const hex = colorCodeInput.value;
  if(!palette.includes(hex)){
    palette.unshift(hex);
    if(palette.length>30) palette.pop();
    renderPalette();
    localStorage.setItem('palette_v1', JSON.stringify(palette));
    showMsg('Saved to palette');
  } else showMsg('Already in palette');
});
clearPaletteBtn.addEventListener('click', ()=> {
  palette = [];
  renderPalette();
  localStorage.setItem('palette_v1', JSON.stringify(palette));
  showMsg('Palette cleared');
});
exportTxtBtn.addEventListener('click', ()=> {
  const blob = new Blob([palette.join('\n')],{type:'text/plain'});
  const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='palette.txt'; a.click();
});
exportJsonBtn.addEventListener('click', ()=> {
  const blob = new Blob([JSON.stringify(palette,null,2)],{type:'application/json'});
  const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='palette.json'; a.click();
});
downloadPaletteBtn.addEventListener('click', ()=> {
  downloadPaletteImage();
});
themeToggle.addEventListener('click', ()=> {
  theme = (theme==='light'?'dark':'light');
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme_v1', theme);
});
resetBtn.addEventListener('click', ()=> {
  setColor('#ff5733');
  showMsg('Reset to default');
});
detectNameBtn?.addEventListener('click', ()=> {
  colorNameEl.textContent = nearestColorName(colorCodeInput.value);
  showMsg('Name detected');
});

/* HSB sliders */
[hSlider,sSlider,bSlider].forEach(s=>{
  s.addEventListener('input', ()=> {
    const rgb = hsbToRgb(+hSlider.value, +sSlider.value, +bSlider.value);
    setColor(rgbToHex(rgb.r, rgb.g, rgb.b));
  });
});

/* Gradient */
applyGradient.addEventListener('click', ()=>{
  const left = gLeft.value, right = gRight.value;
  const css = `linear-gradient(90deg, ${left}, ${right})`;
  gradientPreview.style.background = css;
  gradientCss.value = css;
});

/* Tints & Shades */
function updateTintsAndShades(hex){
  const base = hexToRgb(hex);
  tintsRow.innerHTML = '';
  for(let i=1;i<=5;i++){
    const t = {
      r: Math.round(base.r + (255-base.r)*(i/6)),
      g: Math.round(base.g + (255-base.g)*(i/6)),
      b: Math.round(base.b + (255-base.b)*(i/6))
    };
    const s = {
      r: Math.round(base.r*(1 - i/6)),
      g: Math.round(base.g*(1 - i/6)),
      b: Math.round(base.b*(1 - i/6))
    };
    const tHex = rgbToHex(t.r,t.g,t.b), sHex = rgbToHex(s.r,s.g,s.b);
    const divT = document.createElement('div'); divT.className='swatch-mini'; divT.style.background=tHex; divT.title=tHex; divT.onclick=()=>setColor(tHex);
    const divS = document.createElement('div'); divS.className='swatch-mini'; divS.style.background=sHex; divS.title=sHex; divS.onclick=()=>setColor(sHex);
    tintsRow.appendChild(divT); tintsRow.appendChild(divS);
  }
}

/* Palette rendering + drag/drop */
function renderPalette(){
  paletteList.innerHTML = '';
  palette.forEach((hex, idx)=>{
    const sw = document.createElement('div');
    sw.className='swatch'; sw.style.background=hex; sw.draggable=true; sw.dataset.idx=idx;
    sw.innerHTML = `<div class="del">✖</div><div style="position:absolute;bottom:6px;font-size:11px">${hex}</div>`;
    sw.addEventListener('click', ()=> setColor(hex));
    sw.querySelector('.del').addEventListener('click', (ev)=>{
      ev.stopPropagation();
      palette.splice(idx,1);
      renderPalette(); localStorage.setItem('palette_v1', JSON.stringify(palette));
    });
    sw.addEventListener('dragstart', (e)=> {
      e.dataTransfer.setData('text/plain', idx);
    });
    paletteList.appendChild(sw);
  });
}
paletteList.addEventListener('drop', (e)=>{
  const from = +e.dataTransfer.getData('text/plain');
  const toEl = e.target.closest('.swatch');
  const to = toEl? +toEl.dataset.idx : palette.length;
  if(from===to) return;
  const item = palette.splice(from,1)[0];
  palette.splice(to,0,item);
  renderPalette(); localStorage.setItem('palette_v1', JSON.stringify(palette));
});

/* History */
function addHistory(hex){
  if(history[0]===hex) return;
  history.unshift(hex);
  history = history.slice(0,20);
  localStorage.setItem('history_v1', JSON.stringify(history));
  renderHistory();
}
function renderHistory(){
  historyList.innerHTML='';
  history.forEach(h=>{
    const sw = document.createElement('div'); sw.className='swatch'; sw.style.background=h; sw.title=h;
    sw.innerHTML = `<div style="position:absolute;bottom:6px;font-size:11px">${h}</div>`;
    sw.addEventListener('click', ()=> setColor(h));
    historyList.appendChild(sw);
  });
}
renderHistory(); renderPalette();

/* Contrast check */
function updateContrast(hex){
  const white = '#ffffff';
  const black = '#000000';
  const ratioW = contrastRatio(hex, white).toFixed(2);
  const ratioB = contrastRatio(hex, black).toFixed(2);
  const ratio = Math.max(ratioW, ratioB);
  contrastVal.textContent = ratio;
  contrastPass.textContent = ratio>=4.5 ? 'Pass AA' : 'Fail';
}

/* Messages */
let msgTimeout;
function showMsg(t){
  msg.textContent = t;
  clearTimeout(msgTimeout);
  msgTimeout = setTimeout(()=> msg.textContent = '', 2000);
}

/* Wheel (basic implementation: draw spectrum and pick) */
const wctx = wheelCanvas.getContext('2d');
function drawWheel(){
  const cw = wheelCanvas.width, ch = wheelCanvas.height;
  const cx = cw/2, cy = ch/2, r = Math.min(cx,cy)-2;
  const img = wctx.createImageData(cw,ch);
  for(let x=0;x<cw;x++){
    for(let y=0;y<ch;y++){
      const dx = x-cx, dy = y-cy, d = Math.sqrt(dx*dx+dy*dy);
      const idx = (y*cw + x)*4;
      if(d>r){ img.data[idx+3]=0; continue; }
      const angle = Math.atan2(dy,dx);
      const hue = (angle/(2*Math.PI) + 0.5)*360;
      const sat = d/r;
      const {r:rr, g:gg, b:bb} = hsbToRgb(hue, sat*100, 100);
      img.data[idx]=rr; img.data[idx+1]=gg; img.data[idx+2]=bb; img.data[idx+3]=255;
    }
  }
  wctx.putImageData(img,0,0);
}
wheelCanvas.addEventListener('click', (e)=>{
  const rect = wheelCanvas.getBoundingClientRect();
  const x = e.clientX - rect.left, y = e.clientY - rect.top;
  const cx = wheelCanvas.width/2, cy = wheelCanvas.height/2;
  const dx = x-cx, dy = y-cy, d = Math.sqrt(dx*dx+dy*dy);
  const r = Math.min(cx,cy)-2;
  if(d>r) return;
  const angle = Math.atan2(dy,dx);
  const hue = (angle/(2*Math.PI) + 0.5)*360;
  const sat = d/r * 100;
  const {r:rr,g:gg,b:bb} = hsbToRgb(hue, sat, 100);
  setColor(rgbToHex(rr,gg,bb));
});
drawWheel();
useWheel.addEventListener('click', ()=> {
  // focus user to wheel for picking
  wheelCanvas.scrollIntoView({behavior:'smooth',block:'center'});
  showMsg('Click wheel to pick color');
});

/* Download palette as image */
function downloadPaletteImage(){
  const w = Math.max(200, palette.length*80);
  const h = 120;
  const c = document.createElement('canvas'); c.width=w; c.height=h;
  const cx = c.getContext('2d');
  cx.fillStyle = document.documentElement.getAttribute('data-theme')==='dark' ? '#0b1220' : '#fff';
  cx.fillRect(0,0,w,h);
  const size = Math.floor(w / Math.max(1,palette.length));
  palette.forEach((hex,i)=>{
    cx.fillStyle = hex;
    cx.fillRect(i*size, 10, size-6, h-20);
  });
  const a = document.createElement('a'); a.href = c.toDataURL('image/png'); a.download='palette.png'; a.click();
}

/* Export + other small bindings done above */

/* initial render of saved palette from storage */
if(localStorage.getItem('palette_v1')){
  palette = JSON.parse(localStorage.getItem('palette_v1')||'[]');
  renderPalette();
}
if(localStorage.getItem('history_v1')){
  history = JSON.parse(localStorage.getItem('history_v1')||'[]');
  renderHistory();
}

/* Copy on hex input click */
colorCodeInput.addEventListener('click', ()=> {
  colorCodeInput.select();
});

/* small keyboard shortcuts */
document.addEventListener('keydown', (e)=>{
  if(e.ctrlKey && e.key==='b'){ e.preventDefault(); saveBtn.click(); }
  if(e.ctrlKey && e.key==='r'){ e.preventDefault(); randomBtn.click(); }
});

/* ensure hex input updates preview if typed */
colorCodeInput.addEventListener('keyup', (e)=>{
  if(e.key==='Enter') setColor(colorCodeInput.value.startsWith('#')? colorCodeInput.value:'#'+colorCodeInput.value);
});

/* initial contrast + tints */
updateTintsAndShades(colorPicker.value);
updateContrast(colorPicker.value);
