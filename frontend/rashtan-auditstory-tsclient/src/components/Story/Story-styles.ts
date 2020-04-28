import { CSSProperties } from "react";

export default {
  root: {
    position: "relative",
    minHeight: "100%",
    textAlign: "left",
  } as CSSProperties,
  tabs: {} as CSSProperties,
  revenueItem: {
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: "5px",
    margin: "5px 0 5px 0",
    padding: "5px",
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
  checklistQuestion: {
    width: "50%",
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: 1,
  } as CSSProperties,
  checklistUnusedItem: { cursor: "pointer" } as CSSProperties,
  addFlagButton: { marginTop: 10 } as CSSProperties,
  redFlagText: { color: "red", marginBottom: 5 } as CSSProperties,
};
