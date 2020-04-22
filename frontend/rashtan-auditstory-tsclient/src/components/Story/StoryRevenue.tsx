import React from "react";
import { Form, Input, InputNumber } from "antd";
import StoryPartForm, { StoryPartProps } from "./StoryPartForm";
import InputWithCurrency from "./InputWithCurrency";
import EditComment from "../SimpleEditors/EditComment";
import EditableTable from "../EditableTable";
import { CompanyStoryRevenue } from "../../models/Company";

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
        title: "Percent",
        fieldName: "percent",
        editor: <InputNumber placeholder="Percent" />,
      },
    ]}
  />
);

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
      {createList(
        "byLocation",
        "Where do they make it?",
        "Location (country, state...)"
      )}
      {createList("byClient", "Who do they sell it to?", "Client name")}

      <Form.Item label="Comment" name="comment">
        <EditComment />
      </Form.Item>
    </StoryPartForm>
  );
};

export default StoryRevenue;
