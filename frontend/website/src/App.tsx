import React from "react";
import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App root">
      <Layout>
        <Header />

        <Layout.Content>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/contact">
              <Contact />
            </Route>
          </Switch>
        </Layout.Content>

        <Footer />
      </Layout>
    </div>
  );
};

export default App;
