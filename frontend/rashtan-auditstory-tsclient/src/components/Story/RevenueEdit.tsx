import React from "react";
import { Input, Button, InputNumber, Form } from "antd";
import { Revenue } from "../../models/Company";

export interface RevenueEditProps {
  data: Revenue;
  streamName: string;
  onSave: (data: Revenue) => void;
  onCancel: () => void;
}

const RevenueEdit: React.FC<RevenueEditProps> = ({
  data,
  streamName,
  onSave,
  onCancel,
}) => {
  const handleSubmit = (values: any) => {
    console.log(values);
    onSave(values as Revenue);
  };

  return (
    <Form layout="horizontal" initialValues={data} onFinish={handleSubmit}>
      <Form.Item
        label={streamName}
        name={"stream"}
        rules={[{ required: true, message: streamName }]}
      >
        <Input placeholder="Please enter revenue stream" />
      </Form.Item>
      <Form.Item
        label="Percent"
        name="percent"
        rules={[{ required: true, message: "Percent" }]}
      >
        <InputNumber
          min={0}
          step={0.1}
          placeholder="Please enter the percent"
        />
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

export default RevenueEdit;
