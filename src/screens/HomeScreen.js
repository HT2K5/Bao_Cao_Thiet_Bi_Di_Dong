import React, { useMemo, useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons, Feather } from '@expo/vector-icons';

import { useCart } from '../context/CartContext';

import { categories, featuredProducts } from '../data/tempdata';

import ProductCardSmall from '../components/cards/ProductCardSmall';
import ProductCardLarge from '../components/cards/ProductCardLarge';

export default function HomeScreen({ navigation }) {
  const [productList, setProductList] = useState([]);

  const [search, setSearch] = useState('');

  const { addToCart } = useCart();

  /* =========================
     FETCH PRODUCTS
  ========================= */

  useEffect(() => {
    fetch('http://192.168.1.101/farmdirect/api/get-products.php')
      .then(async (res) => {
        console.log('STATUS:', res.status);

        const text = await res.text();

        console.log('RAW:', text);

        return JSON.parse(text);
      })
      .then((data) => {
        console.log('DATA:', data);

        setProductList(data);
      })
      .catch((err) => {
        console.log('API ERROR FULL:', JSON.stringify(err));
      });
  }, []);
  /* =========================
     FILTER PRODUCTS
  ========================= */

  const filteredProducts = useMemo(() => {
    if (!search.trim()) {
      return productList;
    }

    return productList.filter((item) =>
      item.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, productList]);

  /* =========================
     HANDLERS
  ========================= */

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', {
      product,
    });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handlePressCategory = (category) => {
    navigation.navigate('ProductListing', {
      category: category.name,
    });
  };

  /* =========================
     RENDER PRODUCT
  ========================= */

  const renderProduct = ({ item }) => {
    return (
      <ProductCardSmall
        product={item}
        onPress={handleProductPress}
        onAddToCart={handleAddToCart}
      />
    );
  };

  /* =========================
     HEADER
  ========================= */

  const ListHeader = () => {
    return (
      <>
        {/* HEADER */}

        <View style={styles.header}>
          <Text style={styles.headerTitle}>The Editorial Harvest</Text>
        </View>

        {/* BANNER */}

        <View style={styles.banner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerSmall}>Mùa vụ mới tại</Text>

            <Text style={styles.bannerTitle}>Mekong Delta</Text>

            <Text style={styles.bannerDesc}>
              Khám phá hương vị tự nhiên Việt Nam
            </Text>
          </View>

          <Image
            source={require('../../assets/images/Decorative Image Bleed.png')}
            style={styles.bannerImg}
          />
        </View>

        {/* SEARCH */}

        <View style={styles.searchBox}>
          <Feather name='search' size={18} color='#666' />

          <TextInput
            placeholder='Tìm nông sản...'
            placeholderTextColor='#888'
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* CATEGORY */}

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Danh mục</Text>

          <TouchableOpacity onPress={() => navigation.navigate('Category')}>
            <Text style={styles.seeAll}>XEM TẤT CẢ</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.categoryItem}
              onPress={() => handlePressCategory(item)}
            >
              <View style={styles.categoryCircle}>
                <Ionicons name={item.icon} size={22} color='#1B5E20' />
              </View>

              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        {/* FEATURED */}

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Nổi bật</Text>
        </View>

        <ProductCardLarge
          product={featuredProducts[0]}
          onPress={handleProductPress}
          onAddToCart={handleAddToCart}
        />

        {/* PRODUCTS */}

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Sản phẩm</Text>

          <Text style={styles.productCount}>
            {filteredProducts?.length || 0} sản phẩm
          </Text>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <FlatList
        data={filteredProducts || []}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={ListHeader}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 8,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  listContent: {
    paddingBottom: 30,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  headerTitle: {
    position: 'absolute',

    left: 0,
    right: 0,

    textAlign: 'center',

    fontSize: 18,
    fontWeight: '700',

    color: '#1B5E20',
  },

  banner: {
    marginHorizontal: 16,

    backgroundColor: '#E8F5E9',

    borderRadius: 24,

    padding: 18,

    flexDirection: 'row',
    alignItems: 'center',
  },

  bannerSmall: {
    fontSize: 12,
    color: '#666',
  },

  bannerTitle: {
    marginTop: 4,

    fontSize: 22,
    fontWeight: '700',

    color: '#1B5E20',
  },

  bannerDesc: {
    marginTop: 6,

    fontSize: 12,
    color: '#666',

    lineHeight: 18,
  },

  bannerImg: {
    width: 110,
    height: 110,
    borderRadius: 18,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#f3f3f3',

    marginHorizontal: 16,
    marginTop: 18,

    borderRadius: 14,

    paddingHorizontal: 14,

    height: 50,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },

  sectionRow: {
    marginTop: 24,
    marginBottom: 14,

    paddingHorizontal: 16,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  seeAll: {
    color: '#1B5E20',
    fontWeight: '600',
    fontSize: 12,
  },

  productCount: {
    color: '#888',
    fontSize: 12,
  },

  categoryList: {
    paddingHorizontal: 12,
  },

  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 6,
  },

  categoryCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,

    backgroundColor: '#E8F5E9',

    justifyContent: 'center',
    alignItems: 'center',
  },

  categoryText: {
    marginTop: 8,

    fontSize: 12,
    fontWeight: '500',

    color: '#333',
  },

  row: {
    justifyContent: 'space-between',

    paddingHorizontal: 8,
  },
});
