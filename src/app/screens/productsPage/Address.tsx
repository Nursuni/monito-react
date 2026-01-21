import React from "react";
import { Container, Stack, Box, Typography } from "@mui/material";
import {
  Public as PublicIcon,
  LocalShipping as LocalShippingIcon,
  Inventory2 as Inventory2Icon,
  Verified as VerifiedIcon,
} from "@mui/icons-material";

const infoItems = [
  {
    icon: <PublicIcon color="primary" />,
    title: "Coverage",
    text: "40+ cities nationwide & international shipping",
  },
  {
    icon: <LocalShippingIcon color="primary" />,
    title: "Delivery speed",
    text: "2–4 days standard · Next-day express",
  },
  {
    icon: <Inventory2Icon color="primary" />,
    title: "Availability",
    text: "Regional stock in real time",
  },
  {
    icon: <VerifiedIcon color="primary" />,
    title: "Trusted",
    text: "50,000+ customers",
  },
];

export default function InfoMapSection() {
  return (
    <Box component="section" sx={{ py: 10, backgroundColor: "#f8f9fc" }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={6}
          alignItems="flex-start"
        >
          {/* LEFT INFO BOX */}
          <Stack spacing={3} flex={1}>
            <Typography variant="h4" fontWeight={600}>
              Pet essentials, delivered where you are
            </Typography>
            <Typography variant="body1" color="text.secondary" maxWidth={400}>
              Local fulfillment hubs ensure fast delivery and accurate
              availability.
            </Typography>

            <Stack spacing={2}>
              {infoItems.map((item, idx) => (
                <Stack
                  key={idx}
                  direction="row"
                  spacing={2}
                  alignItems="flex-start"
                >
                  <Box mt={0.5}>{item.icon}</Box>
                  <Box>
                    <Typography fontWeight={600}>{item.title}</Typography>
                    <Typography color="text.secondary">{item.text}</Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Stack>

          {/* RIGHT MAP */}
          <Box flex={1.4}>
            <Box
              component="iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.5262489589635!2d69.28586867611149!3d41.34119147127584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8d660b2bd55d%3A0xd86dc4c9715c2025!2sYunusabad%20District%2C%20Tashkent%2C%20Uzbekistan!5e0!3m2!1sen!2sus!4v1731707776783!5m2!1sen!2sus"
              sx={{
                width: "100%",
                height: { xs: 300, lg: 480 },
                borderRadius: 3,
                border: "1px solid #c5c8c9",
              }}
              loading="lazy"
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
