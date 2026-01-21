import React from "react";
import { Box, Stack, Typography, Container } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PetsIcon from "@mui/icons-material/Pets";

export default function PowerfulStatsRow() {
  const stats = [
    {
      icon: <PersonIcon sx={{ color: "#3fbf7f", fontSize: 28 }} />,
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
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: "#f8f8ff" }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
          spacing={{ xs: 4, md: 6 }} // add some spacing between left and right
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
            } // small gap
            justifyContent="flex-start"
            alignItems="center"
            spacing={0} // no extra spacing needed, divider handles gap
          >
            {stats.map((stat, idx) => (
              <Box key={idx} sx={{ textAlign: "center", minWidth: 100, px: 1 }}>
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
