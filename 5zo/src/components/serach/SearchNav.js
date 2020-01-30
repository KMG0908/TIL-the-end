import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {Link} from 'react-router-dom'

class SearchNav extends Component { 
  constructor(props){
    super(props)
  } 
  render(){
    console.log('props')
    console.log(this.props)
    const keyword = this.props.keyword
    console.log('keyword : ' + keyword);
    return (
        <Paper style={{maxWidth : 300}}>
            <MenuList>
                <MenuItem
                    component = {Link}
                    to={'/search/'+keyword+'?type=card'}
                >Card</MenuItem>
                <MenuItem
                    component = {Link}
                    to={'/search/'+keyword+'?type=cardlist'}
                >CardList</MenuItem>
                <MenuItem
                    component = {Link}
                    to={'/search/'+keyword+'?type=tag'}
                >Tag</MenuItem>
                <MenuItem
                    component = {Link}
                    to={'/search/'+keyword+'?type=member'}
                >Member</MenuItem>
            </MenuList>
        </Paper>
    )
  }
}
export default SearchNav;