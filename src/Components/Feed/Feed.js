import React from "react";

export default function Feed() {
  return (
    <div>
      <div className="story-heads">
        <h1>Feed</h1>
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
      <div className="feedbody"></div>
    </div>
  );
}
