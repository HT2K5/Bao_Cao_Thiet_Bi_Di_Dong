import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import CheckOutScreen from '../screens/CheckOutScreen';

// thêm mới
import Onboarding from '../screens/Onboarding';
import LoginAndSignUp from '../screens/LoginAndSignUp';
import ProductListing from '../screens/ProductListing';
import ProductDetail from '../screens/ProductDetail';
import OrderScreen from '../screens/OrderScreen';
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='Onboarding'
    >
      {/* MỚI: Onboarding */}
      <Stack.Screen name='Onboarding' component={Onboarding} />

      {/* MỚI: Auth */}
      <Stack.Screen name='LoginAndSignUp' component={LoginAndSignUp} />
      {/* CŨ: giữ nguyên */}
      <Stack.Screen name='MainTab' component={BottomTab} />
      <Stack.Screen name='CheckOut' component={CheckOutScreen} />
      <Stack.Screen
        name='ProductListing'
        component={ProductListing}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ProductDetail'
        component={ProductDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='OrderScreen' component={OrderScreen} />
    </Stack.Navigator>
  );
}
