import { API_URL } from '../defines';
import fetcher from './fetcher';
import renewToken from './renewToken';

const checkToken = async () => {
  const { error, userId } = await fetcher(`${API_URL}/auth`, {
    headers: {
      Authorization: `Bearer ${await renewToken()}`,
    },
    method: 'GET',
  });

  if (error) {
    const err = new Error(`[checkToken]:${error.message}`);
    throw err;
  }

  return userId;
};

export default checkToken;
