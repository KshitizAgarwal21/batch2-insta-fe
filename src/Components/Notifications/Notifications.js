import axios from "axios";
import React, { useEffect, useState } from "react";
import { socket } from "../../socket";

export default function Notifications(props) {
  // const [notifications, setNotifications] = useState([
  //   "1 person liked your post",
  //   "2 person shared your reel",
  //   3,
  //   45,
  //   6,
  //   67,
  //   6,
  // ]);

  const acceptfollow = async (id) => {
    //socket event will be triggered

    socket?.emit("follow-accept", {
      user: localStorage.getItem("userid"),
      id: id,
    });
    // const resp = await axios.post(
    //   "http://localhost:8080/connections/acceptfollow",
    //   { id: id },
    //   {
    //     headers: {
    //       Authorization: localStorage.getItem("userid"),
    //     },
    //   }
    // );
    // console.log(resp.data);
  };
  console.log(props.notifications);
  return (
    <div className="nots">
      <h2>Notifications</h2>
      <hr></hr>
      <ul className="not-ul">
        {props.notifications?.map((elem) => {
          return (
            <>
              <li className="not-items">{elem.msg}</li>
              {elem.followReq && (
                <>
                  <button
                    className="accept"
                    onClick={() => acceptfollow(elem.user)}
                  >
                    Accept
                  </button>

                  <button className="ignore">Ignore</button>
                </>
              )}
            </>
          );
        })}
      </ul>
    </div>
  );
}
