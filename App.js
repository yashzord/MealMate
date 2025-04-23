import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen   from './screens/SignInScreen';
import SignUpScreen   from './screens/SignUpScreen';
import HomeScreen     from './screens/HomeScreen';
import PantryScreen   from './screens/PantryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
          <Stack.Screen name="Home"   component={HomeScreen}   options={{ headerShown: false }} />
          <Stack.Screen name="Pantry" component={PantryScreen} options={{ title: 'My Pantry' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
