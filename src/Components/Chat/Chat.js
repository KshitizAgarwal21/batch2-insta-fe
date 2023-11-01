import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Chat(props) {
  const { isExpanded, setIsExpanded } = props.data;
  const [lastconvo, setLastconvo] = useState([]);
  const [conversation, setConversation] = useState([]);
  const getChat = async () => {
    const resp = await axios.get("http://localhost:8080/chat/chatlist", {
      headers: {
        Authorization: localStorage.getItem("userid"),
      },
    });
    const arr = resp.data;
    // const userids = resp.data.map(async (elem) => {

    //   return await axios.post("http://localhost:8080/auth/getuserDetails", {
    //     id: friend,
    //   });
    // });
    // Promise.all(userids).then((res) => {

    // });

    const sortedChats = resp.data.map((elem) => {
      return {
        _id: elem._id,
        content: elem.content.sort(
          (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
        ),
      };
    });
    console.log(sortedChats);
    const userData = sortedChats.map(async (elem) => {
      const lasttexted = elem.content[0].author_id;
      const getUser = await axios.post(
        "http://localhost:8080/auth/getuserDetails",
        { id: lasttexted },
        {
          headers: {
            Authorization: localStorage.getItem("userid"),
          },
        }
      );
      return getUser;
    });
    let finalArr = [];
    Promise.all(userData).then((resp) => {
      console.log(resp);
      sortedChats.forEach((item, key) =>
        finalArr.push({
          _id: item._id,
          lastMessage: item.content[0].message,
          author: resp[key].data.first_name,
        })
      );
      setConversation(finalArr);
    });

    // const finalArrItem = {
    //   _id:

    // }
    // const finalArr =
    // console.log(getUser);
  };

  useEffect(() => {
    getChat();
  }, []);
  return (
    <div>
      <h2>Chat</h2>
      <hr></hr>

      {conversation?.map((elem) => {
        return (
          <>
            <Link
              to={`/home/chat/${elem._id}`}
              onClick={() => setIsExpanded(false)}
            >
              <div className="recent-chat">
                {elem.author}: {elem.lastMessage}{" "}
              </div>
            </Link>
          </>
        );
      })}
    </div>
  );
}
