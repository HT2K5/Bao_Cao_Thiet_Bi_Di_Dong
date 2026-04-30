import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function Placeholder({ label, icon }) {
  return (
    <View style={styles.wrap}>
      <Ionicons name={icon} size={52} color="#2E7D32" />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.sub}>Coming soon</Text>
    </View>
  );
}

export function HomeScreen() {
  return <Placeholder label="Trang chủ" icon="home-outline" />;
}

export function CategoryScreen() {
  return <Placeholder label="Danh mục" icon="grid-outline" />;
}

export function OrderScreen() {
  return <Placeholder label="Đơn hàng" icon="receipt-outline" />;
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  label: { fontSize: 20, fontWeight: '800', color: '#1A1A1A' },
  sub: { fontSize: 13, color: '#ADADAD' },
});