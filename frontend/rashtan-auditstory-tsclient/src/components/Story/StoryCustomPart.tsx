import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Form } from "antd";
import StoryPartForm from "./StoryPartForm";
import RichTextEditor from "./../RichTextEditor";
import { CompanyStoryCustomPart } from "../../models/Company";

interface Props {
  data: CompanyStoryCustomPart;
  delete: () => void;
  dataChanged: (data: CompanyStoryCustomPart) => void;
}

const StoryCustomPart: React.FC<Props> = ({
  data,
  delete: remove,
  dataChanged,
}) => {
  return (
    <StoryPartForm
      title={
        <span>
          {data.title}
          <DeleteOutlined onClick={remove} style={{ marginLeft: 10 }} />
        </span>
      }
      value={data}
      onChange={dataChanged}
    >
      <Form.Item name="content">
        <RichTextEditor />
      </Form.Item>
    </StoryPartForm>
  );
};

export default StoryCustomPart;
