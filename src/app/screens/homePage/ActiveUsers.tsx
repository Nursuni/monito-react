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
    <div className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <Container>
        <Stack className="space-y-10">
          <Box className="text-center">
            <span className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Active Users
            </span>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
          </Box>

          <Box className="flex flex-wrap justify-center gap-8">
            <CssVarsProvider>
              {topUsers.length !== 0 ? (
                topUsers.map((member: Member) => {
                  const imagePath = `${serverApi}/${member.memberImage}`;
                  return (
                    <Card
                      key={member._id}
                      variant="plain"
                      className="group cursor-pointer"
                      sx={{
                        width: "280px",
                        p: 0,
                        m: 0,
                        boxShadow: "lg",
                        overflow: "hidden",
                        borderRadius: "16px",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: "xl",
                          transform: "translateY(-8px)",
                        },
                      }}
                    >
                      <CardOverflow sx={{ p: 0, position: "relative" }}>
                        <AspectRatio ratio="1" sx={{ width: "100%" }}>
                          <img
                            src={imagePath}
                            alt={member.memberNick}
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </AspectRatio>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </CardOverflow>

                      <Box className="p-5 bg-white">
                        <Typography
                          className="text-center text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300"
                          sx={{ m: 0 }}
                        >
                          {member.memberNick}
                        </Typography>
                      </Box>
                    </Card>
                  );
                })
              ) : (
                <Box className="text-center py-20 text-2xl font-semibold text-gray-400">
                  No Active Users!
                </Box>
              )}
            </CssVarsProvider>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
