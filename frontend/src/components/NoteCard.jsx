import { Link } from 'react-router-dom';

function formatDate(iso) {
  const d = new Date(iso);
  const date = d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  const time = d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  return `${date}, ${time}`;
}

export default function NoteCard({ note, onDelete, deleting }) {
  return (
    <article className="note-card">
      <div className="note-card-header">
        <div className="note-card-body">
          <h2 className="note-card-title">{note.title}</h2>
          <p className="note-card-meta">
            {formatDate(note.createdAt)} · {note.category}
          </p>
          <p className="note-card-excerpt">{note.body}</p>
        </div>
        <div className="note-card-actions">
          <Link to={`/notes/${note._id}/edit`} className="btn btn-secondary">
            Edit
          </Link>
          <button
            type="button"
            onClick={() => onDelete(note._id)}
            disabled={deleting === note._id}
            className="btn btn-danger"
          >
            {deleting === note._id ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </article>
  );
}
