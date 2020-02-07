import React from "react";
import DatePicker from "../helper/DatePicker copy";
import { connect } from "react-redux";
import { fetchDailyLists, setEditModeList } from "../../actions";
import Container from "@material-ui/core/Container";
import Post from "./Post";

class Daily extends React.Component {
  constructor(props){
    super(props);

    this.state = { 
      date: this.props.date
    };
  }
  componentDidMount() {
    this.props.setEditModeList(null);
    this.props.fetchDailyLists(
      this.props.user_id,
      this.state.date
    );
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      date: nextProps.date
    })
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
          date={this.state.date}
          onChangeDate={changedDate => {
            this.setState({ date: changedDate });
            this.props.fetchDailyLists(
              this.props.user_id,
              changedDate
            );
            this.props.onHandleDate(changedDate);
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
