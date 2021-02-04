import { resetGenericPassword } from 'react-native-keychain';

const handleSignOut = async () => {
  const aTokenresponse = await resetGenericPassword({ service: '@aToken' });
  const rTokenresponse = await resetGenericPassword({ service: '@rToken' });

  if (!aTokenresponse && !rTokenresponse) {
    const err = new Error('[handleSignOut]: failed singout');
    throw err;
  }
};

export default handleSignOut;
