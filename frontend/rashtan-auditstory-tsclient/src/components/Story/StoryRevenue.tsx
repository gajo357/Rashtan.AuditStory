import React from "react";
import { Form, Input, InputNumber } from "antd";
import StoryPartForm, { StoryPartProps } from "./StoryPartForm";
import InputWithCurrency from "./InputWithCurrency";
import EditComment from "../SimpleEditors/EditComment";
import EditableTable from "../EditableTable";
import PieChart from "../PieChart";
import BarChart from "../BarChart";
import { CompanyStoryRevenue, Revenue } from "../../models/Company";

const createList = (fieldName: string, title: string, streamName: string) => (
  <EditableTable
    title={title}
    fieldName={fieldName}
    columns={[
      {
        title: streamName,
        fieldName: "stream",
        editor: <Input placeholder={streamName} />,
      },
      {
        title: "Amount or percent",
        fieldName: "value",
        editor: <InputNumber placeholder="Value" />,
      },
      {
        title: "Profitability",
        fieldName: "profit",
        editor: <InputNumber placeholder="Profit" />,
      },
    ]}
  />
);

const chartStyle = { style: { display: "inline-block" } };
const createCharts = (data: Revenue[], streamName: string) => {
  return (
    <span>
      {createValueChart(data)}
      {createProfitChart(data, streamName)}
    </span>
  );
};

const createValueChart = (data: Revenue[]) => {
  const filtered = data.filter((c) => c && c.stream && c.value);
  return (
    filtered.length > 0 && (
      <PieChart
        data={filtered}
        xField="stream"
        yField="value"
        {...chartStyle}
      />
    )
  );
};

const createProfitChart = (data: Revenue[], streamName: string) => {
  const filtered = data.filter((c) => c && c.stream && c.profit);
  return (
    filtered.length > 0 && (
      <BarChart
        data={filtered}
        xField="stream"
        yField="profit"
        xTitle={streamName}
        yTitle="Profitability"
        {...chartStyle}
      />
    )
  );
};

const StoryRevenue: React.FC<StoryPartProps<CompanyStoryRevenue>> = ({
  value,
  onChange,
  currency,
}) => {
  return (
    <StoryPartForm title="Revenue Streams" value={value} onChange={onChange}>
      <Form.Item label="Total revenue" name="totalRevenue">
        <InputWithCurrency placeholder="Total revenue" currency={currency} />
      </Form.Item>

      {createList("byProduct", "What do they make?", "Product name")}
      {createCharts(value.byProduct, "Product name")}
      {createList(
        "byLocation",
        "Where do they sell their products?",
        "Country, state..."
      )}
      {createCharts(value.byLocation, "Country, state...")}
      {createList(
        "byClient",
        "Who do they sell their products to?",
        "Client name"
      )}
      {createCharts(value.byClient, "Client name")}

      <Form.Item label="Comment" name="comment">
        <EditComment />
      </Form.Item>
    </StoryPartForm>
  );
};

export default StoryRevenue;
