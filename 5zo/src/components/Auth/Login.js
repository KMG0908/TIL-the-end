import React, { Component } from 'react';
import { connect } from "react-redux";
import { login, loginErrReset } from "../../actions";
import { AuthWrapper, AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from '../Auth';
import storage from 'lib/storage';

class Login extends Component {
  componentDidMount(){
    this.props.loginErrReset();
  }
  constructor(props) {
    super(props);

    this.state = {
      loginId: '',
      loginPw: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.login = this.login.bind(this)
  }
  handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case 'loginId':
        this.setState({
          loginId: value
        })
        break;
      case 'loginPw':
        this.setState({
          loginPw: value
        })
        break;
    }
  }
  login() {
    this.props.login(this.state.loginId, this.state.loginPw);
  }
  render() {
    if(this.props.mem_info){
      const loggedInfo = this.props.mem_info;
      storage.set('loggedInfo', loggedInfo);

      this.props.loginErrReset();
      this.props.history.push('/');
    }
    return (
      <div>
        <AuthWrapper>
          <AuthContent title="로그인">
            <InputWithLabel label="아이디" name="loginId" placeholder="아이디" onChange={this.handleChange} />
            <InputWithLabel label="비밀번호" name="loginPw" placeholder="비밀번호" type="password" onChange={this.handleChange} />
            {this.props.login_err}
            <AuthButton onClick={this.login}> 로그인 </AuthButton>
            <RightAlignedLink to="/register"> 회원가입 </RightAlignedLink>
          </AuthContent>
        </AuthWrapper>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    mem_info : state.members.mem_info,
    login_err : state.members.login_err
  };
};

export default connect(mapStatetoProps, { login, loginErrReset })(Login);