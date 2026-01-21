import React from "react";
import { Box, Container, Stack, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterWrapper = styled.div`
  width: 100%;
  background-color: #f8f8ff; /* light background */
  padding-top: 80px;
  padding-bottom: 40px;
`;

export default function Footer() {
  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Blog", path: "/blog" },
    { label: "About Us", path: "/about" },
    { label: "Help", path: "/help" },
  ];

  const servicesLinks = [
    { label: "Shipping Info", path: "/shipping" },
    { label: "Returns", path: "/returns" },
    { label: "Track Order", path: "/track" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms & Conditions", path: "/terms" },
  ];

  return (
    <FooterWrapper>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 6, md: 12 }}
          justifyContent="space-between"
        >
          {/* About / Description */}
          <Stack spacing={3} sx={{ maxWidth: 300 }}>
            <Box>
              <img src="/icons/frame.svg" width="100px" alt="logo" />
            </Box>
            <Box sx={{ color: "#333", fontSize: 16, lineHeight: 1.6 }}>
              Your one-stop shop for all your pet needs. Quality products for
              happy, healthy pets.
            </Box>
            <Stack direction="row" spacing={2}>
              <img src="/icons/facebook.svg" alt="Facebook" />
              <img src="/icons/twitter.svg" alt="Twitter" />
              <img src="/icons/instagram.svg" alt="Instagram" />
              <img src="/icons/youtube.svg" alt="YouTube" />
            </Stack>
          </Stack>

          {/* Quick Links */}
          <Stack spacing={2}>
            <Box sx={{ fontWeight: 600, fontSize: 18, mb: 1 }}>Quick Links</Box>
            {quickLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                style={{
                  color: "#555",
                  textDecoration: "none",
                  marginBottom: 4,
                }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>

          {/* Services */}
          <Stack spacing={2}>
            <Box sx={{ fontWeight: 600, fontSize: 18, mb: 1 }}>Services</Box>
            {servicesLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                style={{
                  color: "#555",
                  textDecoration: "none",
                  marginBottom: 4,
                }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>

          {/* Newsletter */}
          <Stack spacing={2} sx={{ maxWidth: 300 }}>
            <Box sx={{ fontWeight: 600, fontSize: 18 }}>Newsletter</Box>
            <Box sx={{ color: "#555", fontSize: 14, lineHeight: 1.5 }}>
              Subscribe to get special offers and updates!
            </Box>
            <Stack direction="row" spacing={1}>
              <TextField
                placeholder="Your email"
                size="small"
                fullWidth
                sx={{ bgcolor: "#fff" }}
              />
              <Button variant="contained" color="primary">
                Subscribe
              </Button>
            </Stack>
          </Stack>
        </Stack>

        {/* Divider */}
        <Box
          sx={{
            borderTop: "1px solid #C5C8C9",
            opacity: 0.2,
            mt: 6,
            mb: 2,
          }}
        />

        {/* Copyright */}
        <Box sx={{ textAlign: "center", color: "#555", fontSize: 14 }}>
          © 2025 Monito Pets Shop. All rights reserved.
        </Box>
      </Container>
    </FooterWrapper>
  );
}
