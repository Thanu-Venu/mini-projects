
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let trash = JSON.parse(localStorage.getItem('trash')) || [];
let editingIndex = null;

const noteText = document.getElementById('noteText');
const noteTitle = document.getElementById('noteTitle');
const noteTags = document.getElementById('noteTags');
const noteImage = document.getElementById('noteImage');
const addBtn = document.getElementById('addBtn');
const notesContainer = document.getElementById('notesContainer');
const trashContainer = document.getElementById('trashContainer');
const searchInput = document.getElementById('search');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

function renderNotes(filter='') {
  notesContainer.innerHTML='';
  notes.sort((a,b)=> (b.pinned-a.pinned)); // pinned notes first
  notes.forEach((note,index)=>{
    if(filter && !note.text.toLowerCase().includes(filter.toLowerCase()) && !note.title.toLowerCase().includes(filter.toLowerCase()) && !(note.tags||[]).join(' ').toLowerCase().includes(filter.toLowerCase())) return;
    const div = document.createElement('div');
    div.className='note';
    div.innerHTML=`
      <div class='note-title'>${note.title}</div>
      <div class='note-text'>${note.text}</div>
      ${(note.image)?`<img src='${note.image}' alt='attachment'>`:''}
      <div><small>Tags: ${(note.tags||[]).join(', ')}</small></div>
      <div class='card-actions'>
        <button class='edit-btn' onclick='editNote(${index})'>Edit</button>
        <button class='delete-btn' onclick='moveToTrash(${index})'>Delete</button>
        <button class='pin-btn' onclick='togglePin(${index})'>${note.pinned?'Unpin':'Pin'}</button>
      </div>
    `;
    notesContainer.appendChild(div);
  });
  renderTrash();
}

function renderTrash(){
  trashContainer.innerHTML='';
  trash.forEach((note,index)=>{
    const div = document.createElement('div');
    div.className='note';
    div.innerHTML=`
      <div class='note-title'>${note.title}</div>
      <div class='note-text'>${note.text}</div>
      <div class='card-actions'>
        <button class='edit-btn' onclick='restoreNote(${index})'>Restore</button>
        <button class='delete-btn' onclick='deletePermanently(${index})'>Delete Permanently</button>
      </div>
    `;
    trashContainer.appendChild(div);
  });
}

function addNote(){
  const title = noteTitle.value.trim() || 'Untitled';
  const text = noteText.value.trim();
  const tags = noteTags.value.split(',').map(t=>t.trim()).filter(Boolean);
  if(!text) return alert('Write something!');
  let imageData = null;
  if(noteImage.files[0]){
    const reader = new FileReader();
    reader.onload = function(e){
      imageData = e.target.result;
      saveNote({title,text,tags,image:imageData});
    };
    reader.readAsDataURL(noteImage.files[0]);
  } else {
    saveNote({title,text,tags});
  }
}

function saveNote(noteObj){
  if(editingIndex!==null){
    notes[editingIndex] = {...notes[editingIndex], ...noteObj};
    editingIndex=null;
  } else {
    noteObj.pinned=false;
    noteObj.id=uid();
    notes.push(noteObj);
  }
  localStorage.setItem('notes',JSON.stringify(notes));
  clearForm();
  renderNotes(searchInput.value);
}

function clearForm(){ noteText.value=''; noteTitle.value=''; noteTags.value=''; noteImage.value=''; }

function editNote(index){
  const note = notes[index];
  noteText.value=note.text; noteTitle.value=note.title; noteTags.value=(note.tags||[]).join(',');
  editingIndex=index;
}

function moveToTrash(index){
  const note = notes.splice(index,1)[0];
  trash.unshift(note);
  localStorage.setItem('notes',JSON.stringify(notes));
  localStorage.setItem('trash',JSON.stringify(trash));
  renderNotes(searchInput.value);
}

function restoreNote(index){
  const note = trash.splice(index,1)[0];
  notes.push(note);
  localStorage.setItem('notes',JSON.stringify(notes));
  localStorage.setItem('trash',JSON.stringify(trash));
  renderNotes(searchInput.value);
}

function deletePermanently(index){
  trash.splice(index,1);
  localStorage.setItem('trash',JSON.stringify(trash));
  renderTrash();
}

function togglePin(index){
  notes[index].pinned=!notes[index].pinned;
  localStorage.setItem('notes',JSON.stringify(notes));
  renderNotes(searchInput.value);
}

searchInput.addEventListener('input',(e)=>renderNotes(e.target.value));
addBtn.addEventListener('click',addNote);
window.onload=()=>renderNotes();

exportBtn.addEventListener('click',()=>{
  const data = JSON.stringify({notes,trash});
  const blob = new Blob([data],{type:'application/json'});
  const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='notes_export.json'; document.body.appendChild(a); a.click(); a.remove();
});

importBtn.addEventListener('click',()=>{
  const json = prompt('Paste exported JSON here:');
  try{
    const obj = JSON.parse(json);
    notes = obj.notes||[];
    trash=obj.trash||[];
    localStorage.setItem('notes',JSON.stringify(notes));
    localStorage.setItem('trash',JSON.stringify(trash));
    renderNotes();
    alert('Imported successfully!');
  }catch(e){ alert('Invalid JSON'); }
});
