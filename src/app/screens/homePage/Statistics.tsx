import React from "react";
import { Container, Stack, Box } from "@mui/material";
import Divider from "../../components/divider";

export default function Statistics() {
  return (
    <div className={"static-frame"}>
      <Container>
        <Stack className="info">
          <Stack className="static-box">
            <Box className="static-num"> 5 </Box>
            <Box className="static-text">Stores</Box>
          </Stack>
          <Divider height="64" width="2" bg="#3b82f6" />{" "}
          {/* bright blue accent */}
          <Stack className="static-box">
            <Box className="static-num"> 10 </Box>
            <Box className="static-text">Years of Experience</Box>
          </Stack>
          <Divider height="64" width="2" bg="#3b82f6" />{" "}
          {/* bright blue accent */}
          <Stack className="static-box">
            <Box className="static-num"> 200+ </Box>
            <Box className="static-text">Products</Box>
          </Stack>
          <Divider height="64" width="2" bg="#3b82f6" />{" "}
          {/* bright blue accent */}
          <Stack className="static-box">
            <Box className="static-num"> 500+ </Box>
            <Box className="static-text">Happy Pets</Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
