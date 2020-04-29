import React from "react";
import EditNumber from "../SimpleEditors/EditNumber";
import { Row, Col, Form } from "antd";
import EditCagr from "../SimpleEditors/EditCagr";
import { GrowthDto } from "../../models/Company";

interface Props {
  value?: GrowthDto;
  onChange?: (value: GrowthDto) => void;
  placeholder?: string;
}

const InputWithCurrency: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
}) => (
  <Row gutter={[5, 0]}>
    <Col flex={1}>
      <Form.Item label="Margin">
        <EditNumber
          value={value?.margin}
          onChange={(margin) =>
            onChange &&
            onChange(value ? { ...value, margin } : { margin, growth: 0 })
          }
          placeholder={placeholder}
          prefix="%"
        />
      </Form.Item>
    </Col>
    <Col flex={1}>
      <Form.Item label="5-year growth">
        <EditCagr
          value={value?.growth}
          onChange={(growth) =>
            onChange &&
            onChange(value ? { ...value, growth } : { margin: 0, growth })
          }
          placeholder="5-year growth"
        />
      </Form.Item>
    </Col>
  </Row>
);

export default InputWithCurrency;
