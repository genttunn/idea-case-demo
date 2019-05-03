import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

import "./index.css";
import App from "./App";
import Search from "./Search";
import * as serviceWorker from "./serviceWorker";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
const store = createStore(
  rootReducer(),
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/search" component={Search} />
    </div>
  </Router>
);

ReactDOM.render(
  <Provider store={store}>{routing}</Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
