import React from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
export default function Header() {
  return (
    <div>
      <header>
        <div className="input-container">
          {" "}
          <input type="text" placeholder="🔍 Search" className="search"></input>
        </div>

        <div className="actions">
          {" "}
          <NotificationsNoneIcon />
          <MailOutlineIcon />
          <button className="add"> + Add Photo</button>
        </div>
      </header>
    </div>
  );
}
