import React, { useState } from "react";
import { History } from "history";
import {
  LogoutOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  BookFilled,
  StarOutlined,
} from "@ant-design/icons";
import { Menu, Modal, Input, Form, Button, Row, Col } from "antd";
import ColorPicker from "./ColorPicker";
import IApiService from "../services/IApiService";
import Category from "../models/Category";
import { CompanyQuickInfo } from "../models/Company";
import { showError } from "../models/Errors";

export interface CompanyFilter {
  title: string;
  predicate: (c: CompanyQuickInfo) => boolean;
}

export const createCategoryFilter: (c: Category) => CompanyFilter = (
  category: Category
) => ({
  title: category.name,
  predicate: (comp: CompanyQuickInfo) => comp.category === category.name,
});

interface Props {
  categories: Category[];
  onCategoryAdded: (category: Category) => void;
  setFilter: (f: CompanyFilter | undefined) => void;
  apiService: IApiService;
  logOut: () => void;
  history: History;
}

const MainMenu: React.FC<Props> = ({
  categories,
  onCategoryAdded,
  setFilter,
  apiService,
  logOut,
  history,
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
            <ColorPicker />
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
          <Menu.Item onClick={() => setFilter(undefined)}>
            <UnorderedListOutlined />
            All stories
          </Menu.Item>
          <Menu.Item
            onClick={() =>
              setFilter({ title: "My favourites", predicate: (c) => c.star })
            }
          >
            <StarOutlined />
            My favourites
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.Divider></Menu.Divider>
        <Menu.ItemGroup
          title={
            <Row>
              <Col flex="auto">Categories</Col>
              <Col flex="30px">
                <Button
                  style={{ position: "relative", top: -5 }}
                  type="link"
                  onClick={() => history.push("/editCategories")}
                >
                  EDIT
                </Button>
              </Col>
            </Row>
          }
        >
          {categories.map((c) => (
            <Menu.Item
              onClick={() => setFilter(createCategoryFilter(c))}
              key={c.name}
            >
              <BookFilled style={{ color: c.color }} />
              {c.name}
            </Menu.Item>
          ))}
          <Menu.Item onClick={() => setVisible(true)}>
            <Button type="link">NEW</Button>
          </Menu.Item>
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
