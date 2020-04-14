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
import StoryPartForm, { StoryPartProps, FormItem } from "./StoryPartForm";
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
  data,
  dataChanged,
}) => {
  const [flagModalVisible, setFlagModalVisible] = useState(false);

  return (
    <StoryPartForm title="Profile" data={data} dataChanged={dataChanged}>
      <Item name="category" rules={[{ required: false }]}>
        <Select
          loading={data.categories.length === 0}
          placeholder="Select category"
        >
          {data.categories.map((c) => (
            <Select.Option value={c.name} key={c.name}>
              <span>
                <BookTwoTone twoToneColor={c.color} />
                {c.name}
              </span>
            </Select.Option>
          ))}
        </Select>
      </Item>

      <FormItem label="Favourite" name="star">
        <StarEdit />
      </FormItem>

      <FormItem
        label={
          <span>
            <TagsOutlined /> Tags
          </span>
        }
        name="tags"
        rules={[{ required: false }]}
      >
        <Select mode="tags" />
      </FormItem>

      <FormItem
        label="Company name"
        name="name"
        rules={[{ required: true, message: "Company name is required" }]}
      >
        <Input placeholder="Company name" />
      </FormItem>

      <FormItem
        label="Website"
        name="website"
        rules={[{ required: true, message: "Website is required" }]}
      >
        <Input
          placeholder="Company website"
          addonBefore={
            data.website && (
              <Button
                icon={<GlobalOutlined />}
                type="link"
                href={data.website}
                target="_blank"
              />
            )
          }
        />
      </FormItem>

      <FormItem label="Market cap" name="marketCap">
        <InputNumber placeholder="Market cap" min={0} step={1} />
      </FormItem>

      <FormItem label="Industry" name="industry">
        <Input placeholder="Industry" />
      </FormItem>

      <div>
        <AddUniqueValue
          title="New Red Flag"
          existingItems={data.flags}
          visible={flagModalVisible}
          onCancel={() => setFlagModalVisible(false)}
          onCreate={(flag) => {
            const flags = addElement(data.flags, flag);
            dataChanged({ ...data, flags });
            setFlagModalVisible(false);
          }}
        />

        {data.flags.map((flag) => (
          <Row key={flag}>
            <Col>
              <Input disabled value={flag} style={styles.redFlagText} />
            </Col>
            <Col flex="none">
              <MinusCircleOutlined
                style={styles.checklistDelete}
                onClick={() => {
                  const flags = removeElement(data.flags, flag);
                  dataChanged({ ...data, flags });
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
