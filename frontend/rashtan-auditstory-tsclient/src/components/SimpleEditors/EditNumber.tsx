import React from "react";
import { Input } from "antd";

interface Props {
  value?: number;
  onChange?: (value: number) => void;
  placeholder?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  addonAfter?: React.ReactNode;
}

const EditNumber: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
  addonAfter,
}) => {
  return (
    <Input
      type="number"
      placeholder={placeholder ? placeholder : "Conclusion, sources, ..."}
      value={value}
      onChange={(e) =>
        e && onChange && onChange(Number.parseFloat(e.target.value))
      }
      prefix={prefix}
      suffix={suffix}
      addonAfter={addonAfter}
    />
  );
};

export default EditNumber;
