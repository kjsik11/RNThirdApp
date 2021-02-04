import checkToken from './checkToken';

const checkLogin: () => Promise<boolean> = async () => {
  try {
    await checkToken();
    return true;
  } catch (err) {
    console.log(err);

    return false;
  }
};

export default checkLogin;
