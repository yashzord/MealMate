import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, Button, Card, Paragraph } from 'react-native-paper';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function HomeScreen({ navigation }) {
  const handleSignOut = async () => {
    await signOut(auth);
    navigation.replace('SignIn');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Welcome to MealMate!</Title>
          <Paragraph style={styles.paragraph}>
            Track your pantry, discover recipes, and cut down on food waste.
          </Paragraph>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Pantry')}
            style={styles.button}
          >
            My Pantry
          </Button>
          <Button
            mode="outlined"
            onPress={handleSignOut}
            style={styles.button}
          >
            Sign Out
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:16 },
  card: { paddingVertical: 20 },
  title: { textAlign:'center', marginBottom: 12 },
  paragraph: { textAlign:'center', marginBottom: 16 },
  actions: { justifyContent: 'center' },
  button: { marginHorizontal: 8 }
});
