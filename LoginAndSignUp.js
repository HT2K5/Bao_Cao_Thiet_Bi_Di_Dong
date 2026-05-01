import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

// ICON
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export default function Login({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState(null);

  const handleRegister = () => {
    if (!email || !password) return Alert.alert("Nhập đủ thông tin");
    setAccount({ email, password });
    setIsLogin(true);
    setEmail("");
    setPassword("");
    Alert.alert("Đăng ký thành công");
  };

  const handleLogin = () => {
    if (!account) return Alert.alert("Chưa có tài khoản");
    if (email === account.email && password === account.password) {
      navigation.navigate("Home");
    } else {
      Alert.alert("Sai thông tin");
    }
  };

  return (
    <View style={styles.container}>
      {/* LOGO */}
      <View style={styles.logo}>
        <Text style={{ fontSize: 30 }}>🌿</Text>
      </View>

      <Text style={styles.title}>Chào mừng trở lại</Text>
      <Text style={styles.subtitle}>
        Đăng nhập để tiếp tục hành trình của bạn
      </Text>

      {/* TAB */}
      <View style={styles.tab}>
        <TouchableOpacity
          style={[styles.tabBtn, isLogin && styles.active]}
          onPress={() => setIsLogin(true)}
        >
          <Text style={isLogin ? styles.activeText : styles.text}>
            Đăng nhập
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, !isLogin && styles.active]}
          onPress={() => setIsLogin(false)}
        >
          <Text style={!isLogin ? styles.activeText : styles.text}>
            Đăng ký
          </Text>
        </TouchableOpacity>
      </View>

      {/* INPUT */}
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Mật khẩu"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={isLogin ? handleLogin : handleRegister}
      >
        <Text style={styles.buttonText}>
          {isLogin ? "Đăng nhập" : "Đăng ký"}
        </Text>
      </TouchableOpacity>

      {/* OR */}
      <Text style={styles.or}>Hoặc đăng nhập với</Text>

      {/* SOCIAL LOGIN */}
      <View style={styles.socialRow}>
        {/* GOOGLE */}
        <TouchableOpacity style={styles.socialBtn}>
          <AntDesign name="google" size={20} color="#DB4437" />
          <Text style={styles.socialText}>Google</Text>
        </TouchableOpacity>

        {/* APPLE */}
        <TouchableOpacity style={styles.socialBtn}>
          <FontAwesome name="apple" size={22} color="black" />
          <Text style={styles.socialText}>Apple</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#777",
    marginBottom: 20,
  },

  tab: {
    flexDirection: "row",
    backgroundColor: "#eee",
    borderRadius: 10,
    marginBottom: 20,
  },

  tabBtn: {
    flex: 1,
    padding: 12,
    alignItems: "center",
  },

  active: {
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  activeText: {
    fontWeight: "bold",
  },

  text: {
    color: "#777",
  },

  input: {
    borderWidth: 1,
    borderColor: "#eee",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },

  button: {
    backgroundColor: "#1B5E20",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  or: {
    textAlign: "center",
    marginVertical: 15,
    color: "#777",
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  socialBtn: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    backgroundColor: "#fff",
  },

  socialText: {
    marginLeft: 8,
    fontWeight: "bold",
  },
});