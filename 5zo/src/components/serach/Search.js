import React from "react";
import queryString from "query-string";

class Search extends React.Component {
  
  render() {
    const query = queryString.parse(this.props.location.search);
    const userId = this.props.match.params.userId
    console.log(userId) /*userId 받아오기 */
    console.log(query.q) /*q 받아오기 */

  return <div>{userId}님의 TIL #{query.q}</div>;
  }
}

export default Search;
