import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function ProductDetail() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { product } = params || {};

  const [qty, setQty] = useState(1);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HERO IMAGE */}
      <View style={styles.hero}>
        <Image source={product.image} style={styles.image} />

        {/* HEADER OVERLAY */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={18} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="heart-outline" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* CARD */}
        <View style={styles.card}>
          {/* TITLE + PRICE */}
          <View style={styles.titleRow}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
          </View>
          <Text style={styles.unit}>mỗi bó</Text>

          {/* BADGES */}
          <View style={styles.badgeRow}>
            <View style={styles.badgeGreen}>
              <Text style={styles.badgeGreenText}>Chứng nhận VietGAP</Text>
            </View>
            <View style={styles.badgeGray}>
              <Text style={styles.badgeGrayText}>Hái hôm nay</Text>
            </View>
          </View>

          {/* FARM */}
          <View style={styles.farm}>
            <Image
              source={require("../../assets/images/apple.jpg")}
              style={styles.farmAvatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.farmTitle}>Green Valley Farms</Text>
              <Text style={styles.farmSub}>12 km cách đây</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#888" />
          </View>

          {/* DESCRIPTION */}
          <Text style={styles.section}>Thông tin sản phẩm</Text>
          <Text style={styles.desc}>
            Giòn, tươi và sạch. Trồng theo tiêu chuẩn hữu cơ, không dùng hóa chất.
            Phù hợp salad hoặc ăn trực tiếp.
          </Text>

          {/* NUTRITION */}
          <Text style={styles.section}>Giá trị dinh dưỡng (100g)</Text>
          <View style={styles.nutritionRow}>
            <View style={styles.nBox}>
              <Text style={styles.nMain}>15</Text>
              <Text style={styles.nSub}>Kcal</Text>
            </View>
            <View style={styles.nBox}>
              <Text style={styles.nMain}>3.3g</Text>
              <Text style={styles.nSub}>Carbs</Text>
            </View>
            <View style={styles.nBox}>
              <Text style={styles.nMain}>1.2g</Text>
              <Text style={styles.nSub}>Protein</Text>
            </View>
            <View style={styles.nBox}>
              <Text style={styles.nMain}>90%</Text>
              <Text style={styles.nSub}>Vit A</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM BAR */}
      <View style={styles.bottom}>
        <View style={styles.qtyWrap}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQty(Math.max(1, qty - 1))}
          >
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.qtyNum}>{qty}</Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQty(qty + 1)}
          >
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.cta}>
          <Ionicons name="bag-outline" size={16} color="#fff" />
          <Text style={styles.ctaText}>Thêm vào giỏ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },

  hero: { position: "relative" },
  image: { width: "100%", height: 300 },

  header: {
    position: "absolute",
    top: 44,
    left: 12,
    right: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  iconBtn: {
    backgroundColor: "#ffffff",
    padding: 8,
    borderRadius: 20,
    elevation: 2,
  },

  card: {
    backgroundColor: "#ffffff",
    marginTop:0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: { fontSize: 20, fontWeight: "700" },
  price: { fontSize: 20, color: "#2e7d32", fontWeight: "700" },

  unit: { color: "#777", marginTop: 2, marginBottom: 12 },

  badgeRow: { flexDirection: "row", marginBottom: 14 },
  badgeGreen: {
    backgroundColor: "#2e7d32",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    marginRight: 8,
  },
  badgeGreenText: { color: "#fff", fontSize: 12 },
  badgeGray: {
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  badgeGrayText: { fontSize: 12, color: "#555" },

  farm: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },

  farmAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
  farmTitle: { fontWeight: "600" },
  farmSub: { fontSize: 12, color: "#777" },

  section: { fontWeight: "700", marginBottom: 6 },
  desc: { fontSize: 13, color: "#555", lineHeight: 18, marginBottom: 16 },

  nutritionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  nBox: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    width: "23%",
  },

  nMain: { fontWeight: "700" },
  nSub: { fontSize: 11, color: "#777" },

  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 12,
  },

  qtyWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },

  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },

  qtyText: { fontSize: 16, fontWeight: "600" },
  qtyNum: { marginHorizontal: 10, fontSize: 16, fontWeight: "600" },

  cta: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#2e7d32",
    paddingVertical: 14,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  ctaText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "700",
  },
});