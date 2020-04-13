import React from "react";
import { Form, Typography } from "antd";
import { Rule } from "antd/lib/form";

export interface FormItemProps {
  label: string;
  name: string;
  valuePropName?: string;
  rules?: Rule[];
  children: React.ReactElement | React.ReactElement[] | null;
  labelCol?: number;
}

export const FormItem: React.FC<FormItemProps> = ({
  label,
  name,
  valuePropName,
  rules,
  children,
  labelCol,
}) => (
  <Form.Item
    label={label}
    name={name}
    valuePropName={valuePropName}
    rules={rules}
    labelCol={{ span: labelCol ?? 3 }}
    wrapperCol={{ span: 14 }}
  >
    {children}
  </Form.Item>
);

interface StoryPartFormBaseProps<TData> {
  title: string;
  data: TData;
  children: React.ReactNode;
}

export interface StoryPartProps<TData> {
  data: TData;
  extraData?: TData;
  dataChanged: (data: TData) => void;
}

function StoryPartForm<TData>({
  title,
  data,
  children,
}: StoryPartFormBaseProps<TData>) {
  return (
    <>
      <Typography.Title level={3}>{title}</Typography.Title>
      <Form layout="horizontal" initialValues={data} title={title}>
        {children}
      </Form>
    </>
  );
}

export default StoryPartForm;
