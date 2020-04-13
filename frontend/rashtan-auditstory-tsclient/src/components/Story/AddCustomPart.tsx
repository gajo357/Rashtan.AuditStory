import React from "react";
import { Modal, Form, Input } from "antd";
import { CompanyStory } from "./../../models/Company";

interface Props {
  company: CompanyStory;
  visible: boolean;
  onCreate: (title: string) => void;
  onCancel: () => void;
}

const AddCustomPart: React.FC<Props> = ({
  company,
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const titleValidator = (_: any, value: string) => {
    if (!value) return Promise.reject("A value is required");
    if (company.parts.find((p) => p.title === value))
      return Promise.reject("A chapter name has to be unique");

    return Promise.resolve();
  };

  return (
    <Modal
      visible={visible}
      title="New chapter"
      okText="Create"
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
          label="Chapter"
          name="title"
          rules={[{ required: true, validator: titleValidator }]}
        >
          <Input placeholder="Chapter" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCustomPart;
