import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import axios from 'axios';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getDailyCal, fetchDailyLists } from "../../actions";
import { getLoggedInfo } from "../../actions";
import { connect } from "react-redux";
const localizer = momentLocalizer(moment)

const myEventsList = []
const today = new Date();
const date = "2020-02-03";
class Event extends React.Component {
  constructor(props) {
    super(props)
    const event = [];
   
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
    if (!this.props.daily.info) {
      /*
      for(let i = 0; i < this.props.daily.info.length; i++) {
        this.event[i] = this.props.daily.info.board_date
      }*/
      
      setTimeout(
        () => this.setFetch()
        , 100)
    }
    else {
      this.setFetch()
    }

  }
  setFetch() {
    const arr = this.props.daily.info
    if (this.props.members.mem_info) {
      for(let i = 0; i < arr.length; i++) {
        this.props.fetchDailyLists(this.props.members.mem_info.mem_id, arr[i].board_date);
      }
    }
  }
  setCalendar() {
    const { classes } = this.props;
    const app = this.props.boards.info;
    console.log(app)
    if (app) {
      for (let i = 0; i < app.length; i++) {
        if (app[i] && this.props.boardDict[app[i].board_date]) {
          console.log(app[i].board_date)
          console.log(app[i])
        }
        
      }

    }

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
  setEvent(i, appoint) {

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
    boards: state.boards,
    boardDict: state.boardDict,
    cardLists: state.cardLists,
    members: state.members,
    daily: state.dailyCalendar,
    dailyList: state.listCalendar
  };
};
export default connect(mapStateToProps, { getLoggedInfo, getDailyCal, getDailyList, fetchDailyLists })(Event);