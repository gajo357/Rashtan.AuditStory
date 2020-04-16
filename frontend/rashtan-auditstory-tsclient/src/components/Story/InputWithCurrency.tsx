import React from "react";
import { Input } from "antd";
import { CurrencyUnit, UnitOfSize } from "../../models/Company";

interface Props {
  value?: number;
  onChange?: (value: number) => void;
  currency?: CurrencyUnit;
  placeholder?: string;
}

const InputWithCurrency: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  currency,
}) => {
  return (
    <Input
      type="number"
      value={value}
      placeholder={placeholder}
      prefix={currency?.currency}
      addonAfter={currency && UnitOfSize[currency.unit]}
      onChange={(v) =>
        v && onChange && onChange(Number.parseFloat(v.target.value))
      }
    />
  );
};

export default InputWithCurrency;
