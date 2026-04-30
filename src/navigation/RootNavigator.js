import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from './BottomTab';
import CheckOutScreen from '../screens/CheckoutScreen';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main"     component={BottomTab} />
      <Stack.Screen name="CheckOut" component={CheckOutScreen} />
    </Stack.Navigator>
  );
}