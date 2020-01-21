import React from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const dummy_tags = [
  { id: 1, name: 'Node.js' },
  { id: 2, name: 'React' },
  { id: 3, name: 'Java' },
  { id: 4, name: '어려어' },
  { id: 5, name: '미췬' },
  { id: 6, name: '의식의 흐름대로' },
  { id: 7, name: '우오오오오' },
]

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const tagButtons = (tags) => tags.map((tag) =>
  <Link to={'/searchTag/'+tag.name} key={'link'+tag.id}>
    <Button
      variant="contained"
      key={tag.id}>
      {tag.name}
    </Button>
  </Link>
);

export default function ContainedButtons() {
  const classes = useStyles();
  console.log(classes);
  return (
    <div className={classes.root}>
      해쉬태그예정
      {tagButtons(dummy_tags)}
    </div>
  );
}


