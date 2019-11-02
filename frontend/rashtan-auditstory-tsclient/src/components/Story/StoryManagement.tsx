import React, { useEffect } from "react";
import { Input, Switch, InputNumber, Form, Rate } from "antd";
import { CompanyStoryManagement } from "../../models/Company";
import StoryPartWrap, { WithStoryPartProps } from "./StoryPartWrap";

const StoryManagement: React.FC<WithStoryPartProps<CompanyStoryManagement>> = ({
  getFieldDecorator,
  setFieldsValue
}) => {
  useEffect(setFieldsValue, []);
  return (
    <>
      <Input.Group compact>
        <Form.Item label="Is the CEO the founder?">
          {getFieldDecorator("ceoFounder", { valuePropName: "checked" })(
            <Switch title="Is the CEO the founder?" />
          )}
        </Form.Item>
        <Form.Item label="Is the CEO a major shareholder?">
          {getFieldDecorator("ceoMajorShareholder", {
            valuePropName: "checked"
          })(<Switch title="Is the CEO a major shareholder?" />)}
        </Form.Item>
      </Input.Group>

      <Form.Item label="CEO tenure">
        {getFieldDecorator("ceoTenure")(
          <InputNumber placeholder="CEO tenure" min={0} step={1} />
        )}
      </Form.Item>

      <Form.Item label="Trust the CEO?">
        {getFieldDecorator("ceoTrust")(<Rate allowHalf={true} />)}
      </Form.Item>
      <Form.Item label="CEO candor">
        {getFieldDecorator("ceoCandor")(<Rate allowHalf={true} />)}
      </Form.Item>
      <Form.Item label="Management able and talented?">
        {getFieldDecorator("ableAndTalented")(<Rate allowHalf={true} />)}
      </Form.Item>

      <Input.Group>
        <Form.Item label="ROE">
          {getFieldDecorator("roe")(
            <InputNumber placeholder="ROE" step={0.1} />
          )}
        </Form.Item>
        <Form.Item label="ROIC">
          {getFieldDecorator("roic")(
            <InputNumber placeholder="ROIC" step={0.1} />
          )}
        </Form.Item>
        <Form.Item label="Debt over Earnings">
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
