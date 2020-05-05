import React, { useState } from "react";
import { Modal, Form, Input } from "antd";

interface Props {
  title: string;
  existingItems: string[];
  visible: boolean;
  onCancel: () => void;
  onCreate?: (title: string) => void;
  onCreateAsync?: (title: string) => Promise<void>;
}

const itemName = "item";

const AddUniqueValue: React.FC<Props> = ({
  title,
  existingItems,
  visible,
  onCreate,
  onCreateAsync,
  onCancel,
}) => {
  const [creating, setCreating] = useState(false);

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
      okButtonProps={{ loading: creating }}
      cancelButtonProps={{ disabled: creating }}
      onOk={() => {
        form.validateFields().then((values) => {
          const value = values[itemName];
          onCreate && onCreate(value);
          if (onCreateAsync) {
            setCreating(true);
            onCreateAsync(value).catch(() => setCreating(false));
          }
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
