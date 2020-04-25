import React from "react";
import { Typography } from "antd";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

const ReadOnlyTextEdit: React.FC<Props> = ({ value }) => (
  <Typography.Text>{value}</Typography.Text>
);

export default ReadOnlyTextEdit;
