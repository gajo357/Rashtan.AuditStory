import React from "react";
import { Button, Typography, Card, Row, Col, Icon } from "antd";
import { PricingTier } from "../../models/PricingOption";
import IApiService from "../../services/IApiService";
import { showError } from "../../models/Errors";

const { Meta } = Card;

interface Props {
  apiService: IApiService;
  tierSelected: (s: PricingTier) => void;
}

const Pricing: React.FC<Props> = ({ tierSelected, apiService }) => {
  const [tiers, setTiers] = React.useState<PricingTier[]>([]);
  React.useEffect(() => {
    apiService
      .getPricingTiers()
      .then(setTiers)
      .catch(showError);
  }, [apiService]);

  return (
    <React.Fragment>
      <Typography.Title level={1}>Pricing</Typography.Title>

      <Row type="flex" justify="center">
        {tiers.map(tier => (
          <Col key={tier.title} xs={12} sm={6} md={4}>
            <Card
              actions={[
                <Button type="primary" onClick={() => tierSelected(tier)}>
                  {tier.buttonText}
                </Button>
              ]}
            >
              <Meta
                title={tier.title}
                description={tier.subheader}
                avatar={tier.star ? <Icon type="star" /> : null}
              />
              <>
                <Typography.Title level={2}>${tier.amount}</Typography.Title>
                <Typography.Paragraph>
                  /{tier.title === "Yearly" ? "year" : "month"}
                </Typography.Paragraph>
              </>
              <ul>
                {tier.description.map(line => (
                  <Typography.Paragraph key={line}>{line}</Typography.Paragraph>
                ))}
              </ul>
            </Card>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default Pricing;
