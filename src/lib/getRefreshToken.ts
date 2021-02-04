import Keychain from 'react-native-keychain';

const getRfreshToken = async () => {
  const rToken = await Keychain.getGenericPassword({
    service: '@rToken',
  });

  if (!rToken || !rToken.password) {
    const err = new Error('[getRefreshToken] : No refresh Token');
    throw err;
  }

  return rToken.password;
};

export default getRfreshToken;
