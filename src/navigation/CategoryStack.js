import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CategoryScreen } from '../screens/PlaceholderScreens';

const Stack = createStackNavigator();

export default function CategoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CategoryMain" component={CategoryScreen} />
    </Stack.Navigator>
  );
}