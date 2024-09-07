import type { PropsWithChildren } from "react";
import { Image, StyleSheet, useColorScheme } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

const HEADER_HEIGHT = 250;
const HEADER_BACKGROUND_COLOR = { light: "#A1CEDC", dark: "#1D3D47" };

export type TXPHeaderProps = PropsWithChildren<{
  image: string;
  backgroundColor?: { dark: string; light: string };
}>;

export const XPHeader = ({
  image,
  backgroundColor = HEADER_BACKGROUND_COLOR,
}: TXPHeaderProps) => {
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
      <Animated.View
        style={[
          styles.header,
          { backgroundColor: backgroundColor[colorScheme] },
          headerAnimatedStyle,
        ]}
      >
        <Image
          source={typeof image === "string" ? { uri: image } : image}
          style={styles.image}
        />
      </Animated.View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 250,
    overflow: "hidden",
  },
  image: {
    height: 250,
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
