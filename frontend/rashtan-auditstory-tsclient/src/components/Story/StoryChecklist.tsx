import "./Story.css";
import React from "react";
import { Input, Rate, Form, Icon, Button, List } from "antd";
import { ChecklistItem } from "../../models/Company";
import StoryPartWrap, { WithStoryPartProps } from "./StoryPartWrap";
import {
  addElement,
  replaceElement,
  removeElement
} from "../../models/ArrayUpdate";

const StoryChecklist: React.FC<WithStoryPartProps<ChecklistItem[]>> = ({
  data,
  dataChanged,
  extraData
}) => {
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
      {data.map(item => (
        <Input.Group compact key={item.question}>
          <Form.Item style={{ width: "40%" }}>
            <Input
              placeholder="Checklist item"
              defaultValue={item.question}
              onChange={v =>
                itemChanged(item, { ...item, question: v.target.value })
              }
            />
          </Form.Item>

          <Form.Item>
            <Rate
              style={{ marginLeft: 10, marginRight: 10 }}
              allowHalf={true}
              defaultValue={item.response}
              onChange={v => itemChanged(item, { ...item, response: v })}
            />
          </Form.Item>

          <Icon
            style={{ marginTop: 5 }}
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => remove(item)}
          />
        </Input.Group>
      ))}

      <Form.Item>
        <Button type="dashed" onClick={addNewItem}>
          <Icon type="plus" /> Add item
        </Button>
      </Form.Item>

      {extraData && extraData.length > 0 && (
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 3
          }}
          dataSource={extraData}
          renderItem={item => (
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
