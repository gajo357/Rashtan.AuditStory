import React, { useEffect } from "react";
import { Input, Form } from "antd";
import { CompanyStoryCustomPart } from "../../models/Company";
import StoryPartWrap, { WithStoryPartProps } from "./StoryPartWrap";

const StoryCustomPart: React.FC<WithStoryPartProps<CompanyStoryCustomPart>> = ({
  getFieldDecorator,
  setFieldsValue
}) => {
  useEffect(setFieldsValue, []);
  return (
    <>
      <Form.Item label="Title">
        {getFieldDecorator("title")(<Input placeholder="Title" />)}
      </Form.Item>

      <Form.Item label="Content">
        {getFieldDecorator("content")(<Input placeholder="Content" />)}
      </Form.Item>

      <Form.Item label="Comment">
        {getFieldDecorator("comment")(<Input placeholder="Comment" />)}
      </Form.Item>
    </>
  );
};

export default StoryPartWrap(StoryCustomPart);
