import React from "react";
import { connect } from "react-redux";
import { fetchMembers } from "../../actions";
class Main extends React.Component {
  componentDidMount() {
    //this.props.fetchMembers();
  }
  users() {
    // if (this.props.members) {
    //   return this.props.members.map(member => (
    //     <div key={member.mem_id}>
    //       {member.mem_id}님, 닉네임은 {member.mem_nick}, 이메일은 {member.mem_email}
    //     </div>
    //   ));
    // }
    if(this.props.members.mem_info){
      const member = this.props.members.mem_info;
      return (
        <div key={member.mem_id}>
          {member.mem_id}님, 닉네임은 {member.mem_nick}, 이메일은 {member.mem_email}
        </div>
      );
    }
  }
  render() {
    return <div>유저목록 : {this.users()}</div>;
  }
}

const mapStatetoProps = state => {
  console.log(state)
  return {
    //members: Object.values(state.members)
    members: state.members
  };
};

export default connect(mapStatetoProps, { fetchMembers })(Main);
