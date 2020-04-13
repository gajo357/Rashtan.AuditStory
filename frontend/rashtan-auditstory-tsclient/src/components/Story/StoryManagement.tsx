import React from "react";
import { Form, Input, Switch, InputNumber, Rate } from "antd";
import { CompanyStoryManagement } from "../../models/Company";
import StoryPartForm, {
  StoryPartProps,
  FormItemProps,
  FormItem,
} from "./StoryPartForm";

const FormItemLocal: React.FC<FormItemProps> = (props) => (
  <FormItem {...props} labelCol={6} />
);

const StoryManagement: React.FC<StoryPartProps<CompanyStoryManagement>> = ({
  data,
}) => (
  <StoryPartForm title="Management" data={data}>
    <FormItemLocal
      label="Is the CEO the founder"
      name="ceoFounder"
      valuePropName="checked"
    >
      <Switch title="Is the CEO the founder" />
    </FormItemLocal>
    <FormItemLocal
      label="Is the CEO a major shareholder"
      name="ceoMajorShareholder"
      valuePropName="checked"
    >
      <Switch title="Is the CEO a major shareholder" />
    </FormItemLocal>

    <FormItemLocal label="CEO tenure" name="ceoTenure">
      <InputNumber placeholder="CEO tenure" min={0} step={1} />
    </FormItemLocal>

    <FormItemLocal label="Trust the CEO" name="ceoTrust">
      <Rate allowHalf={true} />
    </FormItemLocal>
    <FormItemLocal label="CEO candor" name="ceoCandor">
      <Rate allowHalf={true} />
    </FormItemLocal>
    <FormItemLocal label="Management able and talented" name="ableAndTalented">
      <Rate allowHalf={true} />
    </FormItemLocal>

    <Input.Group>
      <FormItemLocal label="ROE" name="roe">
        <InputNumber placeholder="ROE" step={0.1} />
      </FormItemLocal>
      <FormItemLocal label="ROIC" name="roic">
        <InputNumber placeholder="ROIC" step={0.1} />
      </FormItemLocal>
      <FormItemLocal label="Debt over Earnings" name="debt">
        <InputNumber placeholder="Debt over Earnings" min={0} step={0.1} />
      </FormItemLocal>
    </Input.Group>

    <Form.Item label="Comment" name="comment">
      <Input.TextArea placeholder="Comment" rows={2} />
    </Form.Item>
  </StoryPartForm>
);

export default StoryManagement;
