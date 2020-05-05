import React, { useState } from "react";
import { History } from "history";
import {
  LogoutOutlined,
  UnorderedListOutlined,
  BookFilled,
  StarOutlined,
  UserOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  CopyrightOutlined,
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
        <Menu.Item
          onClick={() => setFilter(undefined)}
          icon={<UnorderedListOutlined />}
        >
          All stories
        </Menu.Item>
        <Menu.Item
          onClick={() =>
            setFilter({ title: "My favourites", predicate: (c) => c.star })
          }
          icon={<StarOutlined />}
        >
          My favourites
        </Menu.Item>
        <Menu.Divider />
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
              icon={<BookFilled style={{ color: c.color }} />}
            >
              {c.name}
            </Menu.Item>
          ))}
          <Menu.Item onClick={() => setVisible(true)}>
            <Button type="link">NEW</Button>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.Divider />
        <Menu.Item
          onClick={() => history.push("/account")}
          icon={<UserOutlined />}
        >
          Account
        </Menu.Item>
        <Menu.Item icon={<QuestionCircleOutlined />}>Help</Menu.Item>
        <Menu.Item icon={<MessageOutlined />}>Send feedback</Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={logOut} icon={<LogoutOutlined />}>
          LOG OUT
        </Menu.Item>

        <Menu.Item onClick={() => history.push("/terms")}>
          <strong>Terms</strong>
        </Menu.Item>
        <Menu.Item style={{ marginTop: 40 }}>
          <CopyrightOutlined />
          2020 Rashtan
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default MainMenu;
