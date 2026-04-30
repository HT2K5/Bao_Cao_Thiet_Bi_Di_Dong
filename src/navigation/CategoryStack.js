import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CategoryScreen from "../screens/CategoryScreen";
import ProductListing from "../screens/ProductListing";
import ProductDetail from "../screens/ProductDetail";

const Stack = createNativeStackNavigator();

export default function CategoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CategoryHome" component={CategoryScreen} />
      <Stack.Screen name="ProductListing" component={ProductListing} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
}