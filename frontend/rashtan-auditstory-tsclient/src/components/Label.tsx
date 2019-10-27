import React from "react";
import { Col, Row } from "antd";

interface Props {
  id: string;
  label: string;
  children: React.ReactNode;
}

const Label: React.FC<Props> = ({ id, label, children }) => {
  return (
    <Row>
      <Col>
        <label htmlFor={id} title={label}>
          {label}
        </label>
      </Col>
      <Col>{children}</Col>
    </Row>
  );
};

export default Label;
