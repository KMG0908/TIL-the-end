import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import queryString from "query-string";
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';

class SearchNav extends Component { 
  constructor(props){
    super(props)
  } 
  render(){
    const params = this.props.match.params

    console.log(params.keyword);
    return (
        <Paper style={{maxWidth : 300}}>
            <MenuList>
                <MenuItem
                    component = {Link}
                    to={'/search/'+params.keyword+'?type=card'}
                >Card</MenuItem>
                <MenuItem
                    component = {Link}
                    to={'/search/'+params.keyword+'?type=list'}
                    >CardList</MenuItem>
                <MenuItem
                    component = {Link}
                    to={'/search/'+params.keyword+'?type=tag'}
                >Tag</MenuItem>
                <MenuItem
                    component = {Link}
                    to={'/search/'+params.keyword+'?type=user'}
                >User</MenuItem>
            </MenuList>
        </Paper>
    )
  }
}

// const mapStatetoProps = state => {
//   return {
//   }
// }
// export default connect(mapStatetoProps, )(SearchNav);
export default SearchNav;