import React, { useEffect } from "react";
import { Input, Switch, InputNumber, Form } from "antd";
import { CompanyStoryManagement } from "../../models/Company";
import StoryPartWrap, { WithStoryPartProps } from "./StoryPartWrap";

const StoryManagement: React.FC<WithStoryPartProps<CompanyStoryManagement>> = ({
  getFieldDecorator,
  setFieldsValue
}) => {
  useEffect(setFieldsValue, []);
  return (
    <>
      <Form.Item label="Trust the CEO?">
        {getFieldDecorator("ceoTrust", { valuePropName: "checked" })(
          <Switch title="Do you trust the CEO with your pension?" />
        )}
      </Form.Item>

      <Form.Item label="CEO tenure">
        {getFieldDecorator("ceoTenure")(
          <InputNumber placeholder="CEO tenure" min={0} step={1} />
        )}
      </Form.Item>

      <Form.Item label="CEO candor">
        {getFieldDecorator("ceoCandor")(
          <Input placeholder="CEO candor in his/her communication?" />
        )}
      </Form.Item>

      <Form.Item label="Comment on the CEO">
        {getFieldDecorator("ceoComment")(
          <Input placeholder="Comment on the CEO" />
        )}
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
