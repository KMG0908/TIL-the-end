import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import TodayIcon from "@material-ui/icons/Today";
import EventIcon from '@material-ui/icons/Event';
import SearchIcon from '@material-ui/icons/Search';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import TitleComponent from "./TitleComponent";
import { Link } from "react-router-dom";



const WithTitle = ({ component: Component, title}) => {
  console.log("withTitle.....", title)
  return class Title extends React.Component {
    
    render() {
      return (
        <React.Fragment>
          <TitleComponent title={title}/>
          <Component {...this.props}/>
        </React.Fragment>
      );
    }
  };
};

const CalendarComponent = WithTitle({ component : Link, title: 'Calendar'});
const TodoComponent = WithTitle({ component : Link, title: 'Todo'});
const StatisticsComponent = WithTitle({ component : Link, title: 'Statistics'});
const SidebarList = () => {
  
  
  return (
    
    <>
      <List>
        <ListItem button component={Link}  to={"/todo"}>
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText primary="Til Todo" />
        </ListItem>
      </List>
      <List>
        <ListItem button component={CalendarComponent}  to={"/calendar"}>
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItem>
      </List>
      <List>
        <ListItem button component={Link}  to={"/statistics/1"}>
          <ListItemIcon>
            <EqualizerIcon />
          </ListItemIcon>
          <ListItemText primary="통계" />
        </ListItem>
      </List>
      <List>
        <ListItem button component={Link} to={"/search"}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItem>
      </List>
      <List>
        <ListItem button component={Link} to={"/tags"}>
          <ListItemIcon>
            <LocalOfferIcon />
          </ListItemIcon>
          <ListItemText primary="Tags" />
        </ListItem>
      </List>

      <Divider />
    </>
  );
};

export {SidebarList,  WithTitle};
