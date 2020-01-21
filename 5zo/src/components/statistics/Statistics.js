import React from "react";

<<<<<<< HEAD
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
  pre(e){
    console.log('aaa')
  }
  next(e){
    
  }
  render() {
    const user_id = this.props.match.params.user_id
    const today_ = moment().format('YYYY[-]MM[-]DD');
    
    console.log(today_)

    return (
      <div>
        <div>{user_id}님의 통계</div>
        <div>
          <input type="button" value="<" onClick={this.pre}/>
          <span>{today_}</span>
          <input type="button" value=">"/>
        </div>
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
=======
class Statistics extends React.Component {
  
  render() {
    
    const user_id = this.props.match.params.user_id
    return <div>{user_id}님의 통계</div>;
>>>>>>> 42cb57e79d51ee6ba8cbf6f4e351c2fd3f74aed3
  }
}

export default Statistics;
