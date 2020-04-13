import React from "react";
import { Modal, Form, Input } from "antd";

interface Props {
  flags: string[];
  visible: boolean;
  onCreate: (title: string) => void;
  onCancel: () => void;
}

const AddFlag: React.FC<Props> = ({ flags, visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const flagValidator = (_: any, value: string) => {
    if (!value) return Promise.reject("A value is required");
    if (flags.find((p) => p === value))
      return Promise.reject("A Flag has to be unique");

    return Promise.resolve();
  };

  return (
    <Modal
      visible={visible}
      title="New Red Flag"
      okText="Add"
      cancelText="Cancel"
      onOk={() => {
        form.validateFields().then((values) => {
          form.resetFields();
          onCreate(values["title"]);
        });
      }}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
    >
      <Form form={form}>
        <Form.Item
          label="Flag"
          name="title"
          rules={[{ required: true, validator: flagValidator }]}
        >
          <Input placeholder="Flag" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddFlag;
