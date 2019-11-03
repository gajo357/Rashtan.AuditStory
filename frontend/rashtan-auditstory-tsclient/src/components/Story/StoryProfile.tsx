import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { CompanyProfile } from "../../models/Company";
import StoryPartWrap, {
  WithStoryPartProps,
  formItemLayout
} from "./StoryPartWrap";

const { Item } = Form;

const StoryProfile: React.FC<WithStoryPartProps<CompanyProfile>> = ({
  data,
  getFieldDecorator,
  setFieldsValue
}) => {
  useEffect(setFieldsValue, []);
  const [website, setWebsite] = useState<string>(data.website);
  const onWebsiteChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsite(e.target.value);
  };
  return (
    <>
      <Item label="Company name" {...formItemLayout}>
        {getFieldDecorator("name", {
          rules: [{ required: true, message: "Company name is required" }]
        })(<Input placeholder="Company name" />)}
      </Item>

      <Item label="Website" {...formItemLayout}>
        {getFieldDecorator("website", {
          rules: [{ required: true, message: "Website is required" }]
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
      </Item>

      <Item label="Shares outstanding" {...formItemLayout}>
        {getFieldDecorator("numberOfShares")(
          <InputNumber
            placeholder="Number of shares outstanding"
            min={1}
            step={1}
          />
        )}
      </Item>
      <Item label="Market cap" {...formItemLayout}>
        {getFieldDecorator("marketCap")(
          <InputNumber placeholder="Market cap" min={0} step={1} />
        )}
      </Item>

      <Item label="Industry" {...formItemLayout}>
        {getFieldDecorator("industry")(<Input placeholder="Industry" />)}
      </Item>
      <Item label="Folder" {...formItemLayout}>
        {getFieldDecorator("folder")(<Input placeholder="Folder" />)}
      </Item>
    </>
  );
};

export default StoryPartWrap(StoryProfile);
