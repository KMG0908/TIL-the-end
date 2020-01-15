import React from "react";
import { Router, Route } from "react-router-dom";
import index from "./app_name/index";
import second from "./app_name/second";

import history from "../history";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <div>
          <Route path="/" exact component={index} />
          <Route path="/second" exact component={second} />
        </div>
      </Router>
    </div>
  );
};

export default App;
