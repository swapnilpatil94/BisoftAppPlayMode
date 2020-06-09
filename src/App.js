import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from "react-router-dom";

import PlayIntroduction from './Components/Introduction/PlayIntroduction.js';
// import SlideEx from './Components/Introduction/slide.bk';

import PlaymodeScreen from './Components/PlayMode';
import Remote from './Components/Remote/remote'
import Speak from './Components/Speak/speak'

import Piano from './Components/Piano/piano'
import PianoIntroduction from './Components/Piano/pianoIntroduction';
import Camera from './Components/Camera/Camera.js'
import Traceme from './Components/TraceMe/Traceme'


class App extends Component {

  constructor() {
    super();

    this.state = {
    }
  }



  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" > <PlaymodeScreen /></Route>
        <Route path="/remote"> <Remote /></Route>
        <Route path="/speak"> <Speak /></Route>
        <Route path="/music"> <Piano /></Route>
        <Route path="/camera"> <Camera /></Route>
        <Route path="/trace-me"> <Traceme /></Route>


      </BrowserRouter>

    );
  }
}

export default App;