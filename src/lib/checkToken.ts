import { API_URL } from '../defines';
import renewToken from './renewToken';

const checkToken = async () => {
  const response = await fetch(`${API_URL}/auth`, {
    headers: {
      Authorization: 'Bearer ' + (await renewToken()),
    },
    method: 'GET',
  });
  const { error, userId } = await response.json();

  if (error) {
    const err = new Error(`[checkToken]:${error.message}`);
    throw err;
  }

  return userId;
};

export default checkToken;
