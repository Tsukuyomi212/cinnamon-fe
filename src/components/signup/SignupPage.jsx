import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { signup } from '../../services/authService';
import { LOGIN } from '../../utils/routes';
import { SignupForm } from './SignupForm';

export const SignupPage = () => {
  const { authenticateUser } = useContext(AuthContext);

  const submitForm = async values => {
    try {
      const result = await signup(values);
      authenticateUser({ user: result.user, token: result.token });
    } catch (error) {
      console.log('🚀 ~ file: SignupPage.tsx ~ line 17 ~ submitForm ~ error', error);
    }
  };

  return (
    <div>
      <h1>Signup page</h1>
      <SignupForm handleSubmit={submitForm} />
      <div>
        <div>Already have an account?</div>
        <div>
          <Link to={LOGIN}>Login</Link>
        </div>
      </div>
    </div>
  );
};
