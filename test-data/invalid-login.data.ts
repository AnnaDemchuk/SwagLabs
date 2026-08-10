import { AUTH_ERROR_MESSAGES, STANDARD_USERNAME, STANDARD_USER_PASSWORD } from './constants';

export const INVALID_LOGIN_CASES = [
  {
    title: 'wrong password',
    username: STANDARD_USERNAME,
    password: 'wrong_pass',
    expectedError: AUTH_ERROR_MESSAGES.invalidCredentials,
  },
  {
    title: 'wrong username',
    username: 'wrong_username',
    password: STANDARD_USER_PASSWORD,
    expectedError: AUTH_ERROR_MESSAGES.invalidCredentials,
  },
  {
    title: 'empty username',
    username: '',
    password: STANDARD_USER_PASSWORD,
    expectedError: AUTH_ERROR_MESSAGES.usernameIsRequired,
  },
  {
    title: 'empty password',
    username: STANDARD_USERNAME,
    password: '',
    expectedError: AUTH_ERROR_MESSAGES.passwordIsRequired,
  },
];
