import { test, expect } from '../fixtures/fixture';
import {
  AUTH_ERROR_MESSAGES,
  LOCKED_OUT_USERNAME,
  STANDARD_USER_PASSWORD,
} from '../test-data/constants';
import { INVALID_LOGIN_CASES } from '../test-data/invalid-login.data';

test.describe('Invalid login data', () => {
  for (const data of INVALID_LOGIN_CASES) {
    test(`Invalid login with ${data.title}`, async ({ loginPage }) => {
      await loginPage.login(data.username, data.password);
      await expect(loginPage.errorMessage).toHaveText(data.expectedError);
    });
  }
});

test.describe('Blocked user', () => {
  test(`It is impossible to login with blocked user`, async ({ loginPage }) => {
    await loginPage.login(LOCKED_OUT_USERNAME, STANDARD_USER_PASSWORD);
    await loginPage.verifyErrorMessage(AUTH_ERROR_MESSAGES.lockedOutUser);
  });
});
