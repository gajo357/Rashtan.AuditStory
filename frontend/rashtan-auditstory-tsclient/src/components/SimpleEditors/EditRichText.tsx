import React from "react";
import ReactQuill from "react-quill";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const EditRichText: React.FC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <ReactQuill
      theme="snow"
      placeholder={placeholder ? placeholder : "Write whatever you want:)"}
      defaultValue={value}
      onChange={(content) => onChange && onChange(content)}
    />
  );
};

export default EditRichText;
