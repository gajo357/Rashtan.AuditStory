import React from "react";
import { Form, Input, InputNumber, Typography, Row, Col, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import StoryPartForm, { StoryPartProps } from "./StoryPartForm";
import InputWithCurrency from "./InputWithCurrency";
import EditComment from "../SimpleEditors/EditComment";
import { CompanyStoryRevenue } from "../../models/Company";
import styles from "./Story-styles";

const createList = (fieldName: string, title: string, streamName: string) => (
  <Form.List name={fieldName}>
    {(fields, { add, remove }) => (
      <div>
        <Typography.Title level={4} style={styles.revenueBlockTitle}>
          {title}
        </Typography.Title>
        {fields.length > 0 && (
          <Row gutter={[2, 2]}>
            <Col span={12}>
              <Typography.Text>{streamName}</Typography.Text>
            </Col>
            <Col span={8}>
              <Typography.Text>Percent</Typography.Text>
            </Col>
            <Col span={4}></Col>
          </Row>
        )}
        {fields.map((field) => (
          <Row key={field.name} gutter={[2, 2]}>
            <Col span={12}>
              <Form.Item
                style={styles.revenueRowItem}
                name={[field.name, "stream"]}
                rules={[{ required: true }]}
              >
                <Input placeholder={streamName} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                style={styles.revenueRowItem}
                name={[field.name, "percent"]}
                rules={[{ required: true }]}
              >
                <InputNumber placeholder="Enter pecent" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <MinusCircleOutlined
                onClick={() => remove(field.name)}
                style={styles.checklistDelete}
              />
            </Col>
          </Row>
        ))}
        <Button
          style={{ ...styles.addFlagButton, marginBottom: 10 }}
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

const StoryRevenue: React.FC<StoryPartProps<CompanyStoryRevenue>> = ({
  value,
  onChange,
  currency,
}) => {
  return (
    <StoryPartForm title="Revenue Streams" value={value} onChange={onChange}>
      <Form.Item label="Total revenue" name="totalRevenue">
        <InputWithCurrency placeholder="Total revenue" currency={currency} />
      </Form.Item>

      {createList("byProduct", "What do they make?", "Product name")}
      {createList(
        "byLocation",
        "Where do they make it?",
        "Location (country, state...)"
      )}
      {createList("byClient", "Who do they sell it to?", "Client name")}

      <Form.Item label="Comment" name="comment">
        <EditComment />
      </Form.Item>
    </StoryPartForm>
  );
};

export default StoryRevenue;
