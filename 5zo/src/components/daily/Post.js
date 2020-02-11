import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {} from "../../actions";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import LockIcon from '@material-ui/icons/Lock';
import "typeface-roboto";
import SubPost from "./SubPost";
import Tag from "./Tag";

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(3)
  },
  category:{
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  showBorder:{
    display: 'flex',
    alignItems: 'center',
    marginBottom: '17px',
    padding: '0 0 10px',
    borderBottom: '1px solid #ebebeb',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  noContent:{
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    display: 'block',
    fontWeight: 700,
    fontSize: '1.6875em',
    lineHeight: '1.4444em',
    flexGrow: '1'
  },
  showContent: {
    display: 'block'
  },
  hideContent: {
    display: 'none'
  },
  lock: {
    marginTop: '4px',
    marginRight : '2px'
  }
}));

const renderSubPost = props => {
  return props.cardLists[props.list_id].cardlist_cards.map(card_id => {
    if (props.cards[card_id]) {
      console.log(props.cards[card_id])
      return <SubPost card_id={card_id} key={card_id} />;
    }
  });
};

const renderTags = props => {
  if(props.tags[props.list_id]){
    return props.tags[props.list_id].map(tag => {
      return <Tag name={tag.tag_name} key={tag.tag_id}></Tag>
    })
  }
}

const Post = props => {
  const classes = useStyles();
  const title_id = `title${props.list_id}`;
  const icon_id = `icon${props.list_id}`
  const content_id = `content${props.list_id}`;

  return (
    <Paper className={classes.paper}>
      <div id={title_id} className={!props.cardLists[props.list_id].cardlist_cards.length && !props.tags[props.list_id] ? classes.noContent : classes.showBorder} 
        onClick={function(){
          if(document.getElementById(icon_id).style.display !== "none"){
            const icon = document.getElementById(icon_id).childNodes[0].childNodes[0];
            if(icon.getAttribute("d") === "M7 14l5-5 5 5z") {
              icon.setAttribute("d", "M7 10l5 5 5-5z")
              document.getElementById(title_id).className = classes.showBorder;
              document.getElementById(content_id).className = classes.showContent;
            }
            else {
              icon.setAttribute("d", "M7 14l5-5 5 5z")
              document.getElementById(title_id).className = classes.category;
              document.getElementById(content_id).className = classes.hideContent;
            }
          }
        }}>
        <div style={{display : props.cardLists[props.list_id].cardlist_secret ? 'inline-block' : 'none'}} className={classes.lock}>
          <LockIcon></LockIcon>
        </div>
        <Typography variant="h1" className={classes.title}>
          {props.cardLists[props.list_id].cardlist_name}
        </Typography>
        <div style={{display : !props.cardLists[props.list_id].cardlist_cards.length && !props.tags[props.list_id] ? 'none' : 'inline-block'}} id={icon_id}>
          <ArrowDropDownIcon></ArrowDropDownIcon>
        </div>
      </div>
      <div id={content_id}>
        {renderSubPost(props)}
        {renderTags(props)}
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
