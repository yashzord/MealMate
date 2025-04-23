import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Title,
  HelperText,
  Card
} from 'react-native-paper';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]     = useState('');

  const handleSignUp = async () => {
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      navigation.replace('Home');
    } catch (err) {
      setError(err.message);
    }
  };

  const hasEmailError = () => error.includes('email');
  const hasPasswordError = () => error.includes('password') || error.includes('weak-password');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={styles.container}
      >
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Create an Account</Title>

            <TextInput
              label="Email"
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <HelperText type="error" visible={hasEmailError()}>
              { hasEmailError() ? error : '' }
            </HelperText>

            <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
            <HelperText type="error" visible={hasPasswordError()}>
              { hasPasswordError() ? error : '' }
            </HelperText>

            <Button
              mode="contained"
              onPress={handleSignUp}
              style={styles.button}
              contentStyle={{ paddingVertical: 6 }}
            >
              Sign Up
            </Button>

            <Button
              onPress={() => navigation.goBack()}
              style={styles.link}
            >
              Already have an account? Sign In
            </Button>
          </Card.Content>
        </Card>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:16 },
  card: { padding: 8 },
  title: { textAlign:'center', marginBottom:16 },
  input: { marginBottom: 8 },
  button: { marginTop: 8 },
  link: { marginTop: 12 }
});
