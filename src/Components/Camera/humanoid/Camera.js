import React, { Component } from 'react';
import './camera.css';

import { useState } from "react"
import PoseNet from "react-posenet"

import { Link } from "react-router-dom";

import io from 'socket.io-client';
const socket = io('http://localhost:9000');

socket.emit('/scanDevice');



// Sending data to server after 1 second - data from local storage to device
setInterval(() => {
    let data = localStorage.getItem("faceSide");
    // alert("The URL of this page is: " + window.location.href);
    let url = window.location.href;
    let path = "http://localhost:3000/Humanoid-Camera";
    if (url === path) {
        console.log("5ms : ", url);
        if (data === "leftside") {
            let data = ["C".charCodeAt(), "2".charCodeAt()];
            console.log("L emit", data)
            socket.emit("/camera", data);
        } else if (data === "rightside") {
            let data = ["C".charCodeAt(), "1".charCodeAt()];
            socket.emit("/camera", data);
            console.log("R emit", data)

        } else if (data === "Center") {
            let data = ["C".charCodeAt(), "0".charCodeAt()];
            socket.emit("/camera", data);
            console.log("C emit", data)
        }
    } else return;


}, 500);



function HumanoidCamera() {
    var faceMovement = '';
    var faceArr = [];

    const [posesString, setPosesString] = useState([]);


    try {

        if (posesString[0]) {
            // console.log("left Eye :", posesString[0].keypoints[1].position.y)
            // console.log("Right Eye :", posesString[0].keypoints[2].position.y)

            if (posesString[0]["keypoints"]["1"].score > 0.87 && posesString[0]["keypoints"]["2"].score > 0.87) {
                // console.log("leftEye :", poses[0].pose['leftEye'].y, " \nRightEye : ", poses[0].pose['rightEye'].y)
                if (posesString[0]["keypoints"]["1"].position.y > posesString[0]["keypoints"]["2"].position.y) {
                    if (posesString[0]["keypoints"]["1"].position.y - posesString[0]["keypoints"]["2"].position.y > 40) {
                        // console.log("Left Side");
                        faceMovement = "Left Side";
                        let faceData = "leftside"
                        faceArr.push(faceData);
                    }
                } else if (posesString[0]["keypoints"]["2"].score > posesString[0]["keypoints"]["1"].score) {
                    // console.log("diff R = ", posesString[0]["keypoints"]["2"].score - posesString[0]["keypoints"]["1"].score)
                    if (posesString[0]["keypoints"]["2"].score - posesString[0]["keypoints"]["1"].score > 0.007) {
                        // console.log("Right Side")
                        faceMovement = "Right Side"
                        let faceData = "rightside"
                        faceArr.push(faceData);

                    }
                } else if (posesString[0].keypoints[1].position.y - posesString[0].keypoints[2].position.y > -9 ||
                    posesString[0].keypoints[1].position.y - posesString[0].keypoints[2].position.y < 9) {
                    // console.log("Center : ", posesString[0].keypoints[1].position.y - posesString[0].keypoints[2].position.y)
                    faceMovement = "Center"
                    let faceData = "Center"
                    faceArr.push(faceData);
                }
            }

        }



    } catch (error) {
        console.log("no person in cam", error)
    }



    // store the face movement in local storage 
    localStorage.setItem("faceSide", faceArr);

    // style for tern backgroud image - connected || disconnected
    const style = {
        backgroundImage: `url('/imagesplay/humanoid/connectedHumanoid.png')`,
        position: 'absolute',
        top: '5vw',
        left: '60.5vw',
        width: '21vw',
        height: '53vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no - repeat'
    }



    return (

        <div className="play-introduction">
            <Link to="/introduction">
                <div className="backBtn"></div>

            </Link>

            <div>
                <p className="Playtitle">Camera</p>
            </div>
            <div className="help click"></div>
            <div className="usb "></div>

            <div className="">

                <PoseNet
                    inferenceConfig={{ decodingMethod: "single-person" }}
                    onEstimate={poses => {
                        setPosesString((poses))
                    }
                    }
                    className="camera"
                />

                <p className="faceOP"> {faceMovement} </p>

                <div className="tern-device-camera" style={style} />


            </div>


        </div >










    );
}


export default HumanoidCamera;
