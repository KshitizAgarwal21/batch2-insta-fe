import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Header from "../../../Components/Header/Header";
import Sidenav from "../../../Components/Sidenav/Sidenav";
import Stories from "../../../Components/Stories/Stories";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/feed");
  }, []);
  return (
    <div style={{ display: "flex", background: "#efefef" }}>
      <div className="sidenav-container" id="dynamic-sidenav">
        <Sidenav />
      </div>
      <div className="main-area-container">
        <Header />
        <Stories />
        {/* <Feed /> */}
        <Outlet />
      </div>
    </div>
  );
}
