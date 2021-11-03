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
      <LoginForm handleSubmit={submitForm} />
      <div className="register-msg">
        <div>{"Don't have an account?"}</div>
        <div>
          <Link to={SIGNUP}>
            <span className="link-register ">Create one</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
