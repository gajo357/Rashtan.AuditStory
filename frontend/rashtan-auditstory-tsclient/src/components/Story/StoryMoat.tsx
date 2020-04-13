import React from "react";
import { Form, Input, InputNumber, Select } from "antd";
import { CompanyStoryMoat, MoatKind } from "../../models/Company";
import StoryPartForm, { StoryPartProps, FormItem } from "./StoryPartForm";

const { Option } = Select;

const StoryMoat: React.FC<StoryPartProps<CompanyStoryMoat>> = ({
  data,
  dataChanged,
}) => (
  <StoryPartForm title="MOAT" data={data} dataChanged={dataChanged}>
    <FormItem label="Kinds of moat" name="kinds">
      <Select placeholder="Kinds of moat" mode="multiple">
        <Option value={MoatKind.Brand}>Brand</Option>
        <Option value={MoatKind.Price}>Price</Option>
        <Option value={MoatKind.Secrets}>Secrets</Option>
        <Option value={MoatKind.Toll}>Toll</Option>
        <Option value={MoatKind.Switching}>Switching</Option>
      </Select>
    </FormItem>
    <FormItem label="Main advantage" name="mainAdvantage">
      <Input placeholder="Main advantage" />
    </FormItem>

    <FormItem label="Is moat durable?" name="durable">
      <Input placeholder="Is moat durable?" />
    </FormItem>

    <Input.Group>
      <FormItem label="BVPS growth (%)" name="bvps">
        <InputNumber placeholder="Book Value per Share growth (%)" step={0.1} />
      </FormItem>
      <FormItem label="EPS growth (%)" name="eps">
        <InputNumber placeholder="Earnings per Share growth (%)" step={0.1} />
      </FormItem>
      <FormItem label="OCPS growth (%)" name="ocps">
        <InputNumber
          placeholder="Operating Cash per Share growth (%)"
          step={0.1}
        />
      </FormItem>
      <FormItem label="Sales growth (%)" name="sgr">
        <InputNumber placeholder="Sales growth (%)" step={0.1} />
      </FormItem>
    </Input.Group>

    <Form.Item label="Comment" name="comment">
      <Input.TextArea placeholder="Comment" rows={2} />
    </Form.Item>
  </StoryPartForm>
);

export default StoryMoat;
