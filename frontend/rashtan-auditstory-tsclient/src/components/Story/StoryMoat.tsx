import React, { useEffect } from "react";
import { Input, InputNumber, Select, Form } from "antd";
import { CompanyStoryMoat, MoatKind } from "../../models/Company";
import StoryPartWrap, {
  WithStoryPartProps,
  formItemLayout
} from "./StoryPartWrap";

const { Option } = Select;

const StoryMoat: React.FC<WithStoryPartProps<CompanyStoryMoat>> = ({
  getFieldDecorator,
  setFieldsValue
}) => {
  useEffect(setFieldsValue, []);

  return (
    <>
      <Form.Item label="Kinds of moat" {...formItemLayout}>
        {getFieldDecorator("kinds")(
          <Select placeholder="Kinds of moat" mode="multiple">
            <Option value={MoatKind.Brand}>Brand</Option>
            <Option value={MoatKind.Price}>Price</Option>
            <Option value={MoatKind.Secrets}>Secrets</Option>
            <Option value={MoatKind.Toll}>Toll</Option>
            <Option value={MoatKind.Switching}>Switching</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label="Main advantage" {...formItemLayout}>
        {getFieldDecorator("mainAdvantage")(
          <Input placeholder="Main advantage" />
        )}
      </Form.Item>

      <Form.Item label="Is moat durable?" {...formItemLayout}>
        {getFieldDecorator("durable")(<Input placeholder="Is moat durable?" />)}
      </Form.Item>

      <Input.Group>
        <Form.Item label="BVPS growth (%)" {...formItemLayout}>
          {getFieldDecorator("bvps")(
            <InputNumber
              placeholder="Book Value per Share growth (%)"
              step={0.1}
            />
          )}
        </Form.Item>
        <Form.Item label="EPS growth (%)" {...formItemLayout}>
          {getFieldDecorator("eps")(
            <InputNumber
              placeholder="Earnings per Share growth (%)"
              step={0.1}
            />
          )}
        </Form.Item>
        <Form.Item label="OCPS growth (%)" {...formItemLayout}>
          {getFieldDecorator("ocps")(
            <InputNumber
              placeholder="Operating Cash per Share growth (%)"
              step={0.1}
            />
          )}
        </Form.Item>
        <Form.Item label="Sales growth (%)" {...formItemLayout}>
          {getFieldDecorator("sgr")(
            <InputNumber placeholder="Sales growth (%)" step={0.1} />
          )}
        </Form.Item>
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
