import React from "react";
import { Router, Route } from "react-router-dom";

import Navigation from "./navigation/Navigation";

import Main from "./main/Main";
import Calendar from "./calendar/Calendar";
import Statistics from "./statistics/Statistics";
import Search from "./serach/Search";
import Tags from "./tags/Tags";
import Todo from "./todo/Todo";

import history from "../history";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <Navigation>
          <div>
            <Route path="/" exact component={Main} />
            <Route path="/Calendar" exact component={Calendar} />
            <Route path="/statistics/:userId" exact component={Statistics} />
            <Route path="/search/:userId" exact component={Search} />
            <Route path="/tags" exact component={Tags} />{" "}
            {/* 추후 /tags/:userId 로 변환 */}
            <Route path="/todo" exact component={Todo} />
          </div>
        </Navigation>
      </Router>
    </div>
  );
};

export default App;
