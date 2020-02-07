import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TrelloCreate from "./TrelloCreate";
import TrelloForm from "./TrelloForm";
import { connect } from "react-redux";
import Card from "./Card";
import Icon from "@material-ui/core/Icon";
import { deleteList, editList, setEditModeList } from "../../actions";
import { Droppable } from "react-beautiful-dnd";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { TwitterPicker } from "react-color";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  list: {
    padding: theme.spacing(1),
    // backgroundColor: "#94C9A9",
    color: theme.palette.error.contrastText
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
  expand: { marginRight: theme.spacing(2) },
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
  },
  color: {
    width: "36px",
    height: "14px",
    borderRadius: "2px"
  }
});

const today = new Date().toISOString().split("T")[0];

class List extends React.Component {
  componentDidMount() {
    const cardlist_color = this.props.cardLists[this.props.cardlist_id]
      .cardlist_color;
    this.setState({ color: cardlist_color ? cardlist_color : "#94C9A9" });
  }
  state = {
    color: "#94C9A9",
    displayColorPicker: false,
    isEditing: false,
    listTitle: this.props.cardLists[this.props.cardlist_id].cardlist_name
  };

  renderCard() {
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
            date={this.props.date ? this.props.date : null}
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

  handleSetEditModeList = e => {
    e.stopPropagation();
    if (this.props.editModeList === this.props.cardlist_id) {
      this.props.setEditModeList(null);
    } else {
      this.props.setEditModeList(this.props.cardlist_id);
    }
  };
  handleTitleDoubleClick = () => {
    if (!this.props.date || this.props.date >= today) {
      this.setState({ isEditing: true });
    }
  };
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };
  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };
  handleChange = color => {


    const cardlist = this.props.cardLists[this.props.cardlist_id];
    cardlist.cardlist_color = color.hex;

    this.props.editList(cardlist);
    console.log(color);
  };
  render() {
    const { classes } = this.props;
    const color = this.props.cardLists[this.props.cardlist_id].cardlist_color? this.props.cardLists[this.props.cardlist_id].cardlist_color:"#94C9A9"
    return (
      <Paper
        className={classes.list}
        style={{ backgroundColor: color }}
      >
        {this.state.isEditing ? (
          this.titleEditer()
        ) : (
          <div
            className={classes.titleContainer}
            onClick={this.handleTitleDoubleClick}
          >
            {this.props.date === today ? (
              <Icon
                onClick={this.handleSetEditModeList}
                className={classes.expand}
              >
                edit
              </Icon>
            ) : null}
            <Typography
              variant={
                this.props.editModeList === this.props.cardlist_id ? "h2" : "h6"
              }
            >
              {this.props.title}
            </Typography>

            <Icon
              className={classes.delete}
              fontSize="small"
              onMouseDown={this.handleDeleteList}
            >
              delete
            </Icon>
          </div>
        )}
        <Droppable
          droppableId={String(this.props.cardlist_id)}
          type={this.props.date >= today || !this.props.date ? "card" : "card1"}
        >
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {this.renderCard()}
              {provided.placeholder}

              {this.props.editModeList === this.props.cardlist_id ? (
                <>
                  <Paper>
                    해쉬태그
                    <div style={styles.swatch} onClick={this.handleClick}>
                      <div
                        className={classes.color}
                        style={{ backgroundColor: color }}
                      />
                    </div>
                    {this.state.displayColorPicker ? (
                      <div style={styles.popover}>
                        <div style={styles.cover} onClick={this.handleClose} />
                        <TwitterPicker
                          color={color}
                          onChange={this.handleChange}
                        />
                      </div>
                    ) : null}
                  </Paper>
                </>
              ) : null}
              {this.props.date >= today || !this.props.date ? (
                <Box className={classes.create} elevation={0}>
                  <TrelloCreate cardlist_id={this.props.cardlist_id} />
                </Box>
              ) : null}
            </div>
          )}
        </Droppable>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.cards,
    cardLists: state.cardLists,
    editModeList: state.editModeList
  };
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, { deleteList, editList, setEditModeList })(List)
);
