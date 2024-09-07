import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useApp } from "@/hooks/useApp";
import { useDidMount } from "@/hooks/useDidMount";
import { useNavigation } from "@/hooks/useNavigation";
import React from "react";

export default function HomeScreen() {
  const { push } = useNavigation();
  const { clearProductDetails } = useApp();

  useDidMount(() => {
    clearProductDetails();
  });

  const handleOnPressCamera = () => {
    push("/productDetails");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/better-prices-wallpaper.jpeg")}
        style={styles.wallpaper}
      />

      {/* <Image source={require("@/assets/images/logo.png")} style={styles.logo} /> */}

      {/* <Spacer size="lg" /> */}

      <TouchableOpacity onPress={handleOnPressCamera}>
        <View style={styles.scanActionContainer}>
          <AntDesign
            name="scan1"
            size={64}
            color="black"
            onPress={handleOnPressCamera}
          />

          <Text style={styles.scanActionText}>Scan a Product</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: 16,
    backgroundColor: "#fff",
  },
  wallpaper: {
    position: "absolute",
    opacity: 0.3,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  scanActionContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  scanActionText: {
    fontSize: 24,
  },
});
