import React from "react";
import { Form, Typography } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { GetFieldDecoratorOptions } from "antd/lib/form/Form";

export interface FormItemProps {
  label: string;
  children: React.ReactNode;
  labelCol?: number;
}

export const FormItem: React.FC<FormItemProps> = ({
  label,
  children,
  labelCol,
}) => (
  <Form.Item
    label={label}
    labelCol={{ span: labelCol ?? 3 }}
    wrapperCol={{ span: 14 }}
  >
    {children}
  </Form.Item>
);

export type WithStoryPartProps<TData> = FormComponentProps<TData> &
  StoryPartBasicProps<TData> &
  InternalProps;

export interface InternalProps {
  getFieldDecorator<T extends Object = {}>(
    id: keyof T,
    options?: GetFieldDecoratorOptions
  ): (node: React.ReactNode) => React.ReactNode;
  setFieldsValue: () => void;
}

export interface StoryPartBasicProps<TData> {
  data: TData;
  dataChanged: (data: TData) => void;
  title: string;
  extraData?: TData;
}

function StoryPartWrap<TData>(
  PartContent: React.FunctionComponent<WithStoryPartProps<TData>>
) {
  return Form.create<FormComponentProps<TData> & StoryPartBasicProps<TData>>({
    onValuesChange({ data, dataChanged }, values) {
      dataChanged({ ...data, ...values });
    },
  })((props: WithStoryPartProps<TData>) => {
    const {
      title,
      data,
      form: { getFieldDecorator, setFieldsValue },
    } = props;

    return (
      <>
        <Typography.Title level={3}>{title}</Typography.Title>
        <Form layout="horizontal">
          <PartContent
            {...props}
            getFieldDecorator={getFieldDecorator}
            setFieldsValue={() => setFieldsValue(data)}
          />
        </Form>
      </>
    );
  });
}

export default StoryPartWrap;
