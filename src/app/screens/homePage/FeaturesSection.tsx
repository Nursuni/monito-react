import React from "react";
import { Box, Stack, Typography, Container } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import LockIcon from "@mui/icons-material/Lock";

export default function FeaturesSection() {
  const features = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40, color: "#3fbf7f" }} />,
      title: "Free Shipping",
      desc: "On orders over $50",
    },
    {
      icon: <VerifiedIcon sx={{ fontSize: 40, color: "#ffcc00" }} />,
      title: "Quality Products",
      desc: "Premium pet supplies",
    },
    {
      icon: <CardGiftcardIcon sx={{ fontSize: 40, color: "#ff6b6b" }} />,
      title: "Special Offers",
      desc: "Save up to 30%",
    },
    {
      icon: <LockIcon sx={{ fontSize: 40, color: "#6bafff" }} />,
      title: "Secure Payment",
      desc: "100% protected",
    },
  ];

  return (
    <Box sx={{ py: { xs: 6, md: 12 } }}>
      <Container>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={{ xs: 4, md: 6 }}
        >
          {features.map((feature, idx) => (
            <Box
              key={idx}
              sx={{
                textAlign: "center",
                flex: 1,
              }}
            >
              <Box sx={{ mb: 2 }}>{feature.icon}</Box>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ mb: 1, fontSize: { xs: 16, md: 18 } }}
              >
                {feature.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: 14, md: 16 } }}
              >
                {feature.desc}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
