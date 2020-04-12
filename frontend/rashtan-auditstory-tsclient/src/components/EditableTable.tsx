import React, { useState } from "react";
import { Typography, Button, Divider, Table, Drawer } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import EditEntry, { EditEntryProps } from "./EditEntry";
import {
  addElement,
  replaceElement,
  removeElement,
} from "./../models/ArrayUpdate";
import { ColumnType } from "antd/lib/table/interface";

type ColumnDataType = "text" | "number";

export interface ColumnInfo {
  key: string;
  title: string;
  type: ColumnDataType;
}

interface Props<T> {
  data: T[];
  setData: (d: T[]) => void;
  columns: ColumnInfo[];
  title: string;
}

function EditableTable<T extends object>({
  data,
  setData,
  columns,
  title,
}: Props<T>) {
  const [entryEdit, setEntryEdit] = useState<EditEntryProps<T> | undefined>(
    undefined
  );
  const onCancel = () => setEntryEdit(undefined);

  const tableColumns = columns.map((c) => {
    return {
      title: c.title,
      dataIndex: c.key,
      key: c.key,
    } as ColumnType<T>;
  });
  tableColumns.push({
    title: "",
    dataIndex: "edit",
    key: "edit",
    render: (_: string, record: T) => (
      <span>
        <Button
          type="link"
          onClick={() => {
            console.log("editing");
            setEntryEdit({
              data: record,
              onSave: (d: T) => {
                const c = replaceElement(data, record, d);
                setData(c);
                onCancel();
              },
              onCancel: onCancel,
              columns,
            });
          }}
        >
          Edit
        </Button>
        <Divider type="vertical" />
        <Button
          type="link"
          onClick={() => {
            const c = removeElement(data, record);
            setData(c);
          }}
        >
          Delete
        </Button>
      </span>
    ),
  });

  const handleAdd = () => {
    setEntryEdit({
      onSave: (d: T) => {
        const c = addElement(data, d);
        setData(c);
        onCancel();
      },
      onCancel: onCancel,
      columns,
    });
  };

  return (
    <>
      <Typography.Text strong style={{ display: "block" }}>
        {title}
      </Typography.Text>
      <Button
        style={{ marginBottom: 10 }}
        onClick={handleAdd}
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
      />
      {data.length > 0 ? (
        <Table
          columns={tableColumns}
          dataSource={data}
          rowKey={columns[0].key}
          bordered
        />
      ) : undefined}
      {entryEdit && (
        <Drawer title={title} visible onClose={() => setEntryEdit(undefined)}>
          <EditEntry {...entryEdit} />
        </Drawer>
      )}
    </>
  );
}

export default EditableTable;
