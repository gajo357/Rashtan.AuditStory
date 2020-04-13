import React from "react";
import { Form, Input } from "antd";
import { CompanyCompetition } from "../../models/Company";
import StoryPartForm, { StoryPartProps, FormItem } from "./StoryPartForm";
import EditableTable, { ColumnInfo } from "../EditableTable";

const StoryCompetition: React.FC<StoryPartProps<CompanyCompetition>> = ({
  data,
  dataChanged,
}) => {
  const columns: ColumnInfo[] = [
    {
      title: "Name",
      key: "name",
      type: "text",
    },
    {
      title: "Market Cap",
      key: "marketCap",
      type: "number",
    },
    {
      title: "Market Share (%)",
      key: "marketShare",
      type: "number",
    },
  ];

  return (
    <StoryPartForm title="Competition" data={data} dataChanged={dataChanged}>
      <EditableTable
        title="Competitors"
        data={data.competitors}
        setData={(c) => dataChanged({ ...data, competitors: c })}
        columns={columns}
      />

      <FormItem label="Industry growth" name="industryGrowth">
        <Input placeholder="Industry growth comment" />
      </FormItem>

      <Form.Item label="Comment" name="comment">
        <Input.TextArea placeholder="Comment" rows={2} />
      </Form.Item>
    </StoryPartForm>
  );
};

export default StoryCompetition;
