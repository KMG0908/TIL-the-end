import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  button: {
    color : 'white',
    textAlign : 'center',
    fontSize : '1.25rem',
    fontWeight : '500',
    width: '100%',
    '& + &': {
      marginTop: '1rem'
    },
    '&:focus' : {
      
    }
  }
}))

function AuthButton({ children, onClick, onSubmit, type, backgroundColor }){
  const classes = useStyles();
  return(
    <Button variant="contained" style={{background : backgroundColor ? backgroundColor : 'rgb(148, 201, 169)'}} onClick={onClick} className={classes.button}>
      {children}
    </Button>
  );
}

export default AuthButton;