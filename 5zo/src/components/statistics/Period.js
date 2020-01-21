import React from "react";

// 달력
import 'moment/locale/ko';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, isInclusivelyBeforeDay, isInclusivelyAfterDay } from 'react-dates';


// https://github.com/airbnb/react-dates
class Period extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      joinedDate: this.props.data.joinedDate,  // 가입일 => isInclusively~ 함수는 기준 날짜를 포함해서 제외하기 때문에 -1 해줘야 함
      today: this.props.data.today,
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
        isOutsideRange={(day) => isInclusivelyBeforeDay(day, this.state.joinedDate) || isInclusivelyAfterDay(day, this.state.today)}  // 2020/01/02 ~ 어제 날짜까지만 선택 가능
        startDatePlaceholderText={"시작 날짜"}
        endDatePlaceholderText={"종료 날짜"}
        showClearDates={true}   // x 표시
        showDefaultInputIcon={true} // 달력 표시
        minimumNights={0} // 하루만 선택 가능
      />
      // <DateRangePickerWrapper
      //   anchorDirection="left"
      //   autoFocus={false}
      //   autoFocusEndDate={false}
      //   block={false}
      //   customArrowIcon={null}
      //   customCloseIcon={null}
      //   customInputIcon={null}
      //   disabled={false}
      //   displayFormat={function noRefCheck(){}}
      //   enableOutsideDays={false}
      //   endDateId="endDate"
      //   endDatePlaceholderText="End Date"
      //   horizontalMargin={0}
      //   initialEndDate={'Thu Apr 30 2020 17:20:20 GMT+0900'}
      //   initialStartDate={'Mon Apr 20 2020 17:20:20 GMT+0900'}
      //   initialVisibleMonth={null}
      //   isDayBlocked={function noRefCheck(){}}
      //   isDayHighlighted={function noRefCheck(){}}
      //   isOutsideRange={function noRefCheck(){}}
      //   isRTL={false}
      //   keepOpenOnDateSelect={false}
      //   minimumNights={1}
      //   monthFormat="MMMM YYYY"
      //   navNext={null}
      //   navPosition="navPositionTop"
      //   navPrev={null}
      //   numberOfMonths={2}
      //   onClose={function noRefCheck(){}}
      //   onNextMonthClick={function noRefCheck(){}}
      //   onPrevMonthClick={function noRefCheck(){}}
      //   orientation="horizontal"
      //   phrases={{
      //     calendarLabel: 'Calendar',
      //     chooseAvailableEndDate: function noRefCheck(){},
      //     chooseAvailableStartDate: function noRefCheck(){},
      //     clearDates: 'Clear Dates',
      //     closeDatePicker: 'Close',
      //     dateIsSelected: function noRefCheck(){},
      //     dateIsSelectedAsEndDate: function noRefCheck(){},
      //     dateIsSelectedAsStartDate: function noRefCheck(){},
      //     dateIsUnavailable: function noRefCheck(){},
      //     enterKey: 'Enter key',
      //     escape: 'Escape key',
      //     focusStartDate: 'Interact with the calendar and add the check-in date for your trip.',
      //     hideKeyboardShortcutsPanel: 'Close the shortcuts panel.',
      //     homeEnd: 'Home and end keys',
      //     jumpToNextMonth: 'Move forward to switch to the next month.',
      //     jumpToPrevMonth: 'Move backward to switch to the previous month.',
      //     keyboardBackwardNavigationInstructions: 'Navigate backward to interact with the calendar and select a date. Press the question mark key to get the keyboard shortcuts for changing dates.',
      //     keyboardForwardNavigationInstructions: 'Navigate forward to interact with the calendar and select a date. Press the question mark key to get the keyboard shortcuts for changing dates.',
      //     keyboardShortcuts: 'Keyboard Shortcuts',
      //     leftArrowRightArrow: 'Right and left arrow keys',
      //     moveFocusByOneDay: 'Move backward (left) and forward (right) by one day.',
      //     moveFocusByOneMonth: 'Switch months.',
      //     moveFocusByOneWeek: 'Move backward (up) and forward (down) by one week.',
      //     moveFocustoStartAndEndOfWeek: 'Go to the first or last day of a week.',
      //     openThisPanel: 'Open this panel.',
      //     pageUpPageDown: 'page up and page down keys',
      //     questionMark: 'Question mark',
      //     returnFocusToInput: 'Return to the date input field.',
      //     roleDescription: 'datepicker',
      //     selectFocusedDate: 'Select the date in focus.',
      //     showKeyboardShortcutsPanel: 'Open the keyboard shortcuts panel.',
      //     upArrowDownArrow: 'up and down arrow keys'
      //   }}
      //   regular={false}
      //   renderCalendarDay={undefined}
      //   renderDayContents={null}
      //   renderMonthText={null}
      //   reopenPickerOnClearDates={false}
      //   required={false}
      //   screenReaderInputMessage=""
      //   showClearDates={false}
      //   showDefaultInputIcon={false}
      //   small={false}
      //   startDateId="startDate"
      //   startDatePlaceholderText="Start Date"
      //   stateDateWrapper={function noRefCheck(){}}
      //   withFullScreenPortal={false}
      //   withPortal={false}
      // />
    )
  }
}

export default Period;