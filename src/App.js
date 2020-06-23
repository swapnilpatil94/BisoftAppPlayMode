import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from "react-router-dom";

import PlayIntroduction from './Components/Introduction/PlayIntroduction.js';
// import SlideEx from './Components/Introduction/slide.bk';

import PlaymodeScreen from './Components/PlayMode';
import Remote from './Components/Remote/Tern+/remote'
import Speak from './Components/Speak/tern+/speak'

import Piano from './Components/Piano/tern+/piano'
import PianoIntroduction from './Components/Piano/tern+/pianoIntroduction';
import Camera from './Components/Camera/tern+/Camera.js'
import Traceme from './Components/TraceMe/Traceme';

import HumanoidRemote from './Components/Remote/humanoid/remote'
import Model3D from './Components/3dModel/3dModel'

import HumanoidSpeak from './Components/Speak/humanoid/speak'
import HumanoidPiano from './Components/Piano/humanoid/piano';
import HumanoidCamera from './Components/Camera/humanoid/Camera'

class App extends Component {

  constructor() {
    super();

    this.state = {
    }
  }



  render() {
    return (
      <BrowserRouter>

        <Route exact path="/" > <Model3D /></Route>
        <Route exact path="/introduction" > <PlaymodeScreen /></Route>
        {/* Give path to tern+ and humanoid */}

        {/* Tern + */}
        <Route path="/remote"> <Remote /></Route>
        <Route path="/speak"> <Speak /></Route>
        <Route path="/music"> <Piano /></Route>
        <Route path="/camera"> <Camera /></Route>
        <Route path="/trace-me"> <Traceme /></Route>


        {/* Humanoid  */}
        <Route path="/Humanoid-Remote"> <HumanoidRemote /></Route>
        <Route path="/Humanoid-Speak"> <HumanoidSpeak /></Route>
        <Route path="/Humanoid-Music"> <HumanoidPiano /></Route>
        <Route path="/Humanoid-Camera"> <HumanoidCamera /></Route>





      </BrowserRouter>



    );
  }
}

export default App;