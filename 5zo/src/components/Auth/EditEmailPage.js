import React, { Component } from 'react';
import { connect } from "react-redux";
import { editPassword, editPasswordFailReset, editPasswordSuccessReset } from "actions";
import { AuthButton } from '.';
import PasswordWithLabel from './PasswordWithLabel';
import InputWithLabel from './InputWithLabel';
import history from '../../history'
class EditEmailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pw: '',
      email: this.props.mem_info.mem_email
    }

    this.checkPassWord = this.checkPassWord.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case 'email':
        this.setState({
          email: value
        })
        break;
      case 'pw':
        this.setState({
          pw: value
        })
        break;
    }
  }
  editEmail() {
    if (!document.getElementById("email").value) {
      document.getElementById("email").focus();
      return;
    }

    // this.props.editPassword(this.props.mem_info.mem_id, this.state.old_pw, this.state.new_pw)
  }
  checkPassWord() {
    if (!document.getElementById("pw").value) {
      document.getElementById("pw").focus();
      return;
    }
    else {
      this.setState({
        pw: document.getElementById("pw").value
      })
    }
  }
  setContent() {
    let content;

    if (this.state.pw) {
      content = <div>
        <InputWithLabel label="이메일" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
        <AuthButton onClick={this.editEmail}> 이메일 변경 </AuthButton>
      </div>
    }
    else {
      content = <div>
        <PasswordWithLabel label="패스워드" id="pw" name="pw" />
        <AuthButton onClick={this.checkPassWord}> 확인 </AuthButton>
      </div>
    }

    return content;
  }
  render() {
    if (this.props.edit_password_success) {
      this.props.editPasswordFailReset()
      this.props.editPasswordSuccessReset()
      alert(`비밀번호 수정 완료`)
      history.push("/mypage")
    }
    console.log("render");
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-block', minWidth: 500 }}>

          {this.setContent()}

        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    mem_info: state.members.mem_info,
  };
};

export default connect(mapStatetoProps, { })(EditEmailPage);