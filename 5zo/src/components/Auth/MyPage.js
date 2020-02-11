import React, { Component } from 'react';
import { connect } from "react-redux";
import { AuthWrapper, AuthContent, InputWithLabel, AuthButton, RightAlignedLink, TextWithLabel } from '../Auth';
import { editMyColor, editMyColorFailReset, memInfoChangeReset } from "actions";
import { TwitterPicker } from "react-color";
import storage from 'lib/storage';

import styled from 'styled-components';
import oc from 'open-color';

const Label = styled.div`
    font-size : 1rem;
    color : ${oc.gray[6]};
    margin-bottom : 0.25rem;
    text-align : left
`;

class MyPage extends Component {

  handleChangeColor = color => {
    document.getElementById('myColor').style.backgroundColor = color.hex
    this.props.editMyColor(this.props.mem_info.mem_id, color.hex)
  };

  render() {
    if (this.props.mem_info_change) {
      const loggedInfo = this.props.mem_info_change;
      storage.set('loggedInfo', loggedInfo);

      this.props.memInfoChangeReset();
      this.props.editMyColorFailReset();
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-block', width: 500 }}>
          <AuthWrapper title="내 정보">
            <AuthContent>
              {/* 로그인한 member 의 데이터를 아래 TextWithLabel 들의 value 에 줘야함. */}
              <TextWithLabel label="아이디" name="ID" value={this.props.mem_info ? this.props.mem_info.mem_id : ''} />
              <TextWithLabel label="이메일" name="email" value={this.props.mem_info ? this.props.mem_info.mem_email : ''} type="email" />
              <TextWithLabel label="닉네임" name="nick" value={this.props.mem_info ? this.props.mem_info.mem_nick : ''} />
              {/* <div style={{background : this.props.mem_info.mem_color, width : '10', heigth : '10'}}/> */}
              <br></br>

              <Label>카드리스트 색</Label>
              <div style={{ display: 'inline-block', width: `100%` }} >
                <div style={{ display: 'inline-block', float:'left' ,height : '100px', minHeight : '100px'}}>
                  <div id='myColor' style={{ background: this.props.mem_info.mem_color, width: '50px',height : '100%', minWidth: '100px', minHeight: '100px' }} />
                </div>
                <div style={{ display: 'inline-block' ,float:'right'}}>
                  <TwitterPicker
                    style={{ marginRight: 0, border: null, display: 'inline-block' , }}

                    onChange={this.handleChangeColor}
                    triangle="hide"
                  />
                </div>
              </div>
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
    mem_info: state.members.mem_info,
    mem_info_change: state.members.mem_info_change
  };
};

export default connect(mapStatetoProps, { editMyColor, editMyColorFailReset, memInfoChangeReset })(MyPage);