import React from "react";
import { Form, Input, InputNumber } from "antd";
import { CompanyStoryRevenue, Revenue } from "../../models/Company";
import StoryPartWrap, { StoryPartBasicProps, FormItem } from "./StoryPartWrap";
import EditableTable, { ColumnInfo } from "./../EditableTable";

const StoryRevenue: React.FC<StoryPartBasicProps<CompanyStoryRevenue>> = ({
  data,
  dataChanged,
}) => {
  const createItems = (
    title: string,
    streamColumn: string,
    revenues: Revenue[],
    createData: (value: Revenue[]) => CompanyStoryRevenue
  ) => {
    const columns: ColumnInfo[] = [
      {
        title: streamColumn,
        key: "stream",
        type: "text",
      },
      {
        title: "Percent",
        key: "percent",
        type: "number",
      },
    ];

    return (
      <EditableTable
        title={title}
        data={revenues}
        setData={(c) => dataChanged(createData(c))}
        columns={columns}
      />
    );
  };

  return (
    <>
      <FormItem label="Total revenue" name="totalRevenue">
        <InputNumber placeholder="Total revenue" min={1} />
      </FormItem>
      {createItems(
        "Revenue by locations",
        "Location (country, state...)",
        data.byLocation,
        (v) => ({
          ...data,
          byLocation: v,
        })
      )}
      {createItems("Revenue by client", "Client name", data.byClient, (v) => ({
        ...data,
        byClient: v,
      }))}
      {createItems(
        "Revenue by product",
        "Product name",
        data.byProduct,
        (v) => ({
          ...data,
          byProduct: v,
        })
      )}
      <Form.Item label="Comment" name="comment">
        <Input.TextArea placeholder="Comment" rows={2} />
      </Form.Item>
    </>
  );
};

export default StoryPartWrap(StoryRevenue);
