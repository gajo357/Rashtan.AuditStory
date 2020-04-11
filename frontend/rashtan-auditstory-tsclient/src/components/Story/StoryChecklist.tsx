import React from "react";
import { Input, Rate, Form, Icon, Button, List } from "antd";
import { ChecklistItem } from "../../models/Company";
import StoryPartWrap, { WithStoryPartProps } from "./StoryPartWrap";
import {
  addElement,
  replaceElement,
  removeElement,
} from "../../models/ArrayUpdate";
import styles from "./Story-styles";

const StoryChecklist: React.FC<WithStoryPartProps<ChecklistItem[]>> = ({
  data,
  dataChanged,
  extraData,
}) => {
  const unusedItems =
    extraData &&
    extraData.filter((s) => !data.some((d) => d.question === s.question));

  const addNewItem = () => addItem({ question: "", response: 0 });

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
    <>
      {data.map((item) => (
        <Input.Group compact key={item.question}>
          <Form.Item style={styles.checklistQuestion}>
            <Input
              placeholder="Checklist item"
              defaultValue={item.question}
              onChange={(v) =>
                itemChanged(item, { ...item, question: v.target.value })
              }
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

          <Icon
            style={styles.checklistDelete}
            type="minus-circle-o"
            onClick={() => remove(item)}
          />
        </Input.Group>
      ))}

      {!data.some((s) => s.question === "") && (
        <Form.Item>
          <Button type="dashed" onClick={addNewItem}>
            <Icon type="plus" /> Add item
          </Button>
        </Form.Item>
      )}

      {unusedItems && unusedItems.length > 0 && (
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 3,
          }}
          dataSource={unusedItems}
          renderItem={(item) => (
            <List.Item key={item.question} onClick={() => addItem(item)}>
              <List.Item.Meta description={item.question} />
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default StoryPartWrap(StoryChecklist);
