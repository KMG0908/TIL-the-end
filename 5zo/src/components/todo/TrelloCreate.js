import React from "react";
import Icon from "@material-ui/core/Icon";
import TrelloButton from "./TrelloButton";
import { connect } from "react-redux";
import { addList, addCard } from "../../actions";
import styled from "styled-components";
import TrelloForm from "./TrelloForm";
import TrelloOpenForm from "./TrelloOpenForm";

class TrelloCreate extends React.PureComponent {
  state = {
    formOpen: false,
    text: ""
  };

  openForm = () => {
    this.setState({
      formOpen: true
    });
  };

  closeForm = e => {
    this.setState({
      formOpen: false
    });
  };

  handleInputChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleAddList = () => {
    const {board_id } = this.props;
    const { text } = this.state;
    const cardlist_name = text

    if (text) {
      this.setState({
        text: ""
      });
      this.props.addList(board_id, cardlist_name);
    }

    return;
  };

  handleAddCard = () => {
    const { cardlist_id } = this.props;
    const { text } = this.state;
    const card_name = text

    if (text) {
      this.setState({
        text: ""
      });
      this.props.addCard(cardlist_id, card_name);
    }
  };

  renderOpenForm = () => {
    const { board_id } = this.props;
    const buttonText = board_id ? "Add another list" : "Add another card";
    const buttonTextOpacity = board_id ? 1 : 0.5;
    const buttonTextColor = board_id ? "white" : "inherit";
    const buttonTextBackground = board_id ? "rgba(0,0,0,.15)" : "inherit";

    const OpenFormButton = styled.div`
      display: flex;
      align-items: center;
      cursor: pointer;
      border-radius: 3px;
      height: 36px;
      margin-left: 8px;
      width: 300px;
      padding-left: 10px;
      padding-right: 10px;
      opacity: ${buttonTextOpacity};
      color: ${buttonTextColor};
      background-color: ${buttonTextBackground};
    `;

    return (
      <OpenFormButton onClick={this.openForm}>
        <Icon>add</Icon>
        <p style={{ flexShrink: 0 }}>{buttonText}</p>
      </OpenFormButton>
    );
  };

  render() {
    const { text } = this.state;
    const { board_id } = this.props;
    return this.state.formOpen ? (
      <TrelloForm
        text={text}
        onChange={this.handleInputChange}
        closeForm={this.closeForm}
        board_id={board_id}
      >
        <TrelloButton onClick={board_id ? this.handleAddList : this.handleAddCard}>
          {board_id ? "Add List" : "Add Card"}
        </TrelloButton>
      </TrelloForm>
    ) : (
      <TrelloOpenForm board_id={board_id} onClick={this.openForm}>
        {board_id ? "Add another list" : "Add another card"}
      </TrelloOpenForm>
    );
  }
}

export default connect(null,{addCard,addList})(TrelloCreate);
