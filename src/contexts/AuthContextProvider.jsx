import { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { me } from '../services/authService';
import { HOMEPAGE, LOGIN } from '../utils/routes';

export const AuthContext = createContext(undefined);

export const AuthContextProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const history = useHistory();

  const authenticateUser = async payload => {
    try {
      await localStorage.setItem('token', payload.token);
      await setAuthenticatedUser(payload.user);
      history.push(HOMEPAGE);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAuthenticatedUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = await me();
      setAuthenticatedUser(user);
      return true;
    } else {
      setAuthenticatedUser(null);
      history.push(LOGIN);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthenticatedUser(null);
    history.push(LOGIN);
  };

  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticatedUser,
        authenticateUser,
        logout,
        fetchAuthenticatedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
