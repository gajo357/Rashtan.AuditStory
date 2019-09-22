import React from "react";
import { Layout } from "antd";
import SideNavBar from "./SideNavBar";
import ApiService from "../services/ApiService";
import Footer from "./Footer";

interface PortalProps {
  apiService: ApiService;
  children: React.ReactNode;
  logOut: () => void;
}

const PortalLayout: React.FC<PortalProps> = ({
  apiService,
  children,
  logOut
}) => {
  if (!apiService.authService.isAuthenticated()) {
    apiService.authService.logIn();
    return <></>;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideNavBar apiService={apiService} logOut={logOut} />
      <Layout>
        <Layout.Content>{children}</Layout.Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default PortalLayout;
