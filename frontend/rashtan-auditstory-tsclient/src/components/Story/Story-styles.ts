import { CSSProperties } from "react";

export default {
  root: {
    position: "relative",
    minHeight: "100%",
    textAlign: "left",
  } as CSSProperties,
  tabs: {} as CSSProperties,
  pageHeader: {
    minHeight: "100%",
    background:
      "linear-gradient(0deg, rgba(80,167,194,1) 0%, rgba(183,248,219,1) 100%)",
  } as CSSProperties,
  moreButton: {
    border: "none",
    padding: 0,
    backgroundColor: "transparent",
  } as CSSProperties,
  checklistRating: {
    marginLeft: 10,
    position: "relative",
    top: "-2px",
  } as CSSProperties,
  checklistDelete: {
    cursor: "pointer",
    position: "relative",
    top: "4px",
    marginLeft: 5,
    fontSize: "24px",
  } as CSSProperties,
  checklistQuestion: { width: "40%" } as CSSProperties,
  addFlagButton: { marginTop: 10 } as CSSProperties,
  redFlagText: { color: "red", marginBottom: 5 } as CSSProperties,
};
