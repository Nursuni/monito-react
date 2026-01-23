import React from "react";
import { Box, Stack, Typography, Container } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PetsIcon from "@mui/icons-material/Pets";

export default function PowerfulStatsRow() {
  const stats = [
    {
      icon: <PersonIcon sx={{ color: "#fff", fontSize: 28 }} />,
      num: "1M+",
      label: "Active Users",
    },
    {
      icon: <StarIcon sx={{ color: "#ffcc00", fontSize: 28 }} />,
      num: "30K+",
      label: "5-Star Reviews",
    },
    {
      icon: <LocalMallIcon sx={{ color: "#ff6b6b", fontSize: 28 }} />,
      num: "$252M",
      label: "Transactions",
    },
    {
      icon: <PetsIcon sx={{ color: "#6bafff", fontSize: 28 }} />,
      num: "500+",
      label: "Happy Pets",
    },
  ];

  return (
    <Box
      sx={{ py: { xs: 6, md: 10 }, position: "relative", overflow: "hidden" }}
    >
      {/* Background image */}
      <Box
        component="img"
        src="/img/statistics.png"
        alt="background"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          color: "#fff",
          textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
        }}
      />

      {/* Optional overlay for readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(255,255,255,0.6)", // adjust opacity for text readability
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
          spacing={{ xs: 4, md: 6 }}
        >
          {/* Left headline */}
          <Box
            sx={{
              flex: "0 0 auto",
              textAlign: { xs: "center", md: "left" },
              maxWidth: 220,
            }}
          >
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ fontSize: { xs: 14, md: 16 }, lineHeight: 1.3, mb: 0.5 }}
            >
              We speak with our
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ fontSize: { xs: 14, md: 16 }, lineHeight: 1.3, mb: 0.5 }}
            >
              powerful statistics
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ fontSize: { xs: 14, md: 16 }, lineHeight: 1.3 }}
            >
              for our community
            </Typography>
          </Box>

          {/* Right stats */}
          <Stack
            direction="row"
            divider={
              <Box sx={{ width: "1px", bgcolor: "rgba(0,0,0,0.1)", mx: 5 }} />
            }
            justifyContent="flex-start"
            alignItems="center"
            spacing={3}
          >
            {stats.map((stat, idx) => (
              <Box key={idx} sx={{ textAlign: "center", minWidth: 100, px: 2 }}>
                <Typography
                  variant="h1"
                  fontWeight={700}
                  sx={{
                    fontSize: { xs: 36, md: 48 },
                    lineHeight: 1,
                    textAlign: "center",
                  }}
                >
                  {stat.num}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mt: 1 }}
                >
                  {stat.icon}
                  <Typography
                    variant="subtitle1"
                    sx={{ fontSize: { xs: 14, md: 16 }, fontWeight: 500 }}
                  >
                    {stat.label}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
