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
  CopyrightOutlined
} from "@ant-design/icons";
import { Menu, Button, Row, Col } from "antd";
import NewCategoryEdit from "./NewCategoryEdit";
import EmailSender from "./EmailSender";
import Category from "../models/Category";
import { QuickInfoDto } from "../models/Company";
import { showError } from "../models/Errors";
import { useApiService } from "../context/ApiProvider";
import { useAuthContext } from "../context/AuthProvider";

export interface CompanyFilter {
  title: string;
  predicate: (c: QuickInfoDto) => boolean;
}

export const createCategoryFilter: (c: Category) => CompanyFilter = (
  category: Category
) => ({
  title: category.name,
  predicate: (comp: QuickInfoDto) => comp.category === category.name
});

interface Props {
  categories: Category[];
  onCategoryAdded: (category: Category) => void;
  setFilter: (f: CompanyFilter | undefined) => void;
  history: History;
}

const MainMenu: React.FC<Props> = ({
  categories,
  onCategoryAdded,
  setFilter,
  history
}) => {
  const [newCategoryVisible, setNewCategoryVisible] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [helpVisible, setHelpVisible] = useState(false);
  const { sendFeedback, askForHelp, saveCategory } = useApiService();
  const { logOut } = useAuthContext();

  return (
    <div>
      <NewCategoryEdit
        visible={newCategoryVisible}
        categories={categories}
        onClose={() => setNewCategoryVisible(false)}
        onCreate={category =>
          saveCategory(category)
            .then(onCategoryAdded)
            .catch(showError)
            .finally(() => {
              setNewCategoryVisible(false);
            })
        }
      />

      <EmailSender
        title="Send feedback"
        visible={feedbackVisible}
        onSend={sendFeedback}
        onClose={() => setFeedbackVisible(false)}
      />
      <EmailSender
        title="Ask for help"
        visible={helpVisible}
        onSend={askForHelp}
        onClose={() => setHelpVisible(false)}
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
            setFilter({ title: "My favourites", predicate: c => c.star })
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
          {categories.map(c => (
            <Menu.Item
              onClick={() => setFilter(createCategoryFilter(c))}
              key={c.name}
              icon={<BookFilled style={{ color: c.color }} />}
            >
              {c.name}
            </Menu.Item>
          ))}
          <Menu.Item onClick={() => setNewCategoryVisible(true)}>
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
        <Menu.Item
          onClick={() => setHelpVisible(true)}
          icon={<QuestionCircleOutlined />}
        >
          Help
        </Menu.Item>
        <Menu.Item
          onClick={() => setFeedbackVisible(true)}
          icon={<MessageOutlined />}
        >
          Send feedback
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={logOut} icon={<LogoutOutlined />}>
          LOG OUT
        </Menu.Item>

        <Menu.Item onClick={() => history.push("/terms")}>
          <strong>Terms</strong>
        </Menu.Item>
        <Menu.Item style={{ marginTop: 40 }}>
          <CopyrightOutlined />
          2020 AuditStory
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default MainMenu;
