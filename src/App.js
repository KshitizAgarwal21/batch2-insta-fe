import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { socket } from "./socket";
import ProtectedLayout from "./Components/ProtectedLayout/ProtectedLayout";
import axios from "axios";
import Home from "./pages/Login/Home/Home";
import Login from "./pages/Login/Login";
import Story from "./Components/Stories/Story";
import Welcome from "./Components/Welcome/Welcome";
import Explore from "./Components/Explore/Explore";
import Notifications from "./Components/Notifications/Notifications";
import { useState } from "react";
import ChatWindow from "./Components/Chat/ChatWindow";
import Follow from "./pages/Follow";

function App() {
  const [isHome, setIsHome] = useState(true);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
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
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    async function notify(msg) {
      if (msg.followReq == true) {
        const name = await getuserDetails(msg.whoWishedToFollow);
        setNotifications((prev) => [
          ...prev,
          name.first_name +
            " " +
            name.last_name +
            " " +
            "has requested to follow you",
        ]);
        // alert(
        //   name.first_name +
        //     " " +
        //     name.last_name +
        //     " has requested to follow you"
        // );
      } else if (msg.liked) {
        const name = await getuserDetails(msg.whoLiked);
        setNotifications((prev) => [
          ...prev,
          name.first_name + " " + name.last_name + " " + "has liked your post",
        ]);
      }
    }
    socket.on("notify", notify);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<ProtectedLayout />}>
            <Route
              path="/"
              element={
                <Home
                  isHome={isHome}
                  setIsHome={setIsHome}
                  notifications={notifications}
                />
              }
            >
              <Route path="/feed" element={<Welcome />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/chat/:id" element={<ChatWindow />} />
            </Route>
            <Route path="/notifications" element={<Home />} />
            <Route path="/chat" element={<Home />} />

            <Route path="/story/:id" element={<Story />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
