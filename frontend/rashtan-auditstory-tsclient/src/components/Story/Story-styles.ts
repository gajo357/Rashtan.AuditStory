import { CSSProperties } from "react";

export default {
  root: {
    position: "relative",
    minHeight: "100%",
    textAlign: "left",
  } as CSSProperties,
  carousel: { paddingTop: 10 } as CSSProperties,
  pageHeader: {
    paddingBottom: 50,
    minHeight: "100%",
    background:
      "linear-gradient(0deg, rgba(80,167,194,1) 0%, rgba(183,248,219,1) 100%)",
  } as CSSProperties,
  moreButton: {
    border: "none",
    padding: 0,
    backgroundColor: "transparent",
  } as CSSProperties,
  footer: {
    textAlign: "right",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "white",
  } as CSSProperties,
  checklistRating: {
    marginLeft: 10,
  } as CSSProperties,
  checklistDelete: {
    cursor: "pointer",
    position: "relative",
    top: "10px",
    marginLeft: 5,
    fontSize: "24px",
  } as CSSProperties,
  checklistQuestion: { width: "40%" } as CSSProperties,
};
