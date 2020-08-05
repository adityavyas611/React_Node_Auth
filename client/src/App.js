import React from 'react';
import { Route, Switch } from "react-router-dom";
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import Profile from './components/Profile/Profile';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;