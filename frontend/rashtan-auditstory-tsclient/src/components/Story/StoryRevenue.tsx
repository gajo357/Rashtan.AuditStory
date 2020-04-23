import React from "react";
import { Form, Input, InputNumber } from "antd";
import StoryPartForm, { StoryPartProps } from "./StoryPartForm";
import InputWithCurrency from "./InputWithCurrency";
import EditComment from "../SimpleEditors/EditComment";
import EditableTable from "../EditableTable";
import PieChart from "../PieChart";
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
        title: "Value",
        fieldName: "value",
        editor: <InputNumber placeholder="Value" />,
      },
    ]}
  />
);

const createPieChart = (data: Revenue[]) => {
  const filtered = data.filter((c) => c && c.stream && c.value);
  return (
    filtered.length > 0 && (
      <PieChart data={filtered} xField="stream" yField="value" />
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
      {createPieChart(value.byProduct)}
      {createList("byLocation", "Where do they sell it?", "Ccountry, state...")}
      {createPieChart(value.byLocation)}
      {createList("byClient", "Who do they sell it to?", "Client name")}
      {createPieChart(value.byClient)}

      <Form.Item label="Comment" name="comment">
        <EditComment />
      </Form.Item>
    </StoryPartForm>
  );
};

export default StoryRevenue;
