import React from "react";
import UserInfo from "./UersInfo";
import Heatmap from "components/heatmap/Heatmap";
import Daily from "./Daily";
import storage from "lib/storage";
import { connect } from "react-redux";
import { fetchDailyLists, setEditModeList } from "../../actions";
import Button from "@material-ui/core/Button";
import { createMuiTheme } from "@material-ui/core/styles";

import { ThemeProvider } from "@material-ui/styles";
const GlobalTheme = createMuiTheme({
  palette: {
    secondary: {
      main: storage.get("loggedInfo") ? storage.get("loggedInfo").mem_color : "#ffffff",
      contrastText: "white"
    }
  }
});

class Main extends React.Component {
  constructor(props) {
    super(props);

    let user_id = this.props.match.params.user_id;
    if (!user_id) user_id = storage.get("loggedInfo").mem_id;

    let lastDay = new Date();

    let date = this.props.match.params.date;
    if (!date) date = new Date();
    else
      date = new Date(
        date.substr(0, 4),
        date.substr(4, 2) * 1 - 1,
        date.substr(6, 2)
      );
    date = this.date_to_str(date, "-");

    if (user_id !== storage.get("loggedInfo").mem_id) {
      if (date >= new Date().toISOString().split("T")[0]) {
        date = new Date();
        date.setDate(date.getDate() - 1);

        date = this.date_to_str(date, "-");
      }

      lastDay.setDate(lastDay.getDate() - 1);
      lastDay = this.date_to_str(lastDay, "-");
    }

    this.state = {
      date: date,
      cur_date: lastDay,
      user_id: user_id
    };

    this.onHandleDate = this.onHandleDate.bind(this);
  }
  componentDidMount() {
    this.props.setEditModeList(null);
    this.props.fetchDailyLists(this.state.user_id, this.state.date);
  }
  onHandleDate(date) {
    if (this.state.user_id === storage.get("loggedInfo").mem_id) {
      this.setState({
        date: date
      });
      this.props.fetchDailyLists(this.state.user_id, date);
    } else {
      if (date < new Date().toISOString().split("T")[0]) {
        this.setState({
          date: date
        });
        this.props.fetchDailyLists(this.state.user_id, date);
      }
    }

    const d = date.replace(/-/gi, "");
    this.props.history.replace(`/daily/${this.state.user_id}/${d}`);
  }
  date_to_str(format, separator) {
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
  setHeatMap(year) {
    let local_date = false;

    if (year == 2020) {
      this.state.bu1 = "secondary";
      this.state.bu2 = "white";
      this.state.bu3 = "white";
      local_date = new Date();
      this.setState({
        cur_date: local_date
      });
    } else if (year == 2019) {
      this.state.bu2 = "secondary";
      this.state.bu1 = "white";
      this.state.bu3 = "white";
      this.setState({
        cur_date: new Date("december 31 2019")
      });
    } else {
      this.state.bu3 = "secondary";
      this.state.bu2 = "white";
      this.state.bu1 = "white";
      this.setState({
        cur_date: new Date("december 31 2018")
      });
    }
  }
  render() {
    const now_user_id =
      this.props.match.params.user_id || storage.get("loggedInfo").mem_id;
    if (
      this.state.user_id !==
      (this.props.match.params.user_id || storage.get("loggedInfo").mem_id)
    ) {
      this.setState({
        user_id: now_user_id
      });
    }

    return (
      <>
        <UserInfo user_id={this.state.user_id}></UserInfo>
        <div align="center">
          <ThemeProvider theme={GlobalTheme}>
            <Button
              variant="contained"
              color={this.state.bu1}
              onClick={() => {
                this.setHeatMap(2020);
              }}
            >
              2020
            </Button>
            <Button
              color={this.state.bu2}
              variant="contained"
              onClick={() => {
                this.setHeatMap(2019);
              }}
            >
              {" "}
              2019{" "}
            </Button>
            <Button
              color={this.state.bu3}
              variant="contained"
              onClick={() => {
                this.setHeatMap(2018);
              }}
            >
              {" "}
              2018{" "}
            </Button>
          </ThemeProvider>
        </div>
        <Heatmap
          user_id={this.state.user_id}
          onHandleDate={this.onHandleDate}
          cur_date={this.state.cur_date}
        ></Heatmap>
        <Daily
          user_id={this.state.user_id}
          date={this.state.date}
          onHandleDate={this.onHandleDate}
        ></Daily>
      </>
    );
  }
}
function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}
const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, { fetchDailyLists, setEditModeList })(
  Main
);
