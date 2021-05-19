import React from "react";
import { Avatar } from "@material-ui/core";
import { Box, Box2, H2 } from "../style/CreateGroupUsersStyle";

function CreateGroupUsers({ username }) {
  return (
    <Box>
      <Avatar />
      <Box2 >
        <H2>{username}</H2>
      </Box2>
    </Box>
  );
}

export default CreateGroupUsers;
