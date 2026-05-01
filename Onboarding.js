import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

export default function Onboarding({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* IMAGE */}
      <Image
        source={require("./assets/images/Background.png")}
        style={styles.image}
      />

      {/* TEXT */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Fresh from farm to your table
        </Text>

        <Text style={styles.desc}>
          Discover hand-picked, organic produce delivered locally within 24 hours.
        </Text>

        {/* DOTS */}
        <View style={styles.dots}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      {/* BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LoginAndSignUp")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "hidden", // để bo góc ảnh
  },

  /* IMAGE */
  image: {
    width: "100%",
    height: "65%",
    resizeMode: "cover",
    alignSelf: "center",
    marginTop: -40,

    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  /* TEXT */
  textContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 30,
  },

  desc: {
    width: "80%",
    textAlign: "center",
    color: "#777",
    marginTop: 12,
    lineHeight: 20,
    fontSize: 14,
  },

  /* DOTS */
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 70,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: "#1B5E20",
    width: 16,
  },

  /* BUTTON */
  button: {
    backgroundColor: "#1B5E20",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 50,
    elevation: 3,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});