import React, { useState } from "react";
import { History } from "history";

import {
  BookTwoTone,
  LogoutOutlined,
  SettingOutlined,
  StarTwoTone,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Menu, Modal, Input, Form } from "antd";
import { CirclePicker } from "react-color";
import IApiService from "../services/IApiService";
import Category from "../models/Category";
import { showError } from "../models/Errors";

interface Props {
  categories: Category[];
  onCategorySelected: (category: Category) => void;
  onCategoryAdded: (category: Category) => void;
  onFavouriteSelected: () => void;
  clearFilters: () => void;
  favourite: boolean;
  apiService: IApiService;
  logOut: () => void;
  history: History;
}

const MainMenu: React.FC<Props> = ({
  categories,
  onCategorySelected,
  onCategoryAdded,
  onFavouriteSelected,
  clearFilters,
  favourite,
  apiService,
  logOut,
}) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [visible, setVisible] = useState(false);
  const [savingCategory, setSavingCategory] = useState(false);

  const handleOk = () => {
    setSavingCategory(true);
    apiService
      .saveCategory({ name: name, color: color })
      .then(onCategoryAdded)
      .catch(showError)
      .finally(() => {
        setVisible(false);
        setSavingCategory(false);
        setName("");
        setColor("");
      });
  };

  return (
    <div>
      <Modal
        title="New company category"
        visible={visible}
        confirmLoading={savingCategory}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <Form>
          <Form.Item>
            <CirclePicker
              color={color}
              onChangeComplete={(c) => setColor(c.hex)}
            ></CirclePicker>
            <BookTwoTone twoToneColor={color}></BookTwoTone>
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            ></Input>
          </Form.Item>
        </Form>
      </Modal>

      <Menu selectable={false} mode="vertical">
        <Menu.ItemGroup>
          <Menu.Item onClick={() => clearFilters()}>
            <UnorderedListOutlined />
            All stories
          </Menu.Item>
          <Menu.Item onClick={() => onFavouriteSelected()}>
            <StarTwoTone twoToneColor={favourite ? "#FFEB3B" : "#555555"} />
            My favourites
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.Divider></Menu.Divider>
        <Menu.ItemGroup title="Categories">
          {categories.map((c) => (
            <Menu.Item onClick={() => onCategorySelected(c)} key={c.name}>
              <BookTwoTone twoToneColor={c.color} />
              {c.name}
            </Menu.Item>
          ))}
          <Menu.Item onClick={() => setVisible(true)}>New</Menu.Item>
        </Menu.ItemGroup>
        <Menu.Divider></Menu.Divider>
        <Menu.ItemGroup>
          <Menu.Item>
            <SettingOutlined />
            Settings
          </Menu.Item>
          <Menu.Item onClick={logOut}>
            <LogoutOutlined />
            LOG OUT
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </div>
  );
};

export default MainMenu;
