import React from "react";
import { Input, InputNumber } from "antd";
import { CompanyProfile } from "../../models/Company";

interface Props {
  onChange: (profile: CompanyProfile) => void;
  profile: CompanyProfile;
}

const StoryProfile: React.FC<Props> = ({ profile, onChange }) => {
  return (
    <>
      <Input
        placeholder="Company name"
        defaultValue={profile.name}
        onChange={e => onChange({ ...profile, name: e.target.value })}
        required
      />

      <Input.Group compact>
        <InputNumber
          placeholder="Number of shares outstanding"
          min={1}
          step={1}
          defaultValue={profile.numberOfShares}
          onChange={e => e && onChange({ ...profile, numberOfShares: e })}
          required
        />
        <InputNumber
          placeholder="Market cap"
          min={0}
          step={1}
          defaultValue={profile.marketCap}
          onChange={e => e && onChange({ ...profile, marketCap: e })}
          required
        />
      </Input.Group>

      <Input
        placeholder="Industry"
        defaultValue={profile.industry}
        onChange={e => onChange({ ...profile, industry: e.target.value })}
        required
      />
      <Input
        placeholder="Folder"
        defaultValue={profile.folder}
        onChange={e => onChange({ ...profile, folder: e.target.value })}
        required
      />
    </>
  );
};

export default StoryProfile;
