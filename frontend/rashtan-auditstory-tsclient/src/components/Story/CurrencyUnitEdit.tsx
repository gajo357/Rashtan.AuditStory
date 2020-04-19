import React from "react";
import { Select, Avatar, Input } from "antd";
import { CurrencyUnit, UnitOfSize } from "../../models/Company";
import { Currency } from "../../models/Country";

interface Props {
  value?: CurrencyUnit;
  onChange?: (value: CurrencyUnit) => void;
  currencies: Currency[];
}

const CurrencyUnitEdit: React.FC<Props> = ({ value, onChange, currencies }) => {
  return (
    <Input.Group compact>
      <Select
        style={{ width: "70%" }}
        showSearch
        loading={currencies.length === 0}
        filterOption={(inputValue, option) => {
          if (!option || !inputValue) return true;
          if (
            (option.title as string)
              .toLowerCase()
              .includes(inputValue.toLowerCase())
          )
            return true;
          if (
            (option.value as string)
              .toLowerCase()
              .includes(inputValue.toLowerCase())
          )
            return true;
          return false;
        }}
        value={value?.currency}
        onChange={(v) =>
          onChange &&
          onChange(
            value
              ? { ...value, currency: v as string }
              : { currency: v as string, unit: UnitOfSize.Thousand }
          )
        }
      >
        {currencies.map((c) => (
          <Select.Option value={c.code} key={c.name} title={c.name}>
            <Avatar
              size={20}
              style={{ position: "relative", top: -2, marginRight: 10 }}
            >
              {c.symbol}
            </Avatar>
            {c.name} ({c.code})
          </Select.Option>
        ))}
      </Select>
      <Select
        style={{ width: "30%" }}
        value={value?.unit}
        onChange={(v) =>
          onChange &&
          onChange(
            value
              ? { ...value, unit: v as UnitOfSize }
              : { unit: v as UnitOfSize, currency: "" }
          )
        }
      >
        <Select.Option value={UnitOfSize.Thousand}>
          {UnitOfSize[UnitOfSize.Thousand]}
        </Select.Option>
        <Select.Option value={UnitOfSize.Million}>
          {UnitOfSize[UnitOfSize.Million]}
        </Select.Option>
        <Select.Option value={UnitOfSize.Billion}>
          {UnitOfSize[UnitOfSize.Billion]}
        </Select.Option>
      </Select>
    </Input.Group>
  );
};

export default CurrencyUnitEdit;
