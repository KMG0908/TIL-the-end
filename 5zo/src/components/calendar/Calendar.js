import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getDailyCal, fetchDailyLists } from "../../actions";
import { getLoggedInfo } from "../../actions";
import { connect } from "react-redux";
const localizer = momentLocalizer(moment)
const today = new Date();

function ClickEvent({ event }) {

  //console.log(event);
  return (
    <div>
      <div>
        <div>{event.title}</div>
      </div>
    </div>
  );
}
class Event extends React.Component {
  constructor(props) {
    super(props)
    //const event = [];

    this.state = {
      cal_events: [],
    }
  }
  componentDidMount() {
    if (this.props.members.mem_info) {
      this.props.getDailyCal(this.props.members.mem_info.mem_id, this.props.members.mem_info.mem_reg_date, today);
    }
  }
 
  onSlotChange(slotInfo) {
    //console.log(slotInfo)
    var startDate = moment(slotInfo.start.toLocaleString()).format("YYYY-MM-DDm:ss");
    var endDate = moment(slotInfo.end.toLocaleString()).format("YYYY-MM-DDm:ss");
    //console.log(startDate); 
    //console.log(endDate); 
  }
  onEventClick(event) {
    console.log(event) 
  }
  setCalendar() {
    const { classes } = this.props;
    console.log(this.props.daily)
    if (this.props.daily.info) {
      const app = this.props.daily.info;
      const data = []
      for (let i = 0; i < app.length; i++) {
        data.push({
          id: app[i].cardlist_id,
          title: app[i].cardlist_name,
          start: app[i].date,
          end: app[i].date
        })
      }
     
      let appointments = data;
      for (let i = 0; i < appointments.length; i++) {
        appointments[i].start = moment.utc(appointments[i].start).toDate();
        appointments[i].end = moment.utc(appointments[i].end).toDate();
      }
      let cal_events = appointments
      return (
        <Calendar
          selectable
          view="month"
          views={["month"]}
          localizer={localizer}
          onSelectEvent={event => this.onEventClick(event)}
          onSelectSlot={(slotInfo) => this.onSlotChange(slotInfo)}
          events={cal_events}
          startAccessor="start"
          endAccessor="end"
          defaultDate={new Date()}
          style={{ height: 500 }}
          step={30}
          timeslots={2}
        />
      );
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
    boards: state.boards,
    boardDict: state.boardDict,
    cardLists: state.cardLists,
    members: state.members,
    daily: state.dailyCalendar,
  };
};
export default connect(mapStateToProps, { getLoggedInfo, getDailyCal, fetchDailyLists })(Event);