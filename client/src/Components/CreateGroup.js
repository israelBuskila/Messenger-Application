import React, { useState } from "react";
import "../style/CreateGroup.css";
import { SearchOutlined } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import { useChats } from "../contexts/ChatsProvider";
import { useSelect } from "../contexts/SelectProvider";
import { useSocket } from "../contexts/SocketProvider";
import { useUsers } from "../contexts/UsersProvider";

import CreateGroupUsers from "./CreateGroupUsers";

function CreateGroup(props) {
  const sender = JSON.parse(sessionStorage.getItem("userInfo")).UserName;

  const [chats, setChats] = useChats();
  const [select, setSelect] = useSelect();
  const [members, setMembers] = useState([sender]);
  const [title, setTitle] = useState("");
  const [users, setUsers] = useUsers();

  const socket = useSocket();

  const storeMembers = (e) => {
    console.log(e.currentTarget.value);
    setMembers([...members, e.currentTarget.value]);
  };

  const onSubmit = (e) => {
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
    let newGroup = {
      Title: title,
      Admins: [sender],
      Members: members,
      Chat: [{ Message: sender + " added you", TimeStamp: time }],
      Type: "group",
    };
    console.log(newGroup);
    setChats([...chats, newGroup]);

    socket.emit("createGroup", newGroup);
    
    props.callback();
  };

  const createGroupUsers = () => {
    if (chats) {
      return chats.map((chat, index) => {
        if (
          chat.Type === "private messages" &&
          chat.UserA !== JSON.parse(sessionStorage.getItem("userInfo")).UserName
        ) {
          return (
            <button
              key={index}
              className="btn"
              value={chat.UserA}
              onClick={(e) => storeMembers(e)}
            >
              {" "}
              <CreateGroupUsers key={index} username={chat.UserA} />
            </button>
          );
        } else if (
          chat.Type === "private messages" &&
          chat.UserB !== JSON.parse(sessionStorage.getItem("userInfo")).UserName
        ) {
          return (
            <button
              key={index}
              className="btn"
              value={chat.UserB}
              onClick={(e) => storeMembers(e)}
            >
              {" "}
              <CreateGroupUsers key={index} username={chat.UserB} />
            </button>
          );
        }
      });
    }
  };
  return (
    <div className="createGroup">
      <div className="createGroup__header">
        <TextField
          label={"Type group subject here..."}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <p>Add group participants</p>
        <ArrowBackIcon onClick={() => props.callback()} />
        <Button variant="outlined" onClick={(e) => onSubmit(e)}>
          Create Group
        </Button>
      </div>

      <div className="createGroup__search">
        <div className="createGroup__searchContainer">
          <SearchOutlined />
          <input placeholder="type contact name" type="text" />
        </div>
      </div>
      <div className="createGroup__chats">{createGroupUsers()}</div>
    </div>
  );
}

export default CreateGroup;
