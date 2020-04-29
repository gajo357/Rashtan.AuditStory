import React from "react";
import { Form, Input, Typography } from "antd";
import StoryPartForm, { StoryPartProps } from "./StoryPartForm";
import EditComment from "../SimpleEditors/EditComment";
import { ProsConsDto } from "../../models/Company";

import styles from "./Story-styles";

const StoryProsCons: React.FC<StoryPartProps<ProsConsDto>> = ({
  value,
  onChange,
}) => {
  return (
    <StoryPartForm
      title="Pros and Cons"
      value={value}
      onChange={onChange}
      ignoreLabelSetting
    >
      <div style={styles.revenueItem}>
        <Typography.Title level={4}>Pros</Typography.Title>
        <Form.Item name="pro1">
          <Input placeholder="Reason to own" />
        </Form.Item>
        <Form.Item name="pro2">
          <Input placeholder="Reason to own" />
        </Form.Item>
        <Form.Item name="pro3">
          <Input placeholder="Reason to own" />
        </Form.Item>
      </div>

      <div style={styles.revenueItem}>
        <Typography.Title level={4}>Cons</Typography.Title>
        <Form.Item name="con1">
          <Input placeholder="Reason NOT to own" />
        </Form.Item>
        <Form.Item name="con2">
          <Input placeholder="Reason NOT to own" />
        </Form.Item>
        <Form.Item name="con3">
          <Input placeholder="Reason NOT to own" />
        </Form.Item>
      </div>

      <div style={styles.revenueItem}>
        <Typography.Title level={4}>Cons' rebuttals</Typography.Title>
        <Form.Item name="re1">
          <Input placeholder="Rebuttal of con 1" />
        </Form.Item>
        <Form.Item name="re2">
          <Input placeholder="Rebuttal of con 2" />
        </Form.Item>
        <Form.Item name="re3">
          <Input placeholder="Rebuttal of con 3" />
        </Form.Item>
      </div>

      <Form.Item label="Comment" name="comment">
        <EditComment placeholder="Any additional thought or comments" />
      </Form.Item>
    </StoryPartForm>
  );
};

export default StoryProsCons;
