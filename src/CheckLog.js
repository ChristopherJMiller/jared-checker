import React, { Component } from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core/styles"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import BonusIcon from '@material-ui/icons/Done';
import NoBonusIcon from '@material-ui/icons/Close';


const styles = theme => ({
  div: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    minWidth: "50%",
    maxWidth: "100%",
    marginTop: "5em",
    overflowX: 'auto'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  }
})

class CheckLog extends Component {
  render() {
    const { classes } = this.props
    // New Instance of Array as reverse() is destructive and would cause the table to constantly flip every state update
    let currentChecks = this.props.checks.slice(0)
    currentChecks.reverse()
    return (
      <Paper className={classes.div}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="dense">Attempt Name</TableCell>
              <TableCell numeric padding="dense">Score</TableCell>
              <TableCell padding="dense">Tier</TableCell>
              <TableCell padding="dense">Phonetic Match?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentChecks.map(row => {
              return (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row" padding="dense">
                    {row.name}
                  </TableCell>
                  <TableCell numeric padding="dense">{row.score}</TableCell>
                  <TableCell padding="dense">{row.tier}</TableCell>
                  <TableCell padding="dense">{row.phoneticBonus ? <BonusIcon /> : <NoBonusIcon />}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(CheckLog);