import React from "react";
import { Form, Input, Select } from "antd";
import StoryPartForm, { StoryPartProps } from "./StoryPartForm";
import EditComment from "../SimpleEditors/EditComment";
import { MoatDto, MoatKind } from "../../models/Company";

const { Option } = Select;

const StoryMoat: React.FC<StoryPartProps<MoatDto>> = ({ value, onChange }) => (
  <StoryPartForm title="MOAT" value={value} onChange={onChange}>
    <Form.Item label="Kinds of moat" name="kinds">
      <Select placeholder="Kinds of moat" mode="multiple">
        <Option value={MoatKind.Brand}>Brand</Option>
        <Option value={MoatKind.Price}>Price</Option>
        <Option value={MoatKind.Secrets}>Secrets</Option>
        <Option value={MoatKind.Toll}>Toll</Option>
        <Option value={MoatKind.Switching}>Switching</Option>
      </Select>
    </Form.Item>
    <Form.Item label="Main advantage" name="mainAdvantage">
      <Input placeholder="Main advantage" />
    </Form.Item>

    <Form.Item label="Is moat durable?" name="durable">
      <Input placeholder="Is moat durable?" />
    </Form.Item>

    <Form.Item label="Comment" name="comment">
      <EditComment />
    </Form.Item>
  </StoryPartForm>
);

export default StoryMoat;
