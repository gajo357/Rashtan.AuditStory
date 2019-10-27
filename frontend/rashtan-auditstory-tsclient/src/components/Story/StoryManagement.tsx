import React from "react";
import { Input, Switch, InputNumber } from "antd";
import { CompanyStoryManagement } from "../../models/Company";
import StoryPartWrap, { WithStoryPartProps } from "./StoryPartWrap";
import Label from "../Label";

const StoryManagement: React.FC<WithStoryPartProps<CompanyStoryManagement>> = ({
  data,
  dataChanged
}) => {
  return (
    <>
      <Label id="ceoTrust" label="Trust the CEO?">
        <Switch
          title="Do you trust the CEO with your pension?"
          defaultChecked={data.ceoTrust}
          onChange={(v, _) => dataChanged({ ...data, ceoTrust: v })}
        />
      </Label>

      <Label id="ceoTenure" label="CEO tenure">
        <InputNumber
          placeholder="CEO tenure"
          defaultValue={data.ceoTenure}
          min={0}
          step={1}
          onChange={v => v && dataChanged({ ...data, ceoTenure: v })}
        />
      </Label>

      <Label id="ceoCandor" label="CEO candor">
        <Input
          placeholder="CEO candor in his/her communication?"
          defaultValue={data.ceoCandor}
          onChange={e => dataChanged({ ...data, ceoCandor: e.target.value })}
        />
      </Label>

      <Label id="ceoComment" label="Comment on the CEO">
        <Input
          placeholder="Comment on the CEO"
          defaultValue={data.ceoComment}
          onChange={e => dataChanged({ ...data, ceoComment: e.target.value })}
        />
      </Label>

      <Input.Group>
        <Label id="roe" label="ROE">
          <InputNumber
            placeholder="ROE"
            defaultValue={data.roe}
            step={0.1}
            onChange={v => v && dataChanged({ ...data, roe: v })}
          />
        </Label>
        <Label id="roic" label="ROIC">
          <InputNumber
            placeholder="ROIC"
            defaultValue={data.roic}
            step={0.1}
            onChange={v => v && dataChanged({ ...data, roic: v })}
          />
        </Label>
        <Label id="debt" label="Debt over Earnings">
          <InputNumber
            placeholder="Debt over Earnings"
            defaultValue={data.debt}
            min={0}
            step={0.1}
            onChange={v => v && dataChanged({ ...data, debt: v })}
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

export default StoryPartWrap(StoryManagement);
