import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BackgroundVideo, { APP_VIDEO } from '../components/BackgroundVideo';

export default function Home() {
  const { user } = useAuth();

  return (
    <BackgroundVideo src={APP_VIDEO}>
      <div className="home-page">
        <h1>MERN Notes</h1>
        <p>
          {user
            ? `Welcome back, ${user.name}. Create and manage your notes in one place.`
            : 'A simple notes app with user authentication. Sign in or create an account to get started.'}
        </p>
        <div className="home-actions">
          {user ? (
            <>
              <Link to="/notes" className="btn btn-primary">
                My Notes
              </Link>
              <Link to="/notes/new" className="btn btn-secondary">
                New Note
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary">
                Log in
              </Link>
              <Link to="/register" className="btn btn-secondary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </BackgroundVideo>
  );
}
