import React from "react";
import UserInfo from "./UersInfo"
import Heatmap from "components/heatmap/Heatmap";
import Daily from "./Daily";
import storage from "lib/storage";

class Main extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      date: new Date().toISOString().split("T")[0]
    }

    this.onHandleDate = this.onHandleDate.bind(this);
  }
  onHandleDate(date){
    console.log("date....")
    console.log(date);
    this.setState({
      date : date
    })
  }
  render(){
    let user_id = this.props.match.params.user_id
    if(!user_id) user_id = storage.get('loggedInfo').mem_id

    return(
      <>
        <UserInfo user_id={user_id}></UserInfo>
        <Heatmap user_id={user_id} onHandleDate={this.onHandleDate}></Heatmap>
        <Daily user_id={user_id} date={this.state.date} onHandleDate={this.onHandleDate}></Daily>
      </>
    );
  }
}

export default Main;
