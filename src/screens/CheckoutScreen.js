import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { deliveryMethods, paymentMethods, products } from '../data/TempData';

const ITEMS = products.slice(0, 4);
const SUBTOTAL = ITEMS.reduce(function(sum, p) {
  return sum + p.price;
}, 0);
const SUBTOTAL_FIXED = Number(SUBTOTAL.toFixed(2));
const TAX = Number((SUBTOTAL * 0.08).toFixed(2));

const SAVED_ADDRESSES = [
  {
    id: 'home',
    label: 'Nhà riêng',
    address: '123 Farmstead Way, Apt 4B\nSan Francisco, CA 94110',
    phone: '+1 (555) 123-4567',
  },
  {
    id: 'office',
    label: 'Văn phòng',
    address: '456 Market St, Floor 3\nSan Francisco, CA 94102',
    phone: '+1 (555) 987-6543',
  },
  {
    id: 'parent',
    label: 'Nhà bố mẹ',
    address: '789 Oak Avenue\nPalo Alto, CA 94301',
    phone: '+1 (555) 555-1234',
  },
];

export default function CheckOutScreen({ navigation, route }) {
  const [delivery, setDelivery] = useState('standard');
  const [payment, setPayment] = useState('card');
  const [selectedAddress, setSelectedAddress] = useState(SAVED_ADDRESSES[0]);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const selectedDelivery = deliveryMethods.find(function(d) {
    return d.id === delivery;
  });

  const deliveryFee = selectedDelivery ? selectedDelivery.fee : 0;
  const total = Number((SUBTOTAL_FIXED + TAX + deliveryFee).toFixed(2));

  function handleOrder() {
    Alert.alert('🎉 Đặt hàng thành công!', 'Tổng cộng: $' + total, [
      {
        text: 'OK',
        onPress: function() {
          navigation.navigate('Main', { screen: 'CartTab' });
        },
      },
    ]);
  }

  function openAddressModal() {
    setShowAddressModal(true);
  }

  function closeAddressModal() {
    setShowAddressModal(false);
  }

  function selectAddress(addr) {
    setSelectedAddress(addr);
    setShowAddressModal(false);
  }

  function goBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <Ionicons name="chevron-back" size={22} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh toán</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Địa chỉ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
          <View style={styles.addressCard}>
            <View style={styles.addressIcon}>
              <Ionicons name="location" size={20} color="#2E7D32" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.addressLabel}>{selectedAddress.label}</Text>
              <Text style={styles.addressText}>{selectedAddress.address}</Text>
              <Text style={styles.addressPhone}>{selectedAddress.phone}</Text>
            </View>

            <TouchableOpacity onPress={openAddressModal}>
              <Text style={styles.changeBtn}>Thay đổi</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Phương thức giao hàng */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phương thức giao hàng</Text>
          <View style={styles.methodRow}>
            {deliveryMethods.map(function(m) {
              const isActive = delivery === m.id;

              return (
                <TouchableOpacity
                  key={m.id}
                  style={[
                    styles.methodCard,
                    isActive && styles.methodCardActive,
                  ]}
                  onPress={function() {
                    setDelivery(m.id);
                  }}
                >
                  {isActive && (
                    <View style={styles.checkIcon}>
                      <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color="#2E7D32"
                      />
                    </View>
                  )}

                  <Ionicons
                    name={m.id === 'standard' ? 'car-outline' : 'flash-outline'}
                    size={24}
                    color={isActive ? '#2E7D32' : '#888'}
                  />

                  <Text
                    style={[
                      styles.methodLabel,
                      isActive && styles.methodLabelActive,
                    ]}
                  >
                    {m.label}
                  </Text>

                  <Text style={styles.methodDesc}>{m.desc}</Text>

                  <Text
                    style={[
                      styles.methodFee,
                      isActive && { color: '#2E7D32' },
                    ]}
                  >
                    {m.feeLabel}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Phương thức thanh toán */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
          {paymentMethods.map(function(p) {
            const isActive = payment === p.id;

            return (
              <TouchableOpacity
                key={p.id}
                style={styles.paymentRow}
                onPress={function() {
                  setPayment(p.id);
                }}
              >
                <View style={styles.paymentIcon}>
                  <Ionicons name={p.icon} size={20} color="#2E7D32" />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.paymentLabel}>{p.label}</Text>
                  {p.desc ? (
                    <Text style={styles.paymentDesc}>{p.desc}</Text>
                  ) : null}
                </View>

                <View
                  style={[styles.radio, isActive && styles.radioActive]}
                >
                  {isActive && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Tóm tắt */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tóm tắt đơn hàng</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Tạm tính ({ITEMS.length} sản phẩm)
              </Text>
              <Text style={styles.summaryValue}>${SUBTOTAL_FIXED}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Phí giao hàng</Text>
              <Text style={[styles.summaryValue, { color: '#2E7D32' }]}>
                {deliveryFee === 0 ? 'Miễn phí' : '$' + deliveryFee.toFixed(2)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Thuế</Text>
              <Text style={styles.summaryValue}>${TAX}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Tổng cộng</Text>
              <Text style={styles.totalValue}>${total}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Order Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.orderBtn}
          activeOpacity={0.85}
          onPress={handleOrder}
        >
          <Text style={styles.orderText}>Đặt hàng ngay ${total}</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Address Modal */}
      <Modal
        visible={showAddressModal}
        transparent
        animationType="slide"
        onRequestClose={closeAddressModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chọn địa chỉ giao hàng</Text>
              <TouchableOpacity onPress={closeAddressModal}>
                <Ionicons name="close" size={24} color="#1A1A1A" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              {SAVED_ADDRESSES.map(function(addr) {
                const isSelected = selectedAddress.id === addr.id;

                return (
                  <TouchableOpacity
                    key={addr.id}
                    style={[
                      styles.addressOption,
                      isSelected && styles.addressOptionActive,
                    ]}
                    onPress={function() {
                      selectAddress(addr);
                    }}
                  >
                    <View style={styles.addressOptionIcon}>
                      <Ionicons name="location" size={18} color="#2E7D32" />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={styles.addressOptionLabel}>
                        {addr.label}
                      </Text>
                      <Text style={styles.addressOptionText}>
                        {addr.address}
                      </Text>
                      <Text style={styles.addressOptionPhone}>
                        {addr.phone}
                      </Text>
                    </View>

                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={22}
                        color="#2E7D32"
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TouchableOpacity style={styles.addNewBtn}>
              <Ionicons name="add-circle-outline" size={20} color="#2E7D32" />
              <Text style={styles.addNewText}>Thêm địa chỉ mới</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  addressIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F1F8F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
  addressPhone: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  changeBtn: {
    fontSize: 13,
    color: '#2E7D32',
    fontWeight: '700',
  },
  methodRow: {
    flexDirection: 'row',
    gap: 12,
  },
  methodCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  methodCardActive: {
    borderColor: '#2E7D32',
    backgroundColor: '#F1F8F1',
  },
  checkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  methodLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#888',
  },
  methodLabelActive: {
    color: '#2E7D32',
  },
  methodDesc: {
    fontSize: 11,
    color: '#888',
    textAlign: 'center',
  },
  methodFee: {
    fontSize: 12,
    fontWeight: '700',
    color: '#888',
  },
  paymentRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  paymentIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F1F8F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  paymentDesc: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#DEDEDE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: {
    borderColor: '#2E7D32',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2E7D32',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    color: '#2E7D32',
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
  orderBtn: {
    backgroundColor: '#2E7D32',
    borderRadius: 16,
    paddingVertical: 17,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  orderText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  addressOption: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 14,
    backgroundColor: '#F8F8F8',
  },
  addressOptionActive: {
    backgroundColor: '#F1F8F1',
    borderWidth: 1.5,
    borderColor: '#2E7D32',
  },
  addressOptionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressOptionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  addressOptionText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
  addressOptionPhone: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  addNewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#2E7D32',
    borderStyle: 'dashed',
  },
  addNewText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2E7D32',
  },
});