import React, { useState } from "react";
import { Dropdown, Menu, Modal } from "antd";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import AddUniqueValue from "../AddUniqueValue";
import { CompanyStory } from "../../models/Company";
import styles from "./Story-styles";

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

  const menu = (
    <Menu selectable={false}>
      <Menu.Item
        onClick={() => {
          setCustomPartModal(true);
        }}
        disabled={saving}
      >
        <PlusCircleOutlined />
        Custom part
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          Modal.confirm({
            title: "Are you sure delete this story?",
            onOk() {
              remove();
            },
          });
        }}
        disabled={saving}
      >
        <DeleteOutlined />
        Delete
      </Menu.Item>
    </Menu>
  );

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
      <Dropdown key="more" overlay={menu}>
        <MoreOutlined style={styles.moreButton} />
      </Dropdown>
    </>
  );
};

export default StoryMenu;
