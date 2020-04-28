import React from "react";
import { Form, Input, Button } from "antd";
import StoryPartForm, { StoryPartProps } from "./StoryPartForm";
import EditComment from "../SimpleEditors/EditComment";
import BarChart from "../BarChart";
import PieChart from "../PieChart";
import { CompetitionDto } from "../../models/Company";
import { currencyString } from "../../models/Helpers";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "./Story-styles";
import InputWithCurrency from "./InputWithCurrency";

const StoryCompetition: React.FC<StoryPartProps<CompetitionDto>> = ({
  value,
  onChange,
  currency,
}) => {
  const marketCapTitle = `Market Cap${currencyString(currency)}`;

  const chartDataCap = value.competitors.filter(
    (c) => c && c.name && c.marketCap
  );
  const chartDataRevenue = value.competitors.filter(
    (c) => c && c.name && c.revenue
  );
  const chartDataMargin = value.competitors.filter(
    (c) => c && c.name && c.margin
  );

  const chartStyle = { style: { display: "inline-block" } };

  return (
    <StoryPartForm title="Competition" value={value} onChange={onChange}>
      <Form.List name="competitors">
        {(fields, { add, remove }) => (
          <div>
            {fields.map((field) => (
              <div key={field.name} style={styles.revenueItem}>
                <Button
                  type="danger"
                  icon={<DeleteOutlined />}
                  onClick={() => remove(field.name)}
                >
                  Delete
                </Button>
                <Form.Item
                  label="Name"
                  name={[field.name, "name"]}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Company name" />
                </Form.Item>

                <Form.Item label="Market Cap" name={[field.name, "marketCap"]}>
                  <InputWithCurrency
                    placeholder="Market Cap"
                    currency={currency}
                  />
                </Form.Item>
                <Form.Item label="Revenue" name={[field.name, "revenue"]}>
                  <InputWithCurrency
                    placeholder="Revenue"
                    currency={currency}
                  />
                </Form.Item>
                <Form.Item label="Op Margin (%)" name={[field.name, "margin"]}>
                  <Input placeholder="Operating Margin" />
                </Form.Item>
              </div>
            ))}

            <Button
              {...{ style: { ...styles.addFlagButton, marginBottom: 10 } }}
              onClick={() => add()}
              type="dashed"
              icon={<PlusOutlined />}
            >
              Add competitor
            </Button>
          </div>
        )}
      </Form.List>
      <span>
        {chartDataCap.length > 1 && (
          <BarChart
            data={chartDataCap}
            xField="name"
            yField="marketCap"
            xTitle="Name"
            yTitle={marketCapTitle}
            {...chartStyle}
          />
        )}
        {chartDataRevenue.length > 1 && (
          <PieChart
            data={chartDataRevenue}
            xField="name"
            yField="revenue"
            {...chartStyle}
          />
        )}
        {chartDataMargin.length > 1 && (
          <BarChart
            data={chartDataMargin}
            xField="name"
            yField="margin"
            xTitle="Name"
            yTitle="Operating Margin (%)"
            {...chartStyle}
          />
        )}
      </span>

      <Form.Item label="Comment" name="comment">
        <EditComment />
      </Form.Item>
    </StoryPartForm>
  );
};

export default StoryCompetition;
