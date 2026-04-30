import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { user as initialUser } from '../data/TempData';
import * as ImagePicker from 'expo-image-picker';

const MENU_ITEMS = [
  { id: 'orders', label: 'Lịch sử đơn hàng', icon: 'receipt-outline' },
  { id: 'address', label: 'Địa chỉ đã lưu', icon: 'location-outline' },
  { id: 'vouchers', label: 'Ưu đãi của tôi', icon: 'pricetag-outline' },
  { id: 'settings', label: 'Cài đặt', icon: 'settings-outline' },
  { id: 'logout', label: 'Đăng xuất', icon: 'log-out-outline', danger: true },
];

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(initialUser);
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(user.name);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setUser(function(prev) {
        return { ...prev, avatar: result.assets[0].uri };
      });
    }
  }

  function saveName() {
    setUser(function(prev) {
      return { ...prev, name: tempName };
    });
    setEditingName(false);
  }

  function startEditName() {
    setTempName(user.name);
    setEditingName(true);
  }

  function cancelEditName() {
    setEditingName(false);
  }

  function handleMenu(id) {
    if (id === 'logout') {
      Alert.alert('Đăng xuất', 'Bạn có chắc muốn đăng xuất?', [
        { text: 'Huỷ', style: 'cancel' },
        { 
          text: 'Đăng xuất', 
          style: 'destructive', 
          onPress: function() {} 
        },
      ]);
    }
  }

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
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <TouchableOpacity style={styles.avatarWrap} onPress={pickImage}>
            {user.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatarImg} />
            ) : (
              <View style={styles.avatarBig}>
                <Ionicons name="person" size={44} color="#fff" />
              </View>
            )}
            <View style={styles.editBadge}>
              <Ionicons name="camera" size={12} color="#fff" />
            </View>
          </TouchableOpacity>

          {editingName ? (
            <View style={styles.nameEdit}>
              <TextInput
                style={styles.nameInput}
                value={tempName}
                onChangeText={setTempName}
                autoFocus
              />
              <View style={styles.nameActions}>
                <TouchableOpacity onPress={cancelEditName}>
                  <Text style={styles.cancelBtn}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={saveName}>
                  <Text style={styles.saveBtn}>Lưu</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity onPress={startEditName}>
              <Text style={styles.userName}>{user.name}</Text>
              <Ionicons 
                name="pencil" 
                size={14} 
                color="#2E7D32" 
                style={{ alignSelf: 'center', marginTop: 4 }} 
              />
            </TouchableOpacity>
          )}

          <Text style={styles.userEmail}>{user.email}</Text>
          
          {user.verified && (
            <View style={styles.verifiedPill}>
              <Ionicons name="checkmark-circle" size={14} color="#2E7D32" />
              <Text style={styles.verifiedText}> Người mua đã xác thực</Text>
            </View>
          )}
        </View>

        {/* Menu */}
        <View style={styles.menuCard}>
          {MENU_ITEMS.map(function(item, index) {
            const isLastItem = index === MENU_ITEMS.length - 1;
            
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuRow, 
                  !isLastItem && styles.menuRowBorder
                ]}
                onPress={function() {
                  handleMenu(item.id);
                }}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.menuIcon, 
                  item.danger && styles.menuIconDanger
                ]}>
                  <Ionicons 
                    name={item.icon} 
                    size={20} 
                    color={item.danger ? '#E53935' : '#2E7D32'} 
                  />
                </View>
                
                <Text style={[
                  styles.menuLabel, 
                  item.danger && styles.menuLabelDanger
                ]}>
                  {item.label}
                </Text>
                
                <View style={styles.menuRight}>
                  {item.id === 'vouchers' && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{user.points} Pts</Text>
                    </View>
                  )}
                  {!item.danger && (
                    <Ionicons name="chevron-forward" size={18} color="#BDBDBD" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
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
  profileCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: 14,
  },
  avatarBig: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImg: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  editBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#2E7D32',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 13,
    color: '#888',
    marginBottom: 10,
    marginTop: 4,
  },
  nameEdit: {
    alignItems: 'center',
    width: '100%',
  },
  nameInput: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
    borderBottomWidth: 2,
    borderBottomColor: '#2E7D32',
    paddingVertical: 4,
    textAlign: 'center',
    minWidth: 200,
  },
  nameActions: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  cancelBtn: {
    fontSize: 14,
    color: '#888',
  },
  saveBtn: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '700',
  },
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F8F1',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  verifiedText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '600',
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
    gap: 14,
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F1F8F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIconDanger: {
    backgroundColor: '#FFF0F0',
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  menuLabelDanger: {
    color: '#E53935',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});