import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import OrderScreen from '../screens/OrderScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CategoryStack from './CategoryStack';
import { CommonActions } from '@react-navigation/native';
const Tab = createBottomTabNavigator();

const TABS = [
  {
    name: 'Home',
    label: 'TRANG CHỦ',
    icon: 'home',
    component: HomeScreen,
  },
  {
    name: 'Category',
    label: 'DANH MỤC',
    icon: 'grid',
    component: CategoryStack,
  },
  {
    name: 'Cart',
    label: 'GIỎ HÀNG',
    icon: 'cart',
    component: CartScreen,
    badge: true,
  },
  {
    name: 'Order',
    label: 'ĐƠN HÀNG',
    icon: 'receipt',
    component: OrderScreen,
  },
  {
    name: 'Profile',
    label: 'CÁ NHÂN',
    icon: 'person',
    component: ProfileScreen,
  },
];

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const tab = TABS.find((t) => t.name === route.name);

        // fallback tránh crash nếu lệch name
        if (!tab) {
          return { headerShown: false };
        }

        return {
          headerShown: false,

          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,

          tabBarActiveTintColor: '#2E7D32',
          tabBarInactiveTintColor: '#BDBDBD',

          tabBarLabel: tab.label,

          tabBarIcon: ({ focused, color }) => {
            const iconName = focused ? tab.icon : `${tab.icon}-outline`;

            return (
              <View style={styles.iconWrap}>
                <Ionicons name={iconName} size={22} color={color} />

                {tab.badge && (
                  <View style={styles.cartBadge}>
                    <View style={styles.cartDot} />
                  </View>
                )}
              </View>
            );
          },
        };
      }}
    >
      {TABS.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              if (tab.name === 'Category') {
                const state = route.state;

                // nếu đang ở screen con
                if (state && state.index > 0) {
                  e.preventDefault();

                  navigation.dispatch(
                    CommonActions.navigate({
                      name: 'Category',
                      params: {
                        screen: 'CategoryScreen',
                      },
                    })
                  );
                }
              }
            },
          })}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    height: 68,
    paddingBottom: 8,
    paddingTop: 6,
    elevation: 12,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  iconWrap: {
    position: 'relative',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -6,
  },
  cartDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E53935',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
});
