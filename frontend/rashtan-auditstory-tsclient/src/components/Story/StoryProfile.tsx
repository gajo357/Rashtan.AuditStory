import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Select, Icon } from "antd";
import { CompanyProfile } from "../../models/Company";
import StoryPartWrap, { WithStoryPartProps, FormItem } from "./StoryPartWrap";
import Category from "../../models/Category";

const { Item } = Form;
interface Categories {
  categories: Category[];
}

const StoryProfile: React.FC<WithStoryPartProps<
  CompanyProfile & Categories
>> = ({ data, getFieldDecorator, setFieldsValue, dataChanged }) => {
  useEffect(setFieldsValue, []);
  const [website, setWebsite] = useState<string>(data.website);
  const onWebsiteChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsite(e.target.value);
  };
  return (
    <>
      <Item>
        {getFieldDecorator("category", {
          rules: [{ required: false }],
        })(
          <Select
            loading={data.categories.length === 0}
            placeholder="Select category"
          >
            {data.categories.map((c) => (
              <Select.Option value={c.name} key={c.name}>
                <span>
                  <Icon type="book" theme="twoTone" twoToneColor={c.color} />
                  {c.name}
                </span>
              </Select.Option>
            ))}
          </Select>
        )}
      </Item>

      <Icon
        type="star"
        theme="twoTone"
        twoToneColor={data.star ? "#FFEB3B" : "#555555"}
        onClick={() => dataChanged({ ...data, star: !data.star })}
      />

      {data.flags.length > 0 && (
        <span>
          <Icon type="flag" theme="twoTone" twoToneColor="red" />
          {data.flags.length}
        </span>
      )}
      <Item
        label={
          <span>
            <Icon type="tags" /> Tags
          </span>
        }
      >
        {getFieldDecorator("tags", {
          rules: [{ required: false }],
        })(<Select mode="tags" />)}
      </Item>

      <FormItem label="Company name">
        {getFieldDecorator("name", {
          rules: [{ required: true, message: "Company name is required" }],
        })(<Input placeholder="Company name" />)}
      </FormItem>

      <FormItem label="Website">
        {getFieldDecorator("website", {
          rules: [{ required: true, message: "Website is required" }],
        })(
          <Input
            placeholder="Company website"
            addonBefore={
              website && (
                <Button
                  icon="global"
                  type="link"
                  href={website}
                  target="_blank"
                />
              )
            }
            onChange={onWebsiteChanged}
          />
        )}
      </FormItem>

      <FormItem label="Market cap">
        {getFieldDecorator("marketCap")(
          <InputNumber placeholder="Market cap" min={0} step={1} />
        )}
      </FormItem>

      <FormItem label="Industry">
        {getFieldDecorator("industry")(<Input placeholder="Industry" />)}
      </FormItem>
    </>
  );
};

export default StoryPartWrap(StoryProfile);
