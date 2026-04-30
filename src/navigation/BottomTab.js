import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { HomeScreen, OrderScreen } from '../screens/PlaceholderScreens';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CategoryStack from './CategoryStack';

const Tab = createBottomTabNavigator();

const TABS = [
  { 
    name: 'HomeTab', 
    label: 'TRANG CHỦ', 
    icon: 'home', 
    component: HomeScreen 
  },
  { 
    name: 'CategoryTab', 
    label: 'DANH MỤC', 
    icon: 'grid', 
    component: CategoryStack 
  },
  { 
    name: 'CartTab', 
    label: 'GIỎ HÀNG', 
    icon: 'cart', 
    component: CartScreen, 
    badge: true 
  },
  { 
    name: 'OrderTab', 
    label: 'ĐƠN HÀNG', 
    icon: 'receipt', 
    component: OrderScreen 
  },
  { 
    name: 'ProfileTab', 
    label: 'CÁ NHÂN', 
    icon: 'person', 
    component: ProfileScreen 
  },
];

export default function BottomTab() {
  function getScreenOptions({ route }) {
    const tab = TABS.find(function(t) {
      return t.name === route.name;
    });

    function renderTabBarIcon({ focused, color }) {
      let iconName;
      
      if (focused) {
        iconName = tab?.icon;
      } else {
        iconName = tab?.icon + '-outline';
      }

      return (
        <View style={styles.iconWrap}>
          <Ionicons name={iconName} size={22} color={color} />
          
          {tab?.badge && (
            <View style={styles.cartBadge}>
              <View style={styles.cartDot} />
            </View>
          )}
        </View>
      );
    }

    return {
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarLabelStyle: styles.tabLabel,
      tabBarActiveTintColor: '#2E7D32',
      tabBarInactiveTintColor: '#BDBDBD',
      tabBarLabel: tab?.label ?? route.name,
      tabBarIcon: renderTabBarIcon,
    };
  }

  return (
    <Tab.Navigator screenOptions={getScreenOptions}>
      {TABS.map(function(tab) {
        return (
          <Tab.Screen 
            key={tab.name} 
            name={tab.name} 
            component={tab.component} 
          />
        );
      })}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  tabLabel: {
    fontSize: 9,
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