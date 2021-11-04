import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { LOGIN } from '../../utils/routes';
import { SignupForm } from './SignupForm';
import './signup.css';

export const SignupPage = () => {
  const { signup } = useContext(AuthContext);

  const submitForm = async values => {
    await signup(values);
  };

  return (
    <div>
      <SignupForm handleSubmit={submitForm} />
      <div className="login-msg">
        <div>Already have an account?</div>
        <div>
          <Link to={LOGIN}>
            <span className="link-login">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
