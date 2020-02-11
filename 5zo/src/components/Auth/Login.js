import React, { Component } from 'react';
import { connect } from "react-redux";
import { login, loginErrReset } from "../../actions";
import { AuthWrapper_tmp, AuthWrapper, AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from '../Auth';
import storage from 'lib/storage';
import "./login.css"
import PasswordWithLabel from './PasswordWithLabel';
import apis from "../../apis/apis";
import axios from 'axios';
import history from '../../history'
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'lib/styleUtil';

class Login extends Component {
  componentDidMount() {
    this.props.loginErrReset();

    if (!this.props.mem_info) {
      axios.get('http://13.124.67.187:8080/spring/api/naver/login')
        .then(response => {
          const url = response.data.data;
          console.log('url : ' + url)
          this.setState({
            url: url
          })
        })
    }

    // if (!this.props.mem_info) {
    //   const response = await apis.get('/naver/login');
    //   if(response.status === 200){
    //     const url = response.data.data;
    //     document.getElementById("naver_id_login").innerHTML = '<a href=\"' + url + '\"><img width="300" alt="네이버 아이디로 로그인" src="https://developers.naver.com/doc/review_201802/CK_bEFnWMeEBjXpQ5o8N_20180202_7aot50.png" /></a>'
    //   }
    // }
  }
  constructor(props) {
    super(props);

    this.state = {
      loginId: '',
      loginPw: '',
      url: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.login = this.login.bind(this)
    this.keyDown = this.keyDown.bind(this)
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
      document.getElementById("loginId_msg").classList.add("error");
      document.getElementById("loginId").focus();
      return;
    }

    if (!this.state.loginPw) {
      document.getElementById("loginPw_msg").value = '비밀번호를 입력해주세요';
      document.getElementById("loginId_msg").classList.remove("error");
      document.getElementById("loginPw_msg").classList.add("error");
      document.getElementById("loginPw").focus();
      return;
    }

    document.getElementById("loginId_msg").classList.remove("error");
    document.getElementById("loginPw_msg").classList.remove("error");

    this.props.login(this.state.loginId, this.state.loginPw);
  }
  cancel() {
    history.push("/")
  }
  naver = ()  => {
    window.location.href = this.state.url
  }
  keyDown(e){
    if(e.keyCode == 13) this.login();
  }
  render() {
    if (this.props.mem_info) {
      const loggedInfo = this.props.mem_info;
      storage.set('loggedInfo', loggedInfo);

      this.props.loginErrReset();
      history.push('/');
    }
    return (
      <div style={{ textAlign: 'center', background: '#fafbfc' }}>
        <div style={{ display: 'inline-block', width: 500 }}>
          <AuthWrapper >
            <AuthContent title="로그인">
              <InputWithLabel label="아이디" id="loginId" name="loginId" placeholder="아이디" onChange={this.handleChange} />
              <PasswordWithLabel label="비밀번호" id="loginPw" name="loginPw" placeholder="비밀번호" onChange={this.handleChange} />
              {this.props.login_err}
              <AuthButton onClick={this.login}> 로그인 </AuthButton>
              <AuthButton onClick={this.cancel}> 취소 </AuthButton>
              <AuthButton onClick={this.naver} backgroundColor={'#2DB400'}> 네이버 아이디로 로그인 </AuthButton>
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