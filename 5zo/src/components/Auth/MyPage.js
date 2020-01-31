import React, { Component } from 'react';
import { connect } from "react-redux";
import { login, loginErrReset } from "../../actions";
import { AuthWrapper, AuthContent, InputWithLabel, AuthButton, RightAlignedLink, TextWithLabel } from '../Auth';
import storage from 'lib/storage';

class MyPage extends Component {
  render() {
    console.log('mypage')
    console.log(this.props.mem_info)
    return (
      <div>
          <h1> 내 정보 </h1>
        <AuthWrapper>
          <AuthContent title="My Page">
              {/* 로그인한 member 의 데이터를 아래 TextWithLabel 들의 value 에 줘야함. */}
            <TextWithLabel label="이메일" name="email"  value={this.props.mem_info ? this.props.mem_info.mem_email : ''} type="email"/>
            <TextWithLabel label="닉네임" name="nick" value={this.props.mem_info ? this.props.mem_info.mem_nick:''} />
            <RightAlignedLink to="/mypage/edit"> 수정 </RightAlignedLink>
            <RightAlignedLink to="/secession"> 탈퇴 </RightAlignedLink>
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

export default connect(mapStatetoProps, { login, loginErrReset })(MyPage);