import React, { useState } from "react";

import { SearchOutlined } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import { useChats } from "../contexts/ChatsProvider";

import { useSocket } from "../contexts/SocketProvider";

import {
  CreateGroupStyle,
  Header,
  Search,
  SearchContainer,
  ChatsStyle,
} from "../style/CreateGroupStyle";

import CreateGroupUsers from "./CreateGroupUsers";
import styled from "styled-components";

function CreateGroup(props) {
  const sender = sessionStorage["userInfo"];

  const [chats, setChats] = useChats();
  const [members, setMembers] = useState([sender]);
  const [title, setTitle] = useState("");

  const socket = useSocket();

  const storeMembers = (e) => {
    if (members.find((m) => m == e.currentTarget.value)) {
      setMembers(members.filter((m) => m != e.currentTarget.value));
    } else {
      setMembers([...members, e.currentTarget.value]);
    }
  };

  const onSubmit = (e) => {
    var time = new Date();

    let newGroup = {
      Title: title,
      Admins: [sender],
      Members: members,
      Chat: [{ Message: sender + " added you", TimeStamp: time }],
      Type: "group",
    };

    setChats([...chats, newGroup]);

    socket.emit("createGroup", newGroup);

    props.callback();
  };

  const createGroupUsers = () => {
    if (chats) {
      return chats.map((chat, index) => {
        if (
          chat.Type === "private messages" &&
          chat.UserA !== sessionStorage["userInfo"]
        ) {
          return (
            <button
              key={index}
              className="btn"
              value={chat.UserA}
              onClick={(e) => {
                storeMembers(e);
              }}
            >
              {" "}
              <CreateGroupUsers key={index} username={chat.UserA} />
            </button>
          );
        } else if (
          chat.Type === "private messages" &&
          chat.UserB !== sessionStorage["userInfo"]
        ) {
          return (
            <button
              key={index}
              className="btn"
              value={chat.UserB}
              onClick={(e) => {
                storeMembers(e);
              }}
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
    <CreateGroupStyle>
      <Header>
        <MyArrowBackIcon onClick={() => props.callback()} />
        <AddGroup>Add group participants</AddGroup>
        <GroupName
          label={"Type group subject here..."}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <SearchButton variant="outlined" onClick={(e) => onSubmit(e)}>
          Create Group
        </SearchButton>
      </Header>

      <Search>
        <SearchContainer>
          <MySearchOutlined />
          <Input placeholder="type contact name" type="text" />
        </SearchContainer>
      </Search>
      <ChatsStyle>{createGroupUsers()}</ChatsStyle>
    </CreateGroupStyle>
  );
}

export default CreateGroup;

const Input = styled.input`
  border: none;
  outline: none;
`;

const MySearchOutlined = styled(SearchOutlined)`
  margin-right: 2vw;
  padding: 3px;
  color: gray;
`;

const GroupName = styled(TextField)`
  border: none;
  outline: none;

  width: 80%;
  margin-left: 1.6rem;
  & label.Mui-focused {
    color: black;
  }
  & .MuiInput-underline:after {
    border-bottom-color: black;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: black;
    }
    &:hover fieldset {
      border-color: black;
    }
    &.Mui-focused fieldset {
      border-color: black;
    }
  }
`;
const SearchButton = styled(Button)`
  width: 80%;
  border-radius: 4px;
  margin-left: 1.6rem;
  margin-bottom: 1.6rem;
  margin-top: 1.6rem;
`;

const AddGroup = styled.p`
  margin-left: 2.2rem;
  font-weight: 400;
`;

const MyArrowBackIcon = styled(ArrowBackIcon)`
  margin-top: 1.6rem;
`;
