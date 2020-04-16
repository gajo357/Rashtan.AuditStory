import React, { useState } from "react";
import { Form, Input, Modal, Row, Col } from "antd";
import Category from "../models/Category";
import { showError } from "../models/Errors";
import EditColor from "./SimpleEditors/EditColor";

interface Props {
  categories: Category[];
  visible: boolean;
  onClose: () => void;
  onCreate: (c: Category) => Promise<void>;
}

const NewCategoryEdit: React.FC<Props> = ({
  categories,
  visible,
  onClose,
  onCreate,
}) => {
  const [savingCategory, setSavingCategory] = useState(false);

  const validateNewCategory = (_: any, value: string) => {
    if (!value) return Promise.reject("A value is required");
    if (categories.find((p) => p.name === value))
      return Promise.reject("Entry has to be unique");

    return Promise.resolve();
  };

  const handleOk = (values: Category) => {
    setSavingCategory(true);
    onCreate(values)
      .catch(showError)
      .finally(() => {
        setSavingCategory(false);
      });
  };

  const [form] = Form.useForm();
  return (
    <Modal
      title="New company category"
      visible={visible}
      confirmLoading={savingCategory}
      onOk={() => {
        form.validateFields().then((values) => {
          form.resetFields();
          handleOk(values as Category);
        });
      }}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
    >
      <Form form={form}>
        <Row>
          <Col flex="30px">
            <Form.Item name="color" rules={[{ required: true }]}>
              <EditColor />
            </Form.Item>
          </Col>
          <Col flex="auto">
            <Form.Item
              name="name"
              rules={[{ required: true, validator: validateNewCategory }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NewCategoryEdit;
