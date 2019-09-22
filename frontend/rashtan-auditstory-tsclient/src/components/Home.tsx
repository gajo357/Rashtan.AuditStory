import React from "react";
import { Button, Row, Col, Typography } from "antd";

const Home: React.FC = () => (
  <div style={{ padding: "10px 8%", fontSize: "15px" }}>
    <Row>
      <Col sm={12} xs={12} style={{ textAlign: "center" }}>
        <br />
        <Typography.Title level={2}>Audit Story</Typography.Title>
        <Typography.Paragraph>
          Open source web app (MIT License) to publish documentation and books.
        </Typography.Paragraph>
        <Typography.Paragraph style={{ textAlign: "center" }}>
          <Button
            href="https://github.com/gajo357/Rashtan.AuditStory"
            target="_blank"
            color="secondary"
          >
            Github
          </Button>
        </Typography.Paragraph>
      </Col>
    </Row>
  </div>
);

export default Home;
