import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { notesApi } from '../api/client';
import NoteForm from '../components/NoteForm';

export default function NoteFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [initial, setInitial] = useState(null);
  const [loadError, setLoadError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setInitial({});
      return;
    }
    let cancelled = false;
    notesApi
      .getOne(id)
      .then(({ note }) => {
        if (!cancelled) setInitial({ title: note.title, body: note.body, category: note.category });
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err.message || 'Failed to load note');
      });
    return () => { cancelled = true; };
  }, [id]);

  const handleSubmit = async (data) => {
    setSubmitError('');
    setLoading(true);
    try {
      if (isEdit) {
        await notesApi.update(id, data);
      } else {
        await notesApi.create(data);
      }
      navigate('/notes');
    } catch (err) {
      setSubmitError(err.message || 'Failed to save note');
      setLoading(false);
    }
  };

  if (isEdit && initial === null && !loadError) {
    return (
      <div className="spinner-wrap inline">
        <div className="spinner" />
      </div>
    );
  }

  if (loadError && isEdit) {
    return <div className="alert alert-error">{loadError}</div>;
  }

  return (
    <div>
      <h1 className="page-title">{isEdit ? 'Edit Note' : 'New Note'}</h1>
      {submitError && <div className="alert alert-error mb-4">{submitError}</div>}
      <NoteForm
        initial={initial || {}}
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel={isEdit ? 'Update' : 'Create'}
      />
    </div>
  );
}
