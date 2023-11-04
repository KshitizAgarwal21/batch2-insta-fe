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
  const [recommend, setRecommend] = useState([]);

  const sendFollowRequest = (e) => {
    console.log(e);
    const id = e;

    const bothIds = {
      toFollow: id,
      whoWantsToFollow: localStorage.getItem("userid"),
    };
    socket?.emit("follow", bothIds);
  };
  async function getfollowrecommend() {
    const postsresp = await axios.post(
      "http://localhost:8080/connections/followrecommend",
      {},
      {
        headers: {
          Authorization: localStorage.getItem("userid"),
        },
      }
    );
    const users = postsresp.data.map(async (ele) => {
      return await axios.post("http://localhost:8080/auth/getuserdetails", {
        id: ele,
      });
    });

    Promise.all(users).then((resp) => {
      resp.forEach((user, key) => {
        user.id = postsresp.data[key];
      });

      setRecommend(resp);
    });
  }

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
    console.log(posts);

    setPosts(
      postsresp.data.map((elem) => {
        return {
          ...elem,
          min: timeElapsed(elem.createdAt).min,
          hour: timeElapsed(elem.createdAt).hour,
        };
      })
    );
  }
  const togglecomment = () => {
    setshowhide((prev) => !prev);
  };

  const timeElapsed = (t) => {
    // to get the difference between current time and post time and show that

    const createdAt = new Date(t);
    const currentTime = new Date();

    // Calculate the time elapsed in milliseconds
    const timeElapsed = currentTime - createdAt;

    // Convert time elapsed to a human-readable format (e.g., hours, minutes, seconds)
    const hours = Math.floor(timeElapsed / 3600000); // 1 hour = 3600000 milliseconds
    const minutes = Math.floor((timeElapsed % 3600000) / 60000); // 1 minute = 60000 milliseconds
    const seconds = Math.floor((timeElapsed % 60000) / 1000); // 1 second = 1000 milliseconds

    return { hour: hours, min: minutes };
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
    getfollowrecommend();
    playPauseVideo();
  }, []);
  const like = (id) => {
    console.log(id);
    const reqObj = {
      whoPosted: id.user_id,
      postid: id._id,
      wholiked: localStorage.getItem("userid"),
    };

    socket?.emit("like", reqObj);
  };

  console.log(recommend);
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
                <p>
                  {elem.hour} hour and {elem.min} min ago
                </p>
              </div>
            </>
          );
        })}
      </div>
      <div className="follow-recommend">
        {recommend?.map((elem) => {
          return (
            <>
              {" "}
              <div className="profiles">
                <img src={elem.data.dp_url} className="follow-dps"></img>
                <p>{elem.data.first_name}</p>
                <button onClick={() => sendFollowRequest(elem.id)}>
                  Follow
                </button>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default HOC(Welcome);
