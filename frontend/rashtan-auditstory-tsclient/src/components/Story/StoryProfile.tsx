import React from "react";
import { GlobalOutlined, TagsOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber, Button, Select } from "antd";
import { CompanyProfile } from "../../models/Company";
import StoryPartForm, { StoryPartProps } from "./StoryPartForm";

const StoryProfile: React.FC<StoryPartProps<CompanyProfile>> = ({
  value,
  onChange,
}) => {
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
        <Select mode="tags" />
      </Form.Item>

      <Form.Item
        label="Company name"
        name="name"
        rules={[{ required: true, message: "Company name is required" }]}
      >
        <Input placeholder="Company name" />
      </Form.Item>

      <Form.Item
        label="Website"
        name="website"
        rules={[{ required: true, message: "Website is required" }]}
      >
        <Input
          placeholder="Company website"
          addonBefore={
            value.website && (
              <Button
                icon={<GlobalOutlined />}
                type="link"
                href={value.website}
                target="_blank"
              />
            )
          }
        />
      </Form.Item>

      <Form.Item label="Market cap" name="marketCap">
        <InputNumber placeholder="Market cap" min={0} step={1} />
      </Form.Item>

      <Form.Item label="Industry" name="industry">
        <Input placeholder="Industry" />
      </Form.Item>
    </StoryPartForm>
  );
};

export default StoryProfile;
