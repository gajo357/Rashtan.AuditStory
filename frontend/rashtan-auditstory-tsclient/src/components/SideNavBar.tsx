import React, { useEffect } from "react";
import { Menu, Icon, Layout, Divider } from "antd";
import ApiService from "../services/ApiService";
import { Link } from "react-router-dom";

export interface SideElement {
  to: string;
  icon: React.ReactElement;
  text: string;
  subItems?: SideElement[];
}

const mainElements: () => SideElement[] = () => {
  return [
    {
      to: "/newstory",
      icon: <Icon type="file-add" />,
      text: "New story"
    },
    {
      to: "/",
      icon: <Icon type="dashboard" />,
      text: "Dashboard"
    },
    {
      to: "",
      icon: <Icon type="folder" />,
      text: "Folders",
      subItems: []
    },
    {
      to: "/reports",
      icon: <Icon type="bar-chart" />,
      text: "Reports"
    },
    {
      to: "/account",
      icon: <Icon type="user" />,
      text: "Account"
    }
  ];
};

interface Props {
  apiService: ApiService;
  logOut: () => void;
}

const SideNavBar: React.FC<Props> = ({ apiService, logOut }) => {
  const [open, setOpen] = React.useState(true);
  const [elements, setElements] = React.useState(mainElements());

  useEffect(() => {
    apiService.getFolders().then(folders => {
      const e = mainElements();
      const folder = e.find(f => f.text === "Folders");
      if (folder) {
        folder.subItems = folders.map(f => ({
          to: `/folder/${f}`,
          icon: <Icon type="folder-open" />,
          text: f
        }));
        setElements(e);
      }
    });
  }, [apiService]);

  const onCollapse = (collapsed: boolean) => {
    setOpen(!collapsed);
  };

  const renderElement = ({ icon, text, to }: SideElement) => {
    return (
      <Menu.Item key={text}>
        <Link to={to}>
          {icon}
          <span>{text}</span>
        </Link>
      </Menu.Item>
    );
  };

  return (
    <Layout.Sider collapsible collapsed={!open} onCollapse={onCollapse}>
      <Menu theme="dark" mode="inline">
        {elements.map(e =>
          e.subItems ? (
            e.subItems.length === 0 ? (
              <></>
            ) : (
              <Menu.SubMenu
                key={e.text}
                title={
                  <span>
                    {e.icon}
                    <span>{e.text}</span>
                  </span>
                }
              >
                {e.subItems.map(renderElement)}
              </Menu.SubMenu>
            )
          ) : (
            renderElement(e)
          )
        )}

        <Divider />

        <Menu.Item key="Logout" onClick={_ => logOut()}>
          <Icon type="logout"></Icon>
          <span>Log out</span>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default SideNavBar;
