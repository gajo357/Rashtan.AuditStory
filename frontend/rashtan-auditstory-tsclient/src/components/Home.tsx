import React, { useEffect } from "react";
import { History } from "history";
import { PageHeader, Icon, Drawer, List, Tag } from "antd";
import IApiService from "../services/IApiService";
import { CompanyQuickInfo } from "../models/Company";
import { showError } from "../models/Errors";
import Category from "../models/Category";
import MainMenu from "./MainMenu";

interface Props {
  apiService: IApiService;
  logOut: () => void;
  history: History;
}

const Home: React.FC<Props> = ({ apiService, logOut, history }) => {
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState<Category | undefined>();
  const [companies, setCompanies] = React.useState<CompanyQuickInfo[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [favourite, setFavourite] = React.useState(false);

  useEffect(() => {
    apiService
      .getCompanies()
      .then(setCompanies)
      .catch(showError);
  }, [apiService]);

  useEffect(() => {
    apiService
      .getCategories()
      .then(setCategories)
      .catch(showError);
  }, [apiService]);

  const categoryToColorMap = (name: string) => {
    const c = categories.find(c => c.name === name);
    return c ? c.color : "#FFFFFF";
  };
  const onClose = () => setOpen(false);

  const toggleFavourite = () => {
    setFavourite(!favourite);
    onClose();
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
          onCategoryAdded={c => {
            apiService
              .getCategories()
              .then(setCategories)
              .catch(showError)
              .finally(() => {
                setCategory(c);
                onClose();
              });
          }}
          onCategorySelected={c => {
            setCategory(c);
            onClose();
          }}
          clearFilters={() => {
            setCategory(undefined);
            setFavourite(false);
            onClose();
          }}
          onFavouriteSelected={toggleFavourite}
          favourite={favourite}
          categories={categories}
          logOut={logOut}
          history={history}
        ></MainMenu>
      </Drawer>
      <PageHeader
        title={category ? category.name : "All stories"}
        backIcon={<Icon type="menu"></Icon>}
        onBack={() => setOpen(true)}
      >
        <List
          itemLayout="vertical"
          dataSource={companies.filter(
            s =>
              (!category || s.category === category.name) &&
              (!favourite || s.star)
          )}
          renderItem={(item: CompanyQuickInfo) => {
            const favs = [];
            if (item.star) favs.push(<Icon key="star" type="star-o" />);
            if (item.flags)
              favs.push(
                <span key="flag">
                  <Icon
                    type="flag"
                    theme="twoTone"
                    twoToneColor="red"
                    style={{ marginRight: 8 }}
                  />
                  {item.flags}
                </span>
              );
            return (
              <List.Item
                style={{ backgroundColor: categoryToColorMap(item.category) }}
                onClick={() => history.push(`/story/${item.id}`)}
                actions={item.tags.map(tag => (
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
    </div>
  );
};

export default Home;
