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
          <button onClick={logout}>LOGOUT</button>
        ) : (
          <div>
            <Link to={LOGIN}>
              <button>LOGIN</button>
            </Link>
            <Link to={SIGNUP}>
              <button>SIGNUP</button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};
