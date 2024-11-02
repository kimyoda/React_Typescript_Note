import { saveNoteToLocalStorage } from "../services"; // services 디렉토리의 절대 경로
import { Textarea } from "components/Textarea"; // components 디렉토리의 절대 경로
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { NoteInterface } from "types";

export const SaveNote = ({ setNotes, saveCallback }: Props) => {
  const [message, setMessage] = useState("");

  const onMessageChange = (value: string) => {
    setMessage(value);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const note: NoteInterface = {
      id: `note-${Date.now()}`,
      message: message.trim(),
    };
    setNotes((prevNotes) => [...prevNotes, note]);
    saveNoteToLocalStorage(note);
    setMessage("");
    saveCallback();
  };

  return (
    <form onSubmit={onSubmit}>
      <Textarea value={message} onChange={onMessageChange} />
      <button
        type="submit"
        className="button is-primary"
        disabled={message.trim() === ""}
      >
        SAVE
      </button>
    </form>
  );
};

interface Props {
  setNotes: Dispatch<SetStateAction<NoteInterface[]>>;
  saveCallback: () => void;
}
