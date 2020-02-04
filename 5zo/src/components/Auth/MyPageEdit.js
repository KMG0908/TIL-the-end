import React, { Component } from 'react';
import { connect } from "react-redux";
import { login, loginErrReset, editMyinfo, editMyinfoErrReset, memInfoChangeReset } from "actions";
import { AuthWrapper, AuthContent, InputWithLabel, AuthButton, RightAlignedLink, TextWithLabel } from '.';
import storage from 'lib/storage';

class MyPageEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginPw: '',
      email: this.props.mem_info ? this.props.mem_info.mem_email : '',
      nick: this.props.mem_info ? this.props.mem_info.mem_nick : ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.editMyinfo = this.editMyinfo.bind(this)
    this.cancelEditMyinfo = this.cancelEditMyinfo.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
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
  editMyinfo(){
    if(!document.getElementById("loginPw").value){
      document.getElementById("loginPw").focus();

      return;
    }

    this.props.editMyinfo(this.props.mem_info.mem_id, this.state.loginPw, this.state.email, this.state.nick)
  }
  cancelEditMyinfo = () => {
    window.location.href = "/mypage"
  }
  render() {
    if(this.props.mem_info_change){
      const loggedInfo = this.props.mem_info_change;
      storage.set('loggedInfo', loggedInfo);
      
      this.props.editMyinfoErrReset();
      this.props.memInfoChangeReset();
      alert('회원정보 수정 완료')
      window.location.href = "/mypage"
    }
    console.log(this.state);
    return (
      <div>
          <h1> 내 정보 수정 </h1>
        <AuthWrapper>
          <AuthContent title="내 정보 수정">
              {/* 로그인한 member 의 데이터를 아래 TextWithLabel 들의 value 에 줘야함. */}
            <InputWithLabel label="이메일" name="email" type="email" value={this.state.email} onChange={this.handleChange}/>
            <InputWithLabel label="닉네임" name="nick" value={this.state.nick} onChange={this.handleChange}/>
            <br/><br/>
            <InputWithLabel label="비밀번호" id="loginPw" name="loginPw" type="password" placeholder={"현재 비밀번호를 입력하세요"} value={this.state.loginPw} onChange={this.handleChange}/>
            {this.props.edit_myinfo_err}
            <AuthButton onClick={this.editMyinfo}> 수정 </AuthButton>
            <AuthButton onClick={this.cancelEditMyinfo}> 취소 </AuthButton>
          </AuthContent>
        </AuthWrapper>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    mem_info : state.members.mem_info,
    mem_info_change : state.members.mem_info_change,
    edit_myinfo_err : state.members.edit_myinfo_err
  };
};

export default connect(mapStatetoProps, { editMyinfo, editMyinfoErrReset, memInfoChangeReset })(MyPageEdit);