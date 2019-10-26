import React from "react";
import { Input } from "antd";
import { CompanyStoryCustomPart } from "../../models/Company";
import StoryPartWrap, { WithStoryPartProps } from "./StoryPartWrap";

const StoryCustomPart: React.FC<WithStoryPartProps<CompanyStoryCustomPart>> = ({
  data,
  dataChanged
}) => {
  return (
    <>
      <Input
        placeholder="Title"
        defaultValue={data.title}
        onChange={e => dataChanged({ ...data, title: e.target.value })}
      />

      <Input
        placeholder="Content"
        defaultValue={data.content}
        onChange={e => dataChanged({ ...data, content: e.target.value })}
      />

      <Input
        placeholder="Comment"
        defaultValue={data.comment}
        onChange={e => dataChanged({ ...data, comment: e.target.value })}
      />
    </>
  );
};

export default StoryPartWrap(StoryCustomPart);
