import React from "react";
import Feed from "../../../Components/Feed/Feed";
import Header from "../../../Components/Header/Header";
import Stories from "../../../Components/Stories/Stories";
import Welcome from "../../../Components/Welcome/Welcome";

export default function Home() {
  return (
    <div style={{ display: "flex", background: "#efefef" }}>
      <div className="sidenav-container">sidenav</div>
      <div className="main-area-container">
        <Header />
        <Stories />
        {/* <Feed /> */}
        <Welcome />
      </div>
    </div>
  );
}
