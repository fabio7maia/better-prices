import { View } from "react-native";

type Size = "sm" | "md" | "lg" | "xl" | "2xl";

type TXPSpacerProps = {
  direction?: "horizontal" | "vertical";
  size: Size;
};

const spacerSizes: Record<Size, number> = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  "2xl": 32,
};

export const XPSpacer = ({ direction = "vertical", size }: TXPSpacerProps) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: direction === "vertical" ? "column" : "row",
        marginTop: direction === "vertical" ? spacerSizes[size] : 0,
        marginBottom: direction === "vertical" ? spacerSizes[size] : 0,
        marginLeft: direction === "horizontal" ? spacerSizes[size] : 0,
        marginRight: direction === "horizontal" ? spacerSizes[size] : 0,
        backgroundColor: "#fff",
      }}
    />
  );
};
