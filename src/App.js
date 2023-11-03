import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProtectedLayout from "./Components/ProtectedLayout/ProtectedLayout";

import Home from "./pages/Login/Home/Home";
import Login from "./pages/Login/Login";
import Story from "./Components/Stories/Story";
import Welcome from "./Components/Welcome/Welcome";
import Explore from "./Components/Explore/Explore";

import { useState } from "react";
import ChatWindow from "./Components/Chat/ChatWindow";

import AddPost from "./Components/AddPost";
import Register from "./pages/Login/Register";
import ForgotPassword from "./pages/Login/ForgotPassword";
import UserProfile from "./Components/UserProfile/UserProfile";

function App() {
  const [isHome, setIsHome] = useState(true);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/reset" element={<ForgotPassword />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<ProtectedLayout />}>
            <Route
              path="/"
              element={<Home isHome={isHome} setIsHome={setIsHome} />}
            >
              <Route path="/home/feed" element={<Welcome />} />
              <Route path="/home/explore" element={<Explore />} />
              <Route path="/home/chat/:id" element={<ChatWindow />} />
              <Route path="/home/stats/" element={<UserProfile />} />
            </Route>
            <Route path="/notifications" element={<Home />} />
            <Route path="/chat" element={<Home />} />

            <Route path="/story/:id" element={<Story />} />
            <Route path="/addpost/" element={<AddPost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
