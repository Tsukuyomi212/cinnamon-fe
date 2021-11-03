import React from 'react';
import { createContext, useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { me } from '../services/authService';
import { HOMEPAGE, LOGIN } from '../utils/routes';
import { loginUser, signupUser } from '../services/authService.js';

export const AuthContext = createContext(undefined);

export const AuthContextProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [token, setToken] = useState(null);
  const history = useHistory();

  const signup = async payload => {
    try {
      const result = await signupUser(payload);
      await authenticateUser({ user: result.user, token: result.token });
      history.push(HOMEPAGE);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async payload => {
    try {
      const result = await loginUser(payload);
      await authenticateUser({ user: result.user, token: result.token });
      history.push(HOMEPAGE);
    } catch (error) {
      console.log(error);
    }
  };

  const authenticateUser = ({ user, token }) => {
    localStorage.setItem('token', token);
    setToken(token);
    setAuthenticatedUser(user);
  };

  const fetchAuthenticatedUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = await me();
        setAuthenticatedUser(user);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthenticatedUser(null);
    history.push(LOGIN);
  };

  useEffect(() => {
    fetchAuthenticatedUser();
  }, [token]);

  const memoedAuthValue = useMemo(
    () => ({
      authenticatedUser,
      login,
      logout,
      signup,
      fetchAuthenticatedUser,
    }),
    [authenticatedUser],
  );

  return <AuthContext.Provider value={memoedAuthValue}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.array,
};
