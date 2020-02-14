import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from "@material-ui/core/styles";
import MyProfile from './MyProfile';
import Typography from '@material-ui/core/Typography';
import EditPasswordPage from './EditPasswordPage';
import EditEmailPage from './EditEmailPage';

const styles = theme => ({
  paper: {
    flexGrow: 1,
  },
  typography: {
    backgroundColor: 'white',
    padding: '20px 0'
  }
});

class MyPage extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      value : 0
    }

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange= (event, newValue) => {
    this.setState({
      value : newValue
    })
  }
  setComponent(){
    let component;

    switch(this.state.value){
    case 0:
      component = <MyProfile></MyProfile>
      break;
    case 1:
      component = <EditEmailPage></EditEmailPage>
      break;
    case 2:
      component = <EditPasswordPage></EditPasswordPage>
      break;
    }

    return component;
  }
  render() {
    const { classes } = this.props;

    return(
      <>
        <Paper className={classes.paper}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Profile"  />
            <Tab label="Email" />
            <Tab label="Password" />
          </Tabs>
        </Paper>
        <Typography component="div" className={classes.typography}>
          {this.setComponent()}
        </Typography>
      </>
    );
  }
}


export default withStyles(styles, { withTheme: true })(MyPage);