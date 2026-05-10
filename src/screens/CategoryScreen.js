import React, { useState, useMemo, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

export default function CategoryScreen() {
  const navigation = useNavigation();

  const [categories, setCategories] = useState([]);

  const [products, setProducts] = useState([]);

  const [active, setActive] = useState('');

  const [search, setSearch] = useState('');

  /* =========================
     FETCH CATEGORIES
  ========================= */

  useEffect(() => {
    fetch('http://192.168.1.101/farmdirect/api/get-categories.php')
      .then((res) => res.json())
      .then((data) => {
        console.log('CATEGORIES:', data);

        setCategories(data);

        if (data.length > 0) {
          setActive(data[0].name);
        }
      })
      .catch((err) => {
        console.log('CATEGORY API ERROR:', err);
      });
  }, []);

  /* =========================
     FETCH PRODUCTS
  ========================= */

  useEffect(() => {
    fetch('http://192.168.1.101/farmdirect/api/get-products.php')
      .then((res) => res.json())
      .then((data) => {
        console.log('PRODUCTS:', data);

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
    return products.filter((item) => {
      const matchCategory =
        item.category_name?.trim().toLowerCase() ===
        active?.trim().toLowerCase();

      const matchSearch = item.group_name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      if (!search.trim()) {
        return matchCategory;
      }

      return matchCategory && matchSearch;
    });
  }, [products, active, search]);

  /* =========================
     UNIQUE GROUPS
  ========================= */

  const groupedProducts = useMemo(() => {
    const groups = {};

    filteredProducts.forEach((item) => {
      const group = item.group_name || 'Khác';

      if (!groups[group]) {
        groups[group] = item;
      }
    });

    return groups;
  }, [filteredProducts]);

  /* =========================
     SEARCH
  ========================= */

  const handleSearch = () => {
    if (search.trim()) {
      navigation.navigate('ProductListing', {
        keyword: search,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <Image
          source={require('../../assets/images/apple.jpg')}
          style={styles.avatar}
        />

        <Text style={styles.title}>FarmDirect</Text>

        <Ionicons name='cart-outline' size={22} />
      </View>

      {/* SEARCH */}

      <View style={styles.searchBox}>
        <Ionicons name='search' size={18} color='#999' />

        <TextInput
          placeholder='Tìm kiếm sản phẩm...'
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
        />
      </View>

      <View style={styles.body}>
        {/* SIDEBAR */}

        <View style={styles.sidebar}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setActive(item.name)}
              style={styles.sidebarItem}
            >
              <View
                style={[
                  styles.iconBox,

                  active === item.name && styles.iconBoxActive,
                ]}
              >
                <Ionicons
                  name={item.icon ? `${item.icon}-outline` : 'leaf-outline'}
                  size={18}
                  color={active === item.name ? '#2e7d32' : '#777'}
                />
              </View>

              <Text
                style={[
                  styles.sidebarText,

                  active === item.name && {
                    color: '#2e7d32',
                  },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* CONTENT */}

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.rowTitle}>
            <Text style={styles.sectionTitle}>{active}</Text>

            <Text style={styles.count}>
              {Object.keys(groupedProducts).length} LOẠI
            </Text>
          </View>

          {/* GROUP LIST */}

          <FlatList
            data={Object.keys(groupedProducts)}
            numColumns={2}
            scrollEnabled={false}
            keyExtractor={(item) => item}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            renderItem={({ item }) => {
              const product = groupedProducts[item];

              return (
                <TouchableOpacity
                  style={styles.groupCard}
                  onPress={() =>
                    navigation.navigate('ProductListing', {
                      category: active,
                      group: item,
                    })
                  }
                >
                  <Image
                    source={{
                      uri: product.image,
                    }}
                    style={styles.groupImage}
                  />

                  <Text style={styles.groupText}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: 30,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 10,
    alignItems: 'center',
  },

  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
  },

  body: {
    flex: 1,
    flexDirection: 'row',
  },

  sidebar: {
    width: 90,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    paddingTop: 10,
  },

  sidebarItem: {
    alignItems: 'center',
    marginBottom: 15,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#e5e5e5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconBoxActive: {
    backgroundColor: '#d4f5e9',
    borderWidth: 1,
    borderColor: '#2e7d32',
  },

  sidebarText: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 5,
  },

  content: {
    flex: 1,
    padding: 10,
  },

  rowTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  count: {
    fontSize: 12,
    color: '#888',
    marginTop: 6,
  },

  groupCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    alignItems: 'center',
    elevation: 2,
  },

  groupImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginBottom: 10,
  },

  groupText: {
    fontWeight: '700',
    fontSize: 15,
  },
});
