import React from "react";
import img1 from "../../assets/Image.svg";
import mov from "../../assets/sample.mov";
import bulboff from "../../assets/bulboff.jpeg";
import bulbon from "../../assets/bulbon.jpeg";
import HOC from "../HOC";
function Explore() {
  return (
    <div>
      <div className="story-heads">
        <h1>Explore</h1>
        <div>
          <span className="watch" style={{ fontWeight: "bold" }}>
            Latest
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="watch" style={{ fontWeight: "normal" }}>
            Popular
          </span>
        </div>
      </div>
      <div className="feedbody">
        <div className="column1">
          <img src={img1} />
          <video width="360" height="640">
            <source src={mov}></source>
          </video>
          <img src={bulboff} height="400" width="400" />

          <img src={img1} />
          <video width="360" height="640">
            <source src={mov}></source>
          </video>
          <img src={bulbon} height="270" width="250" />
        </div>
        <div className="column1">
          <video width="360" height="640">
            <source src={mov}></source>
          </video>
          <img src={img1} />

          <img src={img1} />
          <video width="360" height="640">
            <source src={mov}></source>
          </video>
          <video width="360" height="640">
            <source src={mov}></source>
          </video>
          <img src={img1} />
        </div>
        <div className="column1">
          <img src={bulboff} height="400" width="400" />
          <video width="360" height="640">
            <source src={mov}></source>
          </video>
          <img src={img1} />

          <img src={bulbon} height="270" width="250" />
          <video width="360" height="640">
            <source src={mov}></source>
          </video>
          <img src={img1} />
        </div>
        {/* <img src={img1} />
        <video width="360" height="640">
          <source src={mov}></source>
        </video>
        <img src={img1} />

        <img src={img1} />
        <video width="360" height="640">
          <source src={mov}></source>
        </video>
        <img src={img1} />
        <video width="360" height="640">
          <source src={mov}></source>
        </video> */}
      </div>
    </div>
  );
}
export default Explore;
