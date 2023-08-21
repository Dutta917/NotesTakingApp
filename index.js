//!Declared variables-

const box = document.getElementById('boxNote');
const Notes = [];
const deleteButton = document.querySelector(".delete");
const editButton = document.querySelector(".edit");
const NotesValue = localStorage.getItem('SavedItem');
var NotesV = JSON.parse(NotesValue);



//!notes Saved into the local storage
const SavedNotes = (text) =>{
    Notes.push(text);
    localStorage.setItem("SavedItem",JSON.stringify(Notes));
}


//!inserting cleared divs or notepad into the WS

function insertNote(text = '') {
    let html = `<div class="flex CreateNote" >
                <div class="box">
                    <div class="edit" onClick="NotesSaved(event)"><i class="fa-solid fa-pen-to-square"></i></div>
                    <div class="delete" onClick="DeletNote(event)"><i class="fa-solid fa-trash"></i></div>
                    <div>
                        <textarea name="Add Text" class="TextArea" cols="30" rows="10" placeholder="Type here....">${text}</textarea>
                    </div>
                </div>
            </div>`
    box.insertAdjacentHTML("Beforeend",html);
}



//!Note saved Button in an array

function NotesSaved(e) {
    const NotesValue = e.target.closest('.box').querySelector('.TextArea').value;
    SavedNotes(NotesValue);
    alert("Notes Saved!",NotesValue);
}

// !Save all notes at once-

function AllNotesSaved(){
    const AllNotes = document.querySelectorAll('.TextArea');
    const AllNotesArray = [];

    AllNotes.forEach((e)=>{
        let SavedValue = e.value;
        console.log(SavedValue);
        AllNotesArray.push(SavedValue);
    })
    if(AllNotesArray.length>0){
        AllNotesArray.forEach((e)=>{
            SavedNotes(e);
        });
        alert("All Notes Saved!")
    }else{
        alert("No Notes to save!");
    }
    location.reload();
}

// !On load- loading the previous data from the localstorage;

function SavedNOtesLoad(){
    if (NotesV) {
        NotesV.forEach((e) => {
            insertNote(e);
        })
    }
}

SavedNOtesLoad();

//!working with the delete buttons-


function DeletNote(e) {
    const DeleteValue = e.target.closest(".CreateNote")
    const indexOfDeleteVal= DeleteValue.querySelector('textarea').value;
    DeleteValue.remove();//removing the entire div
    console.log(NotesV);
    const noteIndex = NotesV.indexOf(indexOfDeleteVal);
    console.log(noteIndex);
    if(noteIndex !== -1){
        NotesV.splice(noteIndex,1);
        localStorage.setItem("SavedItem",JSON.stringify(NotesV));
    }else{
        console.log("err occured");
    }
    
};


//!Delete all notes at once-

function DeleteAll(){
    const allDiv = document.querySelectorAll('.CreateNote');
    allDiv.forEach((e)=>{
        e.remove(); 
    })
    localStorage.removeItem("SavedItem");
    location.reload();
}

