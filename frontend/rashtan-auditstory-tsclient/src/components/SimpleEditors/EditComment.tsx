import React from "react";
import EditRichText from "./EditRichText";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const EditComment: React.FC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <EditRichText
      placeholder={placeholder ? placeholder : "Conclusion, sources, ..."}
      value={value}
      onChange={onChange}
    />
  );
};

export default EditComment;
