import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import queryString from "query-string";


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const searchBar = () => {
  return <TextField id="standard-basic" label="Standard" />
}

export default function search(props){
  const classes = useStyles();
  
  const query = queryString.parse(props.location.search);
  const user_id = props.match.params.user_id
  console.log(user_id) /*user_id 받아오기 */
  console.log(query.q) /*q 받아오기 */

  return (
    <div>
      <div>{user_id}님의 TIL #{query.q}</div>
      <form className={classes.root} >
        {searchBar()}
      </form>
    </div>
  )
}