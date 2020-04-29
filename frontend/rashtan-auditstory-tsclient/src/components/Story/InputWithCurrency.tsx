import React from "react";
import EditNumber from "../SimpleEditors/EditNumber";
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
    <EditNumber
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      prefix={currency?.currency}
      addonAfter={currency && UnitOfSize[currency.unit]}
    />
  );
};

export default InputWithCurrency;
