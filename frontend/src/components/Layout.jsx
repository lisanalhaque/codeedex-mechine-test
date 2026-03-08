import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BackgroundVideo, { APP_VIDEO } from './BackgroundVideo';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract note ID from URL if editing a note
  const noteIdMatch = location.pathname.match(/^\/notes\/([^/]+)$/);
  const noteId = noteIdMatch ? noteIdMatch[1] : null;
  const isFormPage = location.pathname === '/notes/new' || noteId;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BackgroundVideo src={APP_VIDEO}>
      <div className="app-shell">
      <header className="app-header">
        <div className="app-header-inner">
          <Link to="/notes">MERN Notes</Link>
          <div className="app-header-actions">
            <Link to="/" className="btn btn-ghost">Home</Link>
            <span className="user-name">{user?.name}</span>
            {!isFormPage && (
              <Link to="/notes/new" className="btn btn-primary">
                New Note
              </Link>
            )}
            {isFormPage && (
              <Link to="/notes" className="btn btn-primary">
                My Notes
              </Link>
            )}
            <button type="button" onClick={handleLogout} className="btn btn-ghost">
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      </div>
    </BackgroundVideo>
  );
}
