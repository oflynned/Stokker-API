import User from '../models/user';
import {
  FF_DEV_DISABLE_VALID_PASSWORD_RESTRICTIONS,
  isDevFeatureFlagEnabled
} from '../config/featureFlags';

export const validateUserHeader = async headers =>
  Object.prototype.hasOwnProperty.call(headers, 'email') &&
  Object.prototype.hasOwnProperty.call(headers, 'password');

export const verifyUserCredentials = async (emailAttempt, passwordAttempt) => {
  const account = await User.findByEmail(emailAttempt);
  if (account === null) {
    throw new Error('bad_credentials');
  }

  if (isDevFeatureFlagEnabled(FF_DEV_DISABLE_VALID_PASSWORD_RESTRICTIONS)) {
    console.warn(`${FF_DEV_DISABLE_VALID_PASSWORD_RESTRICTIONS} is enabled, skipping password check`);
  } else {
    console.warn('unimplemented password matching');
    // let isMatching = await isMatchingPassword(passwordAttempt, account.hash);
    // if (!isMatching) {
    //   throw new Error('bad_credentials');
    // }
  }

  return account;
};
