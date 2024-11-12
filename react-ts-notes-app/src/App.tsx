import { Note, NoteDeleteModal, NoteEditModal, SaveNote } from "./components";
import { useState } from "react";
import { NoteInterface } from "types";
import {
  getNotesFromLocalStorage,
  updatedNotesInLocalStorage,
} from "./components/services";

function App() {
  const [notes, setNotes] = useState<NoteInterface[]>(
    getNotesFromLocalStorage()
  );

  const [noteToDelete, setNoteToDelete] = useState<NoteInterface | null>(null);
  const [noteToEdit, setNoteToEdit] = useState<NoteInterface | null>(null);

  const onNoteDeleteClick = (note: NoteInterface) => {
    setNoteToDelete(note);
  };

  const onDeleteModalClose = () => {
    setNoteToDelete(null);
  };

  const onNoteDelete = () => {
    if (!noteToDelete) return;
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter(
        (note) => note.id !== noteToDelete.id
      );
      updatedNotesInLocalStorage(updatedNotes);
      return updatedNotes;
    });
    setNoteToDelete(null);
  };

  const onNoteEditClick = (note: NoteInterface) => {
    setNoteToEdit(note);
  };

  const onEditModalClose = () => {
    setNoteToEdit(null);
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1 className="title has-text-centered">노트앱</h1>
      </div>
      <div className="tile is-flex-wrap-wrap">
        {notes.map((note) => {
          return (
            <Note
              key={note.id}
              message={note.message}
              onDelete={() => onNoteDeleteClick(note)}
              onEdit={() => onNoteEditClick(note)}
            />
          );
        })}
        <div className="tile is-3 p-2">
          <div className="box is-fullwidth">
            <SaveNote setNotes={setNotes} saveCallback={() => {}} />
          </div>
        </div>
      </div>
      {noteToEdit && (
        <NoteEditModal
          note={noteToEdit}
          onClose={onEditModalClose}
          setNotes={setNotes}
        />
      )}
      {noteToDelete && (
        <NoteDeleteModal onClose={onDeleteModalClose} onDelete={onNoteDelete} />
      )}
    </div>
  );
}

export default App;
