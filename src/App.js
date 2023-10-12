import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedLayout from "./Components/ProtectedLayout/ProtectedLayout";
import Home from "./pages/Login/Home/Home";
import Login from "./pages/Login/Login";
import Story from "./Components/Stories/Story";
import Welcome from "./Components/Welcome/Welcome";
import Explore from "./Components/Explore/Explore";
import Notifications from "./Components/Notifications/Notifications";
import { useState } from "react";
import ChatWindow from "./Components/Chat/ChatWindow";

function App() {
  const [isHome, setIsHome] = useState(true);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<ProtectedLayout />}>
            <Route
              path="/"
              element={<Home isHome={isHome} setIsHome={setIsHome} />}
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
