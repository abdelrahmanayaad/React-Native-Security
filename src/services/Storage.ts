import * as Keychain from 'react-native-keychain';

export const saveTokens = async (accessToken: string, refreshToken: string) => {
  await Keychain.setGenericPassword(
    'token',
    JSON.stringify({ accessToken, refreshToken }),
  );
};

export const getTokens = async () => {
  const credentials = await Keychain.getGenericPassword();
  if (credentials) {
    return JSON.parse(credentials.password);
  }
  return null;
};

export const clearTokens = async () => {
  await Keychain.resetGenericPassword();
};
