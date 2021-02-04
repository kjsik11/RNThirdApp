import React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { useNavigation } from 'react-native-navigation-hooks';
import handleLogin from '../lib/handleLogin';

const s = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputBox: {
    width: 200,
    height: 40,
    borderWidth: 1,
    margin: 1,
  },

  header: {
    fontSize: 50,
    fontWeight: '600',
    marginBottom: 30,
  },
});

const Login: NavigationFunctionComponent = () => {
  const { setRoot } = useNavigation();

  const [id, setId] = React.useState<string>('');
  const [pwd, setPwd] = React.useState<string>('');

  const signIn = async () => {
    try {
      await handleLogin(id, pwd);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return (
    <SafeAreaView style={s.root}>
      <Text style={s.header}>LOGIN FIELD!!!</Text>
      <TextInput
        autoCapitalize="none"
        placeholder="ID"
        value={id}
        onChangeText={(text) => setId(text)}
        style={s.inputBox}
      />
      <TextInput
        autoCapitalize="none"
        secureTextEntry={true}
        placeholder="PWD"
        value={pwd}
        onChangeText={(text) => setPwd(text)}
        style={s.inputBox}
      />
      <Button
        title="Sign In"
        onPress={async () => {
          await signIn();
          setRoot('App');
        }}
      />
    </SafeAreaView>
  );
};

export default Login;
