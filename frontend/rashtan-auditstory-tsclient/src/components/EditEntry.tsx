import React from "react";
import { Input, Button, InputNumber, Form } from "antd";
import { ColumnInfo } from "./EditableTable";

export interface EditEntryProps<T> {
  data?: T;
  columns: ColumnInfo[];
  onSave: (data: T) => void;
  onCancel: () => void;
}

function EditEntry<T>({ data, columns, onSave, onCancel }: EditEntryProps<T>) {
  const handleSubmit = (values: any) => {
    console.log(values);
    onSave(values as T);
  };

  return (
    <Form layout="horizontal" initialValues={data} onFinish={handleSubmit}>
      {columns.map((c) => (
        <Form.Item
          key={c.key}
          label={c.title}
          name={c.key}
          rules={[{ required: true }]}
        >
          {c.type === "number" ? (
            <InputNumber
              min={0}
              step={0.1}
              placeholder="Please enter the percent"
            />
          ) : (
            <Input placeholder={"Please enter " + c.title} />
          )}
        </Form.Item>
      ))}

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
}

export default EditEntry;
