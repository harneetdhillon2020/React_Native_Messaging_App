import React, {useState, useContext} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {ViewModelContext} from '../Model/ViewModel';

const LoginView = () => {
  const {loginModel} = useContext(ViewModelContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await loginModel(email, password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          accessibilityLabel="email"
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.textInput}
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          accessibilityLabel="password"
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.textInput}
        />
      </View>
      <Button accessibilityLabel="login" title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  textInput: {
    fontSize: 18,
    padding: 10,
    width: 200,
  },
});

export default LoginView;
