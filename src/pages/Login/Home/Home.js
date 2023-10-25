// import { Notifications } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Notifications from "../../../Components/Notifications/Notifications";
import Header from "../../../Components/Header/Header";
import Sidenav from "../../../Components/Sidenav/Sidenav";
import Stories from "../../../Components/Stories/Stories";
import { Route, Routes } from "react-router-dom";
import Chat from "../../../Components/Chat/Chat";
export default function Home(props) {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [tab, setTab] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/feed");
  }, []);

  return (
    <div style={{ display: "flex", background: "#efefef" }}>
      <div className="sidenav-container" id="dynamic-sidenav">
        <Sidenav data={{ isExpanded, setIsExpanded, tab, setTab }} />
        <div
          className="dynamic-container"
          style={{ width: isExpanded ? "380px" : "0" }}
        >
          {tab == "notifications" && (
            <>
              <Notifications notifications={props.notifications} />
            </>
          )}
          {tab == "chat" && (
            <>
              <Chat data={{ isExpanded, setIsExpanded }} />
            </>
          )}
          {/* <Notifications /> */}
        </div>
      </div>
      <div className="main-area-container">
        {/* <Feed /> */}
        <Outlet />
      </div>
    </div>
  );
}
