import React from "react";

import moment from "moment";
import Period from "./Period"
import TagFrequencyChart from "./TagFrequencyChart"
import CardCountChart from "./CardCountChart"

class Statistics extends React.Component {
  constructor(props){
    super(props);

    var date = '2020/01/11'
    var joinedDate = moment(date);
    var calendarStartDate = moment().subtract(7, 'day');
    if(new Date(joinedDate) > new Date(calendarStartDate)) calendarStartDate = joinedDate;
    
    this.state = {
      joinedDate: moment(date).subtract(1, 'day'),  // 가입일 => isInclusively~ 함수는 기준 날짜를 포함해서 제외하기 때문에 -1 해줘야 함
      today: moment(),
      startDate: calendarStartDate,                 // 달력 시작 날짜
      endDate: moment().subtract(1, 'day'),         // 달력 종료 날짜
      focusedInput:null
    }
  }
  render() {
    const user_id = this.props.match.params.user_id

    return (
      <div>
        <div>{user_id}님의 통계</div>
        <div><Period data={this.state}></Period></div>
        <div>
          <div>
            <TagFrequencyChart></TagFrequencyChart>
          </div>
          <div>
            <CardCountChart></CardCountChart>
          </div>
        </div>
      </div>
    );
  }
}

export default Statistics;
