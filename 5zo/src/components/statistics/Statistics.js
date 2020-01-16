import React from "react";

class Statistics extends React.Component {
  
  render() {
    
    const user_id = this.props.match.params.user_id
    return <div>{user_id}님의 통계</div>;
  }
}

export default Statistics;
