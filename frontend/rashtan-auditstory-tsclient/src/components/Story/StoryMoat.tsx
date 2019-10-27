import React from "react";
import { Input, InputNumber, Select } from "antd";
import { CompanyStoryMoat, MoatKind } from "../../models/Company";
import StoryPartWrap, { WithStoryPartProps } from "./StoryPartWrap";
import Label from "../Label";

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
      <Label id="kind" label="Kinds of moat">
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
      </Label>
      <Label id="mainAdvantage" label="Main advantage">
        <Input
          placeholder="Main advantage"
          defaultValue={data.mainAdvantage}
          onChange={e =>
            dataChanged({ ...data, mainAdvantage: e.target.value })
          }
        />
      </Label>

      <Label id="durable" label="Is moat durable?">
        <Input
          placeholder="Is moat durable?"
          defaultValue={data.durable}
          onChange={e => dataChanged({ ...data, durable: e.target.value })}
        />
      </Label>

      <Input.Group>
        <Label id="bvps" label="BVPS growth (%)">
          <InputNumber
            placeholder="Book Value per Share growth (%)"
            step={0.1}
            defaultValue={data.bvps}
            onChange={e => e && dataChanged({ ...data, bvps: e })}
          />
        </Label>
        <Label id="eps" label="EPS growth (%)">
          <InputNumber
            placeholder="Earnings per Share growth (%)"
            step={0.1}
            defaultValue={data.eps}
            onChange={e => e && dataChanged({ ...data, eps: e })}
          />
        </Label>
        <Label id="ocps" label="OCPS growth (%)">
          <InputNumber
            placeholder="Operating Cash per Share growth (%)"
            step={0.1}
            defaultValue={data.ocps}
            onChange={e => e && dataChanged({ ...data, ocps: e })}
          />
        </Label>
        <Label id="sgr" label="Sales growth (%)">
          <InputNumber
            placeholder="Sales growth (%)"
            step={0.1}
            defaultValue={data.sgr}
            onChange={e => e && dataChanged({ ...data, sgr: e })}
          />
        </Label>
      </Input.Group>

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

export default StoryPartWrap(StoryMoat);
