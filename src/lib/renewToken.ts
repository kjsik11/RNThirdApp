import { API_URL } from '../defines';
import getRfreshToken from './getRefreshToken';
import Keychain from 'react-native-keychain';
import getAccessToken from './getAccessToken';

const renewToken = async () => {
  const refreshToken = await getRfreshToken();
  const aToken = await getAccessToken();

  const response = await fetch(`${API_URL}/auth`, {
    headers: {
      Accept: 'applecation/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${aToken}`,
    },
    method: 'PUT',
    body: JSON.stringify({ refreshToken }),
  });

  const { error, accessToken } = await response.json();

  if (error) {
    const err = new Error(`[renewToken]:${error.message}`);
    throw err;
  }

  await Keychain.setGenericPassword('accessToken', accessToken, {
    service: '@aToken',
  });
  return refreshToken;
};

export default renewToken;
