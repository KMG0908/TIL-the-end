import React from "react";

// 달력
import 'moment/locale/ko';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, isInclusivelyBeforeDay, isInclusivelyAfterDay } from 'react-dates';

import moment  from "moment"
import './Period.css'

// https://github.com/airbnb/react-dates
class PeriodMonth extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      joinedDate: this.props.data.joinedDate,  // 가입일 => isInclusively~ 함수는 기준 날짜를 포함해서 제외하기 때문에 -1 해줘야 함
      availableDate: moment(this.props.data.availableDate).startOf('month'),
      startDate: moment(this.props.data.availableDate).startOf('month').subtract(1, 'month'),      // 달력 시작 날짜
      endDate: moment(this.props.data.availableDate).endOf('month').subtract(1, 'month'),        // 달력 종료 날짜
      focusedInput: null
    }
    this.datesChange = this.datesChange.bind(this);
  }
  datesChange(e){
    if(e.startDate != null) {
      var calendarStartDate = moment(e.startDate).startOf('month');

      var joined = new Date(this.state.joinedDate);
      var day_ = new Date(e.startDate);
      if(joined.getFullYear() === day_.getFullYear() && joined.getMonth() === day_.getMonth()) {
        calendarStartDate = this.state.joinedDate
      }

      this.setState({
        startDate: calendarStartDate,
        endDate: moment(e.startDate).endOf('month')
      }, 
        () => {
          if(this.state.startDate == null || this.state.endDate == null){
            console.log("")
          }
          else{
            console.log(new Date(this.state.startDate).getDate() + " " + new Date(this.state.endDate).getDate())
          }
      })
    }
  }
  render(){
    return (
      <DateRangePicker
        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        onDatesChange={this.datesChange} // PropTypes.func.isRequired,
        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        displayFormat={"YYYY/MM/DD"}
        isOutsideRange={(day) => isInclusivelyBeforeDay(day, moment(this.state.joinedDate).subtract(1, 'day')) || isInclusivelyAfterDay(day, this.state.availableDate)}  // 가입일 ~ 어제 날짜까지만 선택 가능
        // 가입일 => isInclusively~ 함수는 기준 날짜를 포함해서 제외하기 때문에 -1 해줘야 함
        startDatePlaceholderText={"시작 날짜"}
        endDatePlaceholderText={"종료 날짜"}
        showDefaultInputIcon={true} // 달력 표시
        numberOfMonths={1}  // 한달만 표시
        disabled={'endDate'}
        startDateOffset={day => {
          var joined = new Date(this.state.joinedDate);
          var day_ = new Date(moment(day).startOf(1, 'month'));
          if(joined.getFullYear() === day_.getFullYear() && joined.getMonth() === day_.getMonth()) {
            return moment(new Date(this.state.joinedDate));
          }
          else{
            return day.startOf('month')
          }
        }}
        endDateOffset={day => day.endOf('month')}
        readOnly
      />
    )
  }
}

export default PeriodMonth;