import React from 'react';
import './App.css';
import AuthService from './AuthService'
import {Switch, Route} from 'react-router-dom';
import Home from './Home'

const authService = new AuthService();

function renderHome() {
  let resultComponent = <Home auth={authService}/>;

  if (!authService.isAuthenticated()) {
    authService.login();
    resultComponent = <div><p>Redirecting to the authentication service...</p></div>
  }

  return resultComponent;
}

function startSession(history) {
  authService.handleAuthentication(history);
  return <div><p>Starting session...</p></div>;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Audit Story</h1>
      </header>
      <Switch>
        <Route exact path="/" render={() => renderHome()}/>
        <Route path="/startSession" render={({history}) => startSession(history)}/>
      </Switch>
    </div>
  );
}

export default App;
