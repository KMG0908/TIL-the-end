

import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import axios from 'axios';
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)

const myEventsList =[]
var data = require('./evadata.json');
class Event extends React.Component{
  constructor(props){
      super(props)
      this.state = {
          cal_events: [],
      }
  }
  convertDate = (date) => {
    return moment.utc(date).toDate()
  }
  
  componentDidMount(){
   
      let appointments = data;
      
      for (let i = 0; i < appointments.length; i++) {
        appointments[i].start = moment.utc(appointments[i].start).toDate();
        appointments[i].end = moment.utc(appointments[i].end).toDate();
        
      }
      this.setState({
        cal_events:appointments
      })
    
  }
 render() {
   const {cal_events} = this.state
   return (
     <div>
       <Calendar
      localizer={localizer}
      events={cal_events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
     </div>
   )
 }
}
Event.defaultProps = {
  title: 'Calendar'
}
export default Event