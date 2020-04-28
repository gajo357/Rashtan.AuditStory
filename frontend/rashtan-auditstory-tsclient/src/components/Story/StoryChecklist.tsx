import React, { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, Rate, Button, List, Form, Typography } from "antd";
import StoryPartForm, { StoryPartPropsWithExtraData } from "./StoryPartForm";
import AddUniqueValue from "../AddUniqueValue";
import ReadOnlyTextEdit from "../SimpleEditors/ReadOnlyTextEdit";
import {
  addElement,
  replaceElement,
  removeElement,
} from "../../models/ArrayUpdate";
import { ChecklistItemDto } from "../../models/Company";
import styles from "./Story-styles";

const StoryChecklist: React.FC<StoryPartPropsWithExtraData<
  ChecklistItemDto[],
  ChecklistItemDto
>> = ({ value, onChange, extraData }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const unusedItems =
    extraData &&
    extraData.filter((s) => !value.some((d) => d.question === s.question));

  const addItem = (item: ChecklistItemDto) => {
    const c = addElement(value, item);
    onChange(c);
  };
  const remove = (item: ChecklistItemDto) => {
    const c = removeElement(value, item);
    onChange(c);
  };
  const itemChanged = (
    original: ChecklistItemDto,
    replacement: ChecklistItemDto
  ) => {
    const c = replaceElement(value, original, replacement);
    onChange(c);
  };

  return (
    <StoryPartForm
      title="Checklist"
      value={value}
      onChange={onChange}
      ignoreLabelSetting
    >
      {value.map((item) => (
        <Input.Group compact key={item.question}>
          <Form.Item style={styles.checklistQuestion}>
            <ReadOnlyTextEdit value={item.question} />
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
        existingItems={value.map((d) => d.question)}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onCreate={(item) => {
          addItem({ question: item, response: 1.0 });
          setModalVisible(false);
        }}
      />

      {unusedItems && unusedItems.length > 0 && (
        <List
          style={{ marginTop: 50 }}
          header={
            <Typography.Title level={4}>Top 10 (click to add)</Typography.Title>
          }
          itemLayout="vertical"
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
