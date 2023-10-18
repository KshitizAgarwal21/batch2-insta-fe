import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dp from "../../assets/user.jpeg";
export default function ChatWindow() {
  const [conversation, setConversation] = useState([]);
  const [conversation_details, setConversationDetails] = useState({});
  const [friend, setFriend] = useState({});
  const { id } = useParams();

  const getConversation = async () => {
    const resp = await axios.post(
      "http://localhost:8080/chat/convo",
      { conversation_id: id },
      {
        headers: {
          Authorization: "652812f0bf41d828c0b78c60",
        },
      }
    );
    setConversationDetails(resp.data);
    setConversation(resp.data.content);

    const friend =
      resp.data.participants.participant1 == "652812f0bf41d828c0b78c60"
        ? resp.data.participants.participant2
        : resp.data.participants.participant1;

    const getUser = await axios.post(
      "http://localhost:8080/auth/getuserDetails",
      { id: friend },
      {
        headers: {
          Authorization: "652812f0bf41d828c0b78c60",
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
  console.log(conversation);
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
              {elem.author_id == "652812f0bf41d828c0b78c60" ? (
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
        <input type="text"></input>
        <button>Send</button>
      </div>
    </div>
  );
}
