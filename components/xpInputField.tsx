import React from "react";
import { XPView } from "./xpView";
import { ThemedText } from "./ThemedText";

type XPTextInputProps = {
  inputRender: () => JSX.Element;
  label: string;
};

export const XPInputField = ({ inputRender, label }: XPTextInputProps) => {
  return (
    <XPView>
      <ThemedText style={{ marginBottom: 8 }}>{label}</ThemedText>
      {inputRender()}
    </XPView>
  );
};
