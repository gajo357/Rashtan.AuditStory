import React, { CSSProperties } from "react";

const headerHeight = 50;

const baseStyle: CSSProperties = {
  display: "flex",
  flex: 1,
  fontSize: 24,
};

const headerStyle = {
  style: {
    ...baseStyle,
    position: "fixed",
    top: 0,
    left: 0,
    height: headerHeight,
    minWidth: "100%",
    backgroundColor: "#1f1f1f",
  } as CSSProperties,
};

const bodyStyle = {
  style: {
    paddingTop: headerHeight + 10,
    minWidth: "100%",
    minHeight: "100%",
  } as CSSProperties,
};

const titleStyle = {
  style: {
    ...baseStyle,
    flexGrow: 4,
    justifyContent: "flex-start",
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontSize: 24,
  } as CSSProperties,
};

const iconStyle: CSSProperties = {
  ...baseStyle,
  paddingTop: 7,
};

const backIconStyle = {
  style: {
    ...iconStyle,
    justifyContent: "flex-start",
    paddingLeft: 5,
  } as CSSProperties,
};
const rightIconStyle = {
  style: {
    ...iconStyle,
    justifyContent: "flex-end",
    paddingRight: 5,
  } as CSSProperties,
};

interface Props {
  backIcon: React.ReactNode;
  title: string;
  extra?: React.ReactNode;

  children: React.ReactNode;
}

const Page: React.FC<Props> = ({ backIcon, title, extra, children }) => {
  return (
    <div>
      <div {...bodyStyle}>{children}</div>
      <div {...headerStyle}>
        <div {...backIconStyle}>{backIcon}</div>
        <div {...titleStyle}>{title}</div>
        <div {...rightIconStyle}>{extra}</div>
      </div>
    </div>
  );
};

export default Page;
