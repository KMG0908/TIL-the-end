import React from "react";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { fetchAlarm, readAlarm, readAllAlarm } from "../../actions";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import styled from "styled-components";
import moment from "moment";
import history from "../../history";
import Divider from "@material-ui/core/Divider";

const StyledListItem = styled(ListItem)`
  width: 300px;
`;

const renderTime = time => {
  if (moment().diff(moment(time), "months")) {
    return time;
  } else {
    return moment(time).fromNow();
  }
};

class Notifications extends React.Component {
  state = { notificationMenu: false };
  componentDidMount = () => {
    const { members, fetchAlarm } = this.props;
    if (members.mem_info) {
      fetchAlarm(members.mem_info.mem_id);
    }
  };
  onClickItem = (alarm_url, alarm_id) => {
    this.props.readAlarm(alarm_id);
    history.push(alarm_url);
  };

  renderMenuItem = () => {
    const alarms = Object.values(this.props.alarms);
    return alarms.map(alarm => {
      return (
        <>
          <Divider variant="middle" component="li" />
          <StyledListItem
            onClick={() => {
              this.onClickItem(alarm.alarm_url, alarm.alarm_id);
            }}
          >
            <ListItemText
              primary={alarm.alarm_text}
              secondary={renderTime(alarm.alarm_date)}
            />
          </StyledListItem>
        </>
      );
    });
  };
  render() {
    const alarms = Object.values(this.props.alarms);
    return (
      <>
        {alarms.length ? (
          <>
            <StyledListItem onClick={this.props.readAllAlarm}>
              <ListItemText primary="모든 알람 확인하기" />
            </StyledListItem>
            {this.renderMenuItem()}
          </>
        ) : (
          <>
            <StyledListItem>
              <ListItemText primary="알람이 없습니다" />
            </StyledListItem>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    members: state.members,
    alarms: state.alarms
  };
};

export default connect(mapStateToProps, {
  fetchAlarm,
  readAlarm,
  readAllAlarm
})(Notifications);
