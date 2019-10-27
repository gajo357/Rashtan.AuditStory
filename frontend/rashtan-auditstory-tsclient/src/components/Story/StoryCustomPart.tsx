import React from "react";
import { Input } from "antd";
import { CompanyStoryCustomPart } from "../../models/Company";
import StoryPartWrap, { WithStoryPartProps } from "./StoryPartWrap";
import Label from "../Label";

const StoryCustomPart: React.FC<WithStoryPartProps<CompanyStoryCustomPart>> = ({
  data,
  dataChanged
}) => {
  return (
    <>
      <Label id="title" label="Title">
        <Input
          id="title"
          placeholder="Title"
          defaultValue={data.title}
          onChange={e => dataChanged({ ...data, title: e.target.value })}
        />
      </Label>

      <Label id="content" label="Content">
        <Input
          placeholder="Content"
          defaultValue={data.content}
          onChange={e => dataChanged({ ...data, content: e.target.value })}
        />
      </Label>

      <Label id="comment" label="Comment">
        <Input
          placeholder="Comment"
          defaultValue={data.comment}
          onChange={e => dataChanged({ ...data, comment: e.target.value })}
        />
      </Label>
    </>
  );
};

export default StoryPartWrap(StoryCustomPart);
