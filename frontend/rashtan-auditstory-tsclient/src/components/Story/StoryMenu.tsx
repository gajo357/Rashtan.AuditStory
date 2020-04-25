import React from "react";
import { Modal, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface Props {
  saving: boolean;
  remove: () => void;
}

const StoryMenu: React.FC<Props> = ({ remove, saving }) => {
  return (
    <Tooltip title="Delete story">
      <DeleteOutlined
        onClick={() => {
          !saving &&
            Modal.confirm({
              title: "Are you sure delete this story?",
              onOk() {
                remove();
              },
            });
        }}
        spin={saving}
      />
    </Tooltip>
  );
};

export default StoryMenu;
