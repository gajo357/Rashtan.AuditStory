import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Form } from "antd";
import StoryPartForm from "./StoryPartForm";
import EditRichText from "./../SimpleEditors/EditRichText";
import { CustomPartDto } from "../../models/Company";

interface Props {
  data: CustomPartDto;
  delete: () => void;
  dataChanged: (data: CustomPartDto) => void;
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
        <EditRichText />
      </Form.Item>
    </StoryPartForm>
  );
};

export default StoryCustomPart;
