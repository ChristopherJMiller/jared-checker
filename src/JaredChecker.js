import React, { Component } from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core/styles"
import Typography from '@material-ui/core/Typography'
import Levenshtein from "levenshtein"
import caverphone from "caverphone-phonetics"
import CheckLog from "./CheckLog";
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  div: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    width: "100vw"
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
      phoneticMatch: false,
      checkHistory: []
    }
  }

  checkSpelling = () => {
    let l = new Levenshtein(this.state.compareName.toLowerCase(), this.state.attemptedName.toLowerCase())
    let phoneticBonus = caverphone(this.state.attemptedName.toLowerCase()) === caverphone(this.state.compareName.toLowerCase())
    let score = (80 - (l.distance * 20)) + (phoneticBonus ? 20 : 0)

    let check = {
      name: this.state.attemptedName.toUpperCase(),
      score: score,
      tier: this.getGrade(score),
      phoneticBonus: phoneticBonus
    }

    this.setState({
      score: score,
      scorePosted: true,
      phoneticMatch: phoneticBonus,
      checkHistory: this.state.checkHistory.concat([check])
    })
  }

  updateAttemptedName = (currentAttempt) => {
    this.setState({
      attemptedName: currentAttempt.target.value
    })
  }

  getGrade = (score = this.state.score) => {
    let tierStep = Math.round(score / 20)
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
        if (Math.abs(tierStep) > 8) {
          return  (<span dangerouslySetInnerHTML={{__html: "F.FFx10" + Math.abs(tierStep).toString().sup() }} />)
        } else {
          return "F".repeat(Math.abs(tierStep))
        }
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
        { this.state.phoneticMatch ? <Chip label="Phonetic Match!" className={classes.chip} /> : null }
        <CheckLog checks={this.state.checkHistory} />
      </div>
    );
  }
}

export default withStyles(styles)(JaredChecker);