import "../style/Main.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { useChats } from "../contexts/ChatsProvider";
import { useSelect } from "../contexts/SelectProvider";
import { useUsers } from "../contexts/UsersProvider";

import React, { useEffect, useState } from "react";
import axios from "axios";

function Main() {
  const [chats, setChats] = useChats();
  const [select] = useSelect();
  const [users] = useUsers();
  const [chat, setChat] = useState([]);

  const username = JSON.parse(sessionStorage.getItem("userInfo")).UserName;

  useEffect(() => {
    axios
      .post("http://localhost:3001/chats", { UserName: username })
      .then((resp) => {console.log(resp.data)
        setChats(resp.data);
      });

  }, []);

  

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat  />
      </div>
    </div>
  );
}

export default Main;
