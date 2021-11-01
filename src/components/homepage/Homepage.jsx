import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { getUsers } from '../../services/userService';
import { LOGIN } from '../../utils/routes';

export const Homepage = () => {
  const history = useHistory();
  const { authenticatedUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const users = await getUsers();
    const filtered = users.filter(user => user._id !== authenticatedUser.user._id);
    setUsers(filtered);
  };

  useEffect(() => {
    if (authenticatedUser) {
      fetchUsers();
    } else {
      history.push(LOGIN);
    }
  }, [authenticatedUser]);
  return (
    <div>
      <h1>Welcome to Cinnamon!</h1>
      {authenticatedUser && (
        <div id="users-list">
          <h2>Here is a list of users:</h2>
          <ul>
            {users &&
              users.map((user, index) => (
                <li key={index}>{`username: ${user.username}, email: ${user.email}`}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};
