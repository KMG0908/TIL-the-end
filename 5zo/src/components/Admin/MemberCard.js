import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { connect } from 'react-redux';
import Switch from '@material-ui/core/Switch';
import styled from 'styled-components';
import oc from 'open-color';
import Avatar from '@material-ui/core/Avatar';
import { editMyColor, changeMemInfo, editMyDefSecret } from "actions";
import {TextWithLabel} from '../Auth'
const Label = styled.div`
    font-size : 1rem;
    color : ${oc.gray[6]};
    margin-bottom : 0.25rem;
    text-align : left;
`;

class MemberCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: props.member ? props.member.mem_post_def_secret : false
    }
  }
  handleChange = async e => {
    this.setState({
      checked: e.target.checked
    })
    this.props.editMyDefSecret(this.props.member.mem_id, e.target.checked)
  }
  render() {
    return (
      <ExpansionPanel style={{width : 600, marginBottom : 5}} >
        <ExpansionPanelSummary>
          <Avatar component={'span'} style={{marginRight : 10}} alt="Remy Sharp" src={this.props.member ? this.props.member.mem_thumb : ''} />
          <Typography style={{fontSize:25}}> {this.props.member ? this.props.member.mem_id : null}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{display : 'inline-block' , width : '100%'}}>
          <div>
            <div id="image_div">
              <img id="profile_image" src={this.props.mem_info ? this.props.mem_info.mem_thumb : null} key={new Date().getTime()} style={{ borderRadius: '50%' }}></img>
            </div>
            <TextWithLabel label="아이디" name="ID" value={this.props.member ? this.props.member.mem_id : ''} />
            <TextWithLabel label="이메일" name="email" value={this.props.member ? this.props.member.mem_email : ''} type="email" />
            <TextWithLabel label="닉네임" name="nick" value={this.props.member ? this.props.member.mem_nick : ''} />
            <TextWithLabel label="소개글" name="intro" value={this.props.member ? this.props.member.mem_self_intro : ''} />
            {this.state.checked ?
              <Label> 카드리스트 기본 비공개 설정</Label>
              :
              <Label> 카드리스트 기본 공개 설정</Label>
            }
            <Switch
              checked={this.state.checked}
              onChange={this.handleChange}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}
const mapStatetoProps = state => {
  return {
  };
}

export default connect(mapStatetoProps, {editMyDefSecret})(MemberCard)