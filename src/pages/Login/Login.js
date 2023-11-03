import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img1 from "../../assets/screenshot1-2x.png";
import img2 from "../../assets/screenshot2-2x.png";
import img3 from "../../assets/screenshot3-2x.png";
import img4 from "../../assets/screenshot4-2x.png";
import playstorebadge from "../../assets/c5Rp7Ym-Klz.png";
import appstorebadge from "../../assets/Yfc020c87j0.png";
export default function Login() {
  const naviagte = useNavigate();
  const arr = [img1, img2, img3, img4];

  const [index, setIndex] = useState(0);
  const [liveimg, setLiveImg] = useState(arr[0]);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (localStorage.getItem("token")) {
      naviagte("/home");
    }
  }, []);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const login = async () => {
    const resp = await axios.post(
      "http://localhost:8080/auth/signin",
      formData
    );

    if (resp.status == 200) {
      localStorage.setItem("token", resp.data.token);
      naviagte("/home/feed");
    }
  };
  useEffect(() => {
    setInterval(() => {
      setIndex((prev) => {
        if (prev == arr.length - 1) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 2000);
  }, []);
  return (
    <div className="container">
      <div className="image-container">
        <img src={arr[index]} className="forward"></img>
        <div className="notch"></div>
      </div>
      <div className="forms-container">
        <div className="form-container">
          <img
            src="https://static.cdninstagram.com/rsrc.php/v3/yK/r/ATdtiLb2BQ9.png"
            height={200}
            width={200}
          ></img>
          <input
            type="text"
            className="custom-input"
            placeholder="Phone or Email"
            name="username"
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            type="password"
            className="custom-input"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          ></input>
          <button className="login" onClick={login}>
            Log in
          </button>

          <div className="breaker">
            <hr className="breaks"></hr>
            <p>OR</p>
            <hr className="breaks"></hr>
          </div>

          <p
            className="forgot"
            onClick={() => {
              naviagte("/reset");
            }}
          >
            Forgot Password?
          </p>
        </div>
        <div className="signup-container">
          Don't have an account?{" "}
          <span>
            <a href="http://localhost:3000/register">Sign up</a>
          </span>
        </div>
        <p style={{ textAlign: "center" }}>Get the app.</p>
        <div className="badges">
          <img src={appstorebadge} className="badge"></img>
          <img src={playstorebadge} className="badge"></img>
        </div>
      </div>
    </div>
  );
}
