import React from "react";
import { Router, Route } from "react-router-dom";

import Navigation from "./navigation/Navigation";

import Main from "./main/Main";
import Calendar from "./calendar/Calendar";
import HeatMap from "./heatmap/Heatmap";
import Statistics from "./statistics/Statistics";
import Search from "./serach/Search";
import Tags from "./tags/Tags";
import Todo from "./todo/Todo";
import history from "../history";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import TitleComponent from "./navigation/TitleComponent";
import List from "@material-ui/core/List";

  const withTitle = ({ component: Component, title}) => {
    return class Title extends React.Component {
      render() {
        return (
          <List>
            <TitleComponent title={title}/>
            <Component {...this.props}/>
          </List>
        );
      }
    };
  };

const App = () => {
  const CalendarComponent = withTitle({ component : Calendar, title: 'Calendar'});
  return (
    <div>
      <Router history={history}>
        <Navigation>
          <div>
            <Route path="/" exact component={Main} />
            <Route path="/calendar" exact component={CalendarComponent} />
            <Route path="/statistics/:user_id" exact component={Statistics} />
            <Route path="/search/:user_id" exact component={Search} />
            <Route path="/tags" exact component={Tags} />{" "}
            {/* 추후 /tags/:user_id 로 변환 */}
            <Route path="/todo" exact component={Todo} />
            <Route path="/login" exact component= {Login}/>
            <Route path="/register" exact component= {Register}/>
          </div>
        </Navigation>
      </Router>
    </div>
  );
};

export {App, withTitle};
