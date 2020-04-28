import React from "react";
import { Form, Input, Typography, Button } from "antd";
import StoryPartForm, { StoryPartProps } from "./StoryPartForm";
import InputWithCurrency from "./InputWithCurrency";
import EditComment from "../SimpleEditors/EditComment";
import PieChart from "../PieChart";
import BarChart from "../BarChart";
import {
  RevenueDto,
  RevenueStreamDto,
  CurrencyUnit,
} from "../../models/Company";
import EditRichText from "../SimpleEditors/EditRichText";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "./Story-styles";

const chartStyle = { style: { display: "inline-block" } };

const createList = (currency: CurrencyUnit | undefined) => (
  <Form.List name="products">
    {(fields, { add, remove }) => (
      <div>
        <Typography.Title level={4}>What do they make?</Typography.Title>

        {fields.map((field) => (
          <div key={field.name}>
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              onClick={() => remove(field.name)}
            >
              Delete product
            </Button>
            <Form.Item
              label="Product"
              name={[field.name, "name"]}
              rules={[{ required: true }]}
            >
              <Input placeholder="Product" />
            </Form.Item>

            <Form.Item label={`Revenue`} name={[field.name, "revenue"]}>
              <InputWithCurrency placeholder="Revenue" currency={currency} />
            </Form.Item>
            <Form.Item label="Yield (%)" name={[field.name, "profit"]}>
              <Input placeholder="Profit" />
            </Form.Item>
            <Form.Item label="5-year growth (%)" name={[field.name, "growth"]}>
              <Input placeholder="Growth" />
            </Form.Item>

            <Form.Item label="Description" name={[field.name, "description"]}>
              <EditRichText placeholder="Description" />
            </Form.Item>
          </div>
        ))}
        <Button
          {...{ style: { ...styles.addFlagButton, marginBottom: 10 } }}
          onClick={() => add()}
          type="dashed"
          icon={<PlusOutlined />}
        >
          Add
        </Button>
      </div>
    )}
  </Form.List>
);

const createCharts = (data: RevenueStreamDto[]) => {
  return (
    <span>
      {createValueChart(data)}
      {createProfitChart(data)}
    </span>
  );
};

const createValueChart = (data: RevenueStreamDto[]) => {
  const filtered = data.filter((c) => c && c.name && c.revenue);
  return (
    filtered.length > 1 && (
      <PieChart
        data={filtered}
        xField="name"
        yField="revenue"
        {...chartStyle}
      />
    )
  );
};

const createProfitChart = (data: RevenueStreamDto[]) => {
  const filtered = data.filter((c) => c && c.name && c.profit);
  return (
    filtered.length > 1 && (
      <BarChart
        data={filtered}
        xField="name"
        yField="profit"
        xTitle="Product"
        yTitle="Yeild (%)"
        {...chartStyle}
      />
    )
  );
};

const StoryRevenue: React.FC<StoryPartProps<RevenueDto>> = ({
  value,
  onChange,
  currency,
}) => {
  return (
    <StoryPartForm title="Products" value={value} onChange={onChange}>
      <Form.Item label="Introduction" name="intro">
        <EditRichText placeholder="Intro, sources of" />
      </Form.Item>

      <Form.Item label="Total revenue" name="totalRevenue">
        <InputWithCurrency placeholder="Total revenue" currency={currency} />
      </Form.Item>

      {createList(currency)}
      {createCharts(value.products)}

      <Form.Item label="Comment" name="comment">
        <EditComment />
      </Form.Item>
    </StoryPartForm>
  );
};

export default StoryRevenue;
