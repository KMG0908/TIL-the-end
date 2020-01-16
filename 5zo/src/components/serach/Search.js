import React from "react";
import queryString from "query-string";

class Search extends React.Component {
  
  render() {
    const query = queryString.parse(this.props.location.search);
    const user_id = this.props.match.params.user_id
    console.log(user_id) /*user_id 받아오기 */
    console.log(query.q) /*q 받아오기 */

  return <div>{user_id}님의 TIL #{query.q}</div>;
  }
}

export default Search;
