import React, { useState, useEffect } from "react";
import {
  Input,
  InputNumber,
  Button,
  Divider,
  Table,
  Drawer,
  Typography,
  Form
} from "antd";
import { CompanyStoryRevenue, Revenue } from "../../models/Company";
import StoryPartWrap, { WithStoryPartProps } from "./StoryPartWrap";
import RevenueEdit, { RevenueEditProps } from "./RevenueEdit";
import {
  addElement,
  replaceElement,
  removeElement
} from "../../models/ArrayUpdate";

const StoryRevenue: React.FC<WithStoryPartProps<CompanyStoryRevenue>> = ({
  data,
  dataChanged,
  getFieldDecorator,
  setFieldsValue
}) => {
  useEffect(setFieldsValue, []);

  const [revenueEdit, setRevenueEdit] = useState<RevenueEditProps | undefined>(
    undefined
  );
  const onCancel = () => setRevenueEdit(undefined);

  const createItems = (
    title: string,
    streamColumn: string,
    revenues: Revenue[],
    createData: (value: Revenue[]) => CompanyStoryRevenue
  ) => {
    const columns = [
      {
        title: streamColumn,
        dataIndex: "stream",
        key: "stream"
      },
      {
        title: "Percent",
        dataIndex: "percent",
        key: "percent"
      },
      {
        title: "",
        key: "edit",
        render: (_: string, record: Revenue) => (
          <span>
            <Button
              onClick={_ => {
                setRevenueEdit({
                  data: record,
                  onSave: (d: Revenue) => {
                    const c = replaceElement(revenues, record, d);
                    dataChanged(createData(c));
                    onCancel();
                  },
                  onCancel: onCancel,
                  streamName: streamColumn
                });
              }}
            >
              Edit
            </Button>
            <Divider type="vertical" />
            <Button
              onClick={_ => {
                const c = removeElement(revenues, record);
                dataChanged(createData(c));
              }}
            >
              Delete
            </Button>
          </span>
        )
      }
    ];

    const handleAdd = () => {
      setRevenueEdit({
        data: { stream: "", percent: 0 },
        onSave: (d: Revenue) => {
          const c = addElement(revenues, d);
          dataChanged(createData(c));
          onCancel();
        },
        onCancel: onCancel,
        streamName: streamColumn
      });
    };

    return (
      <Form.Item>
        <Typography.Title level={4}>{title}</Typography.Title>
        <Button onClick={handleAdd} style={{ marginBottom: 16 }} icon="plus">
          Add revenue stream
        </Button>
        {revenues.length > 0 && (
          <Table columns={columns} dataSource={revenues} />
        )}
      </Form.Item>
    );
  };

  return (
    <>
      <Form.Item label="Total revenue">
        {getFieldDecorator("totalRevenue")(
          <InputNumber placeholder="Total revenue" min={1} />
        )}
      </Form.Item>
      {createItems(
        "Revenue by locations",
        "Location (country, state...)",
        data.byLocation,
        v => ({
          ...data,
          byLocation: v
        })
      )}
      {createItems("Revenue by client", "Client name", data.byClient, v => ({
        ...data,
        byClient: v
      }))}
      {createItems("Revenue by product", "Product name", data.byProduct, v => ({
        ...data,
        byProduct: v
      }))}
      <Form.Item label="Comment">
        {getFieldDecorator("comment")(<Input placeholder="Comment" />)}
      </Form.Item>
      {revenueEdit && (
        <Drawer title="Edit revenue stream" visible>
          <RevenueEdit {...revenueEdit} />
        </Drawer>
      )}
    </>
  );
};

export default StoryPartWrap(StoryRevenue);
