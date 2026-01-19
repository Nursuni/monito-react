import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

export default function SeeApp() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={4}
        >
          {/* Text Section */}
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Experience Monito Pets Shop
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: 18, mb: 4, maxWidth: 500 }}
            >
              Discover all your favorite pet products, track your orders, and
              find tips for your pets. Download our app to shop anytime,
              anywhere!
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#fff",
                  color: "#3b82f6",
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#e0e7ff" },
                }}
              >
                Download for iOS
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#fff",
                  color: "#3b82f6",
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#e0e7ff" },
                }}
              >
                Download for Android
              </Button>
            </Stack>
          </Box>

          {/* Image / App Mockup */}
          <Box
            component="img"
            src="/images/app-mockup.png" // put your app screenshot here
            alt="Monito Pets App"
            sx={{
              width: { xs: "80%", md: 400 },
              borderRadius: 4,
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
}
