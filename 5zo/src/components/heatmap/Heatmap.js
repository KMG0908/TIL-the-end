import CalendarHeatmap from 'react-calendar-heatmap'
import React from 'react'
import { connect } from "react-redux";
import { getLoggedInfo, getDailyTask } from "../../actions";
import 'react-calendar-heatmap/dist/styles.css'
import ReactTooltip from 'react-tooltip';
const today = new Date();
class Heatmap extends React.Component {
  state = {
    data: [],
  }
  componentDidMount() {
    const user_id = this.props.user_id;
    this.props.getDailyTask(user_id, shiftDate(today, -365), today);
  }
  getTooltipDataAttrs = (value) => {
    if (!value || !value.date) {
      return {
        'data-tip': `No Tasks`,
      }
    }
    return {
      'data-tip': `${value.date} with task: ${value.count}`,
    };
  };
  handleClick = (value) => {
    if (!value || !value.date) {
      return null;
    }
    this.props.onHandleDate(value.date);
    alert(`${value.date} with task: ${value.count}`);
  };
  setHeatMap() {
    if (this.props.board_info) {
      const state = this.props.board_info
      for (let i = 0; i < state.length; i++) {
        this.state.data.push({
          count: state[i].board_id,
          date: state[i].board_date
        })
      }
    }
  }
  render() {
    this.setHeatMap()
    return (
      <div>
        <CalendarHeatmap
          startDate={shiftDate(today, -365)}
          endDate={today}
          values={this.state.data}
          tooltipDataAttrs={this.getTooltipDataAttrs}
          onClick={this.handleClick}
        />
        <ReactTooltip />
      </div >
    );
  }
}

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

const mapStatetoProps = state => {
  return {
    board_info: state.heatmaps.info
  };
};

export default connect(mapStatetoProps, { getDailyTask })(Heatmap);