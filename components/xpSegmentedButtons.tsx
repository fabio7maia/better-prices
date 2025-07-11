import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { ThemedText } from "./ThemedText";
import { XPInputField } from "./xpInputField";

type TXPSegmentedButtonsProps = {
  buttons: Array<{
    value: string;
    label: string;
  }>;
  label: string;
} & (
  | {
      multiSelect?: true;
      value?: string[];
      onChange?: (value?: string[]) => void;
    }
  | {
      multiSelect?: false;
      value?: string;
      onChange?: (value?: string) => void;
    }
);

export const XPSegmentedButtons = ({
  buttons,
  label,
  multiSelect = false,
  onChange,
  value,
}: TXPSegmentedButtonsProps) => {
  const transformedValue = multiSelect
    ? ((value || []) as string[])
    : ((value || "") as string);

  const handleOnChange = (value: any) => {
    onChange?.(value);
  };

  return (
    <XPInputField
      inputRender={() => (
        <SafeAreaView style={styles.container}>
          <SegmentedButtons
            multiSelect={multiSelect}
            value={transformedValue as any}
            onValueChange={handleOnChange}
            buttons={buttons}
          />
        </SafeAreaView>
      )}
      label={label}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
