import React from "react";
import DatePicker from "../helper/DatePicker";
import { connect } from "react-redux";
import { fetchDailyLists, setEditModeList } from "../../actions";
import Container from "@material-ui/core/Container";
import Post from "./Post";

class Daily extends React.Component {
  state = { date: new Date().toISOString().split("T")[0] };
  componentDidMount() {
    this.props.setEditModeList(null);
    this.props.fetchDailyLists(
      // this.props.mem_id,
      "dsbang",
      this.state.date
    );
  }

  renderPost() {
    if (this.props.boardDict[this.state.date]) {
      const board_id = this.props.boardDict[this.state.date];
      const board_lists = this.props.boards[board_id].board_lists;
      return board_lists.map(list_id => {
        if (this.props.cardLists[list_id]) {
          return <Post list_id={list_id} key={list_id} />;
        }
      });
    }
  };

  render() {
    return (
      <Container>
        <DatePicker
          onChangeDate={changedDate => {
            this.setState({ date: changedDate });
            this.props.fetchDailyLists(
              "dsbang",
              //this.props.mem_id,
              changedDate
            );
          }}
        />
        {this.renderPost()}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    boards: state.boards,
    boardDict: state.boardDict,
    cardLists: state.cardLists
  };
};

export default connect(mapStateToProps, { fetchDailyLists, setEditModeList })(
  Daily
);
