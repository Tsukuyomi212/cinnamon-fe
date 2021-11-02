import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { SIGNUP, HOMEPAGE } from '../../utils/routes';
import { LoginForm } from './LoginForm';

export const LoginPage: React.FC = () => {
  const { authenticatedUser, login } = useContext(AuthContext);
  const history = useHistory();

  const submitForm = async values => {
    await login(values);
  };

  useEffect(() => {
    if (authenticatedUser) {
      history.push(HOMEPAGE);
    }
  }, [authenticatedUser]);

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
