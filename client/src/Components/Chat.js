import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import InsertEmotconIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import React, { useState, useEffect } from "react";

import "../style/Chat.css";
import style from "styled-components";
import { useSocket } from "../contexts/SocketProvider";
import { useUsers } from "../contexts/UsersProvider";
import { useSelect } from "../contexts/SelectProvider";
import { useChats } from "../contexts/ChatsProvider";

const Chat = () => {
  const socket = useSocket();
  const [input, setInput] = useState("");
  const [users, setUsers] = useUsers();
  const [select, setSelect] = useSelect();
  const [chats, setChats] = useChats([]);
  const [addressee, setAddressee] = useState();
  const [display, setDisplay] = useState(false);

  const sender = JSON.parse(sessionStorage.getItem("userInfo")).UserName;

  useEffect(() => {
    if (chats.length > 0 && select !== undefined) {
      if (
        chats[select].Type === "private messages" &&
        chats[select].UserA != sender
      )
        setAddressee(chats[select].UserA);
      else if (
        chats[select].Type === "private messages" &&
        chats[select].UserB != sender
      ) {
        setAddressee(chats[select].UserB);
      } else if (chats[select].Type === "group") {
        setAddressee(chats[select].Title);
      }
    }
  }, [select]);

  const username = () => {
    if (addressee) {
      return <h3>{addressee}</h3>;
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

    let arr = [...chats];
    if (chats[select].Type === "private messages") {
      let newMessage = {
        Sender: sender,
        Message: input,
        Addressee: addressee,
        TimeStamp: time,
      };

      arr[select].Chat.push(newMessage);

      socket.emit("private", newMessage);
    } else if (chats[select].Type === "group") {
      let newMessage = {
        Sender: sender,
        Message: input,
        Addressee: addressee,
        TimeStamp: time,
        ID: chats[select]._id,
      };

      arr[select].Chat.push(newMessage);
      socket.emit("groupMessage", newMessage);
    }
    setChats(arr);
    setInput("");
  };

  //This function is activated after pressing the blocked / unblocked button and blocks the user.
  const blockUser = () => {
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
    let arr = [...chats];
    let blockUser = {
      Sender: sender,
      Message: "Now you can not chat with each other due to user blocking",
      Addressee: addressee,
      TimeStamp: time,
    };
    // arr[select].Chat.push(blockUser);
    // socket.emit("private", blockUser);

    socket.emit("blockUser", blockUser);
  };

  //This function is activated after clicking the Group Exit button and removes the user's subscription from this group
  const exitGroup = (e) => {
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
      Message: sender + " has left the group",
      Addressee: addressee,
      TimeStamp: time,
      ID: chats[select]._id,
    };
    socket.emit("groupMessage", newMessage);
    let temp = [...chats];
    temp.splice(select, 1);
    // temp[select].Members = temp[select].Members.filter((m) => m !== sender);
    // temp[select].Admins = temp[select].Admins.filter((a) => a !== sender);
    setSelect(0);
    setChats(temp);

    let groupInfo = {
      UserName: sender,
      ID: chats[select]._id,
    };
    console.log(groupInfo);
    socket.emit("exitGroup", groupInfo);
  };

  //This function checks whether it is a group chat or a private chat
  //and displays the appropriate wording for options
  const option = () => {
    if (chats[select].Type === "private messages") {
      return <MyElmenet onClick={(e) => blockUser()}>block/unblock</MyElmenet>;
    } else if (chats[select].Type === "group") {
      return <MyElmenet onClick={(e) => exitGroup(e)}>Exit group</MyElmenet>;
    }
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
          <IconButton onClick={() => setDisplay(!display)}>
            {display ? (
              <Options>
                {" "}
                {option()}
                <MyElmenet>Contact Info</MyElmenet>{" "}
                <MyElmenet>Mute notification</MyElmenet>{" "}
                <MyElmenet>Clear messages</MyElmenet>{" "}
                <MyElmenet>Delete chate</MyElmenet>{" "}
              </Options>
            ) : null}
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

const Options = style.div`
  min-width:10rem;
  min-height :15rem;
  background-color: #ededed;
  position: absolute;
  z-index:1;
  top:2.5rem;
  right:1rem;
  padding: 9px 0;
  background-color: #ffffff;
  border-radius: 3px;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,.26),0 2px 10px 0 rgba(0,0,0,.16);
  font-family:"Segoe UI", "Helvetica Neue", Helvetica, "Lucida Grande", Arial, Ubuntu, Cantarell, "Fira Sans", sans-serif;
  font-size:14.5px;
  color:#4a4a4a;
  display:flex;
  flex-flow:column wrap;
  justify-content:flex-start;
`;

const MyElmenet = style.p`
  display:flex;
  margin-left:1rem; 
`;
