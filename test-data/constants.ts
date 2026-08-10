export const SUCCESS_MESSAGE = 'Thank you for your order!';

export const STANDARD_USERNAME = process.env.STANDARD_USERNAME!;

export const STANDARD_USER_PASSWORD = process.env.STANDARD_USER_PASSWORD!;

export const LOCKED_OUT_USERNAME = 'locked_out_user';

export const TAX_RATE = 0.08;

export const BUTTON_TEXT = {
  addToCart: 'Add to cart',
  remove: 'Remove',
};

export const AUTH_ERROR_MESSAGES = {
  invalidCredentials:
    'Epic sadface: Username and password do not match any user in this service',
  lockedOutUser: 'Epic sadface: Sorry, this user has been locked out.',
  usernameIsRequired: 'Epic sadface: Username is required',
  passwordIsRequired: 'Epic sadface: Password is required',
};

export const PAYMENT_INFORMATION = 'SauceCard #';

export const SHIPPING_INFORMATION = 'Free Pony Express Delivery!';