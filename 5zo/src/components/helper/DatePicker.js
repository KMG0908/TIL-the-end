import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { setEditModeList, setEditModeCard } from "../../actions";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import format from "date-fns/format";
import koLocale from "date-fns/locale/ko";
import { Badge } from "@material-ui/core";

class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "M월", { locale: this.locale });
  }

  getDatePickerHeaderText(date) {
    return format(date, "M월 d일", { locale: this.locale });
  }
}

const styles = theme => ({
  Keyboard: {
    margin: 0
  },
  arrow: {
    marginTop: "0.5em",

    opacity: "0.5",

    "&:hover": {
      opacity: "0.8",
      cursor: "pointer"
    }
  },
  expand: {
    marginTop: 0,
    display: "inline"
  }
});

const selectedDays = [1, 2, 3, 12];
const today = new Date().toISOString().split("T")[0];

class DatePicker extends React.Component {
  state = { selectedDate: new Date() };
  componentDidMount() {
    if (this.props.date) {
      const date = new Date(this.props.date);
      this.setState({ selectedDate: date });
      this.handleMonthChange(date);
    }
  }
  handleMonthChange = date => {
    const firstDate = new Date(date.getFullYear(), date.getMonth(), 2);
    const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    console.log(
      firstDate
        .toISOString()
        .split("T")[0]
        .replace(/-/gi, "")
    );
    console.log(
      lastDate
        .toISOString()
        .split("T")[0]
        .replace(/-/gi, "")
    );
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
    let isoDate = date.toISOString().split("T")[0];
    this.props.onChangeDate(isoDate);
    if (isoDate > today) {
      this.props.setEditModeList(null);
      this.props.setEditModeCard(null);
    }
  };
  toNextDate = () => {
    const date = this.state.selectedDate;
    date.setDate(this.state.selectedDate.getDate() + 1);
    this.setState({ selectedDate: date });
    this.handleDateChange(date);
  };
  toPrevDate = () => {
    const date = this.state.selectedDate;
    date.setDate(this.state.selectedDate.getDate() - 1);
    this.setState({ selectedDate: date });
    this.handleDateChange(date);
  };
  render() {
    const { classes } = this.props;
    return (
      <MuiPickersUtilsProvider utils={koLocalizedUtils} locale={koLocale}>
        <Grid container>
          <Grid xs={1} container item justify="flex-start"></Grid>
          <Grid
            xs={10}
            style={{ flexWrap: "nowrap" }}
            container
            item
            justify="center"
          >
            <Icon className={classes.arrow} onClick={this.toPrevDate}>
              arrow_back_ios
            </Icon>
            <KeyboardDatePicker
              className={classes.Keyboard}
              views={["year", "month", "date"]}
              variant="inline"
              format="yyyy년 MM월 dd일"
              margin="normal"
              id="date-picker-inline"
              label="날짜"
              value={this.state.selectedDate}
              onChange={this.handleDateChange}
              onMonthChange={this.handleMonthChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
              renderDay={(
                day,
                selectedDate,
                isInCurrentMonth,
                dayComponent
              ) => {
                const isSelected =
                  isInCurrentMonth && selectedDays.includes(day.getDate());
                return (
                  <div
                    style={{
                      backgroundColor: isSelected ? "green" : undefined
                    }}
                  >
                    {dayComponent}
                  </div>
                );
              }}
            />
            <Icon className={classes.arrow} onClick={this.toNextDate}>
              arrow_forward_ios
            </Icon>
          </Grid>
          <Grid xs={1} container item justify="flex-end">
            {this.props.editModeList ? (
              <Icon
                onClick={() => {
                  this.props.setEditModeList(null);
                }}
                className={classes.expand}
              >
                close
              </Icon>
            ) : null}
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    editModeList: state.editModeList,
    board_info: state.heatmaps.info
  };
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, { setEditModeList, setEditModeCard })(DatePicker)
);
