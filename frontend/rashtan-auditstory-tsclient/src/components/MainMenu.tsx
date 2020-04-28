import React, { useState } from "react";
import { History } from "history";
import {
  LogoutOutlined,
  UnorderedListOutlined,
  BookFilled,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Button, Row, Col } from "antd";
import NewCategoryEdit from "./NewCategoryEdit";
import IApiService from "../services/IApiService";
import Category from "../models/Category";
import { QuickInfoDto } from "../models/Company";
import { showError } from "../models/Errors";

export interface CompanyFilter {
  title: string;
  predicate: (c: QuickInfoDto) => boolean;
}

export const createCategoryFilter: (c: Category) => CompanyFilter = (
  category: Category
) => ({
  title: category.name,
  predicate: (comp: QuickInfoDto) => comp.category === category.name,
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

  return (
    <div>
      <NewCategoryEdit
        visible={visible}
        categories={categories}
        onClose={() => setVisible(false)}
        onCreate={(category) =>
          apiService
            .saveCategory(category)
            .then(onCategoryAdded)
            .catch(showError)
            .finally(() => {
              setVisible(false);
            })
        }
      />
      <Menu selectable={false} mode="vertical">
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
        <Menu.Divider></Menu.Divider>
        <Menu.ItemGroup
          title={
            <Row>
              <Col flex="auto">CATEGORIES</Col>
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
        <Menu.Item onClick={() => history.push("/account")}>
          <UserOutlined />
          Account
        </Menu.Item>
        <Menu.Item onClick={logOut}>
          <LogoutOutlined />
          LOG OUT
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default MainMenu;
