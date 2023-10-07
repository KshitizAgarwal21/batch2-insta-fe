import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/pngegg.png";
export default function Sidenav() {
  return (
    <div className="sidenav">
      <div className="logo">
        <img src={logo} />
      </div>

      <div className="personal-profile">
        <div className="story"></div>
        <h3 className="profilename">Kate Lingard</h3>
        <p className="profileid">@Klingard123</p>
        <div className="stats">
          <div className="stat">
            <p className="val">46</p>
            <p className="key">Posts</p>
          </div>
          <div className="stat center">
            <p className="val">2.8k</p>
            <p className="key">Followers</p>
          </div>
          <div className="stat">
            <p className="val">56</p>
            <p className="key">Following</p>
          </div>
        </div>
      </div>
      <div className="menu-items">
        <NavLink
          to={"/feed"}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "navlink active" : "navlink"
          }
        >
          Feed
        </NavLink>
        <NavLink to={"/feed"} className="navlink">
          Feed
        </NavLink>
        <NavLink to={"/feed"} className="navlink">
          Feed
        </NavLink>
        <NavLink to={"/feed"} className="navlink">
          Feed
        </NavLink>
        <NavLink to={"/feed"} className="navlink">
          Feed
        </NavLink>
      </div>
    </div>
  );
}
