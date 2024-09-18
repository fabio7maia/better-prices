import { Dimensions, Image, StyleSheet } from "react-native";

import React, { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TXPHeaderProps, XPHeader } from "./xpHeader";
import { XPView } from "./xpView";

type TXPScreenProps = PropsWithChildren<{
  opacity?: number;
  header?: Partial<Omit<TXPHeaderProps, "children">>;
  wallpaper?: {
    image?: string;
  };
}>;

export const XPScreen = ({
  children,
  opacity = 0.3,
  header,
  wallpaper,
}: TXPScreenProps) => {
  return (
    <SafeAreaView>
      <XPView style={styles.rootContainer}>
        {wallpaper && (
          <>
            <XPView style={styles.wallpaperContainer}>
              <Image
                source={
                  wallpaper.image ||
                  require("@/assets/images/better-prices-wallpaper.jpeg")
                }
                style={{ ...styles.imageWallpaper, opacity }}
              />
            </XPView>

            <XPView style={{ ...styles.childrenContainer }}>{children}</XPView>
          </>
        )}

        {header && (
          <>
            <XPHeader
              image={require("@/assets/images/better-prices-wallpaper.jpeg")}
              backgroundColor={
                header.backgroundColor || { light: "#A1CEDC", dark: "#1D3D47" }
              }
            />
            <XPView style={{ ...styles.childrenContainer }}>{children}</XPView>
          </>
        )}
      </XPView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    display: "flex",
    flexDirection: "column",
  },
  childrenContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 32,
    /*height: Dimensions.get("window").height - StatusBar.currentHeight!,*/
    width: Dimensions.get("screen").width,
  },
  wallpaperContainer: {
    position: "absolute",
    backgroundColor: "#000",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  imageWallpaper: {
    position: "absolute",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
  },
});
