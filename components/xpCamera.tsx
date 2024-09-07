import {
  BarcodeScanningResult,
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
// import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

type TState = {
  cameraMode: CameraType;
  productScan?: BarcodeScanningResult;
};

interface XPCameraProps {
  onClickExit: () => void;
  onCatchPicture: (
    image: CameraCapturedPicture | BarcodeScanningResult
  ) => void;
  type: "barcode" | "picture";
}

export const XPCamera = ({
  onClickExit,
  onCatchPicture,
  type,
}: XPCameraProps) => {
  const [_, setTick] = React.useState(0);
  const state = React.useRef<TState>({
    cameraMode: "back",
  });
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = React.useRef<CameraView>(null);

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

  const setState = (newState: Partial<TState>, refresh = true) => {
    state.current = { ...state.current, ...newState };

    refresh && setTick((current) => current + 1);
  };

  const handleOnClickFlipCamera = () => {
    setState({
      cameraMode: state.current.cameraMode === "back" ? "front" : "back",
    });
  };

  const handleOnClickTakePicture = async () => {
    const image = await cameraRef.current?.takePictureAsync();

    image && onCatchPicture(image);
  };

  const handleOnClickBackInCamera = async () => {
    onClickExit();
  };

  const handleBarcodeScanned = (data: BarcodeScanningResult) => {
    onCatchPicture(data);
  };

  console.log("XPCamera > render", { state: state.current });

  return (
    <CameraView
      style={styles.camera}
      facing={state.current.cameraMode}
      barcodeScannerSettings={
        type === "barcode" ? { barcodeTypes: ["ean13"] } : undefined
      }
      onBarcodeScanned={type === "barcode" ? handleBarcodeScanned : undefined}
      ref={cameraRef}
    >
      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity
              style={styles.button}
              onPress={handleOnClickFlipCamera}
            >
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity> */}
        <Button
          icon="camera"
          mode="elevated"
          onPress={handleOnClickFlipCamera}
          style={styles.button}
        >
          Flip camera
        </Button>

        {type === "picture" && (
          <Button
            icon="camera"
            mode="elevated"
            onPress={handleOnClickTakePicture}
            style={styles.button}
          >
            Take picture
          </Button>
        )}

        <Button
          icon="arrowLeft"
          mode="elevated"
          onPress={handleOnClickBackInCamera}
          style={styles.button}
        >
          Back
        </Button>
      </View>
    </CameraView>
  );
};

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
});
