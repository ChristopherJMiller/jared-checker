import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  div: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column"
  }
});

class JaredChecker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compareName: "Jared",
      attemptedName: "",
      score: 0
    }
  }

  checkSpelling = () => {
    console.log(this.state.attemptedName)
    let currentScore = 100;
  }

  updateAttemptedName = (currentAttempt) => {
    this.setState({
      attemptedName: currentAttempt.target.value
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.div}>
        <TextField
          id="standard-dense"
          label="Attempted Spelling"
          margin="dense"
          onChange={this.updateAttemptedName}
        />
        <br />
        <Button variant="contained" color="primary" onClick={this.checkSpelling}>
          Grade Spelling
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(JaredChecker);