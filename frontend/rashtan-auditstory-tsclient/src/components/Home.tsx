import React, { useEffect, CSSProperties, useState } from "react";
import { History } from "history";
import {
  FlagTwoTone,
  MenuOutlined,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import { Drawer, List, Tag, Space } from "antd";
import Page from "./Page";
import IApiService from "../services/IApiService";
import { CompanyQuickInfo } from "../models/Company";
import { showError } from "../models/Errors";
import Category from "../models/Category";
import MainMenu, { CompanyFilter, createCategoryFilter } from "./MainMenu";
import AddUniqueValue from "./AddUniqueValue";
import EditStar from "./SimpleEditors/EditStar";

const createStoryStyle: CSSProperties = {
  position: "fixed",
  bottom: 20,
  right: 20,
  fontSize: 36,
};

const storyItemStyle = (color: string) => ({
  style: {
    cursor: "pointer",
    backgroundColor: color,
    borderRadius: "20px",
    margin: 5,
  } as CSSProperties,
});

interface Props {
  apiService: IApiService;
  logOut: () => void;
  history: History;
}

const Home: React.FC<Props> = ({ apiService, logOut, history }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [createStoryVisible, setCreateStoryVisible] = useState(false);
  const [filter, setFilter] = useState<CompanyFilter | undefined>();
  const [companies, setCompanies] = useState<CompanyQuickInfo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setLoading(true);
    apiService.getCategories().then(setCategories).catch(showError);
    apiService
      .getCompanies()
      .then(setCompanies)
      .catch(showError)
      .finally(() => setLoading(false));

    return () => setCreateStoryVisible(false);
  }, [apiService]);

  const categoryToColorMap = (name: string) => {
    const c = categories.find((c) => c.name === name);
    return (c ? c.color : "#FFFFFF") + "50";
  };
  const onClose = () => setOpen(false);

  const openStory = (id: string) => {
    history.push(`/story/${id}`);
  };

  return (
    <div>
      <Drawer
        title="AuditStory"
        placement="left"
        onClose={onClose}
        visible={open}
      >
        <MainMenu
          apiService={apiService}
          onCategoryAdded={(c) => {
            apiService
              .getCategories()
              .then(setCategories)
              .catch(showError)
              .finally(() => {
                setFilter(createCategoryFilter(c));
                onClose();
              });
          }}
          setFilter={(f) => {
            setFilter(f);
            onClose();
          }}
          categories={categories}
          logOut={logOut}
          history={history}
        />
      </Drawer>
      <Page
        title={filter ? filter.title : "All stories"}
        backIcon={<MenuOutlined onClick={() => setOpen(true)}></MenuOutlined>}
      >
        <List
          loading={loading}
          itemLayout="vertical"
          dataSource={companies.filter(
            (company) => !filter || filter.predicate(company)
          )}
          renderItem={(item: CompanyQuickInfo) => {
            const favs = [];
            if (item.star) favs.push(<EditStar value key="star" />);
            if (item.flags)
              favs.push(
                <span key="flag" style={{ marginRight: 10 }}>
                  <FlagTwoTone twoToneColor="red" style={{ marginRight: 8 }} />
                  {item.flags}
                </span>
              );
            return (
              <List.Item
                {...storyItemStyle(categoryToColorMap(item.category))}
                onClick={() => openStory(item.id)}
                actions={item.tags.map((tag) => (
                  <Tag>{tag}</Tag>
                ))}
              >
                <List.Item.Meta
                  title={
                    <Space>
                      {item.name}
                      {item.star && <EditStar value />}
                      {item.flags > 0 && (
                        <span>
                          <FlagTwoTone
                            twoToneColor="red"
                            style={{ marginRight: 2 }}
                          />
                          {item.flags}
                        </span>
                      )}
                    </Space>
                  }
                  description={item.dateEdited.toLocaleString()}
                />
              </List.Item>
            );
          }}
        ></List>
      </Page>

      <AddUniqueValue
        title="Company name"
        visible={createStoryVisible}
        onCancel={() => setCreateStoryVisible(false)}
        onCreate={(title) => {
          apiService
            .createNewStory({ name: title })
            .then(openStory)
            .catch((e) => {
              setCreateStoryVisible(false);
              showError(e);
            });
        }}
        existingItems={companies.map((m) => m.name)}
      />

      <PlusCircleTwoTone
        style={createStoryStyle}
        onClick={() => setCreateStoryVisible(true)}
      />
    </div>
  );
};

export default Home;
