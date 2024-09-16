import { XPCamera } from "@/components/xpCamera";
import { XPHeader } from "@/components/xpHeader";
import { XPInputNumber } from "@/components/xpInputNumber";
import { XPInputText } from "@/components/xpInputText";
import { XPSpacer } from "@/components/xpSpacer";
import { TProductDb } from "@/db/types";
import { useApp } from "@/hooks/useApp";
import { useProductCrud } from "@/hooks/useProductCrud";
import { useToast } from "@/hooks/useToast";
import { useWillMount } from "@/hooks/useWillMount";
import {
  BarcodeScanningResult,
  CameraCapturedPicture,
  useCameraPermissions,
} from "expo-camera";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

type TState = {
  screenMode: "scanProduct" | "productDetailsForm" | "productDetailsImage";
};

export default function ProductDetailsScreen() {
  const [_, setTick] = React.useState(0);
  const { clearProductDetails, setProductDetails, productDetails } = useApp();
  const state = React.useRef<TState>({
    screenMode: "scanProduct",
  });
  const [permission, requestPermission] = useCameraPermissions();
  const { getProductByReference, createProduct, updateProduct } =
    useProductCrud();
  const { show } = useToast();

  const setState = (newState: Partial<TState>, refresh = true) => {
    state.current = { ...state.current, ...newState };

    refresh && setTick((current) => current + 1);
  };

  useWillMount(() => {
    clearProductDetails();
    console.log("ProductDetailsScreen > useWillMount");
  });

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission}>Grant permission</Button>
      </View>
    );
  }

  const handleOnClickBackInCamera = () => {
    setState({
      screenMode: "productDetailsForm",
    });
  };

  const handleOnCatchPicture = async (
    image: CameraCapturedPicture | BarcodeScanningResult
  ) => {
    console.log("handleOnCatchPicture", { image });

    if (!productDetails?.reference) {
      const data = image as BarcodeScanningResult;

      try {
        const reference = Number(data.data);

        const product = await getProductByReference({ reference });

        console.log("handleOnCatchPicture > product", { product });

        if (product) {
          setProductDetails(product);
        } else {
          setProductDetails({
            reference: reference,
          });
        }
      } catch (err) {
        console.log("handleOnCatchPicture :: error", err);
        setProductDetails({ reference: undefined });
      }

      console.log("handleOnCatchPicture > product 2");
    } else {
      setProductDetails({
        image: (image as CameraCapturedPicture).uri,
      });
    }

    setState({
      screenMode: "productDetailsForm",
    });

    console.log("handleOnCatchPicture > product > end");
  };

  const handleOnClickSetProductImage = () => {
    setState({
      screenMode: "productDetailsImage",
    });
  };

  const handleOnClickSave = async () => {
    const reference = Number(productDetails?.reference!);

    const product = {
      ...productDetails,
      reference,
      image: productDetails?.image!,
      name: productDetails?.name!,
      price: productDetails?.price!,
    } as TProductDb;

    try {
      if (product.id) {
        await updateProduct(product);
      } else {
        await createProduct(product);
      }

      show("Product saved successfully");
    } catch (err) {
      console.log("handleOnClickSave :: error", err);
    }
  };

  console.log("ProductDetailsScreen > render", {
    state: state.current,
    productDetails,
  });

  return (
    <View style={styles.container}>
      {["scanProduct", "productDetailsImage"].includes(
        state.current.screenMode
      ) && (
        <XPCamera
          onClickExit={handleOnClickBackInCamera}
          onCatchPicture={handleOnCatchPicture}
          type={!productDetails?.reference ? "barcode" : "picture"}
        />
      )}
      {state.current.screenMode === "productDetailsForm" && (
        <View style={styles.formContainer}>
          <XPHeader image={productDetails?.image!} />

          <XPSpacer size="sm" />

          <Button
            icon="camera"
            mode="text"
            onPress={handleOnClickSetProductImage}
          >
            Set product image
          </Button>

          <XPSpacer size="md" />

          <XPInputText
            label="Product Id."
            value={productDetails?.reference?.toString()}
            disabled
          />

          <XPSpacer size="md" />

          <XPInputText
            mode="outlined"
            label="Name"
            value={productDetails?.name}
            onChange={(text) => setProductDetails({ name: text })}
          />

          <XPSpacer size="md" />

          <XPInputNumber
            mode="outlined"
            label="Price"
            value={productDetails?.price?.toString()}
            onChange={(text) => setProductDetails({ price: text as number })}
          />

          <XPSpacer size="xl" />

          <Button mode="contained" onPress={handleOnClickSave}>
            Save
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  formContainer: {},
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: 200,
  },
});
