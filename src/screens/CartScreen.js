import React, { useState, useMemo } from 'react';
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
import { useCart } from '../context/CartContext';

const FARM_FEE = 4.99;
const SUPPORT = 2.0;

export default function CartScreen({ navigation }) {
  const { cartItems: items, updateQty, removeFromCart } = useCart();

  const removeItem = (id) => {
    removeFromCart(id);
  };

  const [coupon, setCoupon] = useState('');

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [items]);

  const total = useMemo(() => {
    return subtotal + FARM_FEE - SUPPORT;
  }, [subtotal]);

  const navigateToCheckout = () => {
    navigation.navigate('CheckOut', {
      items,
      total,
    });
  };

  const renderRightActions = (progress, dragX, id) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        style={styles.deleteAction}
        onPress={() => removeItem(id)}
      >
        <Animated.View
          style={{
            transform: [{ scale }],
          }}
        >
          <Ionicons name='trash-outline' size={24} color='#fff' />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name='cart-outline' size={90} color='#D0D0D0' />

        <Text style={styles.emptyTitle}>Giỏ hàng đang trống</Text>

        <Text style={styles.emptySubtitle}>
          Hãy thêm sản phẩm vào giỏ hàng của bạn
        </Text>

        <TouchableOpacity
          style={styles.shopButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.shopButtonText}>Mua sắm ngay</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='#FFFFFF' />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarCircle}>
            <Ionicons name='person' size={18} color='#fff' />
          </View>

          <Text style={styles.brandName}>FarmDirect</Text>
        </View>

        <Ionicons name='cart-outline' size={26} color='#2E7D32' />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 140,
        }}
      >
        <Text style={styles.pageTitle}>Giỏ hàng của bạn</Text>

        <Text style={styles.pageSubtitle}>{items.length} sản phẩm</Text>

        {items.map((item) => {
          return (
            <Swipeable
              key={item.id}
              overshootRight={false}
              renderRightActions={(progress, dragX) =>
                renderRightActions(progress, dragX, item.id)
              }
            >
              <View style={styles.cartItem}>
                <View style={styles.itemImg}>
                  <Image source={item.image} style={styles.img} />
                </View>

                <View style={styles.itemInfo}>
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removeItem(item.id)}
                  >
                    <Ionicons name='close' size={16} color='#999' />
                  </TouchableOpacity>

                  <Text numberOfLines={1} style={styles.itemName}>
                    {item.name}
                  </Text>

                  <Text style={styles.itemBrand}>
                    {item.category} • {item.origin}
                  </Text>

                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                </View>

                <View style={styles.qtyControl}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQty(item.id, -1)}
                  >
                    <Text style={styles.qtyBtnText}>−</Text>
                  </TouchableOpacity>

                  <Text style={styles.qtyNum}>{item.qty}</Text>

                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQty(item.id, 1)}
                  >
                    <Text style={styles.qtyBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Swipeable>
          );
        })}

        <View style={styles.couponRow}>
          <Ionicons
            name='pricetag-outline'
            size={18}
            color='#999'
            style={{ marginRight: 8 }}
          />

          <TextInput
            style={styles.couponInput}
            placeholder='Nhập mã khuyến mãi'
            placeholderTextColor='#BDBDBD'
            value={coupon}
            onChangeText={setCoupon}
          />

          <TouchableOpacity style={styles.applyBtn}>
            <Text style={styles.applyText}>Áp dụng</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Tóm tắt đơn hàng</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tạm tính</Text>

            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Phí vận chuyển</Text>

            <Text style={styles.summaryValue}>${FARM_FEE.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: '#2E7D32' }]}>
              Hỗ trợ nông dân
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

      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.checkoutBtn}
          onPress={navigateToCheckout}
        >
          <Text style={styles.checkoutText}>Tiến hành thanh toán →</Text>
        </TouchableOpacity>

        <View style={styles.secureRow}>
          <Ionicons name='lock-closed-outline' size={13} color='#999' />

          <Text style={styles.secureText}>Thanh toán bảo mật</Text>
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

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },

  emptyTitle: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
  },

  emptySubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    lineHeight: 22,
  },

  shopButton: {
    marginTop: 28,
    backgroundColor: '#2E7D32',
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 16,
  },

  shopButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    overflow: 'hidden',
    marginRight: 12,
  },

  img: {
    width: '100%',
    height: '100%',
  },

  itemInfo: {
    flex: 1,
  },

  removeBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 4,
    zIndex: 99,
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
    fontWeight: '600',
    color: '#1A1A1A',
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
    shadowOffset: {
      width: 0,
      height: 1,
    },
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    shadowOffset: {
      width: 0,
      height: 6,
    },
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
