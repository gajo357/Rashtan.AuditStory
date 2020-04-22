import { CSSProperties } from "react";

export default {
  root: {
    position: "relative",
    minHeight: "100%",
    textAlign: "left",
  } as CSSProperties,
  tabs: {} as CSSProperties,
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
  checklistQuestion: { width: "50%" } as CSSProperties,
  checklistUnusedItem: { cursor: "pointer" } as CSSProperties,
  addFlagButton: { marginTop: 10 } as CSSProperties,
  redFlagText: { color: "red", marginBottom: 5 } as CSSProperties,
};
