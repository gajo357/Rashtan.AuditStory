import React from "react";
import ReactQuill from "react-quill";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

const EditRichText: React.FC<Props> = ({ value, onChange }) => {
  return (
    <ReactQuill
      style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
      theme="snow"
      placeholder="Write whatever you want:)"
      value={value}
      onChange={(content) => onChange && onChange(content)}
    />
  );
};

export default EditRichText;
