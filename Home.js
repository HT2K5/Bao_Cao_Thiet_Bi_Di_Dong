import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

/* ================= DATA ================= */

const products = [
  {
    id: "1",
    name: "Cải Kale Thủy Canh",
    price: "32.000đ",
    location: "ĐÀ LẠT",
    img: require("./assets/images/Green Kale Seeds.png"),
  },
  {
    id: "2",
    name: "Dưa Leo Baby Hữu Cơ",
    price: "28.000đ",
    location: "SƠN LA",
    img: require("./assets/images/Cucumber Seed Oil.png"),
  },
];

const categories = [
  { name: "Rau", icon: "leaf" },
  { name: "Củ", icon: "carrot" },
  { name: "Trái cây", icon: "fruit-cherries" },
  { name: "Đặc sản", icon: "star" },
];

/* ================= BOTTOM TAB ================= */

function BottomTab() {
  return (
    <View style={styles.tabBar}>
      <TabItem icon="home" label="TRANG CHỦ" active />
      <TabItem icon="grid-outline" label="DANH MỤC" />
      <TabItem icon="cart-outline" label="GIỎ HÀNG" />
      <TabItem icon="receipt-outline" label="ĐƠN HÀNG" />
      <TabItem icon="person-outline" label="CÁ NHÂN" />
    </View>
  );
}

function TabItem({ icon, label, active }) {
  return (
    <View style={styles.tabItem}>
      <Ionicons
        name={icon}
        size={22}
        color={active ? "#1B5E20" : "#999"}
      />

      <Text
        style={[
          styles.tabText,
          active && { color: "#1B5E20", fontWeight: "700" },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

/* ================= MAIN ================= */

export default function Home() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListHeaderComponent={
            <>
              {/* HEADER */}
              <View style={styles.header}>
                <TouchableOpacity>
                  <Feather name="menu" size={22} color="#333" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                  The Editorial Harvest
                </Text>

                <TouchableOpacity>
                  <Ionicons name="bag-outline" size={24} color="#333" />
                </TouchableOpacity>
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
                  source={require("./assets/images/Decorative Image Bleed.png")}
                  style={styles.bannerImg}
                />
              </View>

              {/* SEARCH */}
              <View style={styles.searchBox}>
                <Feather name="search" size={18} />
                <TextInput
                  placeholder="Tìm nông sản..."
                  style={{ flex: 1, marginLeft: 8 }}
                />
              </View>

              {/* CATEGORY */}
              <View style={styles.sectionRow}>
                <Text style={styles.sectionTitle}>Danh mục</Text>
                <Text style={styles.seeAll}>XEM TẤT CẢ</Text>
              </View>

              <View style={styles.categoryRow}>
                {categories.map((item, index) => (
                  <View key={index} style={styles.categoryItem}>
                    <View style={styles.circle}>
                      <MaterialCommunityIcons
                        name={item.icon}
                        size={22}
                        color="#1B5E20"
                      />
                    </View>
                    <Text style={styles.categoryText}>{item.name}</Text>
                  </View>
                ))}
              </View>

              {/* FEATURED */}
              <View style={styles.featured}>
                <Image
                  source={require("./assets/images/Dragon Fruit Seeds.png")}
                  style={styles.featuredImg}
                />

                <View style={styles.featuredInfo}>
                  <Text style={styles.location}>BÌNH THUẬN, VN</Text>

                  <Text style={styles.featuredName}>
                    Thanh Long Ruột Đỏ
                  </Text>

                  <Text style={styles.date}>📅 Hái: 24/10/2023</Text>

                  <View style={styles.row}>
                    <View>
                      <Text style={styles.priceBig}>45.000đ</Text>
                      <Text style={styles.unit}>mỗi kg</Text>
                    </View>

                    <TouchableOpacity style={styles.addBtn}>
                      <Text style={{ color: "#fff", fontSize: 18 }}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.img} style={styles.img} />

              <Text style={styles.locationSmall}>{item.location}</Text>

              <Text style={styles.name}>{item.name}</Text>

              <View style={styles.row}>
                <Text style={styles.price}>{item.price}</Text>

                <TouchableOpacity style={styles.smallAdd}>
                  <Text style={{ color: "#1B5E20" }}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      {/* TAB BAR */}
      <BottomTab />
    </SafeAreaView>
  );
}

/* ================= STYLE ================= */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#1B5E20",
  },

  banner: {
    marginHorizontal: 16,
    backgroundColor: "#E8F5E9",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  bannerSmall: { fontSize: 12, color: "#666" },

  bannerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1B5E20",
  },

  bannerDesc: { fontSize: 12, color: "#666" },

  bannerImg: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    margin: 16,
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 44,
  },

  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  sectionTitle: { fontWeight: "600" },

  seeAll: { color: "#1B5E20", fontSize: 12 },

  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },

  categoryItem: { alignItems: "center" },

  circle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
  },

  categoryText: {
    marginTop: 6,
    fontSize: 12,
  },

  featured: {
    marginHorizontal: 16,
    backgroundColor: "#f7f7f7",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 23,
  },

  featuredImg: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },

  featuredInfo: {
    padding: 12,
  },

  location: { fontSize: 11, color: "#888" },

  featuredName: {
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 4,
  },

  date: { fontSize: 11, color: "#777" },

  priceBig: {
    color: "#1B5E20",
    fontWeight: "700",
  },

  unit: { fontSize: 11, color: "#777" },

  addBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#1B5E20",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    elevation: 3,
  },

  img: {
    width: "100%",
    height: 120,
    borderRadius: 12,
  },

  locationSmall: {
    fontSize: 10,
    color: "#888",
    marginTop: 6,
  },

  name: { fontWeight: "600" },

  price: {
    color: "#1B5E20",
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  smallAdd: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1B5E20",
    justifyContent: "center",
    alignItems: "center",
  },

  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },

  tabItem: {
    alignItems: "center",
  },

  tabText: {
    fontSize: 10,
    color: "#999",
    marginTop: 4,
  },
});