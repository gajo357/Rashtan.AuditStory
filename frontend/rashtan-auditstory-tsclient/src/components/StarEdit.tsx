import React from "react";
import { StarFilled } from "@ant-design/icons";

interface Props {
  value?: boolean;
  onChange?: (value: boolean) => void;
}

const StarEdit: React.FC<Props> = ({ value, onChange }) => {
  return (
    <StarFilled
      style={{ color: value ? "#FFEB3B" : "#555555" }}
      onClick={() => onChange && onChange(!value)}
    />
  );
};

export default StarEdit;
