let db;

const request = indexedDB.open("notesApp", 1);

request.onupgradeneeded = function(event) {
  db = event.target.result;
  if (!db.objectStoreNames.contains("notes")) {
    db.createObjectStore("notes", { keyPath: "id" });
  }
};

request.onsuccess = function(event) {
  db = event.target.result;
  displayNotes();
};

document.getElementById("noteForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const noteText = document.getElementById("note").value.trim();
  console.log(name, noteText)

  if (!name || !noteText) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const note = {
    id: Date.now(),
    name,
    note: noteText,
    createdAt: new Date().toISOString()
  };

  const tx = db.transaction("notes", "readwrite");
  const store = tx.objectStore("notes");
  store.put(note);

  tx.oncomplete = () => {
    document.getElementById("noteForm").reset();
    displayNotes();
  };

  tx.onerror = () => {
    alert("Erro ao salvar a nota.");
  };
});

function displayNotes() {
  const tx = db.transaction("notes", "readonly");
  const store = tx.objectStore("notes");
  const request = store.getAll();

  request.onsuccess = function () {
    const notes = request.result;
    const tbody = document.querySelector("#notesTable tbody");
    tbody.innerHTML = ""; // Limpa tabela

    if (notes.length === 0) {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td colspan="2" style="text-align:center; color:#666;">Nenhuma nota salva.</td>`;
      tbody.appendChild(tr);
      return;
    }

    notes.forEach(note => {
      const tr = document.createElement("tr");

      const tdName = document.createElement("td");
      tdName.textContent = note.name;

      const tdNote = document.createElement("td");
      tdNote.textContent = note.note;

      tr.appendChild(tdName);
      tr.appendChild(tdNote);

      tbody.appendChild(tr);
    });
  };
}
