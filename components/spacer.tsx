import { View } from "react-native";

type Size = "sm" | "md" | "lg" | "xl" | "2xl";

type TSpacerProps = {
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

export const Spacer = ({ direction = "vertical", size }: TSpacerProps) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: direction === "vertical" ? "column" : "row",
        margin: spacerSizes[size],
      }}
    />
  );
};
