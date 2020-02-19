import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { withRouter } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import storage from "lib/storage";
import {fetchAlarm} from "../../actions" 
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

const StyledLink = styled(Link)`
  text-decoration: inherit;
  color: white;
  text-transform: capitalize;
`;

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "inherit",
    color: "white",
    textTransform: "capitalize"
  }
}));

const breadcumbspliter = props => {
  const mem_info  = storage.get("loggedInfo")
  if(mem_info){
    props.fetchAlarm(mem_info.mem_id)
  }
  return props.location.pathname.split("/").map((bread,index) => {
    if (bread) {
      return <StyledLink style={{textTransform: 'none'}} to={props.location.pathname.split("/").slice(0,index+1).join("/")}>{bread}</StyledLink>;
    }
  });
};

function TitleBreadcumbs(props) {
  return (
    <div>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <StyledLink to={"/"}>Today I Learn</StyledLink>
        {breadcumbspliter(props)}
      </Breadcrumbs>
    </div>
  );
}



const mapStateToProps = state => {
  return {
    alarms: state.alarms
  };
};
export default withRouter(connect(mapStateToProps, {fetchAlarm})(TitleBreadcumbs));
