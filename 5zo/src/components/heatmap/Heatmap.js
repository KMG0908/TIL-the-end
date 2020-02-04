import CalendarHeatmap from 'react-calendar-heatmap'
import React from 'react'
import { connect } from "react-redux";
import { getLoggedInfo, getDailyTask } from "../../actions";
import 'react-calendar-heatmap/dist/styles.css'

const today = new Date();
class Heatmap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      heat: [],
    }
  }
  componentDidMount() {
    const member = this.props.mem_info;
    console.log(member)
    console.log(today)
    this.props.getDailyTask(member.mem_id, shiftDate(today, -365), today);

  }
  setHeatMap() {
    if (this.props.board_info) {
      const state = this.props.board_info
      const data = []
      for (let i = 0; i < state.length; i++) {
        data.push({
          count: state[i].board_id,
          date: state[i].board_date
        })
      }
      return (
        <CalendarHeatmap
          startDate={shiftDate(today, -365)}
          endDate={today}
          values={data}
        />
      )
    }
  }
  render() {
    return (
      <div>{this.setHeatMap()}</div>
    )
  }
}

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

const mapStatetoProps = state => {
  return {
    mem_info: state.members.mem_info,
    board_info: state.heatmaps.info
  };
};

export default connect(mapStatetoProps, { getLoggedInfo, getDailyTask })(Heatmap);