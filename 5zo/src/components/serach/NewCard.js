import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


class NewCard extends Component {
  render() {
    const styles = {
      root: {
        textAlign: 'left',
        marginBottom: 12,
        marginTop: 12,
        minWidth: this.props.widthPer,
      },
      user: {
        fontSize: 14,
        textAlign: 'left',
      },
      tags: {
      },
      date: {
        textAlign: 'right',
      },
    };
    let cardList = this.props.cardList
    if (cardList) {
      return (
        <Card style={styles.root} variant="outlined">
          <CardContent>
            <Typography style={styles.user} color="textSecondary" gutterBottom>
            {this.props.cardList.mem_id}
            </Typography>
            <Typography variant="body2" component="p" style={styles.date}>
              {this.props.cardList.board_date}
            </Typography>
            <Typography variant="h5" component="h2">
              {this.props.cardList.cardlist_name}
              </Typography>
            <Typography style={styles.tags} color="textSecondary">
              {this.props.cardList.tag_name.split(',').map(tag => `#${tag}  `)}
            </Typography>
          </CardContent>
        </Card>
      );
    }
    else {
      return (null)
    }
  }
}

export default NewCard