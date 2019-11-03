import React, { useEffect } from "react";
import { Input, Switch, InputNumber, Form, Rate } from "antd";
import { CompanyStoryManagement } from "../../models/Company";
import StoryPartWrap, {
  WithStoryPartProps,
  formItemLayout
} from "./StoryPartWrap";

const StoryManagement: React.FC<WithStoryPartProps<CompanyStoryManagement>> = ({
  getFieldDecorator,
  setFieldsValue
}) => {
  useEffect(setFieldsValue, []);
  return (
    <>
      <Form.Item label="Is the CEO the founder?" {...formItemLayout}>
        {getFieldDecorator("ceoFounder", { valuePropName: "checked" })(
          <Switch title="Is the CEO the founder?" />
        )}
      </Form.Item>
      <Form.Item label="Is the CEO a major shareholder?" {...formItemLayout}>
        {getFieldDecorator("ceoMajorShareholder", {
          valuePropName: "checked"
        })(<Switch title="Is the CEO a major shareholder?" />)}
      </Form.Item>

      <Form.Item label="CEO tenure" {...formItemLayout}>
        {getFieldDecorator("ceoTenure")(
          <InputNumber placeholder="CEO tenure" min={0} step={1} />
        )}
      </Form.Item>

      <Form.Item label="Trust the CEO?" {...formItemLayout}>
        {getFieldDecorator("ceoTrust")(<Rate allowHalf={true} />)}
      </Form.Item>
      <Form.Item label="CEO candor" {...formItemLayout}>
        {getFieldDecorator("ceoCandor")(<Rate allowHalf={true} />)}
      </Form.Item>
      <Form.Item label="Management able and talented?" {...formItemLayout}>
        {getFieldDecorator("ableAndTalented")(<Rate allowHalf={true} />)}
      </Form.Item>

      <Input.Group>
        <Form.Item label="ROE" {...formItemLayout}>
          {getFieldDecorator("roe")(
            <InputNumber placeholder="ROE" step={0.1} />
          )}
        </Form.Item>
        <Form.Item label="ROIC" {...formItemLayout}>
          {getFieldDecorator("roic")(
            <InputNumber placeholder="ROIC" step={0.1} />
          )}
        </Form.Item>
        <Form.Item label="Debt over Earnings" {...formItemLayout}>
          {getFieldDecorator("debt")(
            <InputNumber placeholder="Debt over Earnings" min={0} step={0.1} />
          )}
        </Form.Item>
      </Input.Group>

      <Form.Item label="Comment">
        {getFieldDecorator("comment")(<Input placeholder="Comment" />)}
      </Form.Item>
    </>
  );
};

export default StoryPartWrap(StoryManagement);
