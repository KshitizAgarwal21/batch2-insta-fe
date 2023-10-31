import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const naviagte = useNavigate();
  const [steps, setSteps] = useState(0);
  const [email, setEmail] = useState();
  const [temp, setTemp] = useState();
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const reset = async () => {
    const resp = await axios.post("http://localhost:8080/auth/generateotp", {
      email: email,
    });

    if (resp.status == 200 && resp.data.msg == "otp sent successfully") {
      console.log(resp.data.otp);
      setTemp(resp.data.email);
      setSteps((prev) => ++prev);
    }
  };

  const validateotp = async () => {
    const resp = await axios.post("http://localhost:8080/auth/validateotp", {
      email: temp,
      otp: email,
    });

    if (resp.status == 200 && resp.data == "otp validated") {
      setSteps((prev) => ++prev);
    }
  };
  const resetpass = async () => {
    const resp = await axios.post("http://localhost:8080/auth/resetpass", {
      email: temp,
      password: email,
    });

    if (resp.status == 200 && resp.data == "password changed successfully") {
      alert("changed successfully");
      naviagte("/login");
    }
  };
  return (
    <div className="register">
      <div className="forms-container">
        <div className="form-container">
          {steps == 0 && (
            <>
              {" "}
              <img
                src="https://static.cdninstagram.com/rsrc.php/v3/yK/r/ATdtiLb2BQ9.png"
                height={200}
                width={200}
              ></img>
              <input
                type="text"
                className="custom-input"
                placeholder="Phone or Email"
                name="email"
                onChange={(e) => handleChange(e)}
              ></input>
              <button className="login" onClick={reset}>
                Get OTP
              </button>
            </>
          )}

          {steps == 1 && (
            <>
              <input
                type="text"
                className="custom-input"
                placeholder="OTP recieved in mail"
                name="otp"
                onChange={(e) => handleChange(e)}
              ></input>
              <button className="login" onClick={validateotp}>
                Submit OTP
              </button>
            </>
          )}

          {steps == 2 && (
            <>
              <input
                type="password"
                className="custom-input"
                placeholder="Password"
                name="pass"
                onChange={(e) => handleChange(e)}
              ></input>
              <input
                type="password"
                className="custom-input"
                placeholder="Re-enter Password"
                name="cpass"
                onChange={(e) => handleChange(e)}
              ></input>
              <button className="login" onClick={resetpass}>
                Reset Password
              </button>
            </>
          )}
        </div>

        <div className="signup-container">
          Don't have an account?{" "}
          <span>
            <a href="#">Sign up</a>
          </span>
        </div>
      </div>
    </div>
  );
}
