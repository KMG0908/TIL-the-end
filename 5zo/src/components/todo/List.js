import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TrelloCreate from "./TrelloCreate";
import TrelloForm from "./TrelloForm";
import { connect } from "react-redux";
import Card from "./Card";
import Icon from "@material-ui/core/Icon";
import { deleteList, editList } from "../../actions";
import { Droppable } from "react-beautiful-dnd";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    textAlign: "left",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
    minHeight: "60px"
  },
  titleContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
    alignItems: "center",
    cursor: "pointer"
  },
  create: {
    textAlign: "left"
  },
  delete: {
    display: "block",
    right: "5px",
    bottom: "5px",
    marginLeft: "auto",
    opacity: "0.5",
    cursor: "pointer",
    "&:hover": {
      opacity: "0.8"
    }
  }
});

class List extends React.Component {
  state = {
    isEditing: false,
    listTitle: this.props.cardLists[this.props.cardlist_id].cardlist_name
  };

  renderCard() {
    const { classes } = this.props;

    const cards = Array.isArray(
      this.props.cardLists[this.props.cardlist_id].cardlist_cards
    )
      ? this.props.cardLists[this.props.cardlist_id].cardlist_cards
      : JSON.parse(this.props.cardLists[this.props.cardlist_id].cardlist_cards);
    return cards.map((card_id, index) => {
      if (this.props.cards[card_id]) {
        return (
          <Card
            card_id={card_id}
            index={index}
            card={this.props.cards[card_id]}
            cardlist_id={this.props.cardlist_id}
            key={card_id}
          />
        );
      } else {
        return <></>;
      }
    });
  }

  handleDeleteList = () => {
    this.props.deleteList(this.props.cardlist_id, this.props.board_id);
  };

  titleEditer = () => {
    return (
      <TrelloForm
        text={this.state.listTitle}
        onChange={this.handleChange}
        closeForm={this.closeForm}
        submit={this.saveList}
      >
        Save
      </TrelloForm>
    );
  };
  closeForm = () => {
    this.setState({ isEditing: false });
  };
  saveList = () => {
    const cardlist = this.props.cardLists[this.props.cardlist_id];
    cardlist.cardlist_name = this.state.listTitle;

    this.props.editList(cardlist);
    this.setState({ isEditing: false });
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ listTitle: e.target.value });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.isEditing ? (
          this.titleEditer()
        ) : (
          <div
            className={classes.titleContainer}
            onClick={() => this.setState({ isEditing: true })}
          >
            {this.props.title}
            <Icon
              className={classes.delete}
              fontSize="small"
              onMouseDown={this.handleDeleteList}
            >
              delete
            </Icon>
          </div>
        )}
        <Droppable droppableId={String(this.props.cardlist_id)} type="card">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {this.renderCard()}
              {provided.placeholder}
              <Box className={classes.create} elevation={0}>
                <TrelloCreate cardlist_id={this.props.cardlist_id} />
              </Box>
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.cards,
    cardLists: state.cardLists
  };
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, { deleteList, editList })(List)
);
