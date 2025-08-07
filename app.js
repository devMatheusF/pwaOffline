let db;

// IndexedDB setup
const request = indexedDB.open("notesApp", 1);

request.onupgradeneeded = function(event) {
  db = event.target.result;
  db.createObjectStore("notes", { keyPath: "id" });
};

request.onsuccess = function(event) {
  db = event.target.result;
  displayNotes();
};

// Criar nota
document.getElementById("noteForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const note = {
    id: Date.now(),
    title,
    content,
    createdAt: new Date().toISOString()
  };

  const tx = db.transaction("notes", "readwrite");
  const store = tx.objectStore("notes");
  store.put(note);

  tx.oncomplete = () => {
    document.getElementById("noteForm").reset();
    displayNotes();
  };
});

function displayNotes() {
  const tx = db.transaction("notes", "readonly");
  const store = tx.objectStore("notes");
  const request = store.getAll();

  request.onsuccess = function () {
    const notes = request.result;
    const noteList = document.getElementById("noteList");
    noteList.innerHTML = "";

    notes.forEach(note => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${note.title}</strong><br>
        ${note.content}<br>
        <small>${new Date(note.createdAt).toLocaleString()}</small>
      `;
      noteList.appendChild(li);
    });
  };
}
