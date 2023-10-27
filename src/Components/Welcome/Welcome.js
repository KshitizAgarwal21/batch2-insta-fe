import React, { useEffect, useState } from "react";
import user from "../../assets/Your Image 1.svg";
import bulboff from "../../assets/bulboff.jpeg";
import bulbon from "../../assets/bulbon.jpeg";
import reel from "../../assets/sample.mov";
import { socket } from "../../socket";
import HOC from "../HOC";
import axios from "axios";
function Welcome() {
  const [posts, setPosts] = useState([]);
  const [showhide, setshowhide] = useState(false);
  const sendFollowRequest = () => {
    const id = "652812f0bf41d828c0b78c60";

    const bothIds = {
      toFollow: id,
      whoWantsToFollow: localStorage.getItem("userid"),
    };
    socket.emit("follow", bothIds);
  };

  async function getPosts() {
    const postsresp = await axios.post(
      "http://localhost:8080/posts/getposts",
      {},
      {
        headers: {
          Authorization: localStorage.getItem("userid"),
        },
      }
    );
    console.log(postsresp.data);
    setPosts(postsresp.data);
  }
  const togglecomment = () => {
    setshowhide((prev) => !prev);
  };
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
  let [caption, setCaption] = useState("आप कैसे हैं");

  const translate = async () => {
    const res = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      body: JSON.stringify({
        q: caption,
        source: "auto",
        target: "en",
        format: "text",
        api_key: "",
      }),
      headers: { "Content-Type": "application/json" },
    });

    console.log(await res.json());
    setCaption(await res.json().translatedText);
  };
  useEffect(() => {
    getPosts();
    playPauseVideo();
  }, []);
  const like = (id) => {
    console.log(id);
    const obj = {
      personWhosPost: id.user_id,
      personWhoLiked: localStorage.getItem("userid"),
    };
    socket.emit("like", obj);
  };
  return (
    <div className="welcome-conatiner">
      <div className="vertical-carousel">
        {posts?.map((elem) => {
          return (
            <>
              {" "}
              <div className="posts">
                <img src={elem.media} loading="lazy" />
                <button
                  onClick={() => {
                    like(elem);
                  }}
                >
                  Like
                </button>
                <p>{elem.caption}</p> <span onClick={translate}>Translate</span>
                <p>♥ {elem.likes.length}</p>
                <p onClick={togglecomment}>💬 {elem.comments.length}</p>
                <span style={{ display: showhide ? "block" : "none" }}>
                  {elem.comments.map((ele) => {
                    return (
                      <>
                        {ele.user_id} {ele.content}
                      </>
                    );
                  })}
                </span>
              </div>
            </>
          );
        })}
        {/* 
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
        <div className="posts">1</div> */}
      </div>
      <div className="follow-recommend">
        <button onClick={sendFollowRequest}>Follow</button>
      </div>
    </div>
  );
}

export default HOC(Welcome);
