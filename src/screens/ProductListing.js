import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { categories } from "../data/tempdata";

export default function ProductListing() {
  const route = useRoute();
  const navigation = useNavigation();

  const { category, group, keyword } = route.params || {};

  // ===== CATEGORY / GROUP =====
  const categoryData = useMemo(() => {
    return categories.find((c) => c.name === category);
  }, [category]);

  const groupData = useMemo(() => {
    if (!categoryData) return null;
    return categoryData.groups.find((g) => g.name === group);
  }, [categoryData, group]);

  const products = groupData?.items || [];

  // ===== SEARCH =====
  const searchList = useMemo(() => {
    if (!keyword) return [];

    const all = categories.flatMap((c) =>
      c.groups.flatMap((g) => g.items)
    );

    return all.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword]);

  // ===== FINAL LIST =====
  const list = keyword ? searchList : products;

  // ===== CHIP (GIỮ NGUYÊN LAYOUT) =====
  const chips = ["Tất cả", ...products.map((p) => p.name)];
  const [active, setActive] = useState("Tất cả");

  const filteredList =
    active === "Tất cả"
      ? list
      : list.filter((p) => p.name === active);

  // ===== HIGHLIGHT =====
  const highlight = filteredList[0];
  const rest = filteredList.slice(1);

  // ===== ITEM =====
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("ProductDetail", {
          product: item,
        })
      }
    >
      <Image source={item.image} style={styles.image} />

      <View style={styles.rating}>
        <Text style={styles.ratingText}>★ {item.rating}</Text>
      </View>

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.origin}>{item.origin}</Text>

      <View style={styles.row}>
        <Text style={styles.price}>${item.price}/kg</Text>
        <View style={styles.addBtn}>
          <Ionicons name="add" size={16} color="#fff" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/apple.jpg")}
          style={styles.avatar}
        />
        <Text style={styles.logo}>FarmDirect</Text>
        <Ionicons name="cart-outline" size={22} />
      </View>

      {/* TITLE */}
      <Text style={styles.title}>
        {keyword ? `Kết quả: "${keyword}"` : group}
      </Text>

      <Text style={styles.subtitle}>
        {keyword ? "Danh sách sản phẩm tìm được" : "Hái tươi từ vườn địa phương"}
      </Text>

      {/* CHIP */}
      <View style={styles.chipRow}>
        {chips.map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => setActive(c)}
            style={[
              styles.chip,
              active === c && styles.chipActive,
            ]}
          >
            <Text
              style={[
                styles.chipText,
                active === c && { color: "#fff" },
              ]}
            >
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* LIST */}
      <FlatList
        data={rest}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListHeaderComponent={
          highlight && (
            <TouchableOpacity
              style={styles.highlightCard}
              onPress={() =>
                navigation.navigate("ProductDetail", {
                  product: highlight,
                })
              }
            >
              <Image
                source={highlight.image}
                style={styles.highlightImage}
              />

              <View style={styles.highlightRating}>
                <Text style={{ fontSize: 11 }}>
                  ★ {highlight.rating}
                </Text>
              </View>

              <View style={styles.tag}>
                <Text style={styles.tagText}>Vừa hái hôm nay</Text>
              </View>

              <Text style={styles.name}>{highlight.name}</Text>
              <Text style={styles.origin}>{highlight.origin}</Text>

              <View style={styles.row}>
                <Text style={styles.price}>
                  ${highlight.price}/kg
                </Text>
                <View style={styles.addBtn}>
                  <Ionicons name="add" size={16} color="#fff" />
                </View>
              </View>
            </TouchableOpacity>
          )
        }
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 12,
    paddingTop: 30,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  logo: {
    fontWeight: "bold",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
  },

  subtitle: {
    color: "#777",
    marginBottom: 10,
  },

  chipRow: {
    flexDirection: "row",
    marginBottom: 10,
  },

  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    marginRight: 8,
  },

  chipActive: {
    backgroundColor: "#2e7d32",
  },

  chipText: {
    fontSize: 12,
  },

  highlightCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
  },

  highlightImage: {
    width: "100%",
    height: 160,
    borderRadius: 12,
  },

  highlightRating: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 6,
    borderRadius: 6,
  },

  tag: {
    position: "absolute",
    top: 140,
    left: 10,
    backgroundColor: "#2e7d32",
    paddingHorizontal: 6,
    borderRadius: 6,
  },

  tagText: {
    fontSize: 10,
    color: "#fff",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
    width: "48%",
  },

  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },

  rating: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 6,
    borderRadius: 6,
  },

  ratingText: {
    fontSize: 10,
  },

  name: {
    fontWeight: "bold",
    marginTop: 6,
  },

  origin: {
    fontSize: 11,
    color: "#777",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },

  price: {
    color: "#2e7d32",
    fontWeight: "bold",
  },

  addBtn: {
    backgroundColor: "#2e7d32",
    padding: 6,
    borderRadius: 20,
  },
});