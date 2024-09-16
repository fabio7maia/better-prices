import { TextInput } from "react-native-paper";

type TXPInputNumberProps = {
  mode?: "outlined" | "flat";
  label: string;
  value?: string | number;
  onChange?: (value?: string | number) => void;
};

export const XPInputNumber = ({
  label,
  onChange,
  mode = "outlined",
  value,
}: TXPInputNumberProps) => {
  const valueString = value ? value.toString() : "";

  const handleOnChange = (text: string, treatToNumber = false) => {
    if (!treatToNumber) {
      onChange?.(text);
    } else {
      text = text.charAt(text.length - 1) === "," ? text.slice(0, -1) : text;
      const number = Number(text.replace(",", "."));

      onChange?.(isNaN(number) ? undefined : number);
    }
  };

  return (
    <TextInput
      keyboardType="numeric"
      mode={mode}
      label={label}
      value={valueString}
      onChangeText={handleOnChange}
      onBlur={() => handleOnChange(valueString, true)}
    />
  );
};
