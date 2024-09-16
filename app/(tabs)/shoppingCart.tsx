import { ThemedText } from "@/components/ThemedText";
import { XPScreen } from "@/components/xpScreen";
import { XPTable } from "@/components/xpTable";
import { XPView } from "@/components/xpView";
import { productCrud } from "@/db/crud";
import { TProductDb } from "@/db/types";
// import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";

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

  // console.log("TabProductsListScreen", {
  //   products: JSON.stringify(state.current.products),
  // });

  return (
    <XPScreen header={{}}>
      <XPView style={styles.titleContainer}>
        <ThemedText type="title">List of Products</ThemedText>
      </XPView>

      {/* <XPSpacer size="lg" /> */}

      <View style={styles.listContainer}>
        <XPTable
          items={state.current.products}
          rowIdentifier={(row) => row.id}
          columns={[
            {
              key: "name",
              label: "Name",
              render: (row) => row.name,
            },
            {
              key: "price",
              label: "Price",
              render: (row) => `${row.price} €`,
              props: { style: { numeric: true } },
            },
          ]}
        />
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
