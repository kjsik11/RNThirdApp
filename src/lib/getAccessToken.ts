import Keychain from 'react-native-keychain';

const getAccessToken = async () => {
  const aToken = await Keychain.getGenericPassword({
    service: '@aToken',
  });

  if (!aToken || !aToken.password) {
    const err = new Error('[getAccessToken] : No Access Token');
    throw err;
  }

  return aToken.password;
};

export default getAccessToken;
