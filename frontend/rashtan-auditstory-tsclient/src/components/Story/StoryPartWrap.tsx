import React from "react";
import { List, Typography, Form } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { GetFieldDecoratorOptions } from "antd/lib/form/Form";

export const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 14 }
};

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
    }
  })((props: WithStoryPartProps<TData>) => {
    const {
      title,
      data,
      form: { getFieldDecorator, setFieldsValue }
    } = props;

    return (
      <List.Item>
        <List.Item.Meta
          title={
            <span>
              <Typography.Title>{title}</Typography.Title>
            </span>
          }
          description={
            <Form layout="horizontal">
              <PartContent
                {...props}
                getFieldDecorator={getFieldDecorator}
                setFieldsValue={() => setFieldsValue(data)}
              />
            </Form>
          }
        />
      </List.Item>
    );
  });
}

export default StoryPartWrap;
