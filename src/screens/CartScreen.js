import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { products } from '../data/TempData';

const FARM_FEE = 4.99;
const SUPPORT = 2.00;

export default function CartScreen({ navigation }) {
  const initialItems = products.slice(0, 4).map(function(p) {
    return { ...p, qty: 1 };
  });

  const [items, setItems] = useState(initialItems);
  const [coupon, setCoupon] = useState('');

  function updateQty(id, delta) {
    setItems(function(prevItems) {
      return prevItems.map(function(item) {
        if (item.id === id) {
          const newQty = Math.max(1, item.qty + delta);
          return { ...item, qty: newQty };
        }
        return item;
      });
    });
  }

  function removeItem(id) {
    setItems(function(prevItems) {
      return prevItems.filter(function(item) {
        return item.id !== id;
      });
    });
  }

  function renderRightActions(progress, dragX, id) {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        style={styles.deleteAction}
        onPress={function() {
          removeItem(id);
        }}
      >
        <Animated.View style={{ transform: [{ scale: scale }] }}>
          <Ionicons name="trash-outline" size={24} color="#fff" />
        </Animated.View>
      </TouchableOpacity>
    );
  }

  function navigateToCheckout() {
    navigation.navigate('CheckOut', { items: items, total: total });
  }

  const subtotal = items.reduce(function(sum, item) {
    return sum + item.price * item.qty;
  }, 0);

  const total = subtotal + FARM_FEE + SUPPORT;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={18} color="#fff" />
          </View>
          <Text style={styles.brandName}>FarmDirect</Text>
        </View>
        <Ionicons name="cart-outline" size={26} color="#2E7D32" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text style={styles.pageTitle}>Giỏ hàng của bạn</Text>
        <Text style={styles.pageSubtitle}>
          {items.length} sản phẩm từ nông trại
        </Text>

        {/* Cart Items với Swipe */}
        {items.map(function(item) {
          return (
            <Swipeable
              key={item.id}
              renderRightActions={function(progress, dragX) {
                return renderRightActions(progress, dragX, item.id);
              }}
              overshootRight={false}
            >
              <View style={styles.cartItem}>
                <View style={styles.itemImg}>
                  {item.image ? (
                    <Image source={item.image} style={styles.img} />
                  ) : (
                    <Ionicons name="leaf-outline" size={32} color="#2E7D32" />
                  )}
                </View>

                <View style={styles.itemInfo}>
                  <TouchableOpacity 
                    style={styles.removeBtn} 
                    onPress={function() {
                      removeItem(item.id);
                    }}
                  >
                    <Ionicons name="close" size={16} color="#999" />
                  </TouchableOpacity>
                  
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemBrand}>
                    {item.category} • {item.origin}
                  </Text>
                  <Text style={styles.itemPrice}>
                    ${item.price.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.qtyControl}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={function() {
                      updateQty(item.id, -1);
                    }}
                  >
                    <Text style={styles.qtyBtnText}>−</Text>
                  </TouchableOpacity>

                  <Text style={styles.qtyNum}>{item.qty}</Text>

                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={function() {
                      updateQty(item.id, 1);
                    }}
                  >
                    <Text style={styles.qtyBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Swipeable>
          );
        })}

        {/* Coupon */}
        <View style={styles.couponRow}>
          <Ionicons
            name="pricetag-outline"
            size={18}
            color="#999"
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={styles.couponInput}
            placeholder="Nhập mã khuyến mãi"
            placeholderTextColor="#BDBDBD"
            value={coupon}
            onChangeText={setCoupon}
          />
          <TouchableOpacity style={styles.applyBtn}>
            <Text style={styles.applyText}>Áp dụng</Text>
          </TouchableOpacity>
        </View>

        {/* Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Tóm tắt đơn hàng</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tạm tính</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryLabelRow}>
              <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
              <Ionicons
                name="information-circle-outline"
                size={14}
                color="#999"
                style={{ marginLeft: 4 }}
              />
            </View>
            <Text style={styles.summaryValue}>${FARM_FEE.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: '#2E7D32' }]}>
              Hỗ trợ nông dân (Tuỳ chọn)
            </Text>
            <Text style={[styles.summaryValue, { color: '#2E7D32' }]}>
              -${SUPPORT.toFixed(2)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Tổng cộng</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.checkoutBtn}
          activeOpacity={0.85}
          onPress={navigateToCheckout}
        >
          <Text style={styles.checkoutText}>Tiến hành thanh toán →</Text>
        </TouchableOpacity>

        <View style={styles.secureRow}>
          <Ionicons name="lock-closed-outline" size={13} color="#999" />
          <Text style={styles.secureText}> Thanh toán bảo mật</Text>
        </View>
      </View>
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
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    marginHorizontal: 20,
    marginTop: 20,
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#888',
    marginHorizontal: 20,
    marginBottom: 16,
    marginTop: 2,
  },
  cartItem: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  deleteAction: {
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    marginBottom: 12,
    marginRight: 16,
    borderRadius: 16,
  },
  itemImg: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#F1F8F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  img: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  itemInfo: {
    flex: 1,
  },
  removeBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 4,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 3,
    paddingRight: 24,
  },
  itemBrand: {
    fontSize: 11,
    color: '#888',
    marginBottom: 6,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnText: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  qtyNum: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    minWidth: 20,
    textAlign: 'center',
  },
  couponRow: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  couponInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
  },
  applyBtn: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  applyText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#555',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1A1A1A',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  checkoutBtn: {
    backgroundColor: '#2E7D32',
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: 'center',
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  checkoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secureRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  secureText: {
    fontSize: 12,
    color: '#999',
  },
});