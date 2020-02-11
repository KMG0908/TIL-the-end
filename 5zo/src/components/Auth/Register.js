import React, { Component } from 'react';
import { connect } from "react-redux";
import { register, registerReset } from "../../actions";
import { AuthWrapper, AuthContent, InputWithLabel, AuthButton } from '../Auth';
import PasswordWithLabel from './PasswordWithLabel';
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
    this.props.register(this.state.loginId, this.state.loginPw, this.state.email, this.state.nick)
  }
  cancelRegister() {
    history.push("/")
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
          <AuthWrapper>
            <AuthContent title="회원가입" id="register">
              <InputWithLabel label="아이디" id="loginId" name="loginId" placeholder="아이디( 5 ~ 20 자 )" onChange={this.handleChange} />
              <PasswordWithLabel label="비밀번호" id="loginPw" name="loginPw" placeholder="비밀번호 ( 8 ~ 16 자 )" onChange={this.handleChange} />
              <InputWithLabel label="이메일" id="email" name="email" placeholder="이메일" type="email" onChange={this.handleChange} />
              <InputWithLabel label="닉네임" id="nick" name="nick" placeholder="닉네임" onChange={this.handleChange} />
              {this.props.register_err}
              <AuthButton onClick={this.register}> 회원가입 </AuthButton>

              {this.props.location.pathname === "/" ? null : <AuthButton onClick={this.cancelRegister}> 취소 </AuthButton>}
            </AuthContent>
          </AuthWrapper>
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