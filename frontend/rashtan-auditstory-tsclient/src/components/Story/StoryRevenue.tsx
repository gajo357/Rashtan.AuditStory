import React from "react";
import { Form, Input, InputNumber, Typography, Row, Col, Button } from "antd";
import { CompanyStoryRevenue } from "../../models/Company";
import StoryPartForm, { StoryPartProps, FormItem } from "./StoryPartForm";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./Story-styles";

const createList = (fieldName: string, title: string, streamName: string) => (
  <Form.List name={fieldName}>
    {(fields, { add, remove }) => (
      <div>
        <Typography.Text strong style={styles.revenueBlockTitle}>
          Revenue by {title}
        </Typography.Text>
        {fields.map((field) => (
          <Row key={field.name} style={styles.revenueRow}>
            <Col>
              <Form.Item
                style={styles.revenueRowItem}
                name={[field.name, "stream"]}
                label={streamName}
                rules={[{ required: true }]}
              >
                <Input placeholder={streamName} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                style={{ ...styles.revenueRowItem, marginLeft: 10 }}
                name={[field.name, "percent"]}
                label="Percent"
                rules={[{ required: true }]}
              >
                <InputNumber placeholder="Enter pecent" />
              </Form.Item>
            </Col>
            <Col>
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
          Add {title}
        </Button>
      </div>
    )}
  </Form.List>
);

const StoryRevenue: React.FC<StoryPartProps<CompanyStoryRevenue>> = ({
  data,
  dataChanged,
}) => {
  return (
    <StoryPartForm
      title="Revenue Streams"
      data={data}
      dataChanged={dataChanged}
    >
      <FormItem label="Total revenue" name="totalRevenue">
        <InputNumber placeholder="Total revenue" min={1} />
      </FormItem>

      {createList("byLocation", "location", "Location (country, state...)")}

      {createList("byClient", "client", "Client name")}

      {createList("byProduct", "product", "Product name")}

      <Form.Item label="Comment" name="comment">
        <Input.TextArea placeholder="Comment" rows={2} />
      </Form.Item>
    </StoryPartForm>
  );
};

export default StoryRevenue;
