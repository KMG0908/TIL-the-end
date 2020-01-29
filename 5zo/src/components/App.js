import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { setLoggedInfo } from "actions";

import Navigation from "./navigation/Navigation";
import Main from "./main/Main";
import Calendar from "./calendar/Calendar";
import LandingPage from "./landing/LandingPage";
import Statistics from "./statistics/Statistics";
import Search from "./serach/Search";
import Tags from "./tags/Tags";
import Todo from "./todo/Todo";
import history from "../history";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import TitleComponent from "./navigation/TitleComponent";
import List from "@material-ui/core/List";
import storage from "lib/storage";

const withTitle = ({ component: Component, title }) => {
  return class Title extends React.Component {
    render() {
      return (
        <List>
          <TitleComponent title={title} />
          <Component {...this.props} />
        </List>
      );
    }
  };
};

class App extends React.Component {
  initializeUserInfo = async () => {
    const loggedInfo = storage.get("loggedInfo"); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    if (!loggedInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.

    // const { UserActions } = this.props;
    // UserActions.setLoggedInfo(loggedInfo);
    // try {
    //   await UserActions.checkStatus();
    // } catch (e) {
    //   storage.remove('loggedInfo');
    //   window.location.href = '/auth/login?expired';
    // }
    this.props.setLoggedInfo(loggedInfo);
  };
  componentDidMount() {
    //this.initializeUserInfo();
  }
  drawRouter() {
    const CalendarComponent = withTitle({
      component: Calendar,
      title: "Calendar"
    });
    if (this.props.members.mem_info) {
      return (
        <Navigation nickname={this.props.members.mem_info.mem_nick}>
          <div>
            <Route path="/" exact component={Main} />
            <Route path="/calendar" exact component={CalendarComponent} />
            <Route path="/statistics/:user_id" exact component={Statistics} />
            <Route path="/search/:user_id" exact component={Search} />
            <Route path="/tags" exact component={Tags} />{" "}
            <Route path="/todo" exact component={Todo} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </div>
        </Navigation>
      );
    } else {
      return (
        <Navigation>
          <div>
            <Route path="/" exact component={Main} />
            <Route path="/calendar" exact component={LandingPage} />
            <Route path="/statistics/:user_id" exact component={Statistics} />
            <Route path="/search/:user_id" exact component={Search} />
            <Route path="/tags" exact component={Tags} />{" "}
            <Route path="/todo" exact component={Todo} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </div>
        </Navigation>
      );
    }
  }
  render() {
    return (
      <div>
        <Router history={history}>{this.drawRouter()}</Router>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  console.log(state);
  return {
    members: state.members
  };
};

export default connect(mapStatetoProps, { setLoggedInfo })(App);
// export {App, withTitle};
