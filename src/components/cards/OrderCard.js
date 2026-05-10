import React from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function OrderCard({ item, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => onPress?.(item)}
    >
      {/* HEADER */}

      <View style={styles.cardHeader}>
        <Text style={styles.orderId}>Đơn hàng #{item.id}</Text>

        <View style={styles.statusBox}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      {/* PRODUCT */}

      <View style={styles.productRow}>
        <Image
          source={require('../../../assets/images/historyicon.jpg')}
          style={styles.image}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>

          <Text style={styles.count}>{item.count} sản phẩm</Text>
        </View>

        <Text style={styles.total}>${item.total}</Text>
      </View>

      {/* FOOTER */}

      <View style={styles.footer}>
        <View style={styles.timeRow}></View>

        <View style={styles.detailBtn}>
          <Text style={styles.detailText}>Xem chi tiết</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',

    borderRadius: 22,

    padding: 16,

    marginBottom: 16,

    shadowColor: '#000',

    shadowOpacity: 0.05,

    shadowRadius: 10,

    elevation: 2,
  },

  cardHeader: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: 14,
  },

  orderId: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222',
  },

  statusBox: {
    backgroundColor: '#E8F5E9',

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 20,
  },

  statusText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '700',
  },

  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    width: 72,
    height: 72,

    borderRadius: 18,

    marginRight: 14,
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },

  count: {
    marginTop: 6,

    fontSize: 13,

    color: '#888',
  },

  total: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2E7D32',
  },

  footer: {
    marginTop: 16,

    paddingTop: 14,

    borderTopWidth: 1,

    borderTopColor: '#F2F2F2',

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  time: {
    marginLeft: 4,

    fontSize: 12,

    color: '#888',
  },

  detailBtn: {
    backgroundColor: '#F1F8E9',

    paddingHorizontal: 14,
    paddingVertical: 8,

    borderRadius: 12,
  },

  detailText: {
    color: '#2E7D32',

    fontSize: 12,

    fontWeight: '700',
  },
});
