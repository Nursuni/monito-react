import React from "react";
import {
  Container,
  Stack,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

interface Service {
  title: string;
  description: string;
  icon?: string;
}

const services: Service[] = [
  {
    title: "Pet Grooming",
    description:
      "Keep your pets clean, healthy, and stylish with our expert grooming services.",
    icon: "/img/gromming.webp",
  },
  {
    title: "Pet Sitting",
    description:
      "Reliable pet sitting when you’re away. Your pets will feel loved and safe.",
    icon: "/img/sitting.png",
  },
  {
    title: "Vet Consultation",
    description:
      "Professional veterinary advice and checkups for your furry friends.",
    icon: "/img/vet.png",
  },
];

export default function ServicePage() {
  return (
    <div className="service-page">
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Page Header */}
        <Stack spacing={2} alignItems="center" textAlign="center" mb={6}>
          <Typography variant="h3" component="h1" fontWeight={700}>
            Our Services
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            We offer a variety of services to keep your pets happy and healthy.
          </Typography>
        </Stack>

        {/* Service Cards */}
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  p: 3,
                  boxShadow: 3,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                {service.icon && (
                  <Box
                    component="img"
                    src={service.icon}
                    alt={service.title}
                    sx={{ width: 80, height: 80, mb: 2 }}
                  />
                )}
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h2"
                    fontWeight={600}
                    gutterBottom
                  >
                    {service.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Stack spacing={2} alignItems="center" textAlign="center" mt={8}>
          <Typography variant="h5" fontWeight={500}>
            Want to know more about our services?
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Contact Us
          </Button>
        </Stack>
      </Container>
    </div>
  );
}
