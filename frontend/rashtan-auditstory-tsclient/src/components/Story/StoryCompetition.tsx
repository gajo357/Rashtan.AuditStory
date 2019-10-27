import React, { useState } from "react";
import { Drawer, Input, Table, Button, Divider, Icon } from "antd";
import { CompanyCompetition, CompanyCompetitor } from "../../models/Company";
import StoryPartWrap, { WithStoryPartProps } from "./StoryPartWrap";
import Label from "../Label";
import CompanyCompetitorEdit, {
  CompanyCompetitorEditProps
} from "./CompanyCompetitorEdit";
import {
  addElement,
  replaceElement,
  removeElement
} from "../../models/ArrayUpdate";

const StoryCompetition: React.FC<WithStoryPartProps<CompanyCompetition>> = ({
  data,
  dataChanged
}) => {
  const [competitorEdit, setCompetitorEdit] = useState<
    CompanyCompetitorEditProps | undefined
  >(undefined);

  const onCancel = () => setCompetitorEdit(undefined);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Market Cap",
      dataIndex: "marketCap",
      key: "marketCap"
    },
    {
      title: "Market Share (%)",
      dataIndex: "marketShare",
      key: "marketShare"
    },
    {
      title: "",
      key: "edit",
      render: (_: string, record: CompanyCompetitor) => (
        <span>
          <Button
            onClick={_ => {
              setCompetitorEdit({
                data: record,
                onSave: (d: CompanyCompetitor) => {
                  const c = replaceElement(data.competitors, record, d);
                  dataChanged({ ...data, competitors: c });
                  onCancel();
                },
                onCancel: onCancel
              });
            }}
          >
            Edit
          </Button>
          <Divider type="vertical" />
          <Button
            onClick={_ => {
              const c = removeElement(data.competitors, record);
              dataChanged({ ...data, competitors: c });
            }}
          >
            Delete
          </Button>
        </span>
      )
    }
  ];

  const handleAdd = () => {
    setCompetitorEdit({
      data: { name: "", marketCap: 0, marketShare: 0 },
      onSave: (d: CompanyCompetitor) => {
        const c = addElement(data.competitors, d);
        dataChanged({ ...data, competitors: c });
        onCancel();
      },
      onCancel: onCancel
    });
  };

  return (
    <>
      <Button onClick={handleAdd} style={{ marginBottom: 16 }}>
        <Icon type="plus" /> Add competitor
      </Button>
      {data.competitors.length > 0 && (
        <Table columns={columns} dataSource={data.competitors}></Table>
      )}

      <Label id="industryGrowth" label="Industry growth">
        <Input
          placeholder="Industry growth comment"
          defaultValue={data.industryGrowth}
          onChange={e =>
            dataChanged({ ...data, industryGrowth: e.target.value })
          }
        />
      </Label>

      <Label id="comment" label="Comment">
        <Input
          placeholder="Comment"
          defaultValue={data.comment}
          onChange={e => dataChanged({ ...data, comment: e.target.value })}
        />
      </Label>

      {competitorEdit && (
        <Drawer title="Edit competitor" visible>
          <CompanyCompetitorEdit {...competitorEdit} />
        </Drawer>
      )}
    </>
  );
};

export default StoryPartWrap(StoryCompetition);
