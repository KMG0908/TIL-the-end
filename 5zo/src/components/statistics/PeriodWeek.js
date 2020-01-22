import React from "react";

// 달력
import 'moment/locale/ko';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, isInclusivelyBeforeDay, isInclusivelyAfterDay } from 'react-dates';

import moment  from "moment"
import './Period.css'

// https://github.com/airbnb/react-dates
class PeriodWeek extends React.Component{
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
    if(e.startDate != null) {
      // startDate + 6이 어제 날짜를 넘어간다면? ==> 나중에 예외 처리 할 것!
      this.setState({
        startDate: e.startDate,
        endDate: moment(e.startDate).add(6, 'day')
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
        isOutsideRange={(day) => isInclusivelyBeforeDay(day, moment(this.state.joinedDate).subtract(1, 'day')) || isInclusivelyAfterDay(day, this.state.availableDate)}  // 2020/01/02 ~ 어제 날짜까지만 선택 가능
        startDatePlaceholderText={"시작 날짜"}
        endDatePlaceholderText={"종료 날짜"}
        showDefaultInputIcon={true} // 달력 표시
        numberOfMonths={1}  // 한달만 표시
        disabled={'endDate'}
        endDateOffset={day => day.add(6, 'day')}
        readOnly
      />
      
      // <div>
      //   <div style={{ marginBottom: 16 }}>
      //     <input type="text" name="start date" value={startDateString} readOnly />
      //     <input type="text" name="end date" value={endDateString} readOnly />
      //   </div>
        
      //   <DayPickerRangeController
      //     startDate={this.state.startDate} // momentPropTypes.momentObj or null,
      //     endDate={this.state.endDate} // momentPropTypes.momentObj or null,
      //     onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
      //     focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
      //     onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
      //     // startDateOffset={day => day.startOf("week")}
      //     // endDateOffset={day => day.endOf("week")}
      //     endDateOffset={day => day.add(6, 'day')}
      //   />
      // </div>
    )
  }
}

export default PeriodWeek;