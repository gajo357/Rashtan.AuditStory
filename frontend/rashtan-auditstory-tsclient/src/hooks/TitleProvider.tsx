import React, { useState, useContext } from "react";

interface ContextProps {
  setTitle: (title: string) => void;
  resetTitle: () => void;
  title: string;
}

const TitleContext = React.createContext<ContextProps>({
  setTitle: () => {},
  resetTitle: () => {},
  title: "FlowersBook"
});

const TitleConsumer = TitleContext.Consumer;
const useTitleContext = () => useContext(TitleContext);

const TitleProvider: React.FC = ({ children }) => {
  const [title, setTitle] = useState<string>("FlowersBook");

  const resetTitle = () => setTitle("FlowersBook");

  return (
    <TitleContext.Provider
      value={{
        setTitle,
        resetTitle,
        title
      }}
    >
      {children}
    </TitleContext.Provider>
  );
};

export { TitleProvider, TitleConsumer, useTitleContext };
