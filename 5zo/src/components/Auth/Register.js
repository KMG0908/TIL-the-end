import React, { Component } from 'react';
import { connect } from "react-redux";
import { register, registerReset } from "../../actions";
import { AuthWrapper, AuthWrapper_tmp, AuthContent, InputWithLabel, AuthButton } from '../Auth';
import PasswordWithLabel from './PasswordWithLabel';
import { isEmail, matches } from "validator";

import history from '../../history'
class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginId: '',
      loginPw: '',
      email: '',
      nick: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.register = this.register.bind(this)
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
      case 'email':
        this.setState({
          email: value
        })
        break;
      case 'nick':
        this.setState({
          nick: value
        })
        break;
    }
  }
  register() {
    if (!this.state.loginId) {
      document.getElementById("loginId_msg").value = '아이디를 입력해주세요.';
      document.getElementById("loginId_msg").classList.add("error");
      document.getElementById("loginId").focus();
      return;
    }

    if (!matches(this.state.loginId, /^[a-z0-9_\-]{5,20}$/)) {
      document.getElementById("loginId_msg").value = '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.';
      document.getElementById("loginId_msg").classList.add("error");
      document.getElementById("loginId").focus();
      return;
    }

    if (!this.state.loginPw) {
      document.getElementById("loginPw_msg").value = '비밀번호를 입력해주세요.';
      document.getElementById("loginId_msg").classList.remove("error");
      document.getElementById("loginPw_msg").classList.add("error");
      document.getElementById("loginPw").focus();
      return;
    }

    if (!matches(this.state.loginPw, /^[a-zA-Z0-9!@#$%^&*()]{8,16}$/)) {
      document.getElementById("loginPw_msg").value = '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.';
      document.getElementById("loginId_msg").classList.remove("error");
      document.getElementById("loginPw_msg").classList.add("error");
      document.getElementById("loginPw").focus();
      return;
    }
  
    if (!this.state.email) {
      document.getElementById("email_msg").value = '이메일을 입력해주세요.';
      document.getElementById("loginId_msg").classList.remove("error");
      document.getElementById("loginPw_msg").classList.remove("error");
      document.getElementById("email_msg").classList.add("error");
      document.getElementById("email").focus();
      return;
    }
  
    if (!isEmail(this.state.email)) {
      document.getElementById("email_msg").value = '잘못된 이메일 형식입니다.';
      document.getElementById("loginId_msg").classList.remove("error");
      document.getElementById("loginPw_msg").classList.remove("error");
      document.getElementById("email_msg").classList.add("error");
      document.getElementById("email").focus();
      return;
    }
  
    if (!this.state.nick) {
      document.getElementById("nick_msg").value = '닉네임을 입력해주세요.';
      document.getElementById("loginId_msg").classList.remove("error");
      document.getElementById("loginPw_msg").classList.remove("error");
      document.getElementById("email_msg").classList.remove("error");
      document.getElementById("nick_msg").classList.add("error");
      document.getElementById("nick").focus();
      return;
    }

    document.getElementById("loginId_msg").classList.remove("error");
    document.getElementById("loginPw_msg").classList.remove("error");
    document.getElementById("email_msg").classList.remove("error");
    document.getElementById("nick_msg").classList.remove("error");

    this.props.register(this.state.loginId, this.state.loginPw, this.state.email, this.state.nick)
  }
  cancelRegister() {
    history.push("/")
  }
  keyDown(e){
    if(e.keyCode == 13) this.register();
  }
  render() {
    if (this.props.register_id && this.props.register_id !== "") {
      this.props.registerReset();
      alert('회원가입 완료')
      history.push("/login")
    }

    return (
      <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'inline-block', width: 500 }}>
        <AuthWrapper_tmp>
          {/* <AuthContent title="회원가입" id="register"> */}
            <InputWithLabel label="아이디" id="loginId" name="loginId" placeholder="아이디( 5 ~ 20 자 )" maxLength="20" onChange={this.handleChange} />
            <PasswordWithLabel label="비밀번호" id="loginPw" name="loginPw" placeholder="비밀번호 ( 8 ~ 16 자 )" maxLength="16" onChange={this.handleChange}  />
            <InputWithLabel label="이메일" id="email" name="email" placeholder="이메일" type="email" onChange={this.handleChange} />
            <InputWithLabel label="닉네임" id="nick" name="nick" placeholder="닉네임" onChange={this.handleChange} onKeyDown={this.keyDown}/>
            <input type="text" className={this.props.register_err? "error" : "none"} readOnly value={this.props.register_err}/>
            <AuthButton onClick={this.register}> 회원가입 </AuthButton>

            {this.props.location.pathname === "/" ? null : <AuthButton onClick={this.cancelRegister}> 취소 </AuthButton>}
          {/* </AuthContent> */}
        </AuthWrapper_tmp>
      </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    register_id: state.members.register_id,
    register_err: state.members.register_err
  };
};

export default connect(mapStatetoProps, { register, registerReset })(Register);