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
    labelCol={{ span: labelCol ?? 2 }}
    wrapperCol={{ span: 14 }}
  >
    {children}
  </Form.Item>
);

export interface StoryPartBasicProps<TData> {
  data: TData;
  dataChanged: (data: TData) => void;
  title: string;
  extraData?: TData;
}

function StoryPartWrap<TData>(
  PartContent: React.FunctionComponent<StoryPartBasicProps<TData>>
) {
  return (props: StoryPartBasicProps<TData>) => {
    const { title, data } = props;

    return (
      <>
        <Typography.Title level={3}>{title}</Typography.Title>
        <Form layout="horizontal" initialValues={data}>
          <PartContent {...props} />
        </Form>
      </>
    );
  };
}

export default StoryPartWrap;
