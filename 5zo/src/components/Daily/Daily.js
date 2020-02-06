import React from "react";
import UserInfo from "./UersInfo"
import Heatmap from "components/heatmap/Heatmap";

class Profile extends React.Component{
  render(){
    const user_id = this.props.match.params.user_id

    return(
      <>
        <UserInfo user_id={user_id}></UserInfo>
        <Heatmap user_id={user_id}></Heatmap>
      </>
    );
  }
}

export default Profile;