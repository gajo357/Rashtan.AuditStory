import React from "react";
import { Typography, Layout, Row, Col } from "antd";

const Footer: React.FC = () => (
  <Layout.Footer>
    <Row>
      <Col sm={6} xs={1} style={{ textAlign: "left" }}>
        <Typography.Paragraph>© 2019 Rashtan</Typography.Paragraph>
      </Col>
      <Col sm={2} xs={1} style={{ textAlign: "right" }}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/gajo357/Rashtan.AuditStory"
        >
          Github
        </a>
      </Col>
    </Row>
  </Layout.Footer>
);

export default Footer;
