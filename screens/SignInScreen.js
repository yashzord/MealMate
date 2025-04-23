import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignInScreen({ navigation }) {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]     = useState('');

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MealMate</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <View style={{ marginTop: 10 }}>
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:16 },
  title: { fontSize:24, marginBottom:16, textAlign:'center' },
  input: {
    borderWidth:1, borderRadius:4, padding:8, marginVertical:8
  },
  error: { color:'red', textAlign:'center', marginBottom:8 }
});
