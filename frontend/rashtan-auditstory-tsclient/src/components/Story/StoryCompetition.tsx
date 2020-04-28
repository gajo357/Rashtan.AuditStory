import React from "react";
import { Form, Input, InputNumber } from "antd";
import StoryPartForm, { StoryPartProps } from "./StoryPartForm";
import EditComment from "../SimpleEditors/EditComment";
import EditableTable from "../EditableTable";
import BarChart from "../BarChart";
import PieChart from "../PieChart";
import { CompanyCompetition } from "../../models/Company";
import { currencyString } from "../../models/Helpers";

const StoryCompetition: React.FC<StoryPartProps<CompanyCompetition>> = ({
  value,
  onChange,
  currency,
}) => {
  const marketCapTitle = `Market Cap ${currencyString(currency)}`;

  const chartDataCap = value.competitors.filter(
    (c) => c && c.name && c.marketCap
  );
  const chartDataShare = value.competitors.filter(
    (c) => c && c.name && c.marketShare
  );

  const chartStyle = { style: { display: "inline-block" } };

  return (
    <StoryPartForm title="Competition" value={value} onChange={onChange}>
      <EditableTable
        fieldName="competitors"
        columns={[
          {
            title: "Name",
            fieldName: "name",
            editor: <Input placeholder="Name" />,
          },
          {
            title: marketCapTitle,
            fieldName: "marketCap",
            editor: <InputNumber placeholder="Market Cap" />,
          },
          {
            title: "Market Share (%)",
            fieldName: "marketShare",
            editor: <InputNumber placeholder="Market Share (%)" />,
          },
        ]}
      />
      <span>
        {chartDataCap.length > 0 && (
          <BarChart
            data={chartDataCap}
            xField="name"
            yField="marketCap"
            xTitle="Name"
            yTitle={marketCapTitle}
            {...chartStyle}
          />
        )}
        {chartDataShare.length > 0 && (
          <PieChart
            data={chartDataShare}
            xField="name"
            yField="marketShare"
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
