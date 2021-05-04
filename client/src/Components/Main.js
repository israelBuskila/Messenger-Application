import "../style/Main.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import CreateGroup from "./CreateGroup";
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
  const [sideBar, setSideBar] = useState("chat");

  const username = JSON.parse(sessionStorage.getItem("userInfo")).UserName;
  useEffect(() => {
    //get users
    if (users.length === 0)
      axios
        .post("http://localhost:3001/getUser", { UserName: username })
        .then((resp) => {
          console.log(resp);
          setUsers(resp.data[0]);
        });
  }, [users]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/chats", { UserName: username })
      .then((resp) => {
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
    socket.on("groupMessage", (newMessage) => {
      chats.forEach((c, i) => {
        if (c._id === newMessage.ID) {
          let temp = [...chats];
          temp[i].Chat.push(newMessage);

          setChats(temp);
        }
      });
    });

    return () => {
      socket.off("groupMessage");
    };
  }, [socket, chats]);

  useEffect(() => {
    if (socket == null) {
      return;
    }

    socket.on("private", (newMessage) => {
      chats.forEach((x, t) => {
        if (
          (x.UserA === newMessage.Sender && x.UserB === username) ||
          (x.UserA === username && x.UserB === newMessage.Sender)
        ) {
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
        {sideBar === "chat" && (
          <Sidebar callback={() => setSideBar("createGroup")} />
        )}
        {sideBar === "createGroup" && (
          <CreateGroup callback={() => setSideBar("chat")} />
        )}
        <Chat />
      </div>
    </div>
  );
}

export default Main;
