import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { getUsers } from '../../services/userService';
import { LOGIN } from '../../utils/routes';

export const Homepage = () => {
  const { authenticatedUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const users = await getUsers();
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, [authenticatedUser]);
  return (
    <div>
      <h1>Welcome to Cinnamon!</h1>
      {authenticatedUser ? (
        <div>
          <h2>Here is a list of users:</h2>
          <ul>
            {users &&
              users.map((user, index) => (
                <li key={index}>{`username: ${user.username}, email: ${user.email}`}</li>
              ))}
          </ul>
        </div>
      ) : (
        <div>
          You have to <Link to={LOGIN}>LOGIN</Link> to continue
        </div>
      )}
    </div>
  );
};
