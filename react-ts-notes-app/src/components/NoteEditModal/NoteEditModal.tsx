import { NoteInterface } from "@/types";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Textarea } from "../Textarea";
import { updatedNotesInLocalStorage } from "../services";

export const NoteEditModal = ({ onClose, note, setNotes }: Props) => {
  const [message, setMessage] = useState(note.message);

  const onMessageChange = (value: string) => {
    setMessage(value);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((n) =>
        n.id === note.id ? { ...n, message: message.trim() } : n
      );
      updatedNotesInLocalStorage(updatedNotes);
      return updatedNotes;
    });
    onClose();
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <form onSubmit={onSubmit}>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">수정 노트</p>
            <button
              type="button"
              className="delete"
              aria-label="close"
              onClick={onClose}
            ></button>
          </header>
          <section className="modal-card-body">
            <Textarea value={message} onChange={onMessageChange} />
          </section>
          <footer className="modal-card-foot">
            <button
              type="submit"
              className="button is-success"
              disabled={!message.trim()}
            >
              수정 후 저장
            </button>
            <button type="submit" className="button">
              취소
            </button>
          </footer>
        </div>
      </form>
    </div>
  );
};

interface Props {
  onClose: () => void;
  note: NoteInterface;
  setNotes: Dispatch<SetStateAction<NoteInterface[]>>;
}
