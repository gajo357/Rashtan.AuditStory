import React, { useEffect } from "react";
import { Form, Input, Button, InputNumber } from "antd";
import { Revenue } from "../../models/Company";
import { FormComponentProps } from "antd/lib/form";

export interface RevenueEditProps {
  data: Revenue;
  streamName: string;
  onSave: (data: Revenue) => void;
  onCancel: () => void;
}

type Props = FormComponentProps<Revenue> & RevenueEditProps;

const RevenueEdit: React.FC<Props> = ({
  data,
  streamName,
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
    validateFields((err, values: Revenue) => {
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
        label={streamName}
        validateStatus={validateStatus("stream")}
        help={help("stream")}
      >
        {getFieldDecorator("stream", {
          rules: [{ required: true, message: streamName }]
        })(<Input placeholder="Please enter revenue stream" />)}
      </Form.Item>
      <Form.Item
        label="Percent"
        validateStatus={validateStatus("percent")}
        help={help("percent")}
      >
        {getFieldDecorator("percent", {
          rules: [{ required: true, message: "Percent" }]
        })(
          <InputNumber
            min={0}
            step={0.1}
            placeholder="Please enter the percent"
          />
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
})(RevenueEdit);
