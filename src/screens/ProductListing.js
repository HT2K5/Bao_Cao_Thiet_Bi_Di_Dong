import React, { useMemo, useState, useCallback, useEffect } from 'react';

import { useCart } from '../context/CartContext';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import ProductCardSmall from '../components/cards/ProductCardSmall';

import ProductCardLarge from '../components/cards/ProductCardLarge';

export default function ProductListing() {
  const route = useRoute();

  const navigation = useNavigation();

  const { addToCart } = useCart();

  const { category, group, keyword } = route.params || {};

  const [products, setProducts] = useState([]);

  const [activeChip, setActiveChip] = useState('Tất cả');

  /* =========================
     FETCH PRODUCTS
  ========================= */

  useEffect(() => {
    fetch('http://192.168.1.101/farmdirect/api/get-products.php')
      .then((res) => res.json())
      .then((data) => {
        console.log('PRODUCT LIST:', data);

        setProducts(data);
      })
      .catch((err) => {
        console.log('PRODUCT API ERROR:', err);
      });
  }, []);

  /* =========================
     FILTER PRODUCTS
  ========================= */

  const filteredProducts = useMemo(() => {
    let list = [...products];

    /* ===== SEARCH ===== */

    if (keyword) {
      list = list.filter((item) =>
        item.name?.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    /* ===== CATEGORY ===== */

    if (category) {
      list = list.filter(
        (item) =>
          item.category_name?.trim().toLowerCase() ===
          category?.trim().toLowerCase()
      );
    }

    /* ===== GROUP ===== */

    if (group) {
      list = list.filter(
        (item) =>
          item.group_name?.trim().toLowerCase() === group?.trim().toLowerCase()
      );
    }

    /* ===== CHIP ===== */

    if (activeChip !== 'Tất cả') {
      list = list.filter((item) => item.name === activeChip);
    }

    return list;
  }, [products, keyword, category, group, activeChip]);

  /* =========================
     CHIP LIST
  ========================= */

  const chips = useMemo(() => {
    return ['Tất cả', ...new Set(filteredProducts.map((item) => item.name))];
  }, [filteredProducts]);

  /* =========================
     HIGHLIGHT
  ========================= */

  const highlightProduct = filteredProducts[0];

  const normalProducts = filteredProducts.slice(1);

  /* =========================
     HANDLERS
  ========================= */

  const handlePressProduct = useCallback(
    (product) => {
      navigation.navigate('ProductDetail', {
        product,
      });
    },
    [navigation]
  );

  const handleAddToCart = useCallback(
    (product) => {
      addToCart(product);
    },
    [addToCart]
  );

  /* =========================
     RENDER ITEM
  ========================= */

  const renderProduct = ({ item }) => {
    return (
      <ProductCardSmall
        product={item}
        onPress={handlePressProduct}
        onAddToCart={handleAddToCart}
      />
    );
  };

  /* =========================
     EMPTY
  ========================= */

  const EmptyComponent = () => {
    return (
      <View style={styles.emptyBox}>
        <Ionicons name='basket-outline' size={60} color='#ccc' />

        <Text style={styles.emptyTitle}>Không tìm thấy sản phẩm</Text>
      </View>
    );
  };

  /* =========================
     HEADER
  ========================= */

  const ListHeader = () => {
    return (
      <>
        {/* ===== TITLE ===== */}

        <View style={styles.header}>
          <Text style={styles.title}>
            {keyword ? `Kết quả "${keyword}"` : group || category}
          </Text>

          <Text style={styles.subtitle}>
            {filteredProducts.length} sản phẩm
          </Text>
        </View>

        {/* ===== CHIP ===== */}

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={chips}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.chipList}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setActiveChip(item)}
              style={[styles.chip, activeChip === item && styles.chipActive]}
            >
              <Text
                style={[
                  styles.chipText,

                  activeChip === item && {
                    color: '#fff',
                  },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* ===== HIGHLIGHT ===== */}

        {highlightProduct && (
          <ProductCardLarge
            product={highlightProduct}
            onPress={handlePressProduct}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* ===== SECTION ===== */}

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Danh sách sản phẩm</Text>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={normalProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={EmptyComponent}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },

  listContent: {
    paddingBottom: 30,
  },

  /* ================= HEADER ================= */

  header: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#777',
  },

  /* ================= CHIP ================= */

  chipList: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,

    borderRadius: 22,

    backgroundColor: '#f1f1f1',

    marginRight: 10,
  },

  chipActive: {
    backgroundColor: '#1B5E20',
  },

  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },

  /* ================= SECTION ================= */

  sectionRow: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  /* ================= GRID ================= */

  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },

  /* ================= EMPTY ================= */

  emptyBox: {
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
  },
});
