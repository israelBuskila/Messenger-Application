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
  const [users] = useUsers();
  const [select] = useSelect();
  const [chats, setChats] = useChats([]);
  const [index, setIndex] = useState();

  const sender = JSON.parse(sessionStorage.getItem("userInfo")).UserName;

  useEffect(() => {
    chats.forEach((x, i) => {
      if (
        (x.UserA === users[select].UserName ||
        x.UserB === users[select].UserName) && (x.UserA === sender ||
          x.UserB === sender)
      ) {
       
         setIndex(i);
      }
      console.log("index: "+ index)
    });
  }, [select]);

  useEffect(() => {
    if (socket == null) {
      return;
    }
    socket.emit("username", { UserName: sender });

    socket.on("private", (newMessage) => {
      let arr = chats;
      console.log(arr[index].Chat);

     arr[index].Chat.push(newMessage);
       setChats(arr);
    });
  }, [chats]);

  const username = () => {
    if (users.length > 0 && select !== undefined) {
      return <h3>{users[select].UserName}</h3>;
    }
  };

  const showChat = () => {
    if (chats && index !== undefined) {
      return chats[index].Chat.map((message, i) => {
        return (
          <p key={i} className={message.SendOrReceive}>
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
      Addressee: users[select].UserName,
      TimeStamp: time,
      SendOrReceive: "chat__message chat__reciver",
    };

    socket.emit("private", newMessage);
    let arr = chats[index].Chat

    // arr[index].Chat.push(newMessage);
    arr.push(newMessage);

    // setChats(arr);
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
      <div className="chat__body">
        {showChat()}

        {/* <p className="chat__message">
          <span className="chat__name">Sonny</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>

        <p className="chat__message chat__reciver">
          <span className="chat__name">Sonny</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p> */}
      </div>

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
