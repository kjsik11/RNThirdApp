import Keychain from 'react-native-keychain';

export const setKeyChain = async (
  accessToken: string,
  refreshToken: string,
) => {
  await Keychain.setGenericPassword('refreshToken', refreshToken, {
    service: '@rToken',
  });

  await Keychain.setGenericPassword('accessToken', accessToken, {
    service: '@aToken',
  });
};

export const getKeyChain: () => Promise<boolean> = async () => {
  const result = await Keychain.getGenericPassword({ service: '@rToken' });

  if (result) {
    return true;
  }
  return false;
};
