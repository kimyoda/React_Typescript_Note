import {
  Note,
  NoteDeleteModal,
  NoteEditModal,
  Pagination,
  SaveNote,
} from "./components";
import { useEffect, useState } from "react";
import { NoteInterface } from "types";
import {
  getNotesFromLocalStorage,
  updatedNotesInLocalStorage,
} from "./components/services";

const PER_PAGE = 3;

function App() {
  const [notes, setNotes] = useState<NoteInterface[]>(
    getNotesFromLocalStorage()
  );

  const [paginatedNotes, setPaginatedNotes] = useState<NoteInterface[]>([]);

  const [noteToDelete, setNoteToDelete] = useState<NoteInterface | null>(null);

  const [noteToEdit, setNoteToEdit] = useState<NoteInterface | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const sliceStart = currentPage === 1 ? 0 : (currentPage - 1) * PER_PAGE;
    const sliceEnd = sliceStart + PER_PAGE;

    setTotalPages(Math.ceil(notes.length / PER_PAGE));
    setPaginatedNotes(notes.slice(sliceStart, sliceEnd));
  }, [currentPage, notes]);

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
    updateCurrentPageOnNotesUpdate("delete");
  };

  const onNoteEditClick = (note: NoteInterface) => {
    setNoteToEdit(note);
  };

  const onEditModalClose = () => {
    setNoteToEdit(null);
  };

  const onPrevClick = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const onNextClick = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const onPageClick = (page: number) => {
    setCurrentPage(page);
  };

  const updateCurrentPageOnNotesUpdate = (type: "save" | "delete") => {
    // if new note go to last page if page is full
    if (type === "save" && notes.length % PER_PAGE === 0) {
      setCurrentPage(totalPages + 1);
    }
    // if note is deleted go to prevtious page if only one note is left on the page user is on last page
    else if (
      type === "delete" &&
      notes.length % PER_PAGE === 1 &&
      currentPage === totalPages
    ) {
      setCurrentPage(totalPages - 1);
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1 className="title has-text-centered">노트앱</h1>
      </div>
      <div className="tile is-flex-wrap-wrap">
        {paginatedNotes.map((note) => {
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
            <SaveNote
              setNotes={setNotes}
              saveCallback={() => updateCurrentPageOnNotesUpdate("save")}
            />
          </div>
        </div>
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          onPageClick={onPageClick}
        />
      )}
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
