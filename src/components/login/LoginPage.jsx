import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { login } from '../../services/authService';
import { SIGNUP } from '../../utils/routes';
import { LoginForm } from './LoginForm';

export const LoginPage: React.FC = () => {
  const { authenticateUser } = useContext(AuthContext);

  const submitForm = async values => {
    const result = await login(values);
    console.log('🚀 ~ file: LoginPage.jsx ~ line 14 ~ result', result);
    authenticateUser({ user: result.user, token: result.token });
  };

  return (
    <div>
      <h1>Login page</h1>
      <LoginForm handleSubmit={submitForm} />
      <div>
        <div>Don't have an account?</div>
        <div>
          <Link to={SIGNUP}>Create one</Link>
        </div>
      </div>
    </div>
  );
};
