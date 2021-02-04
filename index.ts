/**
 * @format
 */

import { Navigation } from 'react-native-navigation';
import { withNavigationProvider } from 'react-native-navigation-hooks/dist';
import checkLogin from './src/lib/checkLogin';

import { appPath, loginPath } from './src/paths';
import App from './src/screen/App';
import Login from './src/screen/Login';

Navigation.registerComponent('App', () => withNavigationProvider(App));
Navigation.registerComponent('Login', () => withNavigationProvider(Login));
Navigation.setDefaultOptions({
  layout: {
    orientation: ['portrait'],
  },
});

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot((await checkLogin()) ? appPath : loginPath);
});
