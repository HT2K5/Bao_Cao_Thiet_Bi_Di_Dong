import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getOrders } from '../services/OrderService';
import { useFocusEffect } from '@react-navigation/native';

export default function OrderHistoryScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load orders khi màn hình được focus
  useFocusEffect(
    React.useCallback(function() {
      loadOrders();
    }, [])
  );

  async function loadOrders() {
    setLoading(true);
    const loadedOrders = await getOrders();
    setOrders(loadedOrders);
    setLoading(false);
  }

  function goBack() {
    navigation.goBack();
  }

  function viewOrderDetail(order) {
    navigation.navigate('OrderDetail', { order: order });
  }

  function getStatusColor(status) {
    if (status === 'delivered') return '#2E7D32';
    if (status === 'shipping') return '#FF9800';
    if (status === 'cancelled') return '#E53935';
    return '#888';
  }

  function getStatusIcon(status) {
    if (status === 'delivered') return 'checkmark-circle';
    if (status === 'shipping') return 'car';
    if (status === 'cancelled') return 'close-circle';
    return 'time';
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <Ionicons name="chevron-back" size={22} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch sử đơn hàng</Text>
        <View style={{ width: 36 }} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <Text style={styles.loadingText}>Đang tải...</Text>
        </View>
      ) : orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={80} color="#BDBDBD" />
          <Text style={styles.emptyTitle}>Chưa có đơn hàng nào</Text>
          <Text style={styles.emptyText}>Đặt hàng ngay để xem lịch sử tại đây!</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {orders.map(function(order) {
            const statusColor = getStatusColor(order.status);
            const statusIcon = getStatusIcon(order.status);

            return (
              <TouchableOpacity
                key={order.id}
                style={styles.orderCard}
                activeOpacity={0.7}
                onPress={function() {
                  viewOrderDetail(order);
                }}
              >
                {/* Header */}
                <View style={styles.orderHeader}>
                  <View>
                    <Text style={styles.orderId}>#{order.id}</Text>
                    <Text style={styles.orderDate}>{order.date}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: statusColor + '15' }]}>
                    <Ionicons name={statusIcon} size={14} color={statusColor} />
                    <Text style={[styles.statusText, { color: statusColor }]}>
                      {order.statusText}
                    </Text>
                  </View>
                </View>

                {/* Products Preview */}
                <View style={styles.productsPreview}>
                  {order.products.slice(0, 2).map(function(product, index) {
                    return (
                      <Text key={index} style={styles.productPreviewText}>
                        • {product.name} x{product.qty}
                      </Text>
                    );
                  })}
                  {order.products.length > 2 && (
                    <Text style={styles.moreProducts}>
                      +{order.products.length - 2} sản phẩm khác
                    </Text>
                  )}
                </View>

                {/* Footer */}
                <View style={styles.orderFooter}>
                  <View>
                    <Text style={styles.itemsCount}>{order.items} sản phẩm</Text>
                  </View>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Tổng cộng:</Text>
                    <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
                  </View>
                </View>

                {/* Arrow */}
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#BDBDBD"
                  style={styles.arrow}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 52,
    paddingBottom: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#888',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
    textAlign: 'center',
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: '#888',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  productsPreview: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  productPreviewText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },
  moreProducts: {
    fontSize: 13,
    color: '#2E7D32',
    fontWeight: '600',
    marginTop: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingRight: 24,
  },
  itemsCount: {
    fontSize: 13,
    color: '#888',
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#2E7D32',
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    right: 16,
    marginTop: -10,
  },
});