import React, { Component } from 'react';

import './remote.css'
import { Link } from "react-router-dom";

import io from 'socket.io-client';
const socket = io('http://localhost:9000');




Math.degrees = function (radians) {
    return radians * 180 / Math.PI;
};


class HumanoidRemote extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        socket.emit('/scanDevice');

        this.myRef = React.createRef();
        this.dragStart = null;
    }
    componentDidMount = () => {

        this.stick = this.myRef;

        this.stick.current.addEventListener("mousedown", this.handleMouseDown.bind(this));
        document.addEventListener("mousemove", this.handleMouseMove.bind(this));
        document.addEventListener("mouseup", this.handleMouseUp.bind(this));

    }


    handleMouseDown(event) {

        if (event.changedTouches) {
            this.dragStart = {

                x: event.changedTouches[0].clientX,
                y: event.changedTouches[0].clientY
            };
            return;
        }
        this.dragStart = {
            x: event.clientX,
            y: event.clientY
        };
    }



    handleMouseMove(event) {
        if (this.dragStart === null) return;

        if (event.changedTouches) {
            event.clientX = event.changedTouches[0].clientX;
            event.clientY = event.changedTouches[0].clientY;
        }

        const xDiff = event.clientX - this.dragStart.x;
        const yDiff = event.clientY - this.dragStart.y;

        const angle = Math.atan2(yDiff, xDiff);
        const degrees = angle * -57;

        const distance = Math.min(50, Math.hypot(xDiff, yDiff));

        const xNew = distance * Math.cos(angle);
        const yNew = distance * Math.sin(angle);

        // console.log("Degree:", degrees);



        this.stick.current.style.transform = `translate(${xNew}px, ${yNew}px)`;

        event.preventDefault();

        // Get the distance between the cursor and the center
        const distanceOld = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
        this.stick.current.style.transform = `translate3d(${xNew}px, ${yNew}px, 0px)`;
        this.currentPos = { x: xNew, y: yNew };

        // console.log('position: ', this.currentPos);

        // //------------------- Calling Sockets on directions-------------------

        var speed;


        if (degrees < 3 && degrees > -3) {

            if (xDir > 10 && xDir < 20) {
                speed = 50;
                this.rightJoy(speed)
                // console.log('right ', xDir, "speed", speed);

            } else if (xDir > 20 && xDir < 30) {
                speed = 125;
                this.rightJoy(speed)

                // console.log('right ', xDir, "speed", speed);
            } else if (xDir > 30 && xDir < 40) {
                speed = 200;
                this.rightJoy(speed)

                // console.log('right ', xDir, "speed", speed);
            } else if (xDir > 40 && xDir < 51) {
                speed = 255;
                this.rightJoy(speed)

                // console.log('right ', xDir, "speed", speed);
            }

        } else if (degrees > 40 && degrees < 50) {
            let xDir = this.currentPos.x;
            let yDir = this.currentPos.y

            if (xDir > 0 && xDir < 8) {
                speed = 50;
                this.forwardRightJoy(speed)
                // console.log('upper right ', xDir, "speed", speed);

            } else if (xDir > 8 && xDir < 16) {
                speed = 125;
                this.forwardRightJoy(speed)

                // console.log('upper right ', xDir, "speed", speed);
            } else if (xDir > 16 && xDir < 24) {
                speed = 200;
                this.forwardRightJoy(speed)

                // console.log('upper right ', xDir, "speed", speed);
            } else if (xDir > 24 && xDir < 40) {
                speed = 255;
                this.forwardRightJoy(speed)

                // console.log('upper right ', xDir, "speed", speed);
            }
            // console.log('upper right', degrees)

        } else if (degrees > 85 && degrees < 95) {
            let yDir = this.currentPos.y
            // console.log('up ', yDir);
            if (yDir < -10 && yDir > -20) {
                speed = 50;
                this.forwardJoy(speed)

                // console.log('up ', speed);
            } else if (yDir < -20 && yDir > -30) {
                speed = 125;
                this.forwardJoy(speed)

                // console.log('up ', speed);
            } else if (yDir < -30 && yDir > -40) {
                speed = 200;
                this.forwardJoy(speed)

                // console.log('up ', speed);
            } else if (yDir < -40 && yDir > -51) {
                speed = 255;
                this.forwardJoy(speed)
                // console.log('up ', speed);
            }


        } else if (degrees > 140 && degrees < 150) {
            let xDir = this.currentPos.x;
            let yDir = this.currentPos.y
            // console.log('up left ', xDir, yDir);

            if (xDir < -9 && xDir > -18) {
                speed = 50;
                this.forwardLeftJoy(speed)
                // console.log('up left', speed);
            } else if (xDir < -18 && xDir > -27) {
                speed = 125;
                this.forwardLeftJoy(speed)

                // console.log('up left', speed);
            } else if (xDir < -27 && xDir > -36) {
                speed = 200;
                this.forwardLeftJoy(speed)

                // console.log('up left', speed);
            } else if (xDir < -36 && xDir > -51) {
                speed = 255;
                this.forwardLeftJoy(speed)
                // console.log('up left', speed);
            }


        } else if (degrees > 175) {
            // console.log('left', degrees)
            var xDir = this.currentPos.x;
            var yDir = this.currentPos.y;

            if (xDir < -10 && xDir > -20) {
                speed = 50;
                this.leftJoy(speed);

                // console.log('left ', speed);
            } else if (xDir < -20 && xDir > -30) {
                speed = 125;
                this.leftJoy(speed);

                // console.log('left ', speed);
            } else if (xDir < -30 && xDir > -40) {
                speed = 200;
                this.leftJoy(speed);

                // console.log('left ', speed);
            } else if (xDir < -40 && xDir > -51) {
                speed = 255;
                this.leftJoy(speed);

                // console.log('left ', speed);
            }

            // console.log('left ', xDir, yDir);

        } else if (degrees < -140 && degrees > -150) {
            var xDir = this.currentPos.x;
            var yDir = this.currentPos.y;
            // console.log('Down left ' , xDir, yDir);



            if (yDir > 0 && yDir < 8) {
                speed = 50;
                this.backwardLeftJoy(speed);

                // console.log('Down left ', "speed", speed);

            } else if (yDir > 8 && yDir < 16) {
                speed = 125;
                this.backwardLeftJoy(speed);

                // console.log('Down left ', "speed", speed);
            } else if (yDir > 16 && yDir < 24) {
                speed = 200;
                this.backwardLeftJoy(speed);

                // console.log('Down left ', "speed", speed);
            } else if (yDir > 24 && yDir < 40) {
                speed = 255;
                this.backwardLeftJoy(speed);

                // console.log('Down left', "speed", speed);
            }




        } else if (degrees < -85 && degrees > -95) {
            var xDir = this.currentPos.x;
            var yDir = this.currentPos.y;
            // console.log('Down  ', xDir, yDir);
            // console.log('down ', degrees)
            if (yDir > 10 && yDir < 20) {
                speed = 50;
                this.backwardJoy(speed)
                // console.log('Down ', "speed", speed);

            } else if (yDir > 20 && yDir < 30) {
                speed = 125;
                this.backwardJoy(speed)

                // console.log('Down ', "speed", speed);
            } else if (yDir > 30 && yDir < 40) {
                speed = 200;
                this.backwardJoy(speed)

                // console.log('Down ', "speed", speed);
            } else if (yDir > 40 && yDir < 51) {
                speed = 255;
                this.backwardJoy(speed)

                // console.log('Down ', "speed", speed);
            }





        } else if (degrees < -40 && degrees > -50) {
            var xDir = this.currentPos.x;
            var yDir = this.currentPos.y;
            // console.log('Down right ', xDir, yDir);
            // console.log('down right', degrees)


            if (yDir > 0 && yDir < 8) {
                speed = 50;
                this.backwardRightJoy(speed);
                // console.log('Down right ', "speed", speed);

            } else if (yDir > 8 && yDir < 16) {
                speed = 125;
                this.backwardRightJoy(speed);

                // console.log('Down right ', "speed", speed);

            } else if (yDir > 16 && yDir < 24) {
                speed = 200;
                this.backwardRightJoy(speed);

                // console.log('Down right ', "speed", speed);

            } else if (yDir > 24 && yDir < 40) {
                speed = 255;
                this.backwardRightJoy(speed);

                // console.log('Down right', "speed", speed);

            }

        }







    }


    handleMouseUp(event) {

        if (this.dragStart === null) return;

        this.stick.current.style.transition = '.2s';

        this.stick.current.style.transform = `translate3d(0px, 0px, 0px)`;


        this.dragStart = null;

        //------------------- Calling Sockets on directions-------------------

        //     var xDir = this.currentPos.x;
        //     var yDir = this.currentPos.y;

        //     if (((xDir > -9) && (yDir < -49.5)) || ((xDir < 9) && (yDir < -49.5))) {
        //         console.log("up")
        //         this.forwardJoy()
        //     }
        //     else if ((xDir < -48 && yDir < -10) || (xDir < -48 && yDir < 10)) {
        //         console.log("left")
        //         this.leftJoy();

        //     } else if (((xDir < 6) && (yDir > 48.3)) || ((xDir < -6) && (yDir > 48.3))) {
        //         console.log("down");
        //         this.backwardJoy();
        //     } else if (((xDir > 48) && (yDir < -10)) || ((xDir > 48) && (yDir < 10))) {
        //         console.log("right");
        //         this.rightJoy()
        //     }

        //     this.currentPos = { x: 0, y: 0 };
        // }
    }

    leftJoy = (speed) => {
        // console.log("leftJoy");

        let data = ['R'.charCodeAt(), "l".charCodeAt(), "l".charCodeAt(), speed];
        console.log('emiiting leftjoy ', data);
        socket.emit('/remote', data);

    }

    rightJoy = (speed) => {
        // console.log("right");

        let data = ['R'.charCodeAt(), "r".charCodeAt(), "r".charCodeAt(), speed];
        socket.emit('/remote', data);
        console.log('emiiting rightJoy ', data);


    }

    forwardJoy = (speed) => {
        let data = ['R'.charCodeAt(), "u".charCodeAt(), "u".charCodeAt(), speed];
        socket.emit('/remote', data);
        console.log('emiiting Forwardjoy ', data);


    }
    backwardJoy = (speed) => {
        let data = ['R'.charCodeAt(), "d".charCodeAt(), "d".charCodeAt(), speed];
        socket.emit('/remote', data);
        console.log('emiiting backwardJoy ', data);


    }

    forwardLeftJoy = (speed) => {
        // console.log("forward");
        let data = ['R'.charCodeAt(), "u".charCodeAt(), "l".charCodeAt(), speed];
        socket.emit('/remote', data);
        console.log('emiiting forwardLeftJoy ', data);


    }
    forwardRightJoy = (speed) => {
        // console.log("forward");
        let data = ['R'.charCodeAt(), "u".charCodeAt(), "r".charCodeAt(), speed];
        socket.emit('/remote', data);
        console.log('emiiting forwardRightJoy ', data);

    }
    backwardLeftJoy = (speed) => {
        // console.log("backward");
        let data = ['R'.charCodeAt(), "d".charCodeAt(), "l".charCodeAt(), speed];
        socket.emit('/remote', data);
        console.log('emiiting backwardLeftJoy ', data);



    }
    backwardRightJoy = (speed) => {
        // console.log("backward");
        let data = ['R'.charCodeAt(), "d".charCodeAt(), "r".charCodeAt(), speed];
        socket.emit('/remote', data);
        console.log('emiiting backwardRightJoy ', data);


    }



    //------------- Remote Modes--------------------------
    // Follow Me mode 
    followMeClick = () => {
        // console.log("followMeclick");
        let data = ['R'.charCodeAt(), "f".charCodeAt()];
        socket.emit('/remote', data);

    }
    // smart mode
    smartClick = () => {
        // console.log("Smart click");
        let data = ['R'.charCodeAt(), "a".charCodeAt()];
        socket.emit('/remote', data);

    }
    // disco mode
    discoClick = () => {
        // console.log("Disco click");
        let data = ['R'.charCodeAt(), "l".charCodeAt()];
        socket.emit('/remote', data);
    }
    // follow line mode

    followLineClick = () => {
        // console.log("Follow Line click");
        let data = ['R'.charCodeAt(), "g".charCodeAt()];
        socket.emit('/remote', data);
    }
    // ----------------Special Mode
    // Horn click 
    bowClick = () => {
        // console.log("Horn Click");
        let data = ['R'.charCodeAt(), "h".charCodeAt()];
        socket.emit('/remote', data);
    }
    // Light
    attentionClick = () => {
        // console.log("Light click");
        let data = ['R'.charCodeAt(), "b".charCodeAt()];
        socket.emit('/remote', data);
    }

    // Spin 
    saluteClick = () => {
        // console.log("Spin click");
        let data = ['R'.charCodeAt(), "s".charCodeAt()];
        socket.emit('/remote', data);
    }

    danceClick = () => {
        // console.log("Spin click");
        let data = ['R'.charCodeAt(), "d".charCodeAt()];
        socket.emit('/remote', data);
    }


    render() {
        return (
            <div className="play-introduction">
                <Link to="/introduction">
                    <div className="backBtn"></div>

                </Link>
                <div>
                    <p className="Playtitle">Remote</p>
                </div>
                <div className="help click"></div>
                <div className="usb "></div>
                <div className="Remote-Keys">
                    <div className="joystickDiv">
                        <div id="joystick" >
                            <div id="stick" ref={this.myRef} className="click"> </div>
                        </div>
                    </div>
                </div>

                <div className="Remote-Mode">
                    <div className="Follow-me-div" >
                        <div className="follow-me click" onClick={this.followMeClick}></div>
                        <p className="Remote-mode-text">Follow Me Mode</p>
                    </div>

                    <div className="Smart-div">
                        <div className="smart click" onClick={this.smartClick}></div>
                        <p className="Remote-mode-text">Smart Mode</p>
                    </div>
                    <div className="disco-div">
                        <div className="disco click" onClick={this.discoClick}></div>
                        <p className="Remote-mode-text">Fight Mode</p>
                    </div>
                    <div className="follow-line-div">
                        <div className="follow-line click" onClick={this.followLineClick}></div>
                        <p className="Remote-mode-text follow-line-text">Follow Line Mode</p>
                    </div>
                </div>

                <div className="Remote-unique">
                    <div className="bow-div">
                        <div className="bow click" onClick={this.bowClick}></div>
                        <p className="remote-unique-text ">Bow</p>
                    </div>
                    <div className="attention-div">
                        <div className="attention click" onClick={this.attentionClick}></div>
                        <p className="remote-unique-text ">Attention</p>
                    </div>
                    <div className="salute-div">
                        <div className="salute click" onClick={this.saluteClick}></div>
                        <p className="remote-unique-text ">Salute</p>
                    </div>
                    <div className="dance-div">
                        <div className="dance click" onClick={this.danceClick}></div>
                        <p className="remote-unique-text ">Dance</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default HumanoidRemote;