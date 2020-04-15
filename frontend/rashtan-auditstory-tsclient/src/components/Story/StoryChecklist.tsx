import React, { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, Rate, Button, List, Form, Typography } from "antd";
import { ChecklistItem } from "../../models/Company";
import StoryPartForm, { StoryPartProps } from "./StoryPartForm";
import {
  addElement,
  replaceElement,
  removeElement,
} from "../../models/ArrayUpdate";
import styles from "./Story-styles";
import AddUniqueValue from "./AddUniqueValue";

const StoryChecklist: React.FC<StoryPartProps<ChecklistItem[]>> = ({
  data,
  dataChanged,
  extraData,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const unusedItems =
    extraData &&
    extraData.filter((s) => !data.some((d) => d.question === s.question));

  const addItem = (item: ChecklistItem) => {
    const c = addElement(data, item);
    dataChanged(c);
  };
  const remove = (item: ChecklistItem) => {
    const c = removeElement(data, item);
    dataChanged(c);
  };
  const itemChanged = (original: ChecklistItem, replacement: ChecklistItem) => {
    const c = replaceElement(data, original, replacement);
    dataChanged(c);
  };

  return (
    <StoryPartForm
      title="Checklist"
      value={data}
      onChange={dataChanged}
      ignoreLabelSetting
    >
      {data.map((item) => (
        <Input.Group compact key={item.question}>
          <Form.Item style={styles.checklistQuestion}>
            <Input
              disabled
              placeholder="Checklist item"
              defaultValue={item.question}
            />
          </Form.Item>

          <Form.Item>
            <Rate
              style={styles.checklistRating}
              allowHalf={true}
              defaultValue={item.response}
              onChange={(v) => itemChanged(item, { ...item, response: v })}
            />
          </Form.Item>

          <MinusCircleOutlined
            style={styles.checklistDelete}
            onClick={() => remove(item)}
          />
        </Input.Group>
      ))}

      <Button type="dashed" onClick={() => setModalVisible(true)}>
        <PlusOutlined /> Add item
      </Button>

      <AddUniqueValue
        title="New Checklist item"
        existingItems={data.map((d) => d.question)}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onCreate={(item) => {
          addItem({ question: item, response: 1.0 });
          setModalVisible(false);
        }}
      />

      {unusedItems && unusedItems.length > 0 && (
        <List
          header={
            <Typography.Title level={4}>Possible questions</Typography.Title>
          }
          itemLayout="vertical"
          pagination={{
            pageSize: 3,
          }}
          dataSource={unusedItems}
          renderItem={(item) => (
            <List.Item
              key={item.question}
              onClick={() => addItem(item)}
              style={styles.checklistUnusedItem}
            >
              {item.question}
            </List.Item>
          )}
        />
      )}
    </StoryPartForm>
  );
};

export default StoryChecklist;
