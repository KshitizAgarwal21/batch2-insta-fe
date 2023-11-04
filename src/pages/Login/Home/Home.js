// import { Notifications } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Notifications from "../../../Components/Notifications/Notifications";
import axios from "axios";
import Sidenav from "../../../Components/Sidenav/Sidenav";

import { socket } from "../../../socket";
import Chat from "../../../Components/Chat/Chat";
export default function Home(props) {
  const location = useLocation();
  const [isConnected, setIsConnected] = useState();
  const [fooEvents, setFooEvents] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [tab, setTab] = useState("");
  const [refresh, setRefresh] = useState(true);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  async function getuserDetails(id) {
    const getUser = await axios.post(
      "http://localhost:8080/auth/getuserDetails",
      { id: id },
      {
        headers: {
          Authorization: localStorage.getItem("userid"),
        },
      }
    );
    return getUser.data;
  }
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      navigate("/home/feed");
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      function onConnect() {
        setIsConnected(true);
      }

      function onDisconnect() {
        setIsConnected(false);
      }

      function onFooEvent(value) {
        setFooEvents((previous) => [...previous, value]);
      }
      async function alertops(msg) {
        alert(msg);

        if (msg == "follow request accepted" || msg == "new follower added") {
          const resp = await axios.post(
            "http://localhost:8080/auth/refresh",
            {},
            {
              headers: { Authorization: localStorage.getItem("userid") },
            }
          );
          localStorage.removeItem("token");
          localStorage.setItem("token", resp.data);
          setRefresh((prev) => !prev);
        }
      }
      async function notify(msg) {
        if (msg.followReq == true) {
          const name = await getuserDetails(msg.whoWishedToFollow);
          setNotifications((prev) => [
            ...prev,
            {
              followReq: true,
              user: msg.whoWishedToFollow,
              msg:
                name.first_name +
                " " +
                name.last_name +
                " " +
                "has requested to follow you",
            },
          ]);
          // alert(
          //   name.first_name +
          //     " " +
          //     name.last_name +
          //     " has requested to follow you"
          // );
        } else if (msg.liked) {
          const name = await getuserDetails(msg.whoLiked);
          console.log(name);
          setNotifications((prev) => [
            ...prev,
            {
              like: true,
              user: msg.whoLiked,
              msg:
                name.first_name +
                " " +
                name.last_name +
                " " +
                "has liked your post",
            },
          ]);
        }
      }
      socket?.on("success-follow", alertops);
      socket?.on("notify", notify);
      socket?.on("connect", onConnect);
      socket?.on("disconnect", onDisconnect);
      socket?.on("foo", onFooEvent);

      return () => {
        socket?.off("connect", onConnect);
        socket?.off("disconnect", onDisconnect);
        socket?.off("foo", onFooEvent);
      };
    }
  }, []);
  return (
    <div style={{ display: "flex", background: "#efefef" }}>
      <div className="sidenav-container" id="dynamic-sidenav">
        {localStorage.getItem("token")} &&{" "}
        <Sidenav data={{ isExpanded, setIsExpanded, tab, setTab, refresh }} />
        <div
          className="dynamic-container"
          style={{ width: isExpanded ? "380px" : "0" }}
        >
          {tab == "notifications" && (
            <>
              <Notifications notifications={notifications} />
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
