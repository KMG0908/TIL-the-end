import CalendarHeatmap from 'react-calendar-heatmap'
import React from 'react'
import 'react-calendar-heatmap/dist/styles.css'
import moment from 'moment'
import axios from 'axios';
import { connect } from "react-redux";

//var data = require('./heat.json');
const today = new Date();
class Heatmap extends React.Component{
    render() {
        return (
          <div>
            <CalendarHeatmap
                 startDate={shiftDate(today, -365)}
                 endDate={today}
                 values={[
                     { date: '2016-01-01', count: 12 },
                     { date: '2016-01-22', count: 122 },
                     { date: '2016-01-30', count: 38 },
                 ]}
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