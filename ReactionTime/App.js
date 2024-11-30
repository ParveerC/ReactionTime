import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from './screens/MenuScreen';
import SimpleReactionTestScreen from './screens/SimpleReactionTestScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'Reaction Test Menu' }} />
        <Stack.Screen name="SimpleReactionTest" component={SimpleReactionTestScreen} options={{ title: 'Simple Reaction Test' }} />
        <Stack.Screen name="ColorChangeReactionTest" component={MenuScreen} options={{ title: 'Color Change Reaction Test' }} />
        <Stack.Screen name="SoundReactionTest" component={MenuScreen} options={{ title: 'Sound Reaction Test' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
