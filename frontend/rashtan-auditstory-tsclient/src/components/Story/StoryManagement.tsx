import React from "react";
import { Form, Input, Switch, InputNumber, Rate } from "antd";
import { CompanyStoryManagement } from "../../models/Company";
import StoryPartForm, { StoryPartProps } from "./StoryPartForm";

const StoryManagement: React.FC<StoryPartProps<CompanyStoryManagement>> = ({
  value,
  onChange,
}) => (
  <StoryPartForm title="Management" value={value} onChange={onChange}>
    <Form.Item
      label="Is CEO the founder"
      name="ceoFounder"
      valuePropName="checked"
    >
      <Switch title="Is CEO the founder" />
    </Form.Item>
    <Form.Item
      label="CEO major shareholder"
      name="ceoMajorShareholder"
      valuePropName="checked"
    >
      <Switch title="CEO major shareholder" />
    </Form.Item>

    <Form.Item label="CEO tenure" name="ceoTenure">
      <InputNumber placeholder="CEO tenure" min={0} step={1} />
    </Form.Item>

    <Form.Item label="Trust CEO" name="ceoTrust">
      <Rate allowHalf={true} />
    </Form.Item>
    <Form.Item label="CEO candor" name="ceoCandor">
      <Rate allowHalf={true} />
    </Form.Item>
    <Form.Item label="Able and talented" name="ableAndTalented">
      <Rate allowHalf={true} />
    </Form.Item>

    <Input.Group>
      <Form.Item label="ROE" name="roe">
        <InputNumber placeholder="ROE" step={0.1} />
      </Form.Item>
      <Form.Item label="ROIC" name="roic">
        <InputNumber placeholder="ROIC" step={0.1} />
      </Form.Item>
      <Form.Item label="Debt over Earnings" name="debt">
        <InputNumber placeholder="Debt over Earnings" min={0} step={0.1} />
      </Form.Item>
    </Input.Group>

    <Form.Item label="Comment" name="comment">
      <Input.TextArea placeholder="Comment" rows={2} />
    </Form.Item>
  </StoryPartForm>
);

export default StoryManagement;
