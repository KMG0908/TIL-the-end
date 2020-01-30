import CalendarHeatmap from 'react-calendar-heatmap'
import React from 'react'
import 'react-calendar-heatmap/dist/styles.css'
import moment from 'moment'
import axios from 'axios';
import { connect } from "react-redux";

var data = require('./heat.json');
const today = new Date();
class Heatmap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      heat: [],
    }
  }
  componentDidMount() {
    let appointments = data;
    this.setState({
      heat:appointments
    })
  }
  render() {
    const {heat} = this.state
    return (
      <div>
        <CalendarHeatmap
          startDate={shiftDate(today, -365)}
          endDate={today}
          values={heat}
        />
      </div>
    )
  }
}

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

export default Heatmap