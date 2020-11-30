import React, { useEffect, CSSProperties, useState } from "react";
import { History } from "history";
import { FlagTwoTone, MenuOutlined, PlusCircleFilled } from "@ant-design/icons";
import { Drawer, List, Tag, Space, Input } from "antd";
import Page from "./Page";
import { QuickInfoDto } from "../models/Company";
import { showError } from "../models/Errors";
import Category from "../models/Category";
import MainMenu, { CompanyFilter, createCategoryFilter } from "./MainMenu";
import AddUniqueValue from "./AddUniqueValue";
import EditStar from "./SimpleEditors/EditStar";
import { stringMatch } from "../models/Helpers";
import withLogin from "./withLogin";
import { useApiService } from "../context/ApiProvider";

const createStoryStyle: CSSProperties = {
  position: "fixed",
  bottom: 20,
  right: 20,
  fontSize: 50,
  color: "#388E3C"
};

const searchStyle = {
  style: { margin: "0 auto", marginBottom: 20, maxWidth: 600 } as CSSProperties
};

const storyItemStyle = (color: string) => ({
  style: {
    cursor: "pointer",
    backgroundColor: color,
    borderRadius: "20px",
    margin: 5
  } as CSSProperties
});

interface Props {
  history: History;
}

const Home: React.FC<Props> = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [createStoryVisible, setCreateStoryVisible] = useState(false);
  const [filter, setFilter] = useState<CompanyFilter | undefined>();
  const [companies, setCompanies] = useState<QuickInfoDto[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchText, setSearchText] = useState("");
  const { getCategories, getCompanies, createNewStory } = useApiService();

  useEffect(() => {
    setLoading(true);
    getCategories().then(setCategories).catch(showError);
    getCompanies()
      .then(setCompanies)
      .catch(showError)
      .finally(() => setLoading(false));

    return () => setCreateStoryVisible(false);
  }, []);

  const categoryToColorMap = (name: string) => {
    const c = categories.find(c => c.name === name);
    return (c ? c.color : "#FFFFFF") + "50";
  };
  const onClose = () => setMenuOpen(false);

  const openStory = (id: string) => {
    history.push(`/story/${id}`);
  };

  const companySearchFilter = (c: QuickInfoDto) => {
    const localMatch = stringMatch(searchText);

    return (
      localMatch(c.name) ||
      c.tags.find(localMatch) !== undefined ||
      localMatch(c.category)
    );
  };

  return (
    <div>
      <Drawer
        title="AuditStory"
        placement="left"
        onClose={onClose}
        visible={menuOpen}
      >
        <MainMenu
          onCategoryAdded={c => {
            getCategories()
              .then(setCategories)
              .catch(showError)
              .finally(() => {
                setFilter(createCategoryFilter(c));
                onClose();
              });
          }}
          setFilter={f => {
            setFilter(f);
            onClose();
          }}
          categories={categories}
          history={history}
        />
      </Drawer>
      <Page
        loading={loading}
        title={filter ? filter.title : "All stories"}
        backIcon={
          <MenuOutlined onClick={() => setMenuOpen(v => !v)}></MenuOutlined>
        }
      >
        <div>
          <Input.Search
            onChange={e => setSearchText(e ? e.target.value : "")}
            size="large"
            enterButton
            {...searchStyle}
            placeholder="Search by company name, tags or category"
          />
          <List
            itemLayout="vertical"
            dataSource={companies.filter(
              company =>
                (!filter || filter.predicate(company)) &&
                companySearchFilter(company)
            )}
            renderItem={(item: QuickInfoDto) => {
              const favs = [];
              if (item.star) favs.push(<EditStar value key="star" />);
              if (item.flags)
                favs.push(
                  <span key="flag" style={{ marginRight: 10 }}>
                    <FlagTwoTone
                      twoToneColor="red"
                      style={{ marginRight: 8 }}
                    />
                    {item.flags}
                  </span>
                );
              return (
                <List.Item
                  {...storyItemStyle(categoryToColorMap(item.category))}
                  onClick={() => openStory(item.id)}
                  actions={item.tags.map(tag => (
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
          />
        </div>
      </Page>

      <AddUniqueValue
        title="Company name"
        visible={createStoryVisible}
        onCancel={() => setCreateStoryVisible(false)}
        onCreateAsync={title =>
          createNewStory({ name: title })
            .then(openStory)
            .catch(e => {
              setCreateStoryVisible(false);
              showError(e);
            })
        }
        existingItems={companies.map(m => m.name)}
      />

      <PlusCircleFilled
        {...{ style: createStoryStyle }}
        onClick={() => setCreateStoryVisible(true)}
      />
    </div>
  );
};

export default withLogin(Home);
