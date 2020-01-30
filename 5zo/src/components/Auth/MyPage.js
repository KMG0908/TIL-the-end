import React, { Component } from 'react';
import { connect } from "react-redux";
import { login, loginErrReset } from "../../actions";
import { AuthWrapper, AuthContent, InputWithLabel, AuthButton, RightAlignedLink, TextWithLabel } from '../Auth';
import storage from 'lib/storage';

class MyPage extends Component {
  render() {
    return (
      <div>
          <h1> 내 정보 </h1>
        <AuthWrapper>
          <AuthContent title="My Page">
              {/* 로그인한 member 의 데이터를 아래 TextWithLabel 들의 value 에 줘야함. */}
            <TextWithLabel label="비밀번호" name="loginPw" value="비밀번호" type="password"/>
            <TextWithLabel label="이메일" name="email" value="이메일@들어가야함" type="email"/>
            <TextWithLabel label="닉네임" name="nick" value="닉네임 들어가야함" />
            <RightAlignedLink to="/modify"> 수정 </RightAlignedLink>
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