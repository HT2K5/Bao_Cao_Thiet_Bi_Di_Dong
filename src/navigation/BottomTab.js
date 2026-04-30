import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from '../screens/HomeScreen';
import CategoryStack from './CategoryStack';
import Cart from '../screens/CartScreen';
import Profile from '../screens/ProfileScreen';
import Checkout from '../screens/CheckOutScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarShowLabel: true,

        tabBarStyle: {
          height: 60,
          paddingBottom: 6,
        },

        tabBarActiveTintColor: "#2e7d32",
        tabBarInactiveTintColor: "#999",

        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Category") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Checkout") {
            iconName = focused ? "receipt" : "receipt-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={20} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />

      <Tab.Screen
        name="Category"
        component={CategoryStack}
        options={{ title: "Danh mục" }}
      />

      <Tab.Screen name="Cart" component={Cart} options={{ title: "Giỏ hàng" }} />

      <Tab.Screen
        name="Checkout"
        component={Checkout}
        options={{ title: "Đơn hàng" }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Cá nhân" }}
      />
    </Tab.Navigator>
  );
}