import { ThemedText } from "@/components/ThemedText";
import { XPScreen } from "@/components/xpScreen";
import { XPView } from "@/components/xpView";
import { productCrud } from "@/db/crud";
import { TProductDb } from "@/db/types";
// import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type TState = {
  products: TProductDb[];
};

export default function TabProductsListScreen() {
  const [_, setTick] = React.useState(0);
  const state = React.useRef<TState>({
    products: [],
  });

  const setState = (newState: Partial<TState>, refresh = true) => {
    state.current = { ...state.current, ...newState };

    refresh && setTick((current) => current + 1);
  };

  React.useEffect(() => {
    const fillListOfProducts = async () => {
      const products = await productCrud.getProducts();

      setState({ products });
    };

    fillListOfProducts();
  }, []);

  return (
    <XPScreen header={{}}>
      <XPView style={styles.titleContainer}>
        <ThemedText type="title">List of Products</ThemedText>
      </XPView>

      <View style={styles.listContainer}>
        {state.current.products.map((product) => (
          <Text style={styles.product} key={product.id}>
            {product.name} - {product.price}
          </Text>
        ))}
      </View>
    </XPScreen>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    color: "#fff",
  },
  listContainer: {
    flex: 1,
    flexDirection: "column",
  },
  product: {
    fontSize: 14,
    color: "gray",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
