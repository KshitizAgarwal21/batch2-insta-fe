import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dp from "../../assets/user.jpeg";
import { socket } from "../../socket";
export default function ChatWindow() {
  const [conversation, setConversation] = useState([]);
  const [conversation_details, setConversationDetails] = useState({});
  const [friend, setFriend] = useState({});
  const [recipient, setRecipient] = useState();
  const { id } = useParams();
  const [msg, setMsg] = useState();
  const createMessage = (e) => {
    setMsg(e.target.value);
  };

  const sendMsg = () => {
    socket?.emit("chat", {
      conversation_id: id,
      author_id: self,
      recipient_id: recipient,
      message: msg,
    });
    setConversation((prev) => [...prev, { author_id: self, message: msg }]);
  };
  const self = localStorage.getItem("userid");
  const getConversation = async () => {
    const resp = await axios.post(
      "http://localhost:8080/chat/convo",
      { conversation_id: id },
      {
        headers: {
          Authorization: localStorage.getItem("userid"),
        },
      }
    );
    setConversationDetails(resp.data);
    setConversation(resp.data.content);

    const friendid =
      resp.data.participants.participant1 == self
        ? resp.data.participants.participant2
        : resp.data.participants.participant1;
    setRecipient(friendid);
    const getUser = await axios.post(
      "http://localhost:8080/auth/getuserDetails",
      { id: friendid },
      {
        headers: {
          Authorization: localStorage.getItem("userid"),
        },
      }
    );

    if (getUser.status == 200) {
      setFriend(getUser.data);
    }
  };

  useEffect(() => {
    getConversation();
  }, [id]);
  useEffect(() => {
    socket?.on("newchat", (msg) => {
      console.log(msg);
      setConversation((prev) => [...prev, msg]);
    });
  }, []);
  return (
    <div>
      <div className="chat-header">
        <img src={dp} /> &nbsp;
        <p>
          {friend?.first_name} {friend?.last_name}
        </p>
      </div>

      <div className="chat-body">
        {conversation?.map((elem) => {
          return (
            <>
              {elem.author_id == self ? (
                <div className="outgoing">
                  <span>{elem.message}</span>
                </div>
              ) : (
                <div className="incoming">
                  <span>{elem.message}</span>
                </div>
              )}
            </>
          );
        })}
      </div>
      <div className="chat-actions">
        <input type="text" onChange={(e) => createMessage(e)}></input>
        <button onClick={sendMsg}>Send</button>
      </div>
    </div>
  );
}
