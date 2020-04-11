import React, { useEffect } from "react";
import { Input, Switch, InputNumber, Form, Rate } from "antd";
import { CompanyStoryManagement } from "../../models/Company";
import StoryPartWrap, {
  WithStoryPartProps,
  FormItemProps,
  FormItem,
} from "./StoryPartWrap";

const FormItemLocal: React.FC<FormItemProps> = ({ label, children }) => (
  <FormItem label={label} labelCol={6}>
    {children}
  </FormItem>
);

const StoryManagement: React.FC<WithStoryPartProps<CompanyStoryManagement>> = ({
  getFieldDecorator,
  setFieldsValue,
}) => {
  useEffect(setFieldsValue, []);
  return (
    <>
      <FormItemLocal label="Is the CEO the founder?">
        {getFieldDecorator("ceoFounder", { valuePropName: "checked" })(
          <Switch title="Is the CEO the founder?" />
        )}
      </FormItemLocal>
      <FormItemLocal label="Is the CEO a major shareholder?">
        {getFieldDecorator("ceoMajorShareholder", {
          valuePropName: "checked",
        })(<Switch title="Is the CEO a major shareholder?" />)}
      </FormItemLocal>

      <FormItemLocal label="CEO tenure">
        {getFieldDecorator("ceoTenure")(
          <InputNumber placeholder="CEO tenure" min={0} step={1} />
        )}
      </FormItemLocal>

      <FormItemLocal label="Trust the CEO?">
        {getFieldDecorator("ceoTrust")(<Rate allowHalf={true} />)}
      </FormItemLocal>
      <FormItemLocal label="CEO candor">
        {getFieldDecorator("ceoCandor")(<Rate allowHalf={true} />)}
      </FormItemLocal>
      <FormItemLocal label="Management able and talented?">
        {getFieldDecorator("ableAndTalented")(<Rate allowHalf={true} />)}
      </FormItemLocal>

      <Input.Group>
        <FormItemLocal label="ROE">
          {getFieldDecorator("roe")(
            <InputNumber placeholder="ROE" step={0.1} />
          )}
        </FormItemLocal>
        <FormItemLocal label="ROIC">
          {getFieldDecorator("roic")(
            <InputNumber placeholder="ROIC" step={0.1} />
          )}
        </FormItemLocal>
        <FormItemLocal label="Debt over Earnings">
          {getFieldDecorator("debt")(
            <InputNumber placeholder="Debt over Earnings" min={0} step={0.1} />
          )}
        </FormItemLocal>
      </Input.Group>

      <Form.Item label="Comment">
        {getFieldDecorator("comment")(
          <Input.TextArea placeholder="Comment" rows={2} />
        )}
      </Form.Item>
    </>
  );
};

export default StoryPartWrap(StoryManagement);
