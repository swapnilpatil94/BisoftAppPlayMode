import React, { Component } from 'react';
import './piano.css'
import { Link } from "react-router-dom";
import io from 'socket.io-client';
const socket = io('http://localhost:9000');

socket.emit('/scanDevice');

class HumanoidPiano extends Component {
    constructor(props) {
        super(props);
        this.state = {
            humanoidIsConnected: false,
            clickedData: '0',

            humanoidIsConnectedStyle: {
                backgroundImage: `url('/imagesplay/humanoid/connectedHumanoid.png')`,
                position: 'relative',
                top: '-7vw',
                left: ' 51vw',
                width: '21vw',
                height: '53vh',
                backgroundSize: 'contain',
                backgroundRepeat: ' no-repeat '
            }
        }



        // cheking the connection of tern in 2000 ms

        setInterval(() => {

            if (!this.state.humanoidIsConnected) {
                const disconnected = {
                    backgroundImage: `url('/imagesplay/humanoid/disconnectedHumanoid.png')`,
                    position: 'relative',
                    top: '-7vw',
                    left: ' 51vw',
                    width: '21vw',
                    height: '53vh',
                    backgroundSize: 'contain',
                    backgroundRepeat: ' no-repeat '

                }
                this.setState({ humanoidIsConnectedStyle: disconnected })

            }
        }, 2000);

    }



    M1 = () => {
        socket.emit('/music/keys', ['M'.charCodeAt(), "0".charCodeAt()]);
        console.log('1')
    }
    M2 = () => {
        socket.emit('/music/keys', ['M'.charCodeAt(), "1".charCodeAt()]);
        console.log('2')
    }
    M3 = () => {
        socket.emit('/music/keys', ['M'.charCodeAt(), "2".charCodeAt()])
        console.log('3')
    }
    M4 = () => {
        socket.emit('/music/keys', ['M'.charCodeAt(), "3".charCodeAt()])
        console.log('4')
    }
    M5 = () => {
        socket.emit('/music/keys', ['M'.charCodeAt(), "4".charCodeAt()])

        console.log('5')
    }
    M6 = () => {
        socket.emit('/music/keys', ['M'.charCodeAt(), "5".charCodeAt()])

        console.log('6')
    }
    M7 = () => {
        socket.emit('/music/keys', ['M'.charCodeAt(), "6".charCodeAt()])

        console.log('7')
    }
    M8 = () => {
        socket.emit('/music/keys', ['M'.charCodeAt(), "7".charCodeAt()])

        console.log('8')
    }



    render() {



        return (
            <div className="play-introduction">
                <Link to="/introduction">
                    <div className="backBtn"></div>

                </Link>
                <div>
                    <p className="Playtitle">Music</p>
                </div>
                <div className="help click"></div>
                <div className="usb "></div>

                {/* Piano code below */}

                <div className="set">


                    <div className=" a white a li" onClick={this.M1} ></div>
                    <div className="black as li"></div>
                    <div className="white b li" onClick={this.M2}></div>
                    <div className="black bs li"></div>
                    <div className="white c li" onClick={this.M3}></div>


                    <div className="white d li" onClick={this.M4}></div>
                    <div className="black ds li"></div>
                    <div className="white e li" onClick={this.M5}></div>
                    <div className="black es li"></div>
                    <div class="white f li" onClick={this.M6}></div>

                    <div className="white g li" onClick={this.M7}></div>
                    <div className="white h li" onClick={this.M8}></div>
                    <div className="black hs li"></div>


                    <div className="tern-device-music" style={this.state.humanoidIsConnectedStyle} />


                </div>




            </div>
        );
    }
}

export default HumanoidPiano;