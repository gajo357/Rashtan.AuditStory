import React from "react";
import { Layout, Icon, Menu } from "antd";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
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
        <a
          href="https://portal.auditstory.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Portal
        </a>
      </Menu>
    </Layout.Header>
  );
};

export default Header;
