import { USERS_API } from '../utils/apiRoutes';
import { api } from './baseAPI';

export const getUsers = () => {
  return api.get(USERS_API).then(result => {
    return result.data.users;
  });
};
