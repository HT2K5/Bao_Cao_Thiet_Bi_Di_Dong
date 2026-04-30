import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './BottomTab';
import ProductListing from '../screens/ProductListing';
import ProductDetail from '../screens/ProductDetail';
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTab" component={MainTabNavigator} />
      <Stack.Screen name="ProductListing" component={ProductListing} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
}