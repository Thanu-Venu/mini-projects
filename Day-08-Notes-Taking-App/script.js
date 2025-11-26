// Load notes from localStorage
function loadNotes() {
const notes = JSON.parse(localStorage.getItem("notes")) || [];
const container = document.getElementById("notesContainer");
container.innerHTML = "";


notes.forEach((text, index) => {
const note = document.createElement("div");
note.className = "note";


note.innerHTML = `
<p>${text}</p>
<button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
`;


container.appendChild(note);
});
}


// Add new note
const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", () => {
const noteText = document.getElementById("noteText").value.trim();
if (!noteText) return alert("Please write something!");


const notes = JSON.parse(localStorage.getItem("notes")) || [];
notes.push(noteText);
localStorage.setItem("notes", JSON.stringify(notes));


document.getElementById("noteText").value = "";
loadNotes();
});


// Delete note
function deleteNote(index) {
const notes = JSON.parse(localStorage.getItem("notes")) || [];
notes.splice(index, 1);
localStorage.setItem("notes", JSON.stringify(notes));
loadNotes();
}


// Load on start
window.onload = loadNotes;