import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import InsertEmotconIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import React, { useState, useEffect } from "react";

import "../style/Chat.css";
import { useSocket } from "../contexts/SocketProvider";
import { useUsers } from "../contexts/UsersProvider";
import { useSelect } from "../contexts/SelectProvider";
import { useChats } from "../contexts/ChatsProvider";

const Chat = () => {
  const socket = useSocket();
  const [input, setInput] = useState("");
  const [users, setUsers] = useUsers();
  const [select] = useSelect();
  const [chats, setChats] = useChats([]);
  const [addresse, setAddresse] = useState();

  const sender = JSON.parse(sessionStorage.getItem("userInfo")).UserName;

  useEffect(() => {
    console.log(chats);
    if (chats.length > 0 && select !== undefined) {
      if (chats[select].UserA != sender) setAddresse(chats[select].UserA);
      else if (chats[select].UserB != sender) {
        setAddresse(chats[select].UserB);
      }
    }
  }, [select]);

  const username = () => {
    if (addresse) {
      return <h3>{addresse}</h3>;
    }
  };

  const showChat = () => {
    let chatName;
    if (chats.length > 0 && select !== undefined) {
      return chats[select].Chat.map((message, i) => {
        if (message.Sender === sender) {
          chatName = "chat__message chat__reciver";
        } else chatName = "chat__message";
        return (
          <p key={i} className={chatName}>
            <span className="chat__name">{message.Sender}</span>

            {message.Message}
            <span className="chat__timestamp">{message.TimeStamp}</span>
          </p>
        );
      });
    }
  };

  const sendMesage = (e) => {
    e.preventDefault();
    var t = new Date();
    var time =
      t.getDate() +
      "/" +
      (t.getMonth() + 1) +
      "/" +
      t.getFullYear() +
      "  " +
      t.getHours() +
      ":" +
      t.getMinutes();

    let newMessage = {
      Sender: sender,
      Message: input,
      Addressee: addresse,
      TimeStamp: time,
    };

    socket.emit("private", newMessage);

    let arr = [...chats];

    arr[select].Chat.push(newMessage);

    setChats(arr);
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          {username()}
          <p>Last seen at..</p>
        </div>

        <div className="chat__headersRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">{showChat()}</div>

      <div className="chat__footer">
        <InsertEmotconIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMesage} type="submit">
            Send a Message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
