import React from "react";
import { Input, InputNumber, Select } from "antd";
import { CompanyStoryMoat, MoatKind } from "../../models/Company";
import StoryPartWrap, { WithStoryPartProps } from "./StoryPartWrap";

const { Option } = Select;

const StoryMoat: React.FC<WithStoryPartProps<CompanyStoryMoat>> = ({
  data,
  dataChanged
}) => {
  const kindChanged = (v: MoatKind[]) => {
    dataChanged({ ...data, kinds: v });
  };
  return (
    <>
      <Select
        placeholder="Kinds of moat"
        mode="multiple"
        defaultValue={data.kinds}
        onChange={(value: any) => kindChanged(value as MoatKind[])}
      >
        <Option value={MoatKind.Brand}>Brand</Option>
        <Option value={MoatKind.Price}>Price</Option>
        <Option value={MoatKind.Secrets}>Secrets</Option>
        <Option value={MoatKind.Toll}>Toll</Option>
        <Option value={MoatKind.Switching}>Switching</Option>
      </Select>

      <Input
        placeholder="Main advantage"
        defaultValue={data.mainAdvantage}
        onChange={e => dataChanged({ ...data, mainAdvantage: e.target.value })}
      />

      <Input
        placeholder="Is moat durable?"
        defaultValue={data.durable}
        onChange={e => dataChanged({ ...data, durable: e.target.value })}
      />

      <Input.Group>
        <InputNumber
          placeholder="Book Value per Share growth (%)"
          step={0.1}
          defaultValue={data.bvps}
          onChange={e => e && dataChanged({ ...data, bvps: e })}
        />
        <InputNumber
          placeholder="Earnings per Share growth (%)"
          step={0.1}
          defaultValue={data.eps}
          onChange={e => e && dataChanged({ ...data, eps: e })}
        />
        <InputNumber
          placeholder="Operating Cash per Share growth (%)"
          step={0.1}
          defaultValue={data.ocps}
          onChange={e => e && dataChanged({ ...data, ocps: e })}
        />
        <InputNumber
          placeholder="Sales growth (%)"
          step={0.1}
          defaultValue={data.sgr}
          onChange={e => e && dataChanged({ ...data, sgr: e })}
        />
      </Input.Group>

      <Input
        addonBefore="Comment"
        defaultValue={data.comment}
        onChange={e => dataChanged({ ...data, comment: e.target.value })}
      />
    </>
  );
};

export default StoryPartWrap(StoryMoat);
