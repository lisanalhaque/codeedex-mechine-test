import { useState, useEffect, useMemo } from 'react';
import { notesApi } from '../api/client';
import NoteCard from '../components/NoteCard';
import CategoryFilter from '../components/CategoryFilter';

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [deleting, setDeleting] = useState(null);

  const categories = useMemo(() => {
    const set = new Set(notes.map((n) => n.category).filter(Boolean));
    return [...set].sort();
  }, [notes]);

  const fetchNotes = async () => {
    setLoading(true);
    setError('');
    try {
      const { notes: data } = await notesApi.getAll(categoryFilter || undefined);
      setNotes(data);
    } catch (err) {
      setError(err.message || 'Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [categoryFilter]);

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await notesApi.delete(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete');
    } finally {
      setDeleting(null);
    }
  };

  if (loading && !notes.length) {
    return (
      <div className="spinner-wrap">
        <div className="spinner" />
      </div>
    );
  }

  if (error && !notes.length) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div>
      <h1 className="page-title">My Notes</h1>
      <CategoryFilter
        categories={categories}
        selected={categoryFilter}
        onChange={setCategoryFilter}
      />
      {error && <div className="alert alert-warn mb-4">{error}</div>}
      {notes.length === 0 ? (
        <p className="empty-message">No notes yet. Create one to get started.</p>
      ) : (
        <ul className="notes-list">
          {notes.map((note) => (
            <li key={note._id}>
              <NoteCard note={note} onDelete={handleDelete} deleting={deleting} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
