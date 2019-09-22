import React from "react";
import { Layout, Icon, Menu } from "antd";
import { Link } from "react-router-dom";

interface HeaderProps {
  loggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
}

const Header: React.FC<HeaderProps> = ({
  loggedIn,
  logIn,
  logOut
}: HeaderProps) => {
  return (
    <Layout.Header>
      <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
        <Menu.Item key="0">
          <Link to="/">
            <Icon type="wallet" />
          </Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/contact">Contact</Link>
        </Menu.Item>
        {loggedIn && (
          <Menu.Item key="3">
            <Link to="/portal">Portal</Link>
          </Menu.Item>
        )}
        {loggedIn && (
          <Menu.Item key="4" color="primary" onClick={logOut}>
            Log out
          </Menu.Item>
        )}
        {!loggedIn && (
          <Menu.Item key="5" color="primary" onClick={logIn}>
            Log in
          </Menu.Item>
        )}
      </Menu>
    </Layout.Header>
  );
};

export default Header;
