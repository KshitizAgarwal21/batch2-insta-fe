import React, { useEffect, useState } from "react";

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

  return (
    <div className="nots">
      <h2>Notifications</h2>
      <hr></hr>
      <ul className="not-ul">
        {props.notifications?.map((elem) => {
          return (
            <>
              <li className="not-items">{elem}</li>
            </>
          );
        })}
      </ul>
    </div>
  );
}
