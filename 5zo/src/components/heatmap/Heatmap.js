import CalendarHeatmap from "react-calendar-heatmap";
import React from "react";
import { connect } from "react-redux";
import { getDailyTask } from "../../actions";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";
import "./heatmap.css";
import moment from "moment";
import storage from "lib/storage";

let lastDay = new Date();
class Heatmap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }
  componentDidMount() {
    const user_id = this.props.user_id;

    lastDay = new Date();
    if (user_id !== storage.get("loggedInfo").mem_id)
      lastDay.setDate(lastDay.getDate() - 1);
    this.props.getDailyTask(user_id, shiftDate(lastDay, -365), lastDay);
  }
  getTooltipDataAttrs = value => {
    let date = moment(value.date).format("YYYY년 MM월 DD일");
    if (value.count === 0) {
      return {
        "data-tip": `No task, ${date}`
      };
    }
    return {
      "data-tip": `${value.count} task, ${date}`
    };
  };
  handleClick = value => {
    if (value.count == 0) {
      return null;
    }
    this.props.onHandleDate(value.date);
  };
  setHeatMap() {
    if (this.props.board_info) {
      const state = this.props.board_info;
      let data = [];

      let startDate = shiftDate(lastDay, -365);
      let endDate = lastDay;

      let date = startDate;
      while (true) {
        data.push({
          count: 0,
          date: date_to_str(date, "-")
        });

        if (date_to_str(date, "-") === date_to_str(endDate, "-")) break;

        date = shiftDate(date, 1);
      }

      for (let i = 0; i < state.length; i++) {
        if (data[dateDiff(startDate, state[i].board_date)]) {
          data[dateDiff(startDate, state[i].board_date)].count =
            state[i].board_id;
        }
      }

      return (
        <div className="user-heatmap">
          <CalendarHeatmap
            startDate={shiftDate(lastDay, -365)}
            endDate={lastDay}
            values={data}
            tooltipDataAttrs={this.getTooltipDataAttrs}
            onClick={this.handleClick}
            classForValue={value => {
              if (value.count == 0) {
                return `color-empty`;
              } else if (value.count <= 5) {
                return `color-scale-1`;
              } else if (value.count <= 10) {
                return `color-scale-2`;
              } else if (value.count <= 15) {
                return `color-scale-3`;
              } else {
                return `color-scale-4`;
              }
            }}
            showWeekdayLabels={true}
            monthLabels={[
              "1월",
              "2월",
              "3월",
              "4월",
              "5월",
              "6월",
              "7월",
              "8월",
              "9월",
              "10월",
              "11월",
              "12월"
            ]}
            weekdayLabels={["월", "월", "수", "수", "금", "금", "일"]}
          />
          <ReactTooltip />
        </div>
      );
    }
  }
  render() {
    return <div>{this.setHeatMap()}</div>;
  }
}

function dateDiff(date1, date2) {
  date1 = new Date(date1);
  date2 = new Date(date2);

  date1 = new Date(date1.getFullYear(), date1.getMonth() + 1, date1.getDate());
  date2 = new Date(date2.getFullYear(), date2.getMonth() + 1, date2.getDate());

  var diff = Math.abs(date2.getTime() - date1.getTime());
  diff = Math.ceil(diff / (1000 * 3600 * 24));

  return diff - 1;
}

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

const mapStatetoProps = state => {
  return {
    board_info: state.heatmaps.info
  };
};

export default connect(mapStatetoProps, { getDailyTask })(Heatmap);
