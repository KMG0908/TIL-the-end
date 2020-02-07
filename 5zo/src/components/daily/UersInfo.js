import React from "react";
import { connect } from "react-redux";
import { getOtherMember } from "../../actions";

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
      return(
        <div>
          <div>
            <img></img>
          </div>
          <div>
            <span>{this.props.info.mem_nick}</span>
            <span style={{color: "gray"}}> @{this.props.info.mem_id}</span>
          </div>
          <div>
            <span>{year}년 {month}월 {date}일에 가입함</span>
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