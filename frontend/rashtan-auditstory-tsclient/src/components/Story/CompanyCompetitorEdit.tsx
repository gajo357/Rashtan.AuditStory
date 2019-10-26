import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { CompanyCompetitor } from "../../models/Company";
import { FormComponentProps } from "antd/lib/form";

export interface CompanyCompetitorEditProps {
  data: CompanyCompetitor;
  onSave: (data: CompanyCompetitor) => void;
  onCancel: () => void;
}

type Props = FormComponentProps<CompanyCompetitor> & CompanyCompetitorEditProps;

const CompanyCompetitorEdit: React.FC<Props> = ({
  data,
  onSave,
  onCancel,
  form: {
    validateFields,
    getFieldsError,
    getFieldDecorator,
    isFieldTouched,
    getFieldError,
    setFieldsValue
  }
}) => {
  useEffect(() => setFieldsValue(data), [data, setFieldsValue]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateFields((err, values: CompanyCompetitor) => {
      if (!err) {
        onSave(values);
      } else {
        console.log(err);
      }
    });
  };

  const hasErrors = (fieldsError: any) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };
  const hasError = (p: string) => isFieldTouched(p) && getFieldError(p);
  const validateStatus = (p: string) => (hasError(p) ? "error" : "");
  const help = (p: string) => hasError(p) || "";

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <Form.Item
        label="Name"
        validateStatus={validateStatus("name")}
        help={help("name")}
      >
        {getFieldDecorator("name", {
          rules: [{ required: true, message: "Name" }]
        })(<Input placeholder="Please enter competitor name" />)}
      </Form.Item>
      <Form.Item
        label="Market Cap"
        validateStatus={validateStatus("marketCap")}
        help={help("marketCap")}
      >
        {getFieldDecorator("marketCap", {
          rules: [{ required: true, message: "Market Cap" }]
        })(<Input placeholder="Please enter market capitalization" />)}
      </Form.Item>
      <Form.Item
        label="Market Share (%)"
        validateStatus={validateStatus("marketShare")}
        help={help("marketShare")}
      >
        {getFieldDecorator("marketShare", {
          rules: [{ required: true, message: "Market Share (%)" }]
        })(
          <Input placeholder="Please enter competitor market share percent" />
        )}
      </Form.Item>

      <Form.Item>
        <Button onClick={onCancel} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          disabled={hasErrors(getFieldsError())}
        >
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create<Props>({
  name: "horizontal_login"
})(CompanyCompetitorEdit);
