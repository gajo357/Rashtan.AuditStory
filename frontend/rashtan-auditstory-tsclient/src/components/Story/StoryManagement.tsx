import React from "react";
import { Input, Switch, InputNumber } from "antd";
import { CompanyStoryManagement } from "../../models/Company";
import StoryPartWrap, { WithStoryPartProps } from "./StoryPartWrap";

const StoryManagement: React.FC<WithStoryPartProps<CompanyStoryManagement>> = ({
  data,
  dataChanged
}) => {
  return (
    <>
      <Switch
        title="Do you trust the CEO with your pension?"
        defaultChecked={data.ceoTrust}
        onChange={(v, _) => dataChanged({ ...data, ceoTrust: v })}
      />

      <InputNumber
        placeholder="CEO tenure"
        defaultValue={data.ceoTenure}
        min={0}
        step={1}
        onChange={v => v && dataChanged({ ...data, ceoTenure: v })}
      />

      <Input
        addonBefore="CEO candor in his/her communication?"
        defaultValue={data.ceoCandor}
        onChange={e => dataChanged({ ...data, ceoCandor: e.target.value })}
      />

      <Input
        addonBefore="Comment on the CEO"
        defaultValue={data.ceoComment}
        onChange={e => dataChanged({ ...data, ceoComment: e.target.value })}
      />

      <Input.Group>
        <InputNumber
          placeholder="ROE"
          defaultValue={data.roe}
          step={0.1}
          onChange={v => v && dataChanged({ ...data, roe: v })}
        />
        <InputNumber
          placeholder="ROIC"
          defaultValue={data.roic}
          step={0.1}
          onChange={v => v && dataChanged({ ...data, roic: v })}
        />
        <InputNumber
          placeholder="Debt over Earnings"
          defaultValue={data.debt}
          min={0}
          step={0.1}
          onChange={v => v && dataChanged({ ...data, debt: v })}
        />
      </Input.Group>

      <Input
        placeholder="Comment"
        defaultValue={data.comment}
        onChange={e => dataChanged({ ...data, comment: e.target.value })}
      />
    </>
  );
};

export default StoryPartWrap(StoryManagement);
