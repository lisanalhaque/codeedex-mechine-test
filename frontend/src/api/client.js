const BASE = import.meta.env.VITE_API_BASE_URL || '/api';

function getToken() {
  return localStorage.getItem('token');
}

async function request(path, options = {}) {
  const url = path.startsWith('http') ? path : `${BASE}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data.message || 'Request failed');
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const authApi = {
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  me: () => request('/auth/me'),
};

export const notesApi = {
  getAll: (category) => request(category ? `/notes?category=${encodeURIComponent(category)}` : '/notes'),
  getOne: (id) => request(`/notes/${id}`),
  create: (body) => request('/notes', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => request(`/notes/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (id) => request(`/notes/${id}`, { method: 'DELETE' }),
};
