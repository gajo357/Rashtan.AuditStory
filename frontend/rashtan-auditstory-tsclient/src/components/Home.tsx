import React, { useEffect, CSSProperties, useState } from "react";
import { History } from "history";
import {
  FlagTwoTone,
  MenuOutlined,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import { PageHeader, Drawer, List, Tag } from "antd";
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

const storyItemStyle: (c: string) => CSSProperties = (color: string) => ({
  cursor: "pointer",
  backgroundColor: color,
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
      <PageHeader
        title={filter ? filter.title : "All stories"}
        backIcon={<MenuOutlined></MenuOutlined>}
        onBack={() => setOpen(true)}
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
                style={storyItemStyle(categoryToColorMap(item.category))}
                onClick={() => openStory(item.id)}
                actions={item.tags.map((tag) => (
                  <Tag>{tag}</Tag>
                ))}
              >
                <List.Item.Meta
                  title={item.name}
                  description={item.dateEdited.toLocaleString()}
                />
                {favs}
              </List.Item>
            );
          }}
        ></List>
      </PageHeader>

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
