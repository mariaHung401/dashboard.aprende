import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import CreateAccount from "views/pages/CreateAccount.js";
// import Chat from "../src/views/pages/Chat.js";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';
import reduxThunk from 'redux-thunk';


const store = createStore(
  reducers,
  {},
  applyMiddleware(reduxThunk)
)
const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={ store }>
    <Router history={hist}>
      <Switch>
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/create" component={CreateAccount} />
        <Redirect to="/auth/login" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
