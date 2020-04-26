import React from "react";
import { Input } from "antd";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const EditComment: React.FC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <Input.TextArea
      placeholder={placeholder ? placeholder : "Conclusion, sources, ..."}
      rows={5}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  );
};

export default EditComment;
