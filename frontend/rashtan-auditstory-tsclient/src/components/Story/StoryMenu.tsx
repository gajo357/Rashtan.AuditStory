import React, { useState } from "react";
import { Modal, Space, Tooltip } from "antd";
import { DeleteOutlined, SisternodeOutlined } from "@ant-design/icons";
import AddUniqueValue from "../AddUniqueValue";
import { CompanyStory } from "../../models/Company";

interface Props {
  company: CompanyStory;
  saving: boolean;
  remove: () => void;
  addCustomPart: (title: string) => void;
}

const StoryMenu: React.FC<Props> = ({
  company,
  remove,
  addCustomPart,
  saving,
}) => {
  const [customPartModal, setCustomPartModal] = useState(false);

  return (
    <>
      <AddUniqueValue
        title="New Chapter"
        visible={customPartModal}
        existingItems={company.parts.map((c) => c.title)}
        onCreate={(title) => {
          addCustomPart(title);
          setCustomPartModal(false);
        }}
        onCancel={() => setCustomPartModal(false)}
      />
      <Space style={{ position: "relative", top: -7 }}>
        <Tooltip title="Add custom chapter">
          <SisternodeOutlined
            onClick={() => {
              setCustomPartModal(true);
            }}
          />
        </Tooltip>
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
      </Space>
    </>
  );
};

export default StoryMenu;
