import React, { useEffect } from "react";
import { History } from "history";
import { PageHeader, Icon, Drawer, List } from "antd";
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
  const [category, setCategory] = React.useState("");
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
    return c ? c.color : "#0000";
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
                setCategory(c.name);
                onClose();
              });
          }}
          onCategorySelected={c => {
            setCategory(c.name);
            onClose();
          }}
          clearFilters={() => {
            setCategory("");
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
        title={category ? category : "All stories"}
        backIcon={<Icon type="menu"></Icon>}
        onBack={() => setOpen(true)}
      >
        <List
          dataSource={companies.filter(
            c =>
              (category === "" || c.category === category) &&
              (!favourite || c.star)
          )}
          renderItem={(item: CompanyQuickInfo) => (
            <List.Item
              color={categoryToColorMap(item.category)}
              onClick={() => history.push(`/story/${item.id}`)}
              actions={[
                item.star && <Icon type="star-o" />,
                item.flags > 0 && (
                  <span>
                    <Icon type="flag-o" style={{ marginRight: 8 }} />
                    {item.flags}
                  </span>
                )
              ]}
            >
              <List.Item.Meta
                title={item.name}
                description={item.dateEdited.toLocaleString()}
              />
            </List.Item>
          )}
        ></List>
      </PageHeader>
    </div>
  );
};

export default Home;
