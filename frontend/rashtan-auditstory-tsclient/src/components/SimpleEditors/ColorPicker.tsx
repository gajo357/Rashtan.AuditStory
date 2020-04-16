import React from "react";
import { CirclePicker } from "react-color";

interface Props {
  value?: string;
  onChange?: (v: string) => void;
}

const ColorPicker: React.FC<Props> = ({ value, onChange }) => (
  <CirclePicker
    color={value}
    onChangeComplete={(c) => onChange && onChange(c.hex)}
  />
);

export default ColorPicker;
