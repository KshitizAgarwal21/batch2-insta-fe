import React from "react";
import Feed from "../../../Components/Feed/Feed";
import Header from "../../../Components/Header/Header";
import Sidenav from "../../../Components/Sidenav/Sidenav";
import Stories from "../../../Components/Stories/Stories";
import Welcome from "../../../Components/Welcome/Welcome";

export default function Home() {
  return (
    <div style={{ display: "flex", background: "#efefef" }}>
      <div className="sidenav-container">
        <Sidenav />
      </div>
      <div className="main-area-container">
        <Header />
        <Stories />
        {/* <Feed /> */}
        <Welcome />
      </div>
    </div>
  );
}
