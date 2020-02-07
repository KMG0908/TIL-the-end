import React, { Component } from 'react';
import { connect } from "react-redux";
import { AuthWrapper, AuthContent, InputWithLabel, AuthButton, RightAlignedLink, TextWithLabel } from '../Auth';

class MyPage extends Component {
  render() {
    console.log('mypage')
    console.log(this.props.mem_info)
    return (
      <div style={{textAlign : 'center'}}>
      <div style={{ display: 'inline-block', width: 500 }}>
        <AuthWrapper title="내 정보">
          <AuthContent>
              {/* 로그인한 member 의 데이터를 아래 TextWithLabel 들의 value 에 줘야함. */}
            <TextWithLabel label="아이디" name="ID"  value={this.props.mem_info ? this.props.mem_info.mem_id : ''} />
            <TextWithLabel label="이메일" name="email"  value={this.props.mem_info ? this.props.mem_info.mem_email : ''} type="email"/>
            <TextWithLabel label="닉네임" name="nick" value={this.props.mem_info ? this.props.mem_info.mem_nick:''} />
            <RightAlignedLink to="/mypage/edit"> 수정 </RightAlignedLink>
            <RightAlignedLink to="/mypage/delete"> 탈퇴 </RightAlignedLink>
          </AuthContent>
        </AuthWrapper>
      </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    mem_info : state.members.mem_info,
  };
};

export default connect(mapStatetoProps)(MyPage);