import React, { useState } from "react";
import { History } from "history";
import {
  BookTwoTone,
  LogoutOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Menu, Modal, Input, Form } from "antd";
import IApiService from "../services/IApiService";
import Category from "../models/Category";
import StarEdit from "./StarEdit";
import EditColor from "./EditColor";
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
  const [visible, setVisible] = useState(false);
  const [savingCategory, setSavingCategory] = useState(false);

  const [form] = Form.useForm();

  const validateNewCategory = (_: any, value: string) => {
    if (!value) return Promise.reject("A value is required");
    if (categories.find((p) => p.name === value))
      return Promise.reject("Entry has to be unique");

    return Promise.resolve();
  };

  const handleOk = (values: Category) => {
    setSavingCategory(true);
    apiService
      .saveCategory(values)
      .then(onCategoryAdded)
      .catch(showError)
      .finally(() => {
        setVisible(false);
        setSavingCategory(false);
      });
  };

  return (
    <div>
      <Modal
        title="New company category"
        visible={visible}
        confirmLoading={savingCategory}
        onOk={() => {
          form.validateFields().then((values) => {
            form.resetFields();
            console.log(values);
            handleOk(values as Category);
          });
        }}
        onCancel={() => {
          form.resetFields();
          setVisible(false);
        }}
      >
        <Form form={form}>
          <Form.Item name="color" rules={[{ required: true }]}>
            <EditColor />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[{ required: true, validator: validateNewCategory }]}
          >
            <Input placeholder="Name" />
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
            <StarEdit value={favourite} />
            Only favourites
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
