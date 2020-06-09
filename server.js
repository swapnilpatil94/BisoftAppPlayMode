const express = require('express');
const app = express();
var async = require('async')
var SerialPort = require("serialport");
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);
const pathDir = require('path');
const cors = require('cors')
var portOfDevice;
var dataValue = '';
var serialPort = false, portVendorId;

app.use(cors());

app.use(express.static(pathDir.join(__dirname, 'build')));



io.on("connection", socket => {

    process.on('unhandledRejection', error => {
        // Will print "unhandledRejection err is not defined"
        console.log('unhandledRejection', portOfDevice, error);
        if (error.message.includes(`${portOfDevice}`)) {
            socket.emit("/deviceConnected", false)
        }


    });

    socket.on("/scanDevice", () => {

        try {
            async.series([
                function (callback) {

                    try {

                        SerialPort.list().then(
                            ports => {
                                ports.forEach(port => {
                                    // console.log("Port", port)

                                    if (port.vendorId === '10C4') {
                                        portOfDevice = port.path;
                                        portVendorId = port.vendorId;


                                    }

                                })
                            },
                            err => {
                                console.error('Error listing ports', err)
                            }
                        )

                        if (portVendorId === "10C4") {
                            serialPort = new SerialPort(portOfDevice, {
                                baudRate: 250000,
                                autoOpen: true,
                            });
                            serialPort.on("open", function (err) {
                                // console.log('open', err);
                                serialPort.write(
                                    ["W".charCodeAt(), "H".charCodeAt(), "O".charCodeAt(), "CR+".charCodeAt()],
                                    (err, data) => {
                                    })
                            })
                            serialPort.on("data", (data) => {
                                console.log(data.toString('utf-8'))
                                serialPort.close();
                            })
                        }



                    } catch (e) {

                        console.log('error12', e)

                    }
                }

            ])

        } catch (e) {

            console.log('error1', e)

        }



    });


    socket.on("/remote", (remoteData, err) => {
        console.log("REmote:: ", remoteData, portOfDevice);


        try {
            if (err) {
                console.log("ERROR IN Remote ", err)

            } else {
                serialPort = new SerialPort(portOfDevice, {
                    baudRate: 250000,
                    autoOpen: true,
                });

                serialPort.on("open", function (err) {
                    if (err) {
                        console.log('errr in open port :', err);
                    } else {

                        serialPort.write(
                            remoteData,
                            (err, data) => {
                                if (err) {
                                    console.log("err in write");
                                } else {
                                    serialPort.close();
                                    console.log('data write');
                                }
                            });




                    }


                });












            }
        } catch (error) {
            console.log(error)

        }
    })

    // -------------MUSIC PAGE -------------------------------------------------------------

    socket.on("/music/keys", (musicData, err) => {
        console.log("Music - Key - : ", musicData);


        try {
            if (err) {
                console.log("ERROR IN Music ", err)

            } else {
                serialPort = new SerialPort(portOfDevice, {
                    baudRate: 250000,
                    autoOpen: true,
                });

                serialPort.on("open", function (err) {
                    if (err) {
                        console.log('errr in open port :', err);
                    } else {
                        serialPort.write(
                            musicData,
                            (err, data) => {
                                if (err) {
                                    console.log("err in write");
                                } else {
                                    serialPort.close();
                                    console.log('data write');
                                }
                            });




                    }


                });












            }
        } catch (error) {
            console.log(error)

        }
    })

    // -------------Speak PAGE -------------------------------------------------------------

    socket.on("/speak", (speakData, err) => {
        console.log("Speak page:  - : ", speakData);


        try {
            if (err) {
                console.log("ERROR IN Speak ", err)

            } else {
                serialPort = new SerialPort(portOfDevice, {
                    baudRate: 250000,
                    autoOpen: true,
                });

                serialPort.on("open", function (err) {
                    if (err) {
                        console.log('errr in open port :', err);
                    } else {
                        serialPort.write(
                            speakData,
                            (err, data) => {
                                if (err) {
                                    console.log("err in write");
                                } else {
                                    serialPort.close();
                                    console.log('data write');
                                }
                            });




                    }


                });












            }
        } catch (error) {
            console.log(error)

        }
    })

    // -------------Camera PAGE -------------------------------------------------------------

    socket.on("/camera", (camData, err) => {
        console.log("camera page:  - : ", camData);



        try {
            if (err) {
                console.log("ERROR IN camera ", err)

            } else {
                serialPort = new SerialPort(portOfDevice, {
                    baudRate: 250000,
                    autoOpen: true,
                });

                serialPort.on("open", function (err) {
                    if (err) {
                        console.log('errr in open port :', err);
                    } else {
                        serialPort.write(
                            camData,
                            (err, data) => {
                                if (err) {
                                    console.log("err in write");
                                } else {
                                    serialPort.close();
                                    console.log('data write');
                                }
                            });




                    }


                });












            }
        } catch (error) {
            console.log(error)

        }


    })




    // socket.on("disconnect", () => console.log("Client disconnected"));
});




server.listen(9000, console.log("running at 9000"));