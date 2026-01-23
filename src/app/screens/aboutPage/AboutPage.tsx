import React from "react";
import { Container, Stack, Box, Typography, Grid, Avatar } from "@mui/material";
import Address from "../productsPage/Address";
import FeaturesSection from "../homePage/FeaturesSection";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const team: TeamMember[] = [
  {
    name: "Alice Johnson",
    role: "Founder & CEO",
    image: "/img/nora.jpg",
  },
  {
    name: "Mark Smith",
    role: "Head of Grooming",
    image: "/img/man.webp",
  },
  {
    name: "Sophia Lee",
    role: "Customer Support",
    image: "/img/mina.jpg",
  },
];

export default function AboutUsPage() {
  return (
    <div
      className="about-us-page"
      style={{ background: "#f8f8ff", minHeight: "100vh" }}
    >
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Hero Section */}
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Typography variant="h3" component="h1" fontWeight={700}>
            About Us
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" maxWidth={600}>
            At our pet shop, we are passionate about keeping your pets happy,
            healthy, and loved. Learn more about our mission, vision, and
            dedicated team.
          </Typography>
        </Stack>
        <FeaturesSection />
      </Container>

      <Address />
    </div>
  );
}
