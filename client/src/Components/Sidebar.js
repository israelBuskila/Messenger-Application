import React, { useRef, useState } from "react";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton, styled } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "../style/Sidebar.css";
import { ChangeHistory, ChatTwoTone, SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";

import { useUsers } from "../contexts/UsersProvider";
import { useSelect } from "../contexts/SelectProvider";
import { useSocket } from "../contexts/SocketProvider";
import { useChats } from "../contexts/ChatsProvider";
import style from "styled-components";

function Sidebar(props) {
  const [select, setSelect] = useSelect();
  const [users, setUsers] = useUsers();
  const [display, setDisplay] = useState(false);
  const [chats, setChats] = useChats();
  const socket = useSocket();

  const sender = JSON.parse(sessionStorage.getItem("userInfo")).UserName;

  const createGroup = () => {
    props.callback();
  };
  const sideBarChat = () => {
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
              onClick={() => {
                setSelect(index);
              }}
            >
              {" "}
              <SidebarChat
                key={index}
                username={chat.UserA}
                lastMessage={chat.Chat[0].Message}
              />
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
              onClick={() => {
                setSelect(index);
              }}
            >
              {" "}
              <SidebarChat
                key={index}
                username={chat.UserB}
                lastMessage={chat.Chat[0].Message}
              />
            </button>
          );
        } else if (chat.Type === "group") {
          console.log(chat);
          return (
            <button
              key={index}
              className="btn"
              onClick={() => {
                setSelect(index);
              }}
            >
              {" "}
              <SidebarChat key={index} username={chat.Title} />
            </button>
          );
        }
      });
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://avatars.githubusercontent.com/u/44799678?v=4" />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton onClick={() => setDisplay(!display)}>
            {display ? (
              <GroupWindow>
                {" "}
                <MyElmenet onClick={createGroup}>Create group</MyElmenet>{" "}
                <MyElmenet>Profile</MyElmenet> <MyElmenet>Archived</MyElmenet>{" "}
                <MyElmenet>Starred</MyElmenet> <MyElmenet>Settings</MyElmenet>{" "}
                <MyElmenet>Log out</MyElmenet>{" "}
              </GroupWindow>
            ) : null}

            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">{sideBarChat()}</div>
    </div>
  );
}

export default Sidebar;

const GroupWindow = style.div`
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
