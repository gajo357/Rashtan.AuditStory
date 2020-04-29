import React from "react";
import { Form } from "antd";
import StoryPartForm, { StoryPartProps } from "./StoryPartForm";
import EditComment from "../SimpleEditors/EditComment";
import GrowthEdit from "./GrowthEdit";
import { ProfitabilityDto } from "../../models/Company";
import EditCagr from "../SimpleEditors/EditCagr";
import EditNumber from "../SimpleEditors/EditNumber";

const StoryProfit: React.FC<StoryPartProps<ProfitabilityDto>> = ({
  value,
  onChange,
}) => (
  <StoryPartForm title="Profitability" value={value} onChange={onChange}>
    <Form.Item label="ROE (%)" name="roe">
      <EditNumber placeholder="ROE" prefix="%" />
    </Form.Item>
    <Form.Item label="ROIC" name="roic">
      <EditNumber placeholder="ROIC" prefix="%" />
    </Form.Item>
    <Form.Item label="Debt over Earnings" name="debt">
      <EditNumber placeholder="Debt over Earnings" />
    </Form.Item>

    <Form.Item label="5-year Sales growth" name="salesGrowth">
      <EditCagr placeholder="5-year Sales growth" />
    </Form.Item>
    <Form.Item label="5-year Book value growth" name="bookGrowth">
      <EditCagr placeholder="5-year Book value growth" />
    </Form.Item>

    <Form.Item label="EBIT" name="ebit">
      <GrowthEdit placeholder="Earnings" />
    </Form.Item>
    <Form.Item label="FCF" name="fcf">
      <GrowthEdit placeholder="Free Cash Flow" />
    </Form.Item>
    <Form.Item label="Operating Cash" name="opc">
      <GrowthEdit placeholder="Operating Cash" />
    </Form.Item>

    <Form.Item label="Comment" name="comment">
      <EditComment />
    </Form.Item>
  </StoryPartForm>
);

export default StoryProfit;
