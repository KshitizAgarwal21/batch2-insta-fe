import React from "react";
import { useNavigate } from "react-router-dom";

export default function Stories() {
  const naviagte = useNavigate();
  const id = 12234;
  const handleClick = () => {
    naviagte(`/story/${id}`);
  };

  const addToStory = () => {};
  return (
    <div>
      <div className="story-heads">
        <h1>Stories</h1>

        <button className="watch">{"> "}Watch All</button>
      </div>

      <div className="circular-carousel">
        <div className="story addself" onClick={addToStory}>
          {/* + <input type="file" className="hidden"></input> */}
          <label for="files" class="addbtn">
            +
          </label>
          <input
            id="files"
            style={{ visibility: "hidden", width: 0 }}
            type="file"
          ></input>
        </div>
        <div className="story" onClick={handleClick}></div>
        <div className="story" onClick={handleClick}></div>
        <div className="story" onClick={handleClick}></div>
        <div className="story"></div>
        <div className="story"></div>
        <div className="story"></div>
        <div className="story"></div>
        <div className="story"></div>
        <div className="story"></div>
        <div className="story"></div>
        <div className="story"></div>
        <div className="story"></div>
        <div className="story"></div>
        <div className="story"></div>
      </div>
    </div>
  );
}
