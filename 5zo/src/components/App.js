import React from "react";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { setLoggedInfo } from "actions";

import Navigation from "./navigation/Navigation";
import Main from "./main/Main";
import Calendar from "./calendar/Calendar";
import DefLand from "./landing/DefLand";
import LandingPage from "./landing/LandingPage";
import Statistics from "./statistics/Statistics";
import TagPage from "./tags/Tags";
import Todo from "./todo/Todo";
import history from "../history";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import storage from "lib/storage";
import MyPage from "./Auth/MyPage";
import MyPageEdit from "./Auth/MyPageEdit";
import MyAccountDelete from "./Auth/MyAccountDelete";
import Imgur from "./image_test/Imgur"
import Daily from "./daily/Main"
import Redirecting from "./redirectingPage/RedirectBody";
import NewSearch from "./serach/NewSearch";
import FindIdPage from './Auth/FindIdPage'
import FindPwPage from './Auth/FindPwPage'
import EditPasswordPage from "./Auth/EditPasswordPage";
import Body from "./landing/Body";
import NewMySetting from "./Auth/NewMySetting";



class App extends React.Component {
  initializeUserInfo = async () => {
    const loggedInfo = storage.get("loggedInfo");
    if (!loggedInfo) return;

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
    this.initializeUserInfo();
  }
  drawRouter() {
    if (!this.props.members.mem_info) {
      return (
        <Navigation>
          <>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register}/>
            <Route path="/find-id" exact component={FindIdPage} />
            <Route path="/find-pw" exact component={FindPwPage} />
            <Route path="/" component={Body} />
          </Switch>
          </>
        </Navigation>

      );
    } else {
      // 로그인했을 때
      return (
        <Navigation
          mem_info={this.props.members.mem_info.mem_nick}
        >
          <div>
            <Switch>
              <Route path="/" exact component={Daily} />
              <Route path="/calendar" exact component={Calendar} />
              <Route path="/statistics/:user_id" exact component={Statistics} />
              <Route path="/tags" exact component={TagPage} />
              <Route path="/dashboard" exact component={Todo} />
              <Route path="/login" exact component={Login} />

              <Route path="/mypage" exact component={MyPage} />
              <Route path="/mypage/edit" exact component={MyPageEdit} />
              <Route path="/mypage/edit-password" exact component={EditPasswordPage} />
              <Route path="/mypage/delete" exact component={MyAccountDelete} />

              {/* test */}
              <Route path='/my-setting' exact component={NewMySetting}/>

              <Route path="/imgur" exact component={Imgur}></Route>
              <Route path="/daily" exact component={Daily}></Route>
              <Route path="/daily/:user_id" exact component={Daily}></Route>
              <Route path="/daily/:user_id/:date" exact component={Daily}></Route>
              <Route path="/search" exact component={NewSearch}></Route>
              <Route component={Redirecting} />
            </Switch>
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
