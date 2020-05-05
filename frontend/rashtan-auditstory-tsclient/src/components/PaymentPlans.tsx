import React from "react";
import { Typography, Row, Col, Card } from "antd";
import { StarFilled } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import { ColProps } from "antd/lib/col";
import { CardProps } from "antd/lib/card";
import PaypalButton from "./PaypalButton";

const colProps = {
  style: { minWidth: 150, textAlign: "center" },
} as ColProps;

const cardProps = {
  style: { minHeight: 350 },
} as CardProps;

interface Props {}

const PaymentPlans: React.FC<Props> = () => {
  return (
    <React.Fragment>
      <Row gutter={16} justify="center">
        <Col {...colProps}>
          <Card {...cardProps}>
            <Meta title="Monthly" description="Start easy" />
            <Typography.Title level={2}>$10</Typography.Title>
            <Typography.Paragraph strong>per month</Typography.Paragraph>
            <Typography.Paragraph>All features included</Typography.Paragraph>
            <Typography.Paragraph>Support</Typography.Paragraph>
            <PaypalButton buttonId="RAJX4R447E5DJ" />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card {...cardProps}>
            <Meta
              title="Annual"
              description="50% discount"
              avatar={<StarFilled style={{ color: "gold", fontSize: 24 }} />}
            />
            <Typography.Title level={2}>$60</Typography.Title>
            <Typography.Paragraph strong>per year</Typography.Paragraph>
            <Typography.Paragraph>All features included</Typography.Paragraph>
            <Typography.Paragraph>Support</Typography.Paragraph>
            <Typography.Paragraph strong>
              60 days Money Back Guarantee
            </Typography.Paragraph>
            <PaypalButton buttonId="7L4Q6GTWLV36Q" />
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PaymentPlans;
