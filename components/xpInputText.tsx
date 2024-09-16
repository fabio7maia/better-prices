import { TextInput } from "react-native-paper";

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
    <TextInput
      disabled={disabled}
      mode={mode}
      label={label}
      value={value}
      onChangeText={onChange}
    />
  );
};
