import React, { useEffect } from "react";
import { Input, InputNumber, Select, Form } from "antd";
import { CompanyStoryMoat, MoatKind } from "../../models/Company";
import StoryPartWrap, { WithStoryPartProps, FormItem } from "./StoryPartWrap";

const { Option } = Select;

const StoryMoat: React.FC<WithStoryPartProps<CompanyStoryMoat>> = ({
  getFieldDecorator,
  setFieldsValue,
}) => {
  useEffect(setFieldsValue, []);

  return (
    <>
      <FormItem label="Kinds of moat">
        {getFieldDecorator("kinds")(
          <Select placeholder="Kinds of moat" mode="multiple">
            <Option value={MoatKind.Brand}>Brand</Option>
            <Option value={MoatKind.Price}>Price</Option>
            <Option value={MoatKind.Secrets}>Secrets</Option>
            <Option value={MoatKind.Toll}>Toll</Option>
            <Option value={MoatKind.Switching}>Switching</Option>
          </Select>
        )}
      </FormItem>
      <FormItem label="Main advantage">
        {getFieldDecorator("mainAdvantage")(
          <Input placeholder="Main advantage" />
        )}
      </FormItem>

      <FormItem label="Is moat durable?">
        {getFieldDecorator("durable")(<Input placeholder="Is moat durable?" />)}
      </FormItem>

      <Input.Group>
        <FormItem label="BVPS growth (%)">
          {getFieldDecorator("bvps")(
            <InputNumber
              placeholder="Book Value per Share growth (%)"
              step={0.1}
            />
          )}
        </FormItem>
        <FormItem label="EPS growth (%)">
          {getFieldDecorator("eps")(
            <InputNumber
              placeholder="Earnings per Share growth (%)"
              step={0.1}
            />
          )}
        </FormItem>
        <FormItem label="OCPS growth (%)">
          {getFieldDecorator("ocps")(
            <InputNumber
              placeholder="Operating Cash per Share growth (%)"
              step={0.1}
            />
          )}
        </FormItem>
        <FormItem label="Sales growth (%)">
          {getFieldDecorator("sgr")(
            <InputNumber placeholder="Sales growth (%)" step={0.1} />
          )}
        </FormItem>
      </Input.Group>

      <Form.Item label="Comment">
        {getFieldDecorator("comment")(
          <Input.TextArea placeholder="Comment" rows={2} />
        )}
      </Form.Item>
    </>
  );
};

export default StoryPartWrap(StoryMoat);
