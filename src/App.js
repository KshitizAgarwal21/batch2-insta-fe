import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedLayout from "./Components/ProtectedLayout/ProtectedLayout";
import Home from "./pages/Login/Home/Home";
import Login from "./pages/Login/Login";
import Story from "./Components/Stories/Story";
import Welcome from "./Components/Welcome/Welcome";
import Explore from "./Components/Explore/Explore";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<ProtectedLayout />}>
            <Route path="/" element={<Home />}>
              <Route path="/feed" element={<Welcome />} />
              <Route path="/explore" element={<Explore />} />
            </Route>
            <Route path="/story/:id" element={<Story />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
