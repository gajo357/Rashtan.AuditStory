import React from "react";
import { Button, Card, Typography, Col } from "antd";
import { CompanyProfile } from "../../models/CompanyProfile";
import { History } from "history";

const { Meta } = Card;

interface Props {
  company: CompanyProfile;
  history: History;
}

const CompanyCard: React.FC<Props> = ({
  company: { ticker, name },
  history
}) => {
  const editStory = () => {
    history.push(`/story/${ticker}`);
  };

  return (
    <Col key={ticker} xs={12} sm={6} md={4}>
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
              <Typography.Title>
                {name} ({ticker})
              </Typography.Title>
              <Typography>
                This is a media card. You can use this section to describe the
                content.
              </Typography>
            </Typography>
          }
        />
      </Card>
    </Col>
  );
};

export default CompanyCard;
