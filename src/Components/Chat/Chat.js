import React from "react";
import { Link } from "react-router-dom";
export default function Chat(props) {
  const { isExpanded, setIsExpanded } = props.data;
  return (
    <div>
      <h2>Chat</h2>
      <hr></hr>
      <Link to="/chat/:id" onClick={() => setIsExpanded(false)}>
        <div className="recent-chat">Person name: Hello </div>
      </Link>

      <div className="recent-chat">Person name: Hello </div>
      <div className="recent-chat">Person name: Hello </div>
      <div className="recent-chat">Person name: Hello </div>
      <div className="recent-chat">Person name: Hello </div>
    </div>
  );
}
