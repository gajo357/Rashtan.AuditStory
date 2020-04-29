import React from "react";
import { Form, Switch, InputNumber, Rate } from "antd";
import StoryPartForm, { StoryPartProps } from "./StoryPartForm";
import EditComment from "../SimpleEditors/EditComment";
import { ManagementDto } from "../../models/Company";

const StoryManagement: React.FC<StoryPartProps<ManagementDto>> = ({
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

    <Form.Item label="Comment" name="comment">
      <EditComment />
    </Form.Item>
  </StoryPartForm>
);

export default StoryManagement;
