import React from "react";
import { Modal, Form, Input } from "antd";

interface Props {
  title: string;
  existingItems: string[];
  visible: boolean;
  onCreate: (title: string) => void;
  onCancel: () => void;
}

const itemName = "item";

const AddUniqueValue: React.FC<Props> = ({
  title,
  existingItems,
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const itemValidator = (_: any, value: string) => {
    if (!value) return Promise.reject("A value is required");
    if (existingItems.find((p) => p === value))
      return Promise.reject("Entry has to be unique");

    return Promise.resolve();
  };

  return (
    <Modal
      visible={visible}
      title={title}
      okText="Add"
      cancelText="Cancel"
      onOk={() => {
        form.validateFields().then((values) => {
          form.resetFields();
          onCreate(values[itemName]);
        });
      }}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
    >
      <Form form={form}>
        <Form.Item
          name={itemName}
          rules={[{ required: true, validator: itemValidator }]}
        >
          <Input placeholder="Enter unique value" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUniqueValue;
