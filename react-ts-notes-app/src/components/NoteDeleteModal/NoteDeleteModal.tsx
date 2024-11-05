export const NoteDeleteModal = ({ onClose, onDelete }: Props) => {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Delete Note</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
            type="button"
          ></button>
        </header>
        <section className="modal-card-body">
          <p>이 노트를 지워도 괜찮겠니?</p>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-danger" onClick={onDelete} type="button">
            Delete
          </button>
          <button className="button" onClick={onClose} type="button">
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

interface Props {
  onClose: () => void;
  onDelete: () => void;
}
