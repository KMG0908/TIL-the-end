import React from "react";

class Statistics extends React.Component {
  
  render() {
    
    const userId = this.props.match.params.userId
    return <div>{userId}님의 통계</div>;
  }
}

export default Statistics;
