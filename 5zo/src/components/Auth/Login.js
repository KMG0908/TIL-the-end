import React, { Component } from 'react';
import { connect } from "react-redux";
import { login, loginErrReset } from "../../actions";
import { AuthWrapper, AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from '../Auth';
import storage from 'lib/storage';
import "./login.css"
import PasswordWithLabel from './PasswordWithLabel';

class Login extends Component {
  componentDidMount() {
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
    if (!this.state.loginId) {
      document.getElementById("loginId_msg").value = '아이디를 입력해주세요';
      document.getElementById("loginId").focus();
      return;
    }

    if (!this.state.loginPw) {
      document.getElementById("loginPw_msg").value = '비밀번호를 입력해주세요';
      document.getElementById("loginPw").focus();
      return;
    }

    this.props.login(this.state.loginId, this.state.loginPw);
  }
  cancel() {
    window.location.href = '/'
  }
  render() {
    if (this.props.mem_info) {
      const loggedInfo = this.props.mem_info;
      storage.set('loggedInfo', loggedInfo);

      this.props.loginErrReset();
      this.props.history.push('/');
    }
    return (

      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-block', width: 500 }}>
          <AuthWrapper >
            <AuthContent title="로그인">
                <InputWithLabel label="아이디" id="loginId" name="loginId" placeholder="아이디" onChange={this.handleChange} />
                <PasswordWithLabel label="비밀번호" id="loginPw" name="loginPw" placeholder="비밀번호" onChange={this.handleChange} />
                {this.props.login_err}
                <AuthButton onClick={this.login}> 로그인 </AuthButton>
                <AuthButton onClick={this.cancel}> 취소 </AuthButton>
                <RightAlignedLink to="/register"> 회원가입 </RightAlignedLink>
                <RightAlignedLink to="/find-id"> 아이디 찾기 </RightAlignedLink>
                <RightAlignedLink to="/find-pw"> 비밀번호 찾기 </RightAlignedLink>
            </AuthContent>
          </AuthWrapper>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    mem_info: state.members.mem_info,
    login_err: state.members.login_err
  };
};

export default connect(mapStatetoProps, { login, loginErrReset })(Login);