import React, { useState } from "react";
import {
  BookTwoTone,
  GlobalOutlined,
  TagsOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Form, Input, InputNumber, Button, Select, Row, Col } from "antd";
import { CompanyProfile } from "../../models/Company";
import StoryPartForm, { StoryPartProps } from "./StoryPartForm";
import StarEdit from "./../StarEdit";
import AddUniqueValue from "./AddUniqueValue";
import Category from "../../models/Category";
import styles from "./Story-styles";
import { removeElement, addElement } from "../../models/ArrayUpdate";

const { Item } = Form;
interface Categories {
  categories: Category[];
}

const StoryProfile: React.FC<StoryPartProps<CompanyProfile & Categories>> = ({
  value,
  onChange,
}) => {
  const [flagModalVisible, setFlagModalVisible] = useState(false);

  return (
    <StoryPartForm title="Profile" value={value} onChange={onChange}>
      <Item name="category" rules={[{ required: false }]}>
        <Select
          loading={value.categories.length === 0}
          placeholder="Select category"
        >
          {value.categories.map((c) => (
            <Select.Option value={c.name} key={c.name}>
              <span>
                <BookTwoTone twoToneColor={c.color} />
                {c.name}
              </span>
            </Select.Option>
          ))}
        </Select>
      </Item>

      <Form.Item label="Favourite" name="star">
        <StarEdit />
      </Form.Item>

      <Form.Item
        label={
          <span>
            <TagsOutlined /> Tags
          </span>
        }
        name="tags"
        rules={[{ required: false }]}
      >
        <Select mode="tags" />
      </Form.Item>

      <Form.Item
        label="Company name"
        name="name"
        rules={[{ required: true, message: "Company name is required" }]}
      >
        <Input placeholder="Company name" />
      </Form.Item>

      <Form.Item
        label="Website"
        name="website"
        rules={[{ required: true, message: "Website is required" }]}
      >
        <Input
          placeholder="Company website"
          addonBefore={
            value.website && (
              <Button
                icon={<GlobalOutlined />}
                type="link"
                href={value.website}
                target="_blank"
              />
            )
          }
        />
      </Form.Item>

      <Form.Item label="Market cap" name="marketCap">
        <InputNumber placeholder="Market cap" min={0} step={1} />
      </Form.Item>

      <Form.Item label="Industry" name="industry">
        <Input placeholder="Industry" />
      </Form.Item>

      <div>
        <AddUniqueValue
          title="New Red Flag"
          existingItems={value.flags}
          visible={flagModalVisible}
          onCancel={() => setFlagModalVisible(false)}
          onCreate={(flag) => {
            const flags = addElement(value.flags, flag);
            onChange({ ...value, flags });
            setFlagModalVisible(false);
          }}
        />

        {value.flags.map((flag) => (
          <Row key={flag}>
            <Col>
              <Input disabled value={flag} style={styles.redFlagText} />
            </Col>
            <Col flex="none">
              <MinusCircleOutlined
                style={styles.checklistDelete}
                onClick={() => {
                  const flags = removeElement(value.flags, flag);
                  onChange({ ...value, flags });
                }}
              />
            </Col>
          </Row>
        ))}

        <Button
          style={styles.addFlagButton}
          onClick={() => setFlagModalVisible(true)}
          type="dashed"
          icon={<PlusOutlined />}
        >
          Add Flag
        </Button>
      </div>
    </StoryPartForm>
  );
};

export default StoryProfile;
