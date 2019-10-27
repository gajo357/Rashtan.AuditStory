import React from "react";
import { Input, InputNumber } from "antd";
import Label from "../Label";
import { CompanyProfile } from "../../models/Company";
import StoryPartWrap, { WithStoryPartProps } from "./StoryPartWrap";

const StoryProfile: React.FC<WithStoryPartProps<CompanyProfile>> = ({
  data,
  dataChanged
}) => {
  return (
    <div>
      <Label id="name" label="Company name">
        <Input
          id="name"
          placeholder="Company name"
          defaultValue={data.name}
          onChange={e => dataChanged({ ...data, name: e.target.value })}
          required
        />
      </Label>

      <Input.Group compact>
        <Label id="numberOfShares" label="Shares outstanding">
          <InputNumber
            placeholder="Number of shares outstanding"
            min={1}
            step={1}
            defaultValue={data.numberOfShares}
            onChange={e => e && dataChanged({ ...data, numberOfShares: e })}
            required
          />
        </Label>
        <Label id="marketCap" label="Market cap">
          <InputNumber
            placeholder="Market cap"
            min={0}
            step={1}
            defaultValue={data.marketCap}
            onChange={e => e && dataChanged({ ...data, marketCap: e })}
            required
          />
        </Label>
      </Input.Group>

      <Label id="industry" label="Industry">
        <Input
          placeholder="Industry"
          defaultValue={data.industry}
          onChange={e => dataChanged({ ...data, industry: e.target.value })}
          required
        />
      </Label>
      <Label id="folder" label="Folder">
        <Input
          placeholder="Folder"
          defaultValue={data.folder}
          onChange={e => dataChanged({ ...data, folder: e.target.value })}
          required
        />
      </Label>
    </div>
  );
};

export default StoryPartWrap(StoryProfile);
