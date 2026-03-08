import { useState } from 'react';

export default function NoteForm({ initial = {}, onSubmit, loading, submitLabel = 'Save' }) {
  const [title, setTitle] = useState(initial.title ?? '');
  const [body, setBody] = useState(initial.body ?? '');
  const [category, setCategory] = useState(initial.category ?? '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const t = title.trim();
    const b = body.trim();
    const c = category.trim();
    if (!t) {
      setError('Title is required');
      return;
    }
    if (!b) {
      setError('Body is required');
      return;
    }
    if (!c) {
      setError('Category is required');
      return;
    }
    onSubmit({ title: t, body: b, category: c });
  };

  return (
    <form onSubmit={handleSubmit} className="form-note">
      {error && (
        <div className="alert alert-error">{error}</div>
      )}
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          placeholder="Note content"
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category (tag)</label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Work, Personal"
        />
      </div>
      <button type="submit" disabled={loading} className="btn btn-primary submit-btn">
        {loading ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}
