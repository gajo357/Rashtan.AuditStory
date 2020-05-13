import React, { useState } from "react";
import { Form, Input, Modal, notification } from "antd";
import Email, { SendEmail } from "../models/Email";
import { showError } from "../models/Errors";
import EditRichText from "./SimpleEditors/EditRichText";

interface Props {
  title: string;
  visible: boolean;
  onSend: SendEmail;
  onClose: () => void;
}

const EmailSender: React.FC<Props> = ({ title, visible, onClose, onSend }) => {
  const [saving, setSaving] = useState(false);

  const handleOk = (values: Email) => {
    setSaving(true);
    onSend &&
      onSend(values)
        .then((v) => {
          notification["success"]({
            message: "Request sent",
            description:
              "Thank you for your request, our team will get back to you soon.",
            duration: 5,
          });
          onClose();
        })
        .catch(showError)
        .finally(() => {
          setSaving(false);
        });
  };

  const [form] = Form.useForm();
  return (
    <Modal
      title={title}
      visible={visible}
      confirmLoading={saving}
      onOk={() => {
        form.validateFields().then((values) => handleOk(values as Email));
      }}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
    >
      <Form form={form}>
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="subject" rules={[{ required: true }]}>
          <Input placeholder="Subject" />
        </Form.Item>
        <Form.Item name="content" rules={[{ required: true }]}>
          <EditRichText placeholder="Content" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmailSender;
