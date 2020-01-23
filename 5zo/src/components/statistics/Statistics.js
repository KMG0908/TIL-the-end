import React from "react";

import moment from "moment";
import PeriodWeek from "./PeriodWeek"
import PeriodMonth from "./PeriodMonth"
import PeriodSelect from "./PeriodSelect"
import TagFrequencyChart from "./TagFrequencyChart"
import CardCountChartWeek from "./CardCountChartWeek"
import CardCountChartMonth from "./CardCountChartMonth"
import CardCountChartSelect from "./CardCountChartSelect"

class Statistics extends React.Component {
  constructor(props){
    super(props);

    var date = '2019/01/05'
    var joinedDate = moment(date);
    var calendarStartDate = moment().subtract(7, 'day');
    if(new Date(joinedDate) > new Date(calendarStartDate)) calendarStartDate = joinedDate;
    
    this.state = {
      joinedDate: moment(date),  // 가입일
      availableDate: moment(),
      startDate: calendarStartDate,                 // 달력 시작 날짜
      endDate: moment().subtract(1, 'day'),         // 달력 종료 날짜
      focusedInput:null,
      date:moment().format('YYYY[-]MM[-]dd'),
      format:'YYYY[-]MM[-]dd',
      standard:'week'
    }

    this.setStandard = this.setStandard.bind(this);
  }
  setStandard(e){
    switch(e.target.name){
      case 'week':
        this.setState({
          // date: moment(this.state.date).format('YYYY[-]MM'),
          // format: 'YYYY[-]MM[-]dd',
          standard: 'week'
        })
        break;
      case 'month':
        this.setState({
          standard: 'month'
        })
        break;
      case 'select':
        this.setState({
          standard: 'select'
        })
        break;
      default:
    }
  }
  render() {
    const user_id = this.props.match.params.user_id

    let calendar;
    let linechart;

    switch(this.state.standard){
      case 'week':
        calendar = <div><PeriodWeek data={this.state}></PeriodWeek></div>
        linechart = <div><CardCountChartWeek></CardCountChartWeek></div>
        break;
      case 'month':
        calendar = <div><PeriodMonth data={this.state}></PeriodMonth></div>
        linechart = <div><CardCountChartMonth></CardCountChartMonth></div>
        break;
      case 'select':
        calendar = <div><PeriodSelect data={this.state}></PeriodSelect></div>
        linechart = <div><CardCountChartSelect></CardCountChartSelect></div>
        break;
      default:
    }

    return (
      <div>
        <div>{user_id}님의 통계</div>
        <div>
          <input type="button" value="주간" name="week" onClick={this.setStandard}/>
          <input type="button" value="월간" name="month" onClick={this.setStandard}/>
          <input type="button" value="기간 선택" name="select" onClick={this.setStandard}/>
        </div>
        {calendar}
        <div>
          <div>
            <TagFrequencyChart></TagFrequencyChart>
          </div>
          {linechart}
        </div>
      </div>
    );
  }
}

export default Statistics;
