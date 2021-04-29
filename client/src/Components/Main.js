import "../style/Main.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { useSocket } from "../contexts/SocketProvider";
import { useChats } from "../contexts/ChatsProvider";
import { useSelect } from "../contexts/SelectProvider";
import { useUsers } from "../contexts/UsersProvider";

import React, { useEffect, useState } from "react";
import axios from "axios";

function Main() {
  const socket = useSocket();
  const [chats, setChats] = useChats();
  const [select] = useSelect();
  const [users, setUsers] = useUsers();
  const [chat, setChat] = useState();

  const username = JSON.parse(sessionStorage.getItem("userInfo")).UserName;
  useEffect(() => {
    //get users
    if (users.length === 0)
      axios.get("http://localhost:3001/users").then((resp) => {
        setUsers(resp.data);
      });
  }, [users]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/chats", { UserName: username })
      .then((resp) => {
        console.log(resp.data);
        setChats(resp.data);
      });
  }, []);

  useEffect(() => {
    if (socket == null) {
      return;
    }
    socket.emit("username", { UserName: username });
  }, [socket]);

  useEffect(() => {
    if (socket == null) {
      return;
    }

    socket.on("private", (newMessage) => {
      console.log("true");
      console.log(newMessage);
      console.log(username);

      chats.forEach((x, t) => {
        if (
          (x.UserA === newMessage.Sender && x.UserB === username) ||
          (x.UserA === username && x.UserB === newMessage.Sender)
        ) {
          console.log("true");
          let arr = [...chats];
          arr[t].Chat.push(newMessage);

          setChats(arr);
        }
      });
    });
    return () => {
      socket.off("private");
    };
  }, [socket, chats]);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default Main;
