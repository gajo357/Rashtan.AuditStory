import React from "react";
import { Form, Input, Typography, Row, Col, InputNumber, Button } from "antd";
import { CompanyCompetition } from "../../models/Company";
import StoryPartForm, { StoryPartProps, FormItem } from "./StoryPartForm";
import styles from "./Story-styles";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const StoryCompetition: React.FC<StoryPartProps<CompanyCompetition>> = ({
  data,
  dataChanged,
}) => {
  return (
    <StoryPartForm title="Competition" data={data} dataChanged={dataChanged}>
      <Form.List name="competitors">
        {(fields, { add, remove }) => (
          <div>
            <Typography.Text strong style={styles.revenueBlockTitle}>
              Competitors
            </Typography.Text>
            {fields.map((field) => (
              <Row key={field.name} style={styles.revenueRow}>
                <Col>
                  <Form.Item
                    style={styles.revenueRowItem}
                    name={[field.name, "name"]}
                    label="Name"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    style={{ ...styles.revenueRowItem, marginLeft: 10 }}
                    name={[field.name, "marketCap"]}
                    label="Market Cap"
                    rules={[{ required: true }]}
                  >
                    <InputNumber placeholder="Market Cap" />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    style={{ ...styles.revenueRowItem, marginLeft: 10 }}
                    name={[field.name, "marketShare"]}
                    label="Market Share (%)"
                    rules={[{ required: true }]}
                  >
                    <InputNumber placeholder="share %" />
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
              Add competitor
            </Button>
          </div>
        )}
      </Form.List>

      <FormItem label="Industry growth" name="industryGrowth">
        <Input placeholder="Industry growth comment" />
      </FormItem>

      <Form.Item label="Comment" name="comment">
        <Input.TextArea placeholder="Comment" rows={2} />
      </Form.Item>
    </StoryPartForm>
  );
};

export default StoryCompetition;
