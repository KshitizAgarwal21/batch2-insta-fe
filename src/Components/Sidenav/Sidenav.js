import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/pngegg.png";

import { isExpired, decodeToken } from "react-jwt";
export default function Sidenav(props) {
  const [toggle, setToggle] = useState(true);
  const [userData, setUserData] = useState();
  const { isExpanded, setIsExpanded, setTab, tab, refresh } = props.data;
  const minimise = () => {
    setToggle(!toggle);
  };
  const [activeClass, setActiveClass] = useState("navlink active");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUserData(decodeToken(localStorage.getItem("token")));
      const { userid } = decodeToken(localStorage.getItem("token"));
      localStorage.setItem("userid", userid);
    }
  }, [refresh]);

  useEffect(() => {
    if (!toggle) {
      document.getElementById("dynamic-sidenav").style.width = "10%";
      document.getElementsByClassName("profilename")[0].style.fontSize = "14px";
      document.getElementById("stats").style.display = "none";
      document.getElementById("logo").style.visibility = "hidden";
      document.getElementsByClassName("main-area-container")[0].style.width =
        "90%";
    } else {
      document.getElementById("dynamic-sidenav").style.width = "20%";
      document.getElementsByClassName("profilename")[0].style.fontSize = "18px";
      document.getElementById("stats").style.display = "flex";
      document.getElementById("logo").style.visibility = "visible";
      document.getElementsByClassName("main-area-container")[0].style.width =
        "80%";
    }
  }, [toggle]);
  return (
    <div className="sidenav">
      <div className="logo">
        <img src={logo} id="logo" />
      </div>

      <div className="personal-profile">
        <div className="dp">
          <img src={userData?.profile.dp_url}></img>
        </div>
        <h3 className="profilename">
          {userData?.profile?.first_name} {userData?.profile?.last_name}
        </h3>
        <p className="profileid">@{userData?.username}</p>
        <div className="stats" id="stats">
          <div className="stat">
            <p className="val">{userData?.posts.length}</p>
            <p className="key">Posts</p>
          </div>
          <div className="stat center">
            <p className="val">{userData?.followers.length}</p>
            <p className="key">Followers</p>
          </div>
          <div className="stat">
            <p className="val">{userData?.following.length}</p>
            <p className="key">Following</p>
          </div>
        </div>
      </div>
      <div className="menu-items">
        <NavLink
          to={"/home/feed"}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? activeClass : "navlink"
          }
          onClick={() => {
            setIsExpanded(false);
            setToggle(true);
            setActiveClass("navlink active");
            setTab("");
          }}
        >
          Feed
        </NavLink>
        <NavLink
          to={"/home/explore"}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? activeClass : "navlink"
          }
          onClick={() => {
            setIsExpanded(false);
            setTab("");
            setToggle(true);
            setActiveClass("navlink active");
          }}
        >
          Explore
        </NavLink>
        <p
          // to={"/notifications"}
          className="navlink"
          style={{ color: tab == "notifications" ? "palevioletred" : "black" }}
          onClick={() => {
            setIsExpanded(true);
            setToggle(false);
            setTab("notifications");
            setActiveClass("navlink");
          }}
        >
          Notifications
        </p>
        <p
          // to={"/chat"}
          className="navlink"
          style={{ color: tab == "chat" ? "palevioletred" : "black" }}
          onClick={() => {
            setIsExpanded(true);
            setTab("chat");
            setActiveClass("navlink");
          }}
        >
          Messages
        </p>
        <NavLink to={"/home/stats"} className="navlink">
          Stats
        </NavLink>
        <NavLink to={"/home/settings"} className="navlink">
          Settings
        </NavLink>
        <div className="minimise" onClick={minimise}>
          <hr />
          <span>{!toggle ? <>{">"}</> : <>{"<"}</>}</span>
        </div>

        <p
          className="logout"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userid");
            window.location.href = "http://localhost:3000/";
          }}
        >
          Logout
        </p>
      </div>
    </div>
  );
}
