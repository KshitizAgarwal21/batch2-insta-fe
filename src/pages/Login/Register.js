import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [userData, setUserData] = useState({});
  const [media, setMedia] = useState();
  const navigate = useNavigate();
  const mediaData = new FormData();
  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleFileChange = (e) => {
    setMedia(e.target.files[0]);
  };
  const signup = async () => {
    //first upload the dp

    mediaData.append("file", media);
    const uploadresp = await axios.post(
      "https://api.bytescale.com/v2/accounts/W142iJA/uploads/form_data",
      mediaData,
      {
        headers: {
          Authorization: "Bearer public_W142iJA9nSM4wceThbziM953umKY",
        },
      }
    );
    const fileUrl = uploadresp.data.files[0].fileUrl;
    console.log(fileUrl);

    console.log(userData);
    //then submit rest data
    const res = await axios.post("http://localhost:8080/auth/register", {
      userData,
      dp_url: fileUrl,
    });

    console.log(res.data);

    if (res.status == 200 && res.data == "new user created successfully") {
      navigate("/login");
    }
  };
  return (
    <div className="register">
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
            placeholder="User Name"
            name="username"
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            type="email"
            className="custom-input"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            type="text"
            className="custom-input"
            placeholder="First Name"
            name="first_name"
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            type="text"
            className="custom-input"
            placeholder="Last Name"
            name="last_name"
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            type="text"
            className="custom-input"
            placeholder="Bio"
            name="bio"
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            type="file"
            className="custom-input"
            placeholder="Upload dp"
            name="username"
            onChange={(e) => handleFileChange(e)}
          ></input>
          <input
            type="password"
            className="custom-input"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          ></input>
          <button className="login" onClick={signup}>
            Sign Up
          </button>

          {/* <div className="breaker">
            <hr className="breaks"></hr>
            <p>OR</p>
            <hr className="breaks"></hr>
          </div>

          <p className="forgot">Forgot Password?</p> */}
        </div>
        {/* <div className="signup-container">
          Don't have an account?{" "}
          <span>
            <a href="#">Sign up</a>
          </span>
        </div> */}
        {/* <p style={{ textAlign: "center" }}>Get the app.</p> */}
        {/* <div className="badges">
          <img src={appstorebadge} className="badge"></img>
          <img src={playstorebadge} className="badge"></img>
        </div> */}
      </div>
    </div>
  );
}
