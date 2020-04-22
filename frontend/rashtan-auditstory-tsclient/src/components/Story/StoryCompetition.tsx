import React from "react";
import { Form, Input, InputNumber } from "antd";
import StoryPartForm, { StoryPartProps } from "./StoryPartForm";
import EditComment from "../SimpleEditors/EditComment";
import EditableTable from "../EditableTable";
import { CompanyCompetition, UnitOfSize } from "../../models/Company";

const StoryCompetition: React.FC<StoryPartProps<CompanyCompetition>> = ({
  value,
  onChange,
  currency,
}) => {
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
            title: `Market Cap ${
              currency
                ? ` (${UnitOfSize[currency.unit]} ${currency.currency})`
                : ""
            }}`,
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

      <Form.Item label="Industry growth" name="industryGrowth">
        <Input placeholder="Industry growth comment" />
      </Form.Item>

      <Form.Item label="Comment" name="comment">
        <EditComment />
      </Form.Item>
    </StoryPartForm>
  );
};

export default StoryCompetition;
