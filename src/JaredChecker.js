import React, { Component } from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core/styles"
import Typography from '@material-ui/core/Typography'
import Levenshtein from "levenshtein"
import caverphone from "caverphone-phonetics"

const styles = theme => ({
  div: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    textAlign: "center"
  }
})

class JaredChecker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compareName: "Jared",
      attemptedName: "",
      score: 0,
      scorePosted: false,
      phoneticMatch: false
    }
  }

  checkSpelling = () => {
    let l = new Levenshtein(this.state.compareName.toLowerCase(), this.state.attemptedName.toLowerCase())
    console.log(caverphone(this.state.attemptedName.toLowerCase()))
    let phoneticBonus = caverphone(this.state.attemptedName.toLowerCase()) === caverphone(this.state.compareName.toLowerCase())
    this.setState({
      score: (80 - (l.distance * 20)) + (phoneticBonus ? 20 : 0),
      scorePosted: true,
      phoneticMatch: phoneticBonus
    })
  }

  updateAttemptedName = (currentAttempt) => {
    this.setState({
      attemptedName: currentAttempt.target.value
    })
  }

  getGrade = () => {
    let tierStep = Math.round(this.state.score / 20)
    switch(tierStep) {
      case 5:
        return "S"
      case 4:
        return "A"
      case 3:
        return "B"
      case 2:
        return "C"
      case 1:
        return "D"
      case 0:
        return "F"
      default:
        return "F".repeat(Math.abs(tierStep))
    }
  }

  render() {
    const { classes } = this.props
    let results = null
    if (this.state.scorePosted) {
      results = (
        <div>
          <Typography component="h4" variant="h4">
            This would be rated a {this.state.score} out of 100.
          </Typography>
          <Typography component="h4" variant="h6">
            aka a {this.getGrade()} tier spelling.
          </Typography>
        </div>
      )
    }
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
        { results }
      </div>
    );
  }
}

export default withStyles(styles)(JaredChecker);