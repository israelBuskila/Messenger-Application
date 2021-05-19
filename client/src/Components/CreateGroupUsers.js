import React from "react";
import { Avatar } from "@material-ui/core";
import { Box, Box2, H2 } from "../style/CreateGroupUsersStyle";
import { useState } from "react";

function CreateGroupUsers({ username }) {
  const [groupSelect, setGruopSelect] = useState("white");
  const selectMember = () => {
    if (groupSelect === "white") setGruopSelect("#808080");
    else setGruopSelect("white");
  };
  return (
    <button
      onClick={selectMember()}
      style={{
        backgroundColor: groupSelect,
        minWidth: "238px",
        border: "none",
        marginTop: "3px",
      }}
    >
      <Box>
        <Avatar />
        <Box2>
          <H2>{username}</H2>
        </Box2>
      </Box>
    </button>
  );
}

export default CreateGroupUsers;
