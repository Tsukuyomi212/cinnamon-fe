/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { getUsers, deleteUser } from '../../services/userService';
import { LOGIN } from '../../utils/routes';

export const Homepage = () => {
  const history = useHistory();
  const { authenticatedUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const users = await getUsers();
    setUsers(users);
  };

  const handleDelete = async userId => {
    await deleteUser({ userId });
    await fetchUsers();
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
      {authenticatedUser && users && (
        <div id="users-list">
          <h2>Here is a list of users:</h2>
          <ul>
            {users.map((user, index) => (
              <div key={index}>
                <li>{`username: ${user.username}, email: ${user.email}`}</li>
                <button onClick={() => handleDelete(user._id)}>delete</button>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
