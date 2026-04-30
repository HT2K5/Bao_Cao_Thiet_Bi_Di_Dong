import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { categories } from "../data/tempdata";

export default function CategoryScreen() {
  const navigation = useNavigation();

  const [active, setActive] = useState("Trái cây");
  const [search, setSearch] = useState("");

  const categoryData = useMemo(() => {
    return categories.find((c) => c.name === active);
  }, [active]);

  const groups = categoryData?.groups || [];

  const handleSearch = () => {
    if (search.trim()) {
      navigation.navigate("ProductListing", { keyword: search });
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/apple.jpg")}
          style={styles.avatar}
        />
        <Text style={styles.title}>FarmDirect</Text>
        <Ionicons name="cart-outline" size={22} />
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#999" />
        <TextInput
          placeholder="Tìm kiếm sản phẩm..."
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
                  name={item.icon}
                  size={18}
                  color={active === item.name ? "#2e7d32" : "#777"}
                />
              </View>

              <Text
                style={[
                  styles.sidebarText,
                  active === item.name && { color: "#2e7d32" },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          <View style={styles.rowTitle}>
            <Text style={styles.sectionTitle}>{active}</Text>
            <Text style={styles.count}>{groups.length} LOẠI</Text>
          </View>

          <FlatList
            data={groups}
            numColumns={2}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.cardWrapper}
                onPress={() =>
                  navigation.navigate("ProductListing", {
                    category: active,
                    group: item.name,
                  })
                }
              >
                <View style={styles.card}>
                  <Image
                    source={require("../../assets/images/apple.jpg")}
                    style={styles.image}
                  />
                  <Text style={styles.cardText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingTop: 30,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 10,
  },

  avatar: { width: 30, height: 30, borderRadius: 15 },

  title: { fontWeight: "bold" },

  searchBox: {
    flexDirection: "row",
    backgroundColor: "#eee",
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  searchInput: { flex: 1, marginLeft: 8 },

  body: { flex: 1, flexDirection: "row" },

  sidebar: {
    width: 90,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    paddingTop: 10,
  },

  sidebarItem: { alignItems: "center", marginBottom: 15 },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#e5e5e5",
    justifyContent: "center",
    alignItems: "center",
  },

  iconBoxActive: { backgroundColor: "#d4f5e9" },

  sidebarText: {
    fontSize: 11,
    textAlign: "center",
    marginTop: 5,
  },

  content: { flex: 1, padding: 10 },

  rowTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  sectionTitle: { fontWeight: "bold", fontSize: 16 },

  count: { fontSize: 12, color: "#888" },

  cardWrapper: {
    width: "48%",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginBottom: 8,
  },

  cardText: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});