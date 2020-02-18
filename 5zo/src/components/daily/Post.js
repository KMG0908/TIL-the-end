import React from "react";
import apis from "../../apis/apis";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {} from "../../actions";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import LockIcon from "@material-ui/icons/Lock";
import "typeface-roboto";
import SubPost from "./SubPost";
import Tag from "./Tag";
import Comment from "./comment/Comment";
import Switch from "@material-ui/core/Switch";
import storage from "lib/storage";
import { Flex } from "react-landing-page";
import { Grid } from "@material-ui/core";
import styled from 'styled-components';
import oc from 'open-color';
import {TextWithLabel} from '../Auth'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';


const Label = styled.div`
    font-size : 1rem;
    color : ${oc.gray[6]};
    margin-bottom : 0.25rem;
    text-align : left;
`;


const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(3)
  },
  category: {
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer"
    }
  },
  showBorder: {
    display: "flex",
    alignItems: "center",
    marginBottom: "17px",
    padding: "0 0 10px",
    borderBottom: "1px solid #ebebeb",
    "&:hover": {
      cursor: "pointer"
    }
  },
  noContent: {
    display: "flex",
    alignItems: "center"
  },
  title: {
    display: "block",
    fontWeight: 700,
    fontSize: "1.6875em",
    lineHeight: "1.4444em",
    flexGrow: "1"
  },
  showContent: {
    display: "block"
  },
  hideContent: {
    display: "none"
  },
  lock: {
    marginTop: "4px",
    marginRight: "2px"
  }
}));

const renderSubPost = props => {
  return props.cardLists[props.list_id].cardlist_cards.map(card_id => {
    if (props.cards[card_id]) {
      return <SubPost card_id={card_id} key={card_id} />;
    }
  });
};

const renderTags = props => {
  if (props.tags[props.list_id]) {
    return props.tags[props.list_id].map(tag => {
      return <Tag name={tag.tag_name} key={tag.tag_id}></Tag>;
    });
  }
};

const Post = props => {
  const classes = useStyles();
  const title_id = `title${props.list_id}`;
  const icon_id = `icon${props.list_id}`;
  const content_id = `content${props.list_id}`;

  const [state, setState] = React.useState({
    checked: props.cardLists[props.list_id].cardlist_secret
  });
  const handleChange = name => async e => {
    e.stopPropagation();
    setState({ ...state, checked: e.target.checked });
    const cardList = props.cardLists[props.list_id];
    cardList.cardlist_secret = e.target.checked;
    // card 배열 String 으로
    let cardList_cards_string = "[";

    cardList.cardlist_cards.map(
      card => (cardList_cards_string = cardList_cards_string.concat(card + ","))
    );
    if(cardList_cards_string.length === 1){
      
    }else{
      cardList_cards_string = cardList_cards_string.substr(
        0,
        cardList_cards_string.length - 1
      );
    }
    cardList_cards_string = cardList_cards_string.concat("]");
    console.log('카드리스트 스트링')
    console.log(cardList_cards_string)
    const response = await apis.put(`/cardlist`, {
      board_id: cardList.board_id,
      cardlist_cards: cardList_cards_string,
      cardlist_color: cardList.cardlist_color,
      cardlist_heart: cardList.cardlist_heard,
      cardlist_id: cardList.cardlist_id,
      cardlist_name: cardList.cardlist_name,
      cardlist_secret: e.target.checked
    });
  };
  const handleClick = e => {
    e.stopPropagation();
  };

  const loggedUser = storage.get("loggedInfo").mem_id;
  return (
    <Paper className={classes.paper}>
      <div
        id={title_id}
        className={
          !props.cardLists[props.list_id].cardlist_cards.length &&
          !props.tags[props.list_id]
            ? classes.noContent
            : classes.showBorder
        }
        onClick={function() {
          if (document.getElementById(icon_id).style.display !== "none") {
            const icon = document.getElementById(icon_id).childNodes[0]
              .childNodes[0];
            if (icon.getAttribute("d") === "M7 14l5-5 5 5z") {
              icon.setAttribute("d", "M7 10l5 5 5-5z");
              document.getElementById(title_id).className = classes.showBorder;
              document.getElementById(content_id).className =
                classes.showContent;
            } else {
              icon.setAttribute("d", "M7 14l5-5 5 5z");
              document.getElementById(title_id).className = classes.category;
              document.getElementById(content_id).className =
                classes.hideContent;
            }
          }
        }}
      >
        <div
          style={{
            display: props.cardLists[props.list_id].cardlist_secret
              ? "inline-block"
              : "none"
          }}
          className={classes.lock}
        >
          <LockIcon></LockIcon>
        </div>

        <Typography variant="h1" className={classes.title}>
          {props.cardLists[props.list_id].cardlist_name}
        </Typography>

        {props.user_id === loggedUser || "admin" === loggedUser ? (
          <>
            {state.checked ? <span> 비공개 </span> : <span> 공개</span>}
            <Switch
              checked={state.checked}
              onChange={handleChange("checked")}
              onClick={handleClick}
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </>
        ) : null}
        <div
          style={{
            display:
              !props.cardLists[props.list_id].cardlist_cards.length &&
              !props.tags[props.list_id]
                ? "none"
                : "inline-block"
          }}
          id={icon_id}
        >
          <ArrowDropDownIcon></ArrowDropDownIcon>
        </div>
      </div>
      
      <div id={content_id}>
        {renderSubPost(props)}
        {renderTags(props)}
        <br/>
        <br/>
        <ExpansionPanel style={{marginBottom : 5}} >
        <ExpansionPanelSummary>
          {/* <Avatar component={'span'} style={{marginRight : 10}} alt="Remy Sharp" src={this.props.member ? this.props.member.mem_thumb : ''} /> */}
          <Typography > 댓글</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{display : 'inline-block' , width : '100%'}}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item style={{ width: "90%" }}>
            <Comment
              list_id={props.list_id}
              user_id={props.user_id}
              date={props.date}
            />
          </Grid>
        </Grid>

        </ExpansionPanelDetails>
      </ExpansionPanel>
      </div>
    </Paper>
  );
};

const mapStateToProps = state => {
  return {
    cardLists: state.cardLists,
    cards: state.cards,
    tags: state.tag
  };
};

export default connect(mapStateToProps)(Post);
