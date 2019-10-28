import { isProductionEnvironment, isTestEnvironment } from './environmentConfig';

export const FF_DEV_DISABLE_VALID_PASSWORD_RESTRICTIONS = 'DEV_DISABLE_VALID_PASSWORD_RESTRICTIONS';

export const isDevFeatureFlagEnabled = (flag, defaultState = false) => {
  if (isTestEnvironment() || process.env.NODE_ENV === 'production') {
    return false;
  }

  return process.env[flag] === 'true' || defaultState;
};

export const isFeatureFlagEnabled = (flag, defaultState = isProductionEnvironment()) => {
  if (isTestEnvironment()) {
    return false;
  }

  // OR the operations together as we may want to use some flags in development
  // and force a different default state
  return process.env[flag] === 'true' || defaultState;
};
