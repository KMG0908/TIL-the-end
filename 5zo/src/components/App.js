import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { setLoggedInfo } from "actions";

import Navigation from "./navigation/Navigation";
import Main from "./main/Main";
import Calendar from "./calendar/Calendar";
import DefLand from "./landing/DefLand";
import LandingPage from "./landing/LandingPage";
import Statistics from "./statistics/Statistics";
import Search from "./serach/Search";
import TagPage from "./tags/Tags";
import Todo from "./todo/Todo";
import history from "../history";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import storage from "lib/storage";
import MyPage from "./Auth/MyPage";
import MyPageEdit from "./Auth/MyPageEdit";
import Imgur from "./image_test/Imgur"

import NewSearch from "./serach/NewSearch";
import UserPage from "./userPage/UserPage"

class App extends React.Component {
  initializeUserInfo = async () => {
    const loggedInfo = storage.get("loggedInfo"); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    //if (!loggedInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.

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
        <LandingPage>
          <div>
            <Route path="/" exact component={DefLand} />
            <Route path="/defLand" exact component={DefLand} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />

            
            <Route path="/new" exact component={NewSearch}></Route>
          </div>
        </LandingPage>
      );
    } else { // 로그인했을 때
      return (
        <Navigation nickname={this.props.members.mem_info.mem_nick} user_id={this.props.members.mem_info.mem_id}>
          <div>
            <Route path="/" exact component={Main} />
            <Route path="/calendar" exact component={Calendar} />
            <Route path="/statistics/:user_id" exact component={Statistics} />
            <Route path="/search" exact component={Search} />
            <Route path="/search/:keyword" component={Search} />
            <Route path="/tags" exact component={TagPage} />
            <Route path="/todo" exact component={Todo} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            {/*  아래는 테스트 */}
            <Route path="/mypage" exact component = {MyPage}/>
            <Route path="/mypage/edit" exact component = {MyPageEdit}/>
            <Route path="/imgur" exact component={Imgur}></Route>

            <Route path="/new" exact component={NewSearch}></Route>
            <Route path="/user" component={UserPage}></Route>
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
