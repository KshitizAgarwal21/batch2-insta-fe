import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [phone, setPhone] = useState();
  const [typeauth, settypeAuth] = useState("phone");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const naviagte = useNavigate();
  const deactivate = async () => {
    const resp = await axios.post(
      "http://localhost:8080/auth/deactivate",
      {},
      {
        headers: {
          Authorization: localStorage.getItem("userid"),
        },
      }
    );

    alert(resp.data);
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    naviagte("/login");
  };
  const getuserDetails = async (id) => {
    const getUser = await axios.post(
      "http://localhost:8080/auth/getUserProfile",
      { id: id },
      {
        headers: {
          Authorization: localStorage.getItem("userid"),
        },
      }
    );
    console.log(getUser.data.profile);
    setUser(getUser.data.profile);
    setPosts(getUser.data.posts);
    setFollowers(getUser.data.followers);
    setFollowing(getUser.data.following);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setPhone(e.target.value);
  };

  const verify = async () => {
    const resp = await axios.post(
      "http://localhost:8080/auth/verifyphone",
      { phone: phone },
      {
        headers: {
          Authorization: "RamaKrishna@gmail.com",
        },
      }
    );

    if (resp.status == 200) {
      settypeAuth("otp");
    }
  };
  const verifyotp = async () => {
    const resp = await axios.post(
      "http://localhost:8080/auth/validateotp",
      { otp: phone, email: "RamaKrishna@gmail.com" },
      {
        headers: {
          Authorization: "RamaKrishna@gmail.com",
        },
      }
    );

    if (resp.status == 200) {
      console.log(resp.data);
    }
  };
  const unfollow = async (id) => {
    console.log(id);

    //call an api with the above id

    const obj = {
      whoisbeingunfollowed: id,
    };

    const resp = await axios.post(
      "http://localhost:8080/connections/unfollow",
      obj,
      {
        headers: {
          Authorization: localStorage.getItem("userid"),
        },
      }
    );
    alert(resp.data);
  };
  useEffect(() => {
    getuserDetails(localStorage.getItem("userid"));
  }, []);

  return (
    <div>
      <div className="user-details">
        <img src={user?.dp_url} height="200" width="200"></img>
        <p>First Name: {user?.first_name}</p>
        <p>Last Name: {user?.last_name}</p>
        <p>Bio: {user?.bio}</p>
        <p>Posts: {posts?.length}</p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="follower-list">
          <h2>Followers</h2>
          {followers?.map((elem) => {
            return (
              <>
                <p>{elem}</p>
              </>
            );
          })}
        </div>
        <div className="following-list">
          <h2>Following</h2>
          {following?.map((elem) => {
            return (
              <>
                <p>
                  {elem}{" "}
                  <span className="unfollow" onClick={() => unfollow(elem)}>
                    Unfollow
                  </span>
                </p>
              </>
            );
          })}
        </div>
      </div>

      <div
        className="phone-auth"
        style={{ display: typeauth == "phone" ? "block" : "none" }}
      >
        Phone no. <input type="text" onChange={(e) => handleChange(e)}></input>
        <button onClick={verify}>Verify</button>
      </div>
      <div
        className="otp-auth"
        style={{ display: typeauth == "otp" ? "block" : "none" }}
      >
        Enter OTP. <input type="text" onChange={(e) => handleChange(e)}></input>
        <button onClick={verifyotp}>Verify</button>
      </div>

      <button onClick={deactivate}>Deactivate account</button>
    </div>
  );
}
