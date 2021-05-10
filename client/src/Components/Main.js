import "../style/Main.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import CreateGroup from "./CreateGroup";
import { useHistory } from "react-router-dom";
import { useSocket } from "../contexts/SocketProvider";
import { useChats } from "../contexts/ChatsProvider";

import authService from "../services/authService";

import React, { useEffect, useState } from "react";
import axios from "axios";
import PreSelect from "./PreSelect";

function Main() {
  let history = useHistory();
  const socket = useSocket();
  const [chats, setChats] = useChats();
  const [screenChat, setScreenChat] = useState("preChat");

  const [sideBar, setSideBar] = useState("chat");
  const username = sessionStorage["userInfo"];
  console.log(username);

  useEffect(() => {
    let token = authService.getToken();
    if (token == null) return history.push("/");
    axios
      .post(
        "http://localhost:3001/chats",
        { UserName: username },
        { headers: { "x-access-token": token } }
      )
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
          temp.sort(function (a, b) {
            return (
              new Date(b.Chat.slice(-1)[0].TimeStamp) -
              new Date(a.Chat.slice(-1)[0].TimeStamp)
            );
          });
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
      console.log(newMessage);
      chats.forEach((x, t) => {
        if (
          (x.UserA === newMessage.Sender && x.UserB === username) ||
          (x.UserA === username && x.UserB === newMessage.Sender)
        ) {
          console.log(newMessage);
          let arr = [...chats];
          arr[t].Chat.push(newMessage);
          console.log(arr[t].Chat.slice(-1)[0].TimeStamp);
          arr.sort(function (a, b) {
            return (
              new Date(b.Chat.slice(-1)[0].TimeStamp) -
              new Date(a.Chat.slice(-1)[0].TimeStamp)
            );
          });
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
          <Sidebar
            callback={() => setSideBar("createGroup")}
            callChat={() => setScreenChat("chat")}
          />
        )}
        {sideBar === "createGroup" && (
          <CreateGroup callback={() => setSideBar("chat")} />
        )}

        {screenChat == "chat" && <Chat />}
        {screenChat == "preChat" && <PreSelect />}
        {/* <Chat callback={() => setScreenChat("screenChat")}/> */}
      </div>
    </div>
  );
}

export default Main;
