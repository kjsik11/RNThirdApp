import { setKeyChain } from './keyChain';

const handleLogin = async (username: string, password: string) => {
  const response = await fetch('https://collected.ondp.app/api/auth', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const { accessToken, refreshToken, error } = await response.json();

  if (error) {
    const err = new Error('login failed');
    throw err;
  }

  await setKeyChain(accessToken, refreshToken);
};

export default handleLogin;
