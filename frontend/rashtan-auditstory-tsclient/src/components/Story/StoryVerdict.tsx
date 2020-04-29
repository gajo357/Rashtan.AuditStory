import React, { useState } from "react";
import {
  PlusOutlined,
  MinusCircleOutlined,
  BookFilled,
} from "@ant-design/icons";
import { Form, Input, Button, Select, Row, Col } from "antd";
import { VerdictDto } from "../../models/Company";
import StoryPartForm, { StoryPartPropsWithExtraData } from "./StoryPartForm";
import EditStar from "../SimpleEditors/EditStar";
import EditComment from "../SimpleEditors/EditComment";
import AddUniqueValue from "../AddUniqueValue";
import Category from "../../models/Category";
import styles from "./Story-styles";
import { removeElement, addElement } from "../../models/ArrayUpdate";

const StoryVerdict: React.FC<StoryPartPropsWithExtraData<
  VerdictDto,
  Category
>> = ({ value, onChange, extraData: categories }) => {
  const [flagModalVisible, setFlagModalVisible] = useState(false);

  return (
    <StoryPartForm title="Verdict" value={value} onChange={onChange}>
      <Form.Item label="Category" name="category" rules={[{ required: false }]}>
        <Select loading={categories.length === 0} placeholder="Select category">
          {categories.map((c) => (
            <Select.Option value={c.name} key={c.name}>
              <span>
                <BookFilled style={{ color: c.color, marginRight: 5 }} />
                {c.name}
              </span>
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Favourite" name="star">
        <EditStar />
      </Form.Item>
      <Form.Item label="Red flags">
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
            Add Red Flag
          </Button>
        </div>
      </Form.Item>
      <Form.Item label="Comment" name="comment">
        <EditComment />
      </Form.Item>
    </StoryPartForm>
  );
};

export default StoryVerdict;
