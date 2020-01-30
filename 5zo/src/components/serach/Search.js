import React, { Component } from "react";
import SearchBar from "./SearchBar";
import CardList from "./CardList";
import SearchNav from "./SearchNav";
import queryString from "query-string";
import { connect } from "react-redux";
import { searchKeyword } from 'actions';

class SearchPage extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    console.log('=========================================SearchPage')
    const params = this.props.match.params
    const query = queryString.parse(this.props.location.search);
    let type = query.type
    let keyword = params.keyword
    if(!type) type = 'card'

    return (

      <div>
        <SearchNav keyword={keyword} type = {type} history={this.props.history}/>
        {(!params.keyword) ? null : <h1> {params.keyword} 검색결과</h1>}
        <div>
          <SearchBar type={type} />
          <br />
          <CardList type={type} keyword={keyword} key={keyword+type}/>
        </div>
      </div>
    )
  }
}

export default SearchPage
