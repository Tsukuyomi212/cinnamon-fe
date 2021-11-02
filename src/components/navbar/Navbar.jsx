import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { HOMEPAGE, LOGIN, SIGNUP } from '../../utils/routes';
import { AppTitle } from './AppTitle';

export const Navbar = () => {
  const { authenticatedUser, logout } = useContext(AuthContext);

  return (
    <div className="nav-box">
      <nav className="nav-container">
        <AppTitle />
        {authenticatedUser ? (
          <div className="nav-btn-container">
            <button onClick={logout} className="nav-btn nav-btn-full">
              LOGOUT
            </button>
          </div>
        ) : (
          <div className="nav-btn-container">
            <Link to={LOGIN}>
              <button className="nav-btn nav-btn-outlined">LOGIN</button>
            </Link>
            <Link to={SIGNUP}>
              <button className="nav-btn nav-btn-full">SIGNUP</button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};
