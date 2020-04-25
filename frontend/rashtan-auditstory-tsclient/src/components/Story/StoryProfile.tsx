import React from "react";
import { TagsOutlined } from "@ant-design/icons";
import { Form, Input, Select } from "antd";
import StoryPartForm, { StoryPartPropsWithExtraData } from "./StoryPartForm";
import CurrencyUnitEdit from "./CurrencyUnitEdit";
import InputWithCurrency from "./InputWithCurrency";
import { CompanyProfile } from "../../models/Company";
import { Currency } from "../../models/Country";

const StoryProfile: React.FC<StoryPartPropsWithExtraData<
  CompanyProfile,
  Currency
>> = ({ value, onChange, currency, extraData }) => {
  return (
    <StoryPartForm title="Profile" value={value} onChange={onChange}>
      <Form.Item
        label={
          <span>
            <TagsOutlined /> Tags
          </span>
        }
        name="tags"
        rules={[{ required: false }]}
      >
        <Select mode="tags" placeholder="Make your own custom tags" />
      </Form.Item>

      <Form.Item
        label="Company name"
        name="name"
        rules={[{ required: true, message: "Company name is required" }]}
      >
        <Input placeholder="Company name" />
      </Form.Item>

      <Form.Item label="Website" name="website">
        <Input placeholder="Company website" />
      </Form.Item>

      <Form.Item label="Currency" name="unit">
        <CurrencyUnitEdit currencies={extraData} />
      </Form.Item>

      <Form.Item label="Market cap" name="marketCap">
        <InputWithCurrency placeholder="Market cap" currency={currency} />
      </Form.Item>

      <Form.Item label="Industry" name="industry">
        <Input placeholder="Industry" />
      </Form.Item>
    </StoryPartForm>
  );
};

export default StoryProfile;
