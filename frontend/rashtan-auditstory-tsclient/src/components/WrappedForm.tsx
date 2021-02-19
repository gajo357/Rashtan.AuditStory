import React, { useState } from "react";
import { Button, Form } from "antd";

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

interface Props<TFormValues> {
  initialData?: TFormValues;
  submitButtonText?: string;
  onSubmit: (v: TFormValues) => Promise<void>;
  children: React.ReactNode | React.ReactNode[];
}

const WrappedForm = <
  TFormValues extends Record<string, any> = Record<string, any>
>({
  initialData,
  submitButtonText,
  onSubmit,
  children
}: Props<TFormValues>) => {
  const [submitting, setSubmitting] = useState(false);
  // const [form] = Form.useForm();

  // const handleSubmit = () => {
  //   if (submitting) return;
  //   form.validateFields().then(values => {
  //     setSubmitting(true);
  //     onSubmit(values as TFormValues).finally(() => setSubmitting(false));
  //   });
  // };

  return (
    <Form initialValues={initialData} onFinish={onSubmit} {...formItemLayout}>
      {children}
      <Form.Item {...tailLayout}>
        <Button
          htmlType="submit"
          type="primary"
          shape="round"
          loading={submitting}
          disabled={submitting}
        >
          {submitButtonText ?? "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default WrappedForm;
