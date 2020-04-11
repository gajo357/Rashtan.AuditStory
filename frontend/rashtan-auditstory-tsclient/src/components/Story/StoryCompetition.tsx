import React, { useState, useEffect } from "react";
import { Drawer, Input, Table, Button, Divider, Form } from "antd";
import { CompanyCompetition, CompanyCompetitor } from "../../models/Company";
import StoryPartWrap, { WithStoryPartProps, FormItem } from "./StoryPartWrap";
import CompanyCompetitorEdit, {
  CompanyCompetitorEditProps,
} from "./CompanyCompetitorEdit";
import {
  addElement,
  replaceElement,
  removeElement,
} from "../../models/ArrayUpdate";

const StoryCompetition: React.FC<WithStoryPartProps<CompanyCompetition>> = ({
  data,
  dataChanged,
  getFieldDecorator,
  setFieldsValue,
}) => {
  useEffect(setFieldsValue, []);

  const [competitorEdit, setCompetitorEdit] = useState<
    CompanyCompetitorEditProps | undefined
  >(undefined);

  const onCancel = () => setCompetitorEdit(undefined);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Market Cap",
      dataIndex: "marketCap",
      key: "marketCap",
    },
    {
      title: "Market Share (%)",
      dataIndex: "marketShare",
      key: "marketShare",
    },
    {
      title: "",
      key: "edit",
      render: (_: string, record: CompanyCompetitor) => (
        <span>
          <Button
            onClick={(_) => {
              setCompetitorEdit({
                data: record,
                onSave: (d: CompanyCompetitor) => {
                  const c = replaceElement(data.competitors, record, d);
                  dataChanged({ ...data, competitors: c });
                  onCancel();
                },
                onCancel: onCancel,
              });
            }}
          >
            Edit
          </Button>
          <Divider type="vertical" />
          <Button
            onClick={(_) => {
              const c = removeElement(data.competitors, record);
              dataChanged({ ...data, competitors: c });
            }}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const handleAdd = () => {
    setCompetitorEdit({
      data: { name: "", marketCap: 0, marketShare: 0 },
      onSave: (d: CompanyCompetitor) => {
        const c = addElement(data.competitors, d);
        dataChanged({ ...data, competitors: c });
        onCancel();
      },
      onCancel: onCancel,
    });
  };

  return (
    <>
      <Form.Item>
        <Button onClick={handleAdd} style={{ marginBottom: 16 }} icon="plus">
          Add competitor
        </Button>
      </Form.Item>
      {data.competitors.length > 0 && (
        <Form.Item>
          <Table columns={columns} dataSource={data.competitors}></Table>
        </Form.Item>
      )}

      <FormItem label="Industry growth">
        {getFieldDecorator("industryGrowth")(
          <Input placeholder="Industry growth comment" />
        )}
      </FormItem>

      <Form.Item label="Comment">
        {getFieldDecorator("comment")(
          <Input.TextArea placeholder="Comment" rows={2} />
        )}
      </Form.Item>

      {competitorEdit && (
        <Drawer
          title="Edit competitor"
          visible
          onClose={() => setCompetitorEdit(undefined)}
        >
          <CompanyCompetitorEdit {...competitorEdit} />
        </Drawer>
      )}
    </>
  );
};

export default StoryPartWrap(StoryCompetition);
