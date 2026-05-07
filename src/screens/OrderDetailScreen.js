import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OrderDetailScreen({ navigation, route }) {
  const { order } = route.params;

  function goBack() {
    navigation.goBack();
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

  const statusColor = getStatusColor(order.status);
  const statusIcon = getStatusIcon(order.status);
  const subtotal = order.products.reduce(function(sum, p) {
    return sum + p.price * p.qty;
  }, 0);
  const tax = Number((subtotal * 0.08).toFixed(2));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <Ionicons name="chevron-back" size={22} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết đơn hàng</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Order Info */}
        <View style={styles.section}>
          <View style={styles.orderInfoCard}>
            <View style={styles.orderInfoRow}>
              <Text style={styles.orderInfoLabel}>Mã đơn hàng:</Text>
              <Text style={styles.orderInfoValue}>#{order.id}</Text>
            </View>
            <View style={styles.orderInfoRow}>
              <Text style={styles.orderInfoLabel}>Ngày đặt:</Text>
              <Text style={styles.orderInfoValue}>{order.date}</Text>
            </View>
            <View style={styles.orderInfoRow}>
              <Text style={styles.orderInfoLabel}>Trạng thái:</Text>
              <View style={[styles.statusBadge, { backgroundColor: statusColor + '15' }]}>
                <Ionicons name={statusIcon} size={14} color={statusColor} />
                <Text style={[styles.statusText, { color: statusColor }]}>
                  {order.statusText}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sản phẩm</Text>
          {order.products.map(function(product, index) {
            return (
              <View key={index} style={styles.productRow}>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productQty}>x{product.qty}</Text>
                </View>
                <Text style={styles.productPrice}>
                  ${(product.price * product.qty).toFixed(2)}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
          <View style={styles.addressCard}>
            <Ionicons name="location" size={20} color="#2E7D32" />
            <Text style={styles.addressText}>{order.address}</Text>
          </View>
        </View>

        {/* Delivery & Payment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin giao hàng</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="car-outline" size={18} color="#2E7D32" />
              <Text style={styles.infoLabel}>Phương thức giao hàng:</Text>
              <Text style={styles.infoValue}>{order.deliveryMethod}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Ionicons name="card-outline" size={18} color="#2E7D32" />
              <Text style={styles.infoLabel}>Thanh toán:</Text>
              <Text style={styles.infoValue}>{order.paymentMethod}</Text>
            </View>
          </View>
        </View>

        {/* Total */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tổng tiền</Text>
          <View style={styles.totalCard}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tạm tính:</Text>
              <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Phí giao hàng:</Text>
              <Text style={styles.totalValue}>
                {order.deliveryMethod === 'Giao nhanh' ? '$5.00' : 'Miễn phí'}
              </Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Thuế:</Text>
              <Text style={styles.totalValue}>${tax.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.totalRow}>
              <Text style={styles.grandTotalLabel}>Tổng cộng:</Text>
              <Text style={styles.grandTotalValue}>${order.total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        {order.status === 'delivered' && (
          <View style={styles.section}>
            <TouchableOpacity style={styles.reorderBtn}>
              <Ionicons name="refresh" size={18} color="#fff" />
              <Text style={styles.reorderText}>Đặt lại đơn hàng</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
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
  section: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  orderInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderInfoLabel: {
    fontSize: 14,
    color: '#555',
  },
  orderInfoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
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
  productRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  productQty: {
    fontSize: 13,
    color: '#888',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2E7D32',
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
  },
  addressText: {
    flex: 1,
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoLabel: {
    flex: 1,
    fontSize: 13,
    color: '#555',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 12,
  },
  totalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 14,
    color: '#555',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  grandTotalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  grandTotalValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#2E7D32',
  },
  reorderBtn: {
    backgroundColor: '#2E7D32',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  reorderText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});