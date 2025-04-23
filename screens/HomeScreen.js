import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function HomeScreen({ navigation }) {
  const handleSignOut = async () => {
    await signOut(auth);
    navigation.replace('SignIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>You’re logged in!</Text>
      <Button
        title="Go to Pantry"
        onPress={() => navigation.navigate('Pantry')}
      />
      <View style={{ marginTop: 10 }}>
        <Button title="Sign Out" onPress={handleSignOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, alignItems:'center', justifyContent:'center' },
  text: { fontSize:20, marginBottom:20 }
});
