import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type XPViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function XPView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: XPViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
