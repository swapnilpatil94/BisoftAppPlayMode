import React, { Component } from 'react';
import "./PlayMode.css";
import { BrowserRouter, Route, Link } from "react-router-dom";


class PlaymodeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="play-introduction">
                <div className="backBtn"></div>

                <div>
                    <p className="Playtitle">Play</p>
                </div>

                <div class="flex-container">



                    <Link to="/remote" className="remoteCard sizeofCard">
                        <div >
                            <p className="cardName">Remote</p>
                            <p className="cardDescription"> Description about the mode</p>
                        </div>
                    </Link>




                    <Link to="/speak" className="speakCard sizeofCard">

                        <div ><p className="cardName">Speak</p>
                            <p className="cardDescription">Description about the mode</p>
                        </div>

                    </Link>

                    <Link to="/music" className="musicCard sizeofCard">

                        <div ><p className="cardName">Music</p>
                            <p className="cardDescription">Description about the mode</p>
                        </div>
                    </Link>

                    <Link to="/camera" className="cameraCard sizeofCard">

                        <div ><p className="cardName">Camera</p>
                            <p className="cardDescription">Description about the mode</p>
                        </div>
                    </Link>
                    <Link to="/trace-me" className="traceMeCard sizeofCard">

                        <div ><p className="cardName">Trace</p>
                            <p className="cardDescription">Description about the mode</p>
                        </div>

                    </Link>


                </div>

            </div>);
    }
}

export default PlaymodeScreen;