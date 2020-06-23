import React, { Component } from 'react';
import "./PlayMode.css";
import { BrowserRouter, Route, Link } from "react-router-dom";


class PlaymodeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remote: '/remote',
            speak: '/speak',
            music: '/music',
            camera: '/camera'
        }
    }

    componentDidMount() {
        sessionStorage.setItem("connectedDevice", "humanoid");

        let device = sessionStorage.getItem("connectedDevice");
        // alert(device);

        if (device === "tern") {
            this.setState({
                remote: '/remote',
                speak: '/speak',
                music: '/music',
                camera: '/camera'
            })


        } else if (device === "humanoid") {

            this.setState({
                remote: '/Humanoid-Remote',
                speak: '/Humanoid-Speak',
                music: '/Humanoid-Music',
                camera: '/Humanoid-Camera'
            })

        }




    }





    render() {
        return (
            <div className="play-introduction">
                <Link to="/">
                    <div className="backBtn" ></div>

                </Link>

                <div>
                    <p className="Playtitle">Play</p>
                </div>

                <div class="flex-container">



                    <Link to={this.state.remote} className="remoteCard sizeofCard">
                        <div >
                            <p className="cardName">Remote</p>
                            <p className="cardDescription"> Description about the mode</p>
                        </div>
                    </Link>




                    <Link to={this.state.speak} className="speakCard sizeofCard">

                        <div ><p className="cardName">Speak</p>
                            <p className="cardDescription">Description about the mode</p>
                        </div>

                    </Link>

                    <Link to={this.state.music} className="musicCard sizeofCard">

                        <div ><p className="cardName">Music</p>
                            <p className="cardDescription">Description about the mode</p>
                        </div>
                    </Link>

                    <Link to={this.state.camera} className="cameraCard sizeofCard">

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