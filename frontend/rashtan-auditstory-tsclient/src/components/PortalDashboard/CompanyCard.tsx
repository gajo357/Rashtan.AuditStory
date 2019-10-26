import React from "react";
import { Button, Card, Typography, Col } from "antd";
import { CompanyProfile } from "../../models/Company";
import { History } from "history";

const { Meta } = Card;

interface Props {
  company: CompanyProfile;
  history: History;
}

const CompanyCard: React.FC<Props> = ({
  company: { id, name, website },
  history
}) => {
  const editStory = () => {
    history.push(`/story/${id}`);
  };

  return (
    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
      <Card
        actions={[
          <Button size="small" color="primary" onClick={editStory}>
            Edit
          </Button>
        ]}
        cover={
          <img
            alt="example"
            src="https://source.unsplash.com/random"
            onClick={editStory}
          />
        }
      >
        <Meta
          title={name}
          description={
            <Typography>
              <Typography.Title>{name}</Typography.Title>
              <Typography.Paragraph>{website}</Typography.Paragraph>
            </Typography>
          }
        />
      </Card>
    </Col>
  );
};

export default CompanyCard;
