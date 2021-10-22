import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { HOMEPAGE, LOGIN, SIGNUP } from '../../utils/routes';

export const Navbar = () => {
  const { authenticatedUser, logout } = useContext(AuthContext);

  return (
    <div>
      <header>
        <Link to={HOMEPAGE}>CINNAMON</Link>
        {authenticatedUser ? (
          <button onClick={logout}>LOGOUT</button>
        ) : (
          <div>
            <Link to={LOGIN}>LOGIN</Link>
            <Link to={SIGNUP}>SIGNUP</Link>{' '}
          </div>
        )}
      </header>
    </div>
  );
};
