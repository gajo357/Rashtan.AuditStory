import React from "react";
import { Input } from "antd";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

const EditComment: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Input.TextArea
      placeholder="Conclusion, sources, ..."
      rows={5}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  );
};

export default EditComment;
