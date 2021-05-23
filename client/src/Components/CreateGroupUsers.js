import React from "react";
import { Avatar } from "@material-ui/core";
import { Box, Box2, H2 } from "../style/CreateGroupUsersStyle";
import { useState } from "react";

function CreateGroupUsers({ username }) {
  const [groupSelect, setGruopSelect] = useState("white");
  return (
    <Box
      onClick={() => {
        groupSelect === 'white'?
        setGruopSelect("whitesmoke"):
        setGruopSelect("white");
      }}
      groupSelect={groupSelect}
    >
      <Avatar />
      <Box2>
        <H2>{username}</H2>
      </Box2>
    </Box>

  );
}

export default CreateGroupUsers;
