import React from "react";
import "./traceme.css";
import Immutable from "immutable";
import { Link } from "react-router-dom";

var pathData;
var clear = 0;

class Traceme extends React.Component {
  constructor() {
    super();

    this.state = {
      lines: new Immutable.List(),
      isDrawing: false,
      pathD: "M 300 150",
      style1: {
        display: " none"
      },
      arr: [],
      res: []
    };

    this.moving = React.createRef();
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount() {
    document
      .getElementById("DrawAREA")
      .addEventListener("mousedown", this.handleMouseDown);
    document
      .getElementById("DrawAREA")
      .addEventListener("mousemove", this.handleMouseMove);
    document
      .getElementById("DrawAREA")
      .addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    document
      .getElementById("DrawAREA")
      .removeEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseDown(mouseEvent) {
    if (mouseEvent.button != 0) {
      return;
    }
    const point = this.relativeCoordinatesForEvent(mouseEvent);
    this.setState(prevState => ({
      lines: prevState.lines.push(new Immutable.List([point])),
      isDrawing: true
    }));
  }

  handleMouseMove(mouseEvent) {
    if (!this.state.isDrawing) {
      return;
    }
    const point = this.relativeCoordinatesForEvent(mouseEvent);
    // console.log(this.state.lines);

    this.setState(prevState => ({
      lines: prevState.lines.updateIn([prevState.lines.size - 1], line =>
        line.push(point)
      )
    }));
  }

  handleMouseUp() {
    this.setState({ isDrawing: false });
    document
      .getElementById("DrawAREA")
      .removeEventListener("mousedown", this.handleMouseDown);
    document
      .getElementById("DrawAREA")
      .removeEventListener("mousemove", this.handleMouseMove);
    this.setState({ pathD: `"` + pathData + `"` });
    // console.log("PATH : : ", pathData);
  }

  // Taking the co-ordinates(position) of X and Y  while moving the mouse
  relativeCoordinatesForEvent(mouseEvent) {
    const boundingRect = this.refs.drawArea.getBoundingClientRect();
    // console.log("X : ", mouseEvent.clientX - boundingRect.left);
    // console.log("Y : ", mouseEvent.clientY - boundingRect.top);
    this.setState({
      arr: [
        ...this.state.arr,
        {
          x: mouseEvent.clientX,
          y: window.screen.height - mouseEvent.clientY
        }
      ]
    });
    return new Immutable.Map({
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top
    });
  }

  startDrawing = () => {
    document
      .getElementById("DrawAREA")
      .addEventListener("mousedown", this.handleMouseDown);
    document
      .getElementById("DrawAREA")
      .addEventListener("mousemove", this.handleMouseMove);
  };

  Drawing = ({ lines }) => {
    return (
      <svg className="drawing">
        {lines.map((line, index) => {
          return <this.DrawingLine key={index} line={line} />;
        })}
      </svg>
    );
  };

  // Drawing line and creating SVG path
  DrawingLine = ({ line }) => {
    pathData =
      "M " +
      line
        .map(p => {
          return `${p.get("x")} ${p.get("y")}`;
        })
        .join(" L ");

    // console.log("PATH Fianl : : ", pathData + "Z");

    return <path className="path" d={pathData} stroke="green" />;
  };

  // Clear the data from div - removing lines
  clear = () => {
    // clear = 1;
    const removeElements = elms => elms.forEach(el => el.remove());
    removeElements(document.querySelectorAll(".path"));

    this.setState({ pathD: "0" });
    // this.state.pathD = "M 0 0"
    this.setState({ pathD: "M0 0" });
    // console.log("Path", this.state.pathD)
  };

  // Palying tern image animation on line
  play = () => {
    // console.log(this.state.res);
    if (clear == 1) {
      var pathNew = "M 0 0";
      this.setState({ pathD: pathNew });

      // console.log("clear in IF play", this.state.pathD)
      let style = {
        // offsetPath: `"M 0 100 L 200 150 L 300 150"`,
        // animation: "move 10s linear 0.5s 1 alternate ",
        // position: "absolute ",
        offsetPath: ` path( ${this.state.pathD} )`,
        display: " none"
      };
      this.setState({ style1: style });
      // console.log("Path", this.state.pathD)
    } else {
      var style = {
        // offsetPath: `"M 0 100 L 200 150 L 300 150"`,
        animation: "move 10s linear 0.5s 1 alternate ", //Here move is the animation name which is used in css file keyframes
        position: "absolute ",
        offsetPath: ` path( ${this.state.pathD} )`
        // animationIterationCount: 1,
        // offsetDistance: "-190 %"
      };

      this.setState({ style1: style });
      // to remove image
      setTimeout(() => {
        var style = {
          display: " none"
        };
        this.setState({ style1: style });
        clearInterval(position);
      }, 10500);
    }

    // -------------------Getting the current position of image ----------------

    let position = setInterval(() => {
      const ternImg = document.querySelector("#tern");
      let topPostion = ternImg.getBoundingClientRect().top;
      let leftPostion = ternImg.getBoundingClientRect().left;

      // console.log(
      //   " topPostion:   " + topPostion,
      //   "leftposition:  " + leftPostion
      // );
    }, 100);



    //send data to device
    this.sendcd()
  };

  sendcd = () => {
    var cur_angle_car = 0;
    var cur_angle_line = 0;
    var diff_x, diff_y, hypo, turn_angle;
    var my_arr = this.state.arr;
    var my_arr1 = [];
    for (var i = 0; i < my_arr.length - 5; i += 5) {
      cur_angle_car = cur_angle_line;
      diff_x = my_arr[i + 5].x - my_arr[i].x;
      diff_y = my_arr[i + 5].y - my_arr[i].y;

      hypo = Math.sqrt(diff_x * diff_x + diff_y * diff_y);
      cur_angle_line = Math.asin(Math.abs(diff_x) / hypo) * (180 / Math.PI);

      if (diff_x >= 0 && diff_y >= 0) {
        cur_angle_line = cur_angle_line;
      } else if (diff_x >= 0 && diff_y < 0) {
        cur_angle_line = 180 - cur_angle_line;
      } else if (diff_x < 0 && diff_y < 0) {
        cur_angle_line = 180 + cur_angle_line;
      } else if (diff_x < 0 && diff_y >= 0) {
        cur_angle_line = -cur_angle_line;
      }
      turn_angle = cur_angle_line - cur_angle_car;

      if (Math.abs(turn_angle) > 180 && turn_angle >= 0) {
        turn_angle = turn_angle - 360;
      }
      if (Math.abs(turn_angle) > 180 && turn_angle < 0) {
        turn_angle = 360 - Math.abs(turn_angle);
      }

      // console.log(turn_angle);
      // console.log(hypo);
      my_arr1.push({ angle: turn_angle, len: hypo });

      // console.log(my_arr1);


    }
    console.log(my_arr1)
    this.setState({ res: [...my_arr1] });
  };
  render() {
    return (
      <div className="play-introduction">
        <Link to="/">
          <div className="backBtn"></div>
        </Link>

        <div>
          <p className="Playtitle">Trace Me</p>
        </div>
        <div className="help click"></div>
        <div className="usb "></div>

        <div className="">
          <section>
            <div id="DrawAREA" className="drawArea" ref="drawArea">
              <this.Drawing lines={this.state.lines} />
              <div
                class="moving-element"
                id="tern"
                style={this.state.style1}
                ref={this.moving}
              >
                <img src="/imagesplay/play_tern_4.png" width="50"></img>
              </div>
            </div>
          </section>
          <div id="traceme-btns">
            <div id=" blue-btn-trace">
              <div
                id="draw-btn"
                className="click"
                onClick={this.startDrawing}
              ></div>

              <div id="erase-btn" className="click" onClick={this.clear}></div>
            </div>

            <div id="play-btn" className="click" onClick={this.play}></div>
            {/* <div id="send-btn" className="click btn btn-primary" onClick={this.sendcd} >SEND</div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Traceme;
