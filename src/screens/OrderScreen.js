import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useOrders } from '../context/OrderContext';
import { Ionicons } from '@expo/vector-icons';

import OrderCard from '../components/cards/OrderCard';

export default function OrderScreen() {
  const { orders } = useOrders();
  const handlePressOrder = (item) => {
    console.log('ORDER:', item.id);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='#F8F8F8' />

      {/* HEADER */}

      <View style={styles.header}>
        <Text style={styles.title}>Đơn hàng của tôi</Text>

        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name='options-outline' size={20} color='#222' />
        </TouchableOpacity>
      </View>

      {/* LIST */}

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderCard item={item} onPress={handlePressOrder} />
        )}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingTop: 52,
  },

  header: {
    paddingHorizontal: 20,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111',
  },

  filterBtn: {
    width: 42,
    height: 42,

    borderRadius: 14,

    backgroundColor: '#fff',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,

    elevation: 2,
  },
});
