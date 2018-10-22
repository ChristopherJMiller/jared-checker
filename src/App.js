import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import JaredChecker from './JaredChecker';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Typography component="h4" variant="h3" gutterBottom>
          How well did they spell "Jared"?
        </Typography>
        <JaredChecker />
        <Typography component="a" variant="overline" href="http://chrismiller.xyz" gutterBottom>
          chrismiller.xyz
        </Typography>
      </div>
    );
  }
}

export default App;
