import React, { useEffect } from "react";
import user from "../../assets/Your Image 1.svg";
import bulboff from "../../assets/bulboff.jpeg";
import bulbon from "../../assets/bulbon.jpeg";
import reel from "../../assets/sample.mov";
import HOC from "../HOC";
function Welcome() {
  function playPauseVideo() {
    let videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      // We can only control playback without insteraction if video is mute
      video.muted = true;
      // Play is a promise so we need to check we have it
      let playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then((_) => {
          let observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.intersectionRatio !== 1 && !video.paused) {
                  video.pause();
                } else if (video.paused) {
                  video.play();
                }
              });
            },
            { threshold: 0.2 }
          );
          observer.observe(video);
        });
      }
    });
  }
  useEffect(() => {
    playPauseVideo();
  }, []);

  return (
    <div className="welcome-conatiner">
      <div className="vertical-carousel">
        <div className="posts">
          <img src={user} loading="lazy" />
        </div>
        <div className="posts">
          <img src={bulboff} loading="lazy" />
        </div>
        <div className="posts">
          <video controls loading="lazy" autoPlay="true" muted data-keepplaying>
            <source src={reel}></source>
          </video>
        </div>
        <div className="posts">
          {" "}
          <img src={bulbon} loading="lazy" />
        </div>
        <div className="posts">
          <video controls loading="lazy" autoPlay="true" muted data-keepplaying>
            <source src={reel}></source>
          </video>
        </div>
        <div className="posts">1</div>
        <div className="posts">1</div>
        <div className="posts">1</div>
      </div>
      <div className="follow-recommend">follow</div>
    </div>
  );
}

export default HOC(Welcome);
