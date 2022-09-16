let noteId = [];
let noteMessage = [];
let trashNote = [];

//show all notes
function showNotes() {
          getArrayFromLocalStorage();
          document.getElementById("renderMain").innerHTML = "";
          for (let i = noteId.length - 1; i >= 0; i--) {
                    let id = i;
                    let showMessage = noteMessage[id];
                    renderMain.innerHTML += `
                     <div class="container noteText" id="${i}">
                        <div>${showMessage}<br><br>
                         <a href="#" onclick="deletedNote(${i})"><i class="fa fa-trash"></i></a></div>
                  </div>
                    `;
          }
          document.getElementById("new").classList.remove("showSidebarBgWhite");
          document.getElementById("trash").classList.remove(
                    "showSidebarBgWhite"
          );
          document.getElementById("home").classList.add("showSidebarBgWhite");
}

//open new note page
function openNewNotePage() {
          let renderMain = document.getElementById("renderMain");
          renderMain.innerHTML = "";
          renderMain.innerHTML += `
      <div id="renderMain" class="main">
            <div class="containerNewNote">
                  <div><textarea type="text" id="inputText" class="inputNoteText" placeholder="Note...."></textarea></div>
                  <a href="#" onclick="pushNewNote()"><i class="fa-i fa fa-check-square fa-2x"
                  id="inputOkCheck"></i></a>
                  </div>
            </div>
      `;
          document.getElementById("home").classList.remove(
                    "showSidebarBgWhite"
          );
          document.getElementById("trash").classList.remove(
                    "showSidebarBgWhite"
          );
          document.getElementById("new").classList.add("showSidebarBgWhite");
}

//push a new note
function pushNewNote() {
          let newNote = document.getElementById("inputText").value;
          let indexArrays = noteId.length;
          noteId.push(indexArrays);
          noteMessage.push(newNote);
          setArrayToLocalStorage("noteId", noteId);
          setArrayToLocalStorage("noteMessage", noteMessage);
          showNotes();
}

//deleted a note
function deletedNote(index) {
          let newIndexSplice = index;
          trashNote.push(noteMessage[newIndexSplice]);
          noteId.splice(newIndexSplice, 1);
          noteMessage.splice(newIndexSplice, 1);
          setArrayToLocalStorage("trashNote", trashNote);
          setArrayToLocalStorage("noteId", noteId);
          setArrayToLocalStorage("noteMessage", noteMessage);
          showNotes();
}

//show trash
function showTrash() {
          let renderMain = document.getElementById("renderMain");
          renderMain.innerHTML = "";
          for (let i = 0; i < trashNote.length; i++) {
                    let id = i;
                    let trashNoteAndId = trashNote[id];
                    renderMain.innerHTML += `
                     <div class="container noteText" id="trash${i}">
                        <div>${trashNoteAndId}<br><br>
                         <a href="#" onclick="deletedNoteTrash(${id})"><i class="fa fa-trash"></i></a></div>
                  </div>
                    `;
          }
          document.getElementById("new").classList.remove("showSidebarBgWhite");
          document.getElementById("trash").classList.add("showSidebarBgWhite");
          document.getElementById("home").classList.remove(
                    "showSidebarBgWhite"
          );
}

//deleted trash for ever
function deletedNoteTrash(trashId) {
          trashNote.splice(trashId, 1);
          setArrayToLocalStorage("trashNote", trashNote);
          showTrash();
}

//save array in storage
function setArrayToLocalStorage(nameInStorage, array) {
          localStorage.setItem(nameInStorage, JSON.stringify(array));
}

//get array from storage
function getArrayFromLocalStorage() {
          let noteIdStorage = localStorage.getItem("noteId");
          let noteMessageStorage = localStorage.getItem("noteMessage");
          let trashNoteStorage = localStorage.getItem("trashNote");
          if (noteIdStorage && noteMessageStorage && trashNoteStorage) {
                    noteId = JSON.parse(noteIdStorage);
                    noteMessage = JSON.parse(noteMessageStorage);
                    trashNote = JSON.parse(trashNoteStorage);
          }
}
