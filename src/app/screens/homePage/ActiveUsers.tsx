import React from "react";
import { Stack, Box, Container } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveTopUsers } from "./selector";
import { useSelector } from "react-redux";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";

/**REDUX SLICE & SELECTOR */

const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);
  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Active Users</Box>
          <Box className="cards-frame">
            <CssVarsProvider>
              {topUsers.length !== 0 ? (
                topUsers.map((member: Member) => {
                  const imagePath = `${serverApi}/${member.memberImage}`;
                  return (
                    <Card
                      key={member._id}
                      variant="plain"
                      sx={{
                        width: "300px",
                        p: 0,
                        m: 0,
                        boxShadow: "lg",
                        overflow: "hidden",
                      }}
                    >
                      <CardOverflow sx={{ p: 0 }}>
                        <AspectRatio ratio="1" sx={{ width: "100%" }}>
                          <img src={imagePath} alt={member.memberNick} />
                        </AspectRatio>
                      </CardOverflow>

                      <Typography className="member-nickname" sx={{ m: 0 }}>
                        {member.memberNick}
                      </Typography>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">No Active Users!</Box>
              )}
            </CssVarsProvider>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
