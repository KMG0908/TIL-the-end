import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    minWidth: 275,
    display : 'inline-block',
    margin : 12
  },
  user: {
    fontSize: 14,
    textAlign : 'left'
  },
  tags: {
    marginBottom: 12,
  },
  date: {
    textAlign : 'right',
  },
};

class NewCard extends Component {
    render(){
        return (
            <Card style={styles.root}>
            <CardContent>
              <Typography style={styles.user} color="textSecondary" gutterBottom>
                유닌제
              </Typography>
              <Typography variant="h5" component="h2">
                CardList Name
              </Typography>
              <Typography style={styles.tags} color="textSecondary">
                #abc #bbb #ddd
              </Typography>
              <Typography variant="body2" component="p" style={styles.date}>
                2020-02-13
              </Typography>
            </CardContent>
          </Card>
      );
    }
}

export default NewCard