let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editingIndex = null;


const addBtn = document.getElementById("addBtn");
const noteText = document.getElementById("noteText");
const noteTitle = document.getElementById("noteTitle");
const notesContainer = document.getElementById("notesContainer");
const searchInput = document.getElementById("search");


function renderNotes(filter='') {
notesContainer.innerHTML = '';
notes.forEach((note, index) => {
if(filter && !note.text.toLowerCase().includes(filter.toLowerCase()) && !note.title.toLowerCase().includes(filter.toLowerCase())) return;
const noteDiv = document.createElement('div');
noteDiv.className = 'note';
noteDiv.innerHTML = `
<div class="note-title">${note.title}</div>
<div class="note-text">${note.text}</div>
<div class="card-actions">
<button class="edit-btn" onclick="editNote(${index})">Edit</button>
<button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
</div>
`;
notesContainer.appendChild(noteDiv);
});
}


function addNote() {
const text = noteText.value.trim();
const title = noteTitle.value.trim() || 'Untitled';
if(!text) return alert('Please write something!');


if(editingIndex !== null) {
notes[editingIndex] = { title, text };
editingIndex = null;
} else {
notes.push({ title, text });
}
localStorage.setItem('notes', JSON.stringify(notes));
noteText.value = '';
noteTitle.value = '';
renderNotes(searchInput.value);
}


function editNote(index) {
noteText.value = notes[index].text;
noteTitle.value = notes[index].title;
editingIndex = index;
}


function deleteNote(index) {
notes.splice(index, 1);
localStorage.setItem('notes', JSON.stringify(notes));
renderNotes(searchInput.value);
}


addBtn.addEventListener('click', addNote);
searchInput.addEventListener('input', (e)=> renderNotes(e.target.value));
window.onload = () => renderNotes();