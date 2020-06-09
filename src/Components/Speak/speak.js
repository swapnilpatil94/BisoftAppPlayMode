import React, { Component } from 'react';
import './speak.css';

import SpeechToText from 'speech-to-text';
import { Link } from "react-router-dom";


import io from 'socket.io-client';
const socket = io('http://localhost:9000');

socket.emit('/scanDevice');








class Speak extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorMc: "linear-gradient(150deg, #FF6838 0%, #FFEC7E 100%)",
            message: "Mouse Event",
            speakD: "",

            error: '',
            interimText: 'Speak..',
            finalisedText: [],
            listening: false,
            language: 'en-US'

        }
    }


    onAnythingSaid = text => {
        this.setState({ interimText: text });
    };

    onEndEvent = () => {

        if (this.state.listening) {
            this.startListening();
        }
    };

    onFinalised = text => {
        this.setState({
            // finalisedText: [text, ...this.state.finalisedText],

            finalisedText: text,
            interimText: ''
        });
    };

    startListening = () => {
        try {



            this.listener = new SpeechToText(
                this.onFinalised,
                this.onEndEvent,
                this.onAnythingSaid,
                this.state.language
            );
            this.listener.startListening();
            this.setState({ listening: true });



            // -----------------------------------------------

            var dataSpeak = this.state.finalisedText;


            console.log("dataSpeak ", dataSpeak);


            if (dataSpeak === "forward") {
                console.log("forward emit ");
                socket.emit("/speak", ['S'.charCodeAt(), "1".charCodeAt()]);


            } else if (dataSpeak === "backward") {
                socket.emit("/speak", ['S'.charCodeAt(), "2".charCodeAt()]);
                console.log("backward emit");

            } else if (dataSpeak === "left") {
                socket.emit("/speak", ['S'.charCodeAt(), "3".charCodeAt()]);
                console.log("left emit");


            } else if (dataSpeak === "right") {
                socket.emit("/speak", ['S'.charCodeAt(), "4".charCodeAt()]);
                console.log("right emit");

            }








        } catch (err) {
            console.log('err in listening');
            console.log(err);
        }
    };

    stopListening = () => {
        this.listener.stopListening();
        this.setState({ listening: false });

        this.setState({
            finalisedText: ''
        });


    };



















    // Event Handle 
    handleEvent = (event) => {
        if (event.type === "mousedown") {
            this.setState({ message: "Mouse Down" });
            // console.log("MDown");
            this.startListening();


        } else {

            this.setState({ message: "Mouse Up" });
            this.stopListening()
        }
    }













    render() {
        const {
            error,
            interimText,
            finalisedText,
            listening,
            language
        } = this.state;




        return (
            <div className="play-introduction">
                <Link to="/">
                    <div className="backBtn"></div>

                </Link>

                <div>
                    <p className="Playtitle">Speak</p>
                </div>
                <div className="help click"></div>
                <div className="usb "></div>

                <div className="human-speak">

                </div>




                <div className="microBack">
                    <div className="microphoneBtn click" onMouseDown={this.handleEvent} onMouseUp={this.handleEvent}>

                    </div>
                </div>

                <div className="speechOP">
                    <h2>{this.state.interimText} </h2>
                </div>
            </div >
        );
    }
}

export default Speak;