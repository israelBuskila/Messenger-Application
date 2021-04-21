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
  // const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [users] = useUsers();
  const [select] = useSelect(0);
  const [chats, setChats] = useChats([]);
  const [index, setIndex] = useState();

  const sender = JSON.parse(sessionStorage.getItem("userInfo")).UserName;

  useEffect(() => {
    chats.forEach((x, i) => {
      if (x.UserB === users[select].UserName) {
        setIndex(i);
        // console.log(users[select].UserName);
        // setChat(x.Chat);
        // console.log(x.Chat);
        // console.log(chat);
      }
    });
  }, [select, chats]);

  // useEffect(() => {
  //   if (socket == null) {
  //     return;
  //   }
  //   console.log("loop");
  //   socket.emit("username", { UserName: sender });
  //   socket.on(
  //     "private",
  //     ({ Sender, Message, Addressee, TimeStamp, SendOrReceive, Type }) => {
  //       setChat([
  //         ...chat,
  //         { Sender, Message, Addressee, TimeStamp, SendOrReceive, Type },
  //       ]);
  //     }
  //   );
  // }, [chat]);

  const username = () => {
    if (users.length > 0 && select !== undefined) {
      return <h3>{users[select].UserName}</h3>;
    }
  };

  const showChat = () => {
    if (chats && index) {
      return chats[index].Chat.map((message, index) => {
        return (
          <p key={index} className={message.SendOrReceive}>
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

    socket.emit("private", {
      Sender: sender,
      Message: input,
      Addressee: users[select].UserName,
      TimeStamp: time,
      SendOrReceive: "chat__message",
    });
    let arr = [...chats];

    arr[index].Chat.push(newMessage);

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
