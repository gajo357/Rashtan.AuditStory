import React from "react";
import { Form, Typography } from "antd";

export interface StoryPartProps<TData> {
  value: TData;
  extraData?: TData;
  onChange: (data: TData) => void;
}

interface SpanProps {
  span: number;
}
interface LabelProps {
  xs: SpanProps;
  sm: SpanProps;
}

interface FormProps {
  labelCol: LabelProps;
  wrapperCol: LabelProps;
}

interface StoryPartFormBaseProps<TData> {
  title: string | React.ReactNode;
  value?: TData;
  children: React.ReactNode;
  onChange?: (data: TData) => void;
  labelCol?: FormProps;
  ignoreLabelSetting?: boolean;
}

function StoryPartForm<TData>({
  title,
  value,
  children,
  onChange,
  labelCol,
  ignoreLabelSetting,
}: StoryPartFormBaseProps<TData>) {
  const formItemLayout = ignoreLabelSetting
    ? {}
    : {
        ...{
          labelCol: {
            xs: { span: 24 },
            sm: { span: 5 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 12 },
          },
        },
        ...labelCol,
      };

  return (
    <>
      <Typography.Title level={3}>{title}</Typography.Title>
      <Form
        {...formItemLayout}
        layout="horizontal"
        initialValues={value}
        onValuesChange={(_, values) =>
          onChange &&
          onChange(value ? { ...value, ...values } : (values as TData))
        }
      >
        {children}
      </Form>
    </>
  );
}

export default StoryPartForm;
