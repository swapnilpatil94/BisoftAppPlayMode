
import React, { Component } from 'react';

import './PianoIntroduction.css';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Dot, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const element = <FontAwesomeIcon icon={faCoffee} />

var slide = ""

class PianoIntroduction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowing: false,
            Next: "Next"
        }
    }
    nextbtn = () => {


        slide = slide + Slide.name;
        // console.log('nxtbtn:', slide.length)
        if (slide.length === 1) {
            this.setState({ Next: "Play" })
        } else this.setState({ Next: "Next" })


        // console.log("play. ", this.state.Next)
    }

    openModalHandler = () => {
        this.setState({
            isShowing: true
        });
    }

    closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
        console.log("CLOSED")
    }

    render() {
        return (
            <div className="play-introduction">

                {this.state.isShowing ? <div onClick={this.closeModalHandler}
                    className="back-shed"></div> : null
                }

                <button className="open-modal-btn" onClick={this.openModalHandler}>
                    Open Modal
                </button>


                <div className="modal-wrapper"
                    style={{
                        transform: this.state.isShowing ? 'translateY(0vh)' : 'translateY(-100vh)',
                        opacity: this.state.isShowing ? '1' : '0'
                    }}>
                    <div className="modal-header" onClick={this.closeModalHandler} >
                        <FontAwesomeIcon icon={faTimesCircle} color={"#FF6054"} size={"4x"} className="close-modal-btn " />
                    </div>

                    <div className="modal-body">

                        <div>
                            <CarouselProvider className="carousal"
                                naturalSlideWidth={10}
                                naturalSlideHeight={0}
                                totalSlides={2}


                            >

                                <Slider className="slides">
                                    <Slide index={0} className="slideinner">
                                        <img className="ternPlay" src={'/imagesplay/modelmusictern.png'}></img><br></br>
                                        <p className="description">Make sure to connect your tern with your device</p>
                                    </Slide>
                                    <Slide index={1} className="slideinner">
                                        <img className="ternPlay" src={'/imagesplay/modelPiano.png'}></img><br></br>
                                        <p className="description">Press any key on your screen to see the tern work</p>
                                    </Slide>
                                    {/* <Slide index={2} className="slideinner">
                                        <img className="ternPlay" src={'/imagesplay/play_tern_3.png'}></img><br></br>
                                        <p className="description">Put the battery inside Tern</p>
                                    </Slide>
                                    <Slide index={3} className="slideinner">
                                        <img className="ternPlay" src={'/imagesplay/play_tern_4.png'}></img><br></br>
                                        <p className="description">Switch on and Play</p>
                                    </Slide> */}

                                </Slider>

                                {/* <ButtonBack>Back</ButtonBack> */}
                                <span className="spanfordot"></span>
                                <Dot slide={0} className="dot"></Dot>
                                <Dot slide={1} className="dot"></Dot>
                                {/* <Dot slide={2} className="dot"></Dot>
                                <Dot slide={3} className="dot" ></Dot> */}

                                <ButtonNext className="NxtBtn" onClick={this.nextbtn}>{this.state.Next}</ButtonNext>


                            </CarouselProvider>
                        </div>


                    </div>

                </div>
            </div >);
    }
}

export default PianoIntroduction;