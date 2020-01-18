import React, { useState } from "react";
import { History } from "history";
import { Menu, Icon, Modal, Form, Input } from "antd";
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
  logOut
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
              onChangeComplete={c => setColor(c.hex)}
            ></CirclePicker>
            <Icon type="book" theme="twoTone" twoToneColor={color}></Icon>
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Name"
              onChange={e => setName(e.target.value)}
            ></Input>
          </Form.Item>
        </Form>
      </Modal>

      <Menu selectable={false} mode="vertical">
        <Menu.ItemGroup>
          <Menu.Item onClick={() => clearFilters()}>
            <Icon type="unordered-list" />
            All stories
          </Menu.Item>
          <Menu.Item onClick={() => onFavouriteSelected()}>
            <Icon
              type="star"
              theme="twoTone"
              twoToneColor={favourite ? "#FFEB3B" : "#555555"}
            />
            My favourites
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.Divider></Menu.Divider>
        <Menu.ItemGroup title="Categories">
          {categories.map(c => (
            <Menu.Item onClick={() => onCategorySelected(c)} key={c.name}>
              <Icon type="book" theme="twoTone" twoToneColor={c.color} />
              {c.name}
            </Menu.Item>
          ))}
          <Menu.Item onClick={() => setVisible(true)}>New</Menu.Item>
        </Menu.ItemGroup>
        <Menu.Divider></Menu.Divider>
        <Menu.ItemGroup>
          <Menu.Item>
            <Icon type="setting" />
            Settings
          </Menu.Item>
          <Menu.Item onClick={logOut}>
            <Icon type="logout" />
            LOG OUT
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </div>
  );
};

export default MainMenu;
