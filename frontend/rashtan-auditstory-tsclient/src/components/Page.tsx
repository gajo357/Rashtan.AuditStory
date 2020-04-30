import React, { CSSProperties } from "react";
import { Spin } from "antd";

const headerHeight = 56;

const baseStyle: CSSProperties = {
  display: "flex",
};

const headerStyle = {
  style: {
    ...baseStyle,
    position: "fixed",
    top: 0,
    left: 0,
    height: headerHeight,
    minWidth: "100%",
    backgroundColor: "rgba(33, 33, 33, 0.98)",
    padding: "0 16px",
    alignItems: "center",
    justifyContent: "space-between",
    color: "white",
    zIndex: 2020,
  } as CSSProperties,
};

const bodyStyle = {
  style: {
    paddingTop: headerHeight + 10,
    paddingLeft: 10,
    paddingRight: 10,
    minWidth: "100%",
    minHeight: "100%",
  } as CSSProperties,
};

const titleStyle = {
  style: {
    ...baseStyle,
    flex: 1,
    paddingLeft: "5px",
    justifyContent: "flex-start",
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontSize: 24,
  } as CSSProperties,
};

const iconStyle: CSSProperties = {
  ...baseStyle,
  flexDirection: "row",
  fontSize: 20,
  alignItems: "center",
};

const backIconStyle = {
  style: {
    ...iconStyle,
  } as CSSProperties,
};
const rightIconStyle = {
  style: {
    ...iconStyle,
    justifyContent: "flex-end",
  } as CSSProperties,
};

interface Props {
  backIcon: React.ReactNode;
  title: string;
  extra?: React.ReactNode;

  loading: boolean;
  children: React.ReactNode;
}

const Page: React.FC<Props> = ({
  backIcon,
  title,
  extra,
  loading,
  children,
}) => {
  return (
    <div>
      <div {...bodyStyle}>
        <Spin spinning={loading} tip="Loading" size="large">
          {children}
        </Spin>
      </div>
      <div {...headerStyle}>
        <div {...backIconStyle}>{backIcon}</div>
        <div {...titleStyle}>{title}</div>
        <div {...rightIconStyle}>{extra}</div>
      </div>
    </div>
  );
};

export default Page;
