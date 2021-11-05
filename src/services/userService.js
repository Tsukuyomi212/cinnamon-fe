import { USERS_API } from '../utils/apiRoutes';
import { api } from './baseAPI';

export const getUsers = () => {
  return api.get(USERS_API).then(result => {
    return result.data.users;
  });
};

export const deleteUser = ({ userId }) => {
  return api.delete(`${USERS_API}/${userId}`).then(result => {
    return result.status;
  });
};
