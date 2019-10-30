import React from "react";
import { List, Icon, Typography, Form } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { GetFieldDecoratorOptions } from "antd/lib/form/Form";

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
  remove?: () => void;
  dataChanged: (data: TData) => void;
  title: string;
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
      remove,
      data,
      form: { getFieldDecorator, setFieldsValue }
    } = props;

    return (
      <List.Item>
        <List.Item.Meta
          title={
            <span>
              <Typography.Title>
                {title}
                {remove && (
                  <Icon
                    type="delete"
                    onClick={remove}
                    style={{ marginLeft: 10 }}
                  />
                )}
              </Typography.Title>
            </span>
          }
          description={
            <Form>
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
