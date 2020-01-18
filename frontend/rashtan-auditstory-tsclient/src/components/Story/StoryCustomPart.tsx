import React from "react";
import { Input, Form, List, Icon } from "antd";
import ReactQuill from "react-quill";
import { CompanyStoryCustomPart } from "../../models/Company";

interface Props {
  data: CompanyStoryCustomPart;
  remove: () => void;
  dataChanged: (data: CompanyStoryCustomPart) => void;
}

const StoryCustomPart: React.FC<Props> = ({ data, remove, dataChanged }) => {
  const handleContentChange = (content: string) => {
    dataChanged({ ...data, content: content });
  };

  const titleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    dataChanged({ ...data, title: e.target.value });
  };

  return (
    <List.Item>
      <List.Item.Meta
        title={
          <span>
            {data.title}
            <Icon type="delete" onClick={remove} style={{ marginLeft: 10 }} />
          </span>
        }
        description={
          <>
            <Form.Item label="Title" labelAlign="left">
              <Input
                placeholder="Title"
                defaultValue={data.title}
                onChange={titleChanged}
              />
            </Form.Item>

            <Form.Item>
              <ReactQuill
                theme="snow"
                placeholder="Write whatever you want:)"
                value={data.content}
                onChange={handleContentChange}
              />
            </Form.Item>
          </>
        }
      />
    </List.Item>
  );
};

export default StoryCustomPart;
