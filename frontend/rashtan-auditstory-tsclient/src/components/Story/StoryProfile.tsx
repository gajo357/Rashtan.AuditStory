import React, { useState } from "react";
import {
  BookTwoTone,
  FlagTwoTone,
  GlobalOutlined,
  StarTwoTone,
  TagsOutlined,
} from "@ant-design/icons";
import { Form, Input, InputNumber, Button, Select } from "antd";
import { CompanyProfile } from "../../models/Company";
import StoryPartForm, { StoryPartProps, FormItem } from "./StoryPartForm";
import Category from "../../models/Category";

const { Item } = Form;
interface Categories {
  categories: Category[];
}

const StoryProfile: React.FC<StoryPartProps<CompanyProfile & Categories>> = ({
  data,
  dataChanged,
}) => {
  const [website, setWebsite] = useState<string>(data.website);
  const onWebsiteChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsite(e.target.value);
  };
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

      <StarTwoTone
        twoToneColor={data.star ? "#FFEB3B" : "#555555"}
        onClick={() => dataChanged({ ...data, star: !data.star })}
      />

      {data.flags.length > 0 && (
        <span>
          <FlagTwoTone twoToneColor="red" />
          {data.flags.length}
        </span>
      )}
      <Item
        label={
          <span>
            <TagsOutlined /> Tags
          </span>
        }
        name="tags"
        rules={[{ required: false }]}
      >
        <Select mode="tags" />
      </Item>

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
            website && (
              <Button
                icon={<GlobalOutlined />}
                type="link"
                href={website}
                target="_blank"
              />
            )
          }
          onChange={onWebsiteChanged}
        />
      </FormItem>

      <FormItem label="Market cap" name="marketCap">
        <InputNumber placeholder="Market cap" min={0} step={1} />
      </FormItem>

      <FormItem label="Industry" name="industry">
        <Input placeholder="Industry" />
      </FormItem>
    </StoryPartForm>
  );
};

export default StoryProfile;
