import React from "react";
import UserInfo from "./UersInfo"
import Heatmap from "components/heatmap/Heatmap";
import Daily from "./Daily";
import storage from "lib/storage";
import { connect } from "react-redux";
import { fetchDailyLists, setEditModeList } from "../../actions";

class Main extends React.Component{
  constructor(props){
    super(props);

    let user_id = this.props.match.params.user_id
    
    if(!user_id) user_id = storage.get('loggedInfo').mem_id
    
    let date = new Date();
    if(user_id === storage.get('loggedInfo').mem_id) date = this.date_to_str(date, "-")
    else date = this.date_to_str(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1), "-")

    this.state = {
      date: date,
      user_id: user_id
    }

    this.onHandleDate = this.onHandleDate.bind(this);
  }
  componentDidMount(){
    this.props.setEditModeList(null);
    this.props.fetchDailyLists(
      this.state.user_id,
      this.state.date
    );
  }
  onHandleDate(date){
    if(this.state.user_id === storage.get('loggedInfo').mem_id){
      this.setState({
        date : date
      })
      this.props.fetchDailyLists(
        this.state.user_id,
        date
      );
    }
    else{
      if(date < new Date().toISOString().split("T")[0]){
        this.setState({
          date : date
        })
        this.props.fetchDailyLists(
          this.state.user_id,
          date
        );
      }
    }
  }
  date_to_str(format, separator) {
    let year = format.getFullYear();
    let month = format.getMonth() + 1;
    let date = format.getDate();
  
    return (
      year +
      separator +
      ("0" + month).slice(-2) +
      separator +
      ("0" + date).slice(-2)
    );
  }
  render(){
    return(
      <>
        <UserInfo user_id={this.state.user_id}></UserInfo>
        <Heatmap user_id={this.state.user_id} onHandleDate={this.onHandleDate}></Heatmap>
        <Daily user_id={this.state.user_id} date={this.state.date} onHandleDate={this.onHandleDate}></Daily>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, { fetchDailyLists, setEditModeList })(Main);
