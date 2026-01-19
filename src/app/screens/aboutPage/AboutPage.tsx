import React from "react";
import { Container, Stack, Box, Typography, Grid, Avatar } from "@mui/material";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const team: TeamMember[] = [
  {
    name: "Alice Johnson",
    role: "Founder & CEO",
    image: "/img/team/alice.jpg",
  },
  {
    name: "Mark Smith",
    role: "Head of Grooming",
    image: "/img/team/mark.jpg",
  },
  {
    name: "Sophia Lee",
    role: "Customer Support",
    image: "/img/team/sophia.jpg",
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
        <Stack spacing={2} alignItems="center" textAlign="center" mb={6}>
          <Typography variant="h3" component="h1" fontWeight={700}>
            About Us
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" maxWidth={600}>
            At our pet shop, we are passionate about keeping your pets happy,
            healthy, and loved. Learn more about our mission, vision, and
            dedicated team.
          </Typography>
        </Stack>

        {/* Mission & Vision */}
        <Grid container spacing={6} mb={8}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                background: "#ffffff",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="h5" fontWeight={600} mb={2}>
                Our Mission
              </Typography>
              <Typography variant="body1" color="text.secondary">
                We strive to provide the best care, products, and services for
                pets and their owners. Every pet deserves love, health, and
                happiness.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                background: "#ffffff",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="h5" fontWeight={600} mb={2}>
                Our Vision
              </Typography>
              <Typography variant="body1" color="text.secondary">
                To become the most trusted and beloved pet shop in the region,
                offering unmatched services and quality products for every furry
                friend.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Team Section */}
        <Stack spacing={4} alignItems="center" mb={6}>
          <Typography variant="h4" fontWeight={700}>
            Meet Our Team
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            maxWidth={600}
            textAlign="center"
          >
            Our dedicated team works tirelessly to provide the best care and
            services for your pets.
          </Typography>
        </Stack>

        <Grid container spacing={6}>
          {team.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack spacing={2} alignItems="center" textAlign="center">
                <Avatar
                  src={member.image}
                  alt={member.name}
                  sx={{ width: 150, height: 150, borderRadius: 3 }}
                />
                <Typography variant="h6" fontWeight={600}>
                  {member.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.role}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
