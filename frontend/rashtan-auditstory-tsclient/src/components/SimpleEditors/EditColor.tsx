import React, { useState } from "react";
import { Popover } from "antd";
import ColorPicker from "./ColorPicker";
import { BookFilled } from "@ant-design/icons";

interface Props {
  value?: string;
  onChange?: (v: string) => void;
}

const EditColor: React.FC<Props> = ({ value, onChange }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Popover
      title="Pick a color"
      trigger="click"
      visible={visible}
      onVisibleChange={setVisible}
      content={
        <ColorPicker
          value={value}
          onChange={(v) => {
            setVisible(false);
            onChange && onChange(v);
          }}
        />
      }
    >
      <BookFilled style={{ color: value }} />
    </Popover>
  );
};

export default EditColor;
