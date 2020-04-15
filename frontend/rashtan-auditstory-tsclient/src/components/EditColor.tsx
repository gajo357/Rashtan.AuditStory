import React from "react";
import { CirclePicker } from "react-color";

interface Props {
  value?: string;
  onChange?: (v: string) => void;
}

const EditColor: React.FC<Props> = ({ value, onChange }) => {
  return (
    <CirclePicker
      color={value}
      onChangeComplete={(c) => onChange && onChange(c.hex)}
    />
  );
};

export default EditColor;
