import React from "react";
import { Form, Typography } from "antd";
import { CurrencyUnit } from "../../models/Company";

export interface StoryPartProps<TData> {
  value: TData;
  onChange: (data: TData) => void;
  currency?: CurrencyUnit;
}

export interface StoryPartPropsWithExtraData<TData, TExtra>
  extends StoryPartProps<TData> {
  extraData: TExtra[];
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
        },
        ...labelCol,
      };

  const onChangeImpl = (values: any) =>
    onChange && onChange(value ? { ...value, ...values } : (values as TData));

  return (
    <>
      <Typography.Title level={3}>{title}</Typography.Title>
      <Form
        {...formItemLayout}
        layout="horizontal"
        initialValues={value}
        onValuesChange={(_, values) => onChangeImpl(values)}
      >
        {children}
      </Form>
    </>
  );
}

export default StoryPartForm;
