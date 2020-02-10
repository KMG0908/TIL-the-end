import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getDailyCal, fetchDailyLists } from "../../actions";
import { getLoggedInfo } from "../../actions";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
const localizer = momentLocalizer(moment)
const today = new Date();


function date_to_str(format, separator) {
  let year = format.getFullYear();
  let month = format.getMonth() + 1;
  let date = format.getDate();

  return (
    year +
    separator +
    ("0" + month).slice(-2) +
    separator +
    ("0" + date).slice(-2)
  );
}
function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}
class Event extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cal_events: [],
    }
  }


  componentDidMount() {
    let endDate = shiftDate(today, 100);
    if (this.props.members.mem_info) {

      this.props.getDailyCal(this.props.members.mem_info.mem_id, this.props.members.mem_info.mem_reg_date, endDate);
    }
  }

  onSlotChange(slotInfo) {
    var endDate = moment(slotInfo.end.toLocaleString()).format("YYYY-MM-DDm:ss");
  }

  onEventClick(event) {
    console.log(event)
    this.state.cur_date = event.start;
    const start = date_to_str(event.start, "");
    let id = this.props.members.mem_info.mem_id
    window.location.href = "http://localhost:3000/daily/" + id + "/" + start;
  }

  eventStyleGetter = (event, start, end, isSelected) => {
    let newStyle = {
      backgroundColor: "#94C9A9",
      color: 'white',
      borderRadius: "10px",
      border: "none",
      display: 'block'
    };

    if (event.isMine) {
      newStyle.backgroundColor = "lightgreen"
    }

    return {
      className: "",
      style: newStyle
    };
  }
  dayStyleGetter = (event, start, end, isSelected) => {
    let newStyle = {
      backgroundColor: "#94C9A9",
      color: 'white',
      borderRadius: "10px",
      border: "none",
      display: 'block'
    };

    if (event.isMine) {
      newStyle.backgroundColor = "lightgreen"
    }

    return {
      className: "",
      style: newStyle
    };
  }
  ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: 'lightblue',

      },
    })
  
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
          end: app[i].date,
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
          style={{ height: 600 }}
          step={30}
          timeslots={2}
          eventPropGetter={(this.eventStyleGetter)}

        />
      );
    }
  }
  render() {
    return (
      <div>
        <Container maxWidth="m">
          {this.setCalendar()}
        </Container>

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