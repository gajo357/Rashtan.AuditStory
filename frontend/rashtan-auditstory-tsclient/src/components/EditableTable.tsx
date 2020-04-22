import React, { CSSProperties } from "react";
import { Form, Typography, Row, Col, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./Story/Story-styles";

const rowItem = {
  style: { margin: 0 } as CSSProperties,
};
const blockTitle = {
  style: { display: "block", marginTop: 10 } as CSSProperties,
};

export interface ColProps {
  title: string;
  fieldName: string;
  editor: React.ReactNode;
}

interface Props {
  title?: string;
  columns: ColProps[];
  fieldName: string;
}

const EditableTable: React.FC<Props> = ({ title, columns, fieldName }) => {
  return (
    <Form.List name={fieldName}>
      {(fields, { add, remove }) => (
        <div>
          {title && (
            <Typography.Title level={4} {...blockTitle}>
              {title}
            </Typography.Title>
          )}

          {fields.length > 0 && (
            <Row gutter={[2, 2]}>
              {columns.map((c) => (
                <Col flex="150px" key={c.title}>
                  <Typography.Text>{c.title}</Typography.Text>
                </Col>
              ))}
              <Col flex="20px"></Col>
            </Row>
          )}
          {fields.map((field) => (
            <Row key={field.name} gutter={[2, 2]}>
              {columns.map((c) => (
                <Col flex="150px" key={c.title}>
                  <Form.Item
                    {...rowItem}
                    name={[field.name, c.fieldName]}
                    rules={[{ required: true }]}
                  >
                    {c.editor}
                  </Form.Item>
                </Col>
              ))}
              <Col flex="20px">
                <MinusCircleOutlined
                  onClick={() => remove(field.name)}
                  {...{ style: styles.checklistDelete }}
                />
              </Col>
            </Row>
          ))}
          <Button
            {...{ style: { ...styles.addFlagButton, marginBottom: 10 } }}
            onClick={() => add()}
            type="dashed"
            icon={<PlusOutlined />}
          >
            Add
          </Button>
        </div>
      )}
    </Form.List>
  );
};

export default EditableTable;
