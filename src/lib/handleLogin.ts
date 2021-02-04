import { API_URL } from '../defines';
import fetcher from './fetcher';
import { setKeyChain } from './keyChain';

const handleLogin = async (username: string, password: string) => {
  const { accessToken, refreshToken, error } = await fetcher(
    `${API_URL}/auth`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    },
  );

  if (error) {
    const err = new Error('login failed');
    throw err;
  }

  await setKeyChain(accessToken, refreshToken);
};

export default handleLogin;
