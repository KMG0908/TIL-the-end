import React from "react";
import { connect } from "react-redux";
import { getOtherMember } from "../../actions";
import "./userInfo.css"

class UserInfo extends React.Component{
  componentDidMount(){
    this.props.getOtherMember(this.props.user_id);
  }
  setInfo(){
    if(this.props.info && this.props.info.mem_id == this.props.user_id){
      const reg_date = new Date(this.props.info.mem_reg_date);
      const year = reg_date.getFullYear();
      const month = reg_date.getMonth() + 1;
      const date = reg_date.getDate();
      const tmp_image = "https://www.gravatar.com/avatar/bc05615a975020a24c81da899a113e23?d=mm&s=90"
      
      return(
        <div>
          <div className="user_image">
            <img src={this.props.info.mem_thumb ? this.props.info.mem_thumb : tmp_image}></img>
          </div>
          <div className="user_info">
            <span className="user_nick">{this.props.info.mem_nick}</span>
            <span className="user_id" style={{color: "gray"}}>@{this.props.info.mem_id}</span>
            <div>{year}년 {month}월 {date}일에 가입함</div>
          </div>
        </div>
      )
    }
  }
  render(){
    return(
      <>
        {this.setInfo()}
      </>
    );
  }
}

const mapStatetoProps = state => {
  return {
    info : state.members.other_mem_info
  };
};

export default connect(mapStatetoProps, { getOtherMember })(UserInfo);