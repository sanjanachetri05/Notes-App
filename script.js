// Load notes on startup
document.addEventListener("DOMContentLoaded", displayNotes);

function addNote() {
    const title = document.getElementById('noteTitle').value;
    const text = document.getElementById('noteText').value;

    if (!title || !text) return alert("Please fill both fields");

    const notes = JSON.parse(localStorage.getItem("myNotes") || "[]");
    
    const newNote = {
        id: Date.now(),
        title: title,
        text: text
    };

    notes.push(newNote);
    localStorage.setItem("myNotes", JSON.stringify(notes));
    
    // Clear inputs
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteText').value = '';
    
    displayNotes();
}

function displayNotes() {
    const notesContainer = document.getElementById('notesContainer');
    const notes = JSON.parse(localStorage.getItem("myNotes") || "[]");
    
    notesContainer.innerHTML = notes.map(note => `
        <div class="note-card">
            <h3>${note.title}</h3>
            <p>${note.text}</p>
            <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
        </div>
    `).join('');
}

function deleteNote(id) {
    let notes = JSON.parse(localStorage.getItem("myNotes") || "[]");
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem("myNotes", JSON.stringify(notes));
    displayNotes();
}