import React, { useState } from "react";
import { Dropdown, Menu, Button, Modal } from "antd";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  SaveOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import AddCustomPart from "./AddCustomPart";
import { CompanyStory } from "../../models/Company";
import styles from "./Story-styles";

interface Props {
  company: CompanyStory;
  saving: boolean;
  save: () => void;
  remove: () => void;
  addCustomPart: (title: string) => void;
}

const StoryMenu: React.FC<Props> = ({
  company,
  save,
  remove,
  addCustomPart,
  saving,
}) => {
  const [customPartModal, setCustomPartModal] = useState(false);

  const menu = (company: CompanyStory) => (
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
      <Menu.Item onClick={() => save()} disabled={saving}>
        <SaveOutlined />
        Save
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <AddCustomPart
        visible={customPartModal}
        company={company}
        onCreate={(title) => {
          addCustomPart(title);
          setCustomPartModal(false);
        }}
        onCancel={() => setCustomPartModal(false)}
      />
      <Dropdown key="more" overlay={menu(company)}>
        <Button icon={<MoreOutlined />} style={styles.moreButton} />
      </Dropdown>
    </>
  );
};

export default StoryMenu;
