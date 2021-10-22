import { LOGIN_API, SIGNUP_API } from '../utils/apiRoutes';
import { findNumberInString } from '../utils/findNumberInString';
import { api } from './baseAPI';

export const login = payload => {
  return api
    .post(LOGIN_API, payload)
    .then(result => {
      return {
        user: result.data.user,
        token: result.data.token,
      };
    })
    .catch(error => {
      return {
        statusCode: findNumberInString(error.message),
        message: error.message,
      };
    });
};

export const me = () => {
  return api.get('/auth/me').then(result => {
    return {
      user: result.data.user,
    };
  });
};

export const signup = payload => {
  return api.post(SIGNUP_API, payload).then(result => {
    return {
      user: result.data.user,
      token: result.data.token,
    };
  });
};
