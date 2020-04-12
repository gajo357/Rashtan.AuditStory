import React from "react";
import { Form, Input, Button } from "antd";
import { CompanyCompetitor } from "../../models/Company";

export interface CompanyCompetitorEditProps {
  data: CompanyCompetitor;
  onSave: (data: CompanyCompetitor) => void;
  onCancel: () => void;
}

const CompanyCompetitorEdit: React.FC<CompanyCompetitorEditProps> = ({
  data,
  onSave,
  onCancel,
}) => {
  const handleSubmit = (values: any) => {
    onSave(values as CompanyCompetitor);
  };

  return (
    <Form layout="horizontal" initialValues={data} onFinish={handleSubmit}>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Name" }]}
      >
        <Input placeholder="Please enter competitor name" />
      </Form.Item>
      <Form.Item
        label="Market Cap"
        name="marketCap"
        rules={[{ required: true, message: "Market Cap" }]}
      >
        <Input placeholder="Please enter market capitalization" />
      </Form.Item>
      <Form.Item
        label="Market Share (%)"
        name="marketShare"
        rules={[{ required: true, message: "Market Share (%)" }]}
      >
        <Input placeholder="Please enter competitor market share percent" />
      </Form.Item>

      <Form.Item>
        <Button onClick={onCancel} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CompanyCompetitorEdit;
