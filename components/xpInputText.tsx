import { TextInput } from "react-native-paper";
import { XPInputField } from "./xpInputField";

type TXPInputTextProps = {
  disabled?: boolean;
  mode?: "outlined" | "flat";
  label: string;
  value?: string;
  onChange?: (text: string) => void;
};

export const XPInputText = ({
  disabled = false,
  label,
  onChange,
  mode = "outlined",
  value,
}: TXPInputTextProps) => {
  return (
    <XPInputField
      inputRender={() => (
        <TextInput
          disabled={disabled}
          mode={mode}
          // label={label}
          value={value}
          onChangeText={onChange}
        />
      )}
      label={label}
    />
  );
};
