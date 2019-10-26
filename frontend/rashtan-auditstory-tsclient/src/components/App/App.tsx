import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { History } from "history";
import "./App.css";
import Footer from "../Footer";
import PortalDashboard from "../PortalDashboard/PortalDashboard";
import Terms from "../Terms";
import IApiService from "../../services/IApiService";
import AuthService from "../../services/AuthService";
import CreateUser from "../CreateUser";
import { UserStatus } from "../../models/UserStatus";
import PortalNewStory from "../PortalNewStory";
import Story from "../Story/Story";
import PortalFolders from "../PortalFolders";
import PortalLayout from "../PortalLayout";
import { Layout } from "antd";
import { showError } from "../../models/Errors";

interface Props {
  apiService: IApiService;
  authService: AuthService;
}

const App: React.FC<Props> = ({ apiService, authService }) => {
  const sessionStarted = (history: History) => () => {
    apiService
      .getUserStatus()
      .then(r => {
        switch (r) {
          case UserStatus.New: {
            history.push("/createUser");
            break;
          }
          default: {
            history.push("/");
            break;
          }
        }
      })
      .catch(showError);
  };

  const startSession = (history: History) => {
    authService.handleAuthentication(sessionStarted(history));
    return (
      <div>
        <p>Starting session...</p>
      </div>
    );
  };

  const logOut = () => {
    authService.logOut();
  };

  return (
    <div className={"app root"}>
      <Layout>
        <Switch>
          <Route
            path="/startSession"
            render={({ history }) => startSession(history)}
          />

          <Route exact path="/terms">
            <Terms />
            <Footer />
          </Route>
          <Route
            exact
            path="/createUser"
            render={({ history }) => (
              <>
                <CreateUser apiService={apiService} history={history} />
                <Footer />
              </>
            )}
          />

          <PortalLayout apiService={apiService} logOut={logOut}>
            <Route
              exact
              path="/"
              render={({ history }) => (
                <PortalDashboard apiService={apiService} history={history} />
              )}
            />
            <Route
              exact
              path="/newstory"
              render={({ history }) => (
                <PortalNewStory apiService={apiService} history={history} />
              )}
            />
            <Route
              exact
              path="/story/:id"
              render={({ match }) => (
                <Story apiService={apiService} id={match.params["id"]} />
              )}
            />
            <Route
              exact
              path="/folder/:name"
              render={({ history, match }) => (
                <PortalFolders
                  apiService={apiService}
                  history={history}
                  folder={match.params["name"]}
                />
              )}
            />
          </PortalLayout>

          <Route component={() => <Redirect to="/" />} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
