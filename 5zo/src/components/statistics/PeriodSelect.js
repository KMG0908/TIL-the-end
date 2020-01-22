import React from "react";

// 달력
import moment from "moment"
import 'moment/locale/ko';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, isInclusivelyBeforeDay, isInclusivelyAfterDay } from 'react-dates';

// https://github.com/airbnb/react-dates
class PeriodSelect extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      joinedDate: this.props.data.joinedDate,  // 가입일 => isInclusively~ 함수는 기준 날짜를 포함해서 제외하기 때문에 -1 해줘야 함
      availableDate: this.props.data.availableDate,
      startDate: this.props.data.startDate,      // 달력 시작 날짜
      endDate: this.props.data.endDate,        // 달력 종료 날짜
      focusedInput: null
    }
    this.datesChange = this.datesChange.bind(this);
  }
  datesChange(e){
    this.setState({
      startDate: e.startDate,
      endDate: e.endDate
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
        isOutsideRange={(day) => isInclusivelyBeforeDay(day, moment(this.state.joinedDate).subtract(1, 'day')) || isInclusivelyAfterDay(day, this.state.availableDate)}  // 2020/01/02 ~ 어제 날짜까지만 선택 가능
        startDatePlaceholderText={"시작 날짜"}
        endDatePlaceholderText={"종료 날짜"}
        showDefaultInputIcon={true} // 달력 표시
        minimumNights={0} // 하루만 선택 가능
        numberOfMonths={1}  // 한달만 표시
      />
    )
  }
}

export default PeriodSelect;