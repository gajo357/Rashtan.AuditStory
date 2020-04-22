import React from "react";
import { Form, Input, Typography, Row, Col, InputNumber, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import StoryPartForm, { StoryPartProps } from "./StoryPartForm";
import EditComment from "../SimpleEditors/EditComment";
import { CompanyCompetition, UnitOfSize } from "../../models/Company";
import styles from "./Story-styles";

const StoryCompetition: React.FC<StoryPartProps<CompanyCompetition>> = ({
  value,
  onChange,
  currency,
}) => {
  return (
    <StoryPartForm title="Competition" value={value} onChange={onChange}>
      <Form.List name="competitors">
        {(fields, { add, remove }) => (
          <div>
            {fields.length > 0 && (
              <Row gutter={[2, 2]}>
                <Col span={8}>
                  <Typography.Text>Name</Typography.Text>
                </Col>
                <Col span={6}>
                  <Typography.Text>
                    Market Cap{" "}
                    {currency
                      ? ` (${UnitOfSize[currency.unit]} ${currency.currency})`
                      : ""}
                  </Typography.Text>
                </Col>
                <Col span={6}>
                  <Typography.Text>Market Share (%) </Typography.Text>
                </Col>
                <Col span={2}></Col>
              </Row>
            )}
            {fields.map((field) => (
              <Row key={field.name} style={styles.revenueRow}>
                <Col span={8}>
                  <Form.Item
                    style={styles.revenueRowItem}
                    name={[field.name, "name"]}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    style={styles.revenueRowItem}
                    name={[field.name, "marketCap"]}
                    rules={[{ required: true }]}
                  >
                    <InputNumber placeholder="Market Cap" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    style={styles.revenueRowItem}
                    name={[field.name, "marketShare"]}
                    rules={[{ required: true }]}
                  >
                    <InputNumber placeholder="share %" />
                  </Form.Item>
                </Col>
                <Col span={2}>
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

      <Form.Item label="Industry growth" name="industryGrowth">
        <Input placeholder="Industry growth comment" />
      </Form.Item>

      <Form.Item label="Comment" name="comment">
        <EditComment />
      </Form.Item>
    </StoryPartForm>
  );
};

export default StoryCompetition;
