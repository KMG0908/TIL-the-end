import React, { Component } from 'react';
import { connect } from "react-redux";
import { register, registerReset } from "../../actions";
import { AuthWrapper, AuthContent, InputWithLabel, AuthButton } from '../Auth';

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
  register(){
    this.props.register(this.state.loginId, this.state.loginPw, this.state.email, this.state.nick)
  }
  render() {
    if(this.props.register_id && this.props.register_id !== ""){
      this.props.registerReset();
      this.props.history.push('/login')
    }
    return (
      <AuthWrapper>
        <AuthContent title="회원가입">
          <InputWithLabel label="아이디" name="loginId" placeholder="아이디" onChange={this.handleChange}/>
          <InputWithLabel label="비밀번호" name="loginPw" placeholder="비밀번호" type="password" onChange={this.handleChange}/>
          <InputWithLabel label="이메일" name="email" placeholder="이메일" type="email" onChange={this.handleChange}/>
          <InputWithLabel label="닉네임" name="nick" placeholder="닉네임" onChange={this.handleChange}/>
          {this.props.register_err}
          <AuthButton onClick={this.register}> 회원가입 </AuthButton>
        </AuthContent>
      </AuthWrapper>
    );
  }
}

const mapStatetoProps = state => {
  return {
    register_id : state.members.register_id,
    register_err : state.members.register_err
  };
};

export default connect(mapStatetoProps, { register, registerReset })(Register);