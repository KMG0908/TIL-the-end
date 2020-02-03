import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import axios from 'axios';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getDailyCal } from "../../actions";
import { getLoggedInfo } from "../../actions";
import { connect } from "react-redux";
const localizer = momentLocalizer(moment)

const myEventsList = []
const today = new Date();
const date = "2020-02-03";
class Event extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cal_events: [],
    }
  }

  componentDidMount() {
    if (this.props.members.mem_info) {
      console.log(this.props.members.mem_info.mem_reg_date)
      console.log(today)
      this.props.getDailyCal(this.props.members.mem_info.mem_id, this.props.members.mem_info.mem_reg_date, today);
    }
    
  }
  setCalendar() {
    const { classes } = this.props;
    console.log("aaaaaaaaaaaaaaaaaaa")
    console.log(this.props.daily)
    console.log(date)
    if (this.props.daily) {
      /*
      this.setState({
        cal_events: appointments
      })
      const { cal_events } = this.state
      return (
        <Calendar
          localizer={localizer}
          events={cal_events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      );
      */
      /*
      const board_lists = Array.isArray(
        this.props.boards[this.props.boardDict[date]].board_lists
      )
        ? this.props.boards[this.props.boardDict[date]].board_lists
        : JSON.parse(
          this.props.boards[this.props.boardDict[date]].board_lists
        );
      return board_lists.map((list, index) => {
        
        if (this.props.cardLists[list]) {
          const state = this.props.cardLists;
          const data = []
          for (let i = 0; i < state.length; i++) {
            data.push({
              id: i,
              title: state[i].cardList_name,
              start: this.props.boardDict[date],
              end: this.props.boardDict[date]
            })
          }
          let appointments = data;
          
          for (let i = 0; i < appointments.length; i++) {
            appointments[i].start = moment.utc(appointments[i].start).toDate();
            appointments[i].end = moment.utc(appointments[i].end).toDate();
  
          }
          this.setState({
            cal_events: appointments
          })
          const { cal_events } = this.state
          return (
            <Calendar
              localizer={localizer}
              events={cal_events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
            />
          );
        }
      });
  
      */
    }
  }
  render() {

    return (
      <div>
        {this.setCalendar()}
      </div>
    )
  }
}
Event.defaultProps = {
  title: 'Calendar'
}

const mapStateToProps = state => {
  return {
    members: state.members,
    boards: state.boards,
    boardDict: state.boardDict,
    cardLists: state.cardLists,
    daily: state.dailyCalendar
  };
};
export default connect(mapStateToProps, { getLoggedInfo, getDailyCal })(Event);